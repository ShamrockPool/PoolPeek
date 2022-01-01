import CoinSelection from "./coinSelection";
import { Buffer } from 'buffer';

const cardano = window.cardano;

export const getDelegation = async (Loader) => {
  const walletAddress = await cardano.getRewardAddress();

  var walletAddressHex = Buffer.from(
    walletAddress,
    'hex'
  );

  var addressFromBytes = Loader.Address.from_bytes(walletAddressHex);

  var rewardAddress = Loader.RewardAddress.from_address(addressFromBytes)?.to_address().to_bech32();

  const response = await fetch("https://api.koios.rest/api/v0/account_info?_address=" + rewardAddress);
  const stake = await response.json();
  if (!stake || stake.error || !stake[0] || !stake[0].delegated_pool) return {};
  return {
    active: stake[0].status,
    rewards: stake[0].rewards_available,
    poolId: stake[0].delegated_pool,
  }
};

export const getUtxos = async (Loader) => {
  var Utxos = await cardano.getUtxos();
  var UtxosHex = Utxos.map(u => Loader.TransactionUnspentOutput.from_bytes(
    Buffer.from(
      u,
      'hex'
    )
  )
  );
  var UTXOS = []
  for (let utxo of UtxosHex) {
    let assets = _utxoToAssets(utxo)

    UTXOS.push({
      txHash: Buffer.from(
        utxo.input().transaction_id().to_bytes(),
        'hex'
      ).toString('hex'),
      txId: utxo.input().index(),
      amount: assets
    })
  }
  return UTXOS
}

function _utxoToAssets(utxo) {
  let value = utxo.output().amount()
  const assets = [];
  assets.push({ unit: 'lovelace', quantity: value.coin().to_str() });
  if (value.multiasset()) {
    const multiAssets = value.multiasset().keys();
    for (let j = 0; j < multiAssets.len(); j++) {
      const policy = multiAssets.get(j);
      const policyAssets = value.multiasset().get(policy);
      const assetNames = policyAssets.keys();
      for (let k = 0; k < assetNames.len(); k++) {
        const policyAsset = assetNames.get(k);
        const quantity = policyAssets.get(policyAsset);
        const asset =
          Buffer.from(
            policy.to_bytes()
          ).toString('hex') + "." +
          Buffer.from(
            policyAsset.name()
          ).toString('ascii')


        assets.push({
          unit: asset,
          quantity: quantity.to_str(),
        });
      }
    }
  }
  return assets;
}


export const getAddress = async (Loader) => {
  var changedAddress = await cardano.getChangeAddress();
  return Loader.Address.from_bytes(
    Buffer.from(
      changedAddress,
      'hex'
    )
  ).to_bech32()
}

export const getProtocolParameters = async () => {

  const tipResponse = await fetch("https://api.koios.rest/api/v0/tip");
  const tipData = await tipResponse.json();

  var epochNo = tipData[0].epoch;

  const epochResponse = await fetch("https://api.koios.rest/api/v0/epoch_params?_epoch_no" + epochNo);
  const epochData = await epochResponse.json();

  return {
    linearFee: {
      minFeeA: epochData[0].min_fee_a.toString(),
      minFeeB: epochData[0].min_fee_b.toString(),
    },
    minUtxo: '1000000', //p.min_utxo, minUTxOValue protocol paramter has been removed since Alonzo HF. Calulation of minADA works differently now, but 1 minADA still sufficient for now
    poolDeposit: epochData[0].pool_deposit,
    keyDeposit: epochData[0].key_deposit.toString(),
    maxTxSize: epochData[0].max_tx_size,
    slot: tipData[0].epoch_slot,
  };

}




export const txBuilder = async (Loader, { PaymentAddress, Utxos, Outputs, ProtocolParameter, Metadata, MetadataLabel, Delegation }) => {
  const MULTIASSET_SIZE = 5000;
  const VALUE_SIZE = 5000;
  const totalAssets = 0
  CoinSelection.setLoader(Loader)
  CoinSelection.setProtocolParameters(
    ProtocolParameter.minUtxo.toString(),
    ProtocolParameter.linearFee.minFeeA.toString(),
    ProtocolParameter.linearFee.minFeeB.toString(),
    ProtocolParameter.maxTxSize.toString()
  )

  const selection = CoinSelection.randomImprove(
    Utxos,
    Outputs,
    20 + totalAssets,
    //ProtocolParameter.minUtxo.to_str()
  )
  const inputs = selection.input;
  const txBuilder = Loader.TransactionBuilder.new(
    Loader.LinearFee.new(
      Loader.BigNum.from_str(ProtocolParameter.linearFee.minFeeA),
      Loader.BigNum.from_str(ProtocolParameter.linearFee.minFeeB)
    ),
    Loader.BigNum.from_str(ProtocolParameter.minUtxo.toString()),
    Loader.BigNum.from_str(ProtocolParameter.poolDeposit.toString()),
    Loader.BigNum.from_str(ProtocolParameter.keyDeposit.toString()),
    MULTIASSET_SIZE,
    MULTIASSET_SIZE
  );

  for (let i = 0; i < inputs.length; i++) {
    const utxo = inputs[i];
    txBuilder.add_input(
      utxo.output().address(),
      utxo.input(),
      utxo.output().amount()
    );
  }

  if (Delegation) {
    let certificates = Loader.Certificates.new();
    if (!Delegation.delegation.active) {
      certificates.add(
        Loader.Certificate.new_stake_registration(
          Loader.StakeRegistration.new(
            Loader.StakeCredential.from_keyhash(
              Loader.Ed25519KeyHash.from_bytes(
                Buffer.from(Delegation.stakeKeyHash, 'hex')
              )
            )
          )
        )
      )
    }

    let poolKeyHash = Delegation.poolHex
    certificates.add(
      Loader.Certificate.new_stake_delegation(
        Loader.StakeDelegation.new(
          Loader.StakeCredential.from_keyhash(
            Loader.Ed25519KeyHash.from_bytes(
              Buffer.from(Delegation.stakeKeyHash, 'hex')
            )
          ),
          Loader.Ed25519KeyHash.from_bytes(
            Buffer.from(poolKeyHash, 'hex')
          )
        )
      )
    );
    txBuilder.set_certs(certificates)
  }


  let AUXILIARY_DATA
  if (Metadata) {
    let METADATA = Loader.GeneralTransactionMetadata.new()
    METADATA.insert(
      Loader.BigNum.from_str(MetadataLabel),
      Loader.encode_json_str_to_metadatum(
        JSON.stringify(Metadata),
        0
      )
    )
    AUXILIARY_DATA = Loader.AuxiliaryData.new()
    AUXILIARY_DATA.set_metadata(METADATA)
    //const auxiliaryDataHash = S.hash_auxiliary_data(AUXILIARY_DATA)
    txBuilder.set_auxiliary_data(AUXILIARY_DATA)
  }

  for (let i = 0; i < Outputs.len(); i++) {
    txBuilder.add_output(Outputs.get(i))
  }


  const change = selection.change;
  const changeMultiAssets = change.multiasset();
  // check if change value is too big for single output
  if (changeMultiAssets && change.to_bytes().length * 2 > VALUE_SIZE) {
    const partialChange = Loader.Value.new(
      Loader.BigNum.from_str('0')
    );

    const partialMultiAssets = Loader.MultiAsset.new();
    const policies = changeMultiAssets.keys();
    const makeSplit = () => {
      for (let j = 0; j < changeMultiAssets.len(); j++) {
        const policy = policies.get(j);
        const policyAssets = changeMultiAssets.get(policy);
        const assetNames = policyAssets.keys();
        const assets = Loader.Assets.new();
        for (let k = 0; k < assetNames.len(); k++) {
          const policyAsset = assetNames.get(k);
          const quantity = policyAssets.get(policyAsset);
          assets.insert(policyAsset, quantity);
          //check size
          const checkMultiAssets = Loader.MultiAsset.from_bytes(
            partialMultiAssets.to_bytes()
          );
          checkMultiAssets.insert(policy, assets);
          const checkValue = Loader.Value.new(
            Loader.BigNum.from_str('0')
          );
          checkValue.set_multiasset(checkMultiAssets);
          if (
            checkValue.to_bytes().length * 2 >=
            VALUE_SIZE
          ) {
            partialMultiAssets.insert(policy, assets);
            return;
          }
        }
        partialMultiAssets.insert(policy, assets);
      }
    };

    makeSplit();
    partialChange.set_multiasset(partialMultiAssets);

    const minAda = Loader.min_ada_required(
      partialChange,
      Loader.BigNum.from_str(ProtocolParameter.minUtxo)
    );
    partialChange.set_coin(minAda);

    txBuilder.add_output(
      Loader.TransactionOutput.new(
        Loader.Address.from_bech32(PaymentAddress),
        partialChange
      )
    );
  }
  txBuilder.add_change_if_needed(
    Loader.Address.from_bech32(PaymentAddress)
  );
  const transaction = Loader.Transaction.new(
    txBuilder.build(),
    Loader.TransactionWitnessSet.new(),
    AUXILIARY_DATA
  )

  const size = transaction.to_bytes().length * 2;
  if (size > ProtocolParameter.maxTxSize) {
    throw Error;
  }

  return transaction.to_bytes()
}


export const signSubmitTx = async (Loader, transactionRaw) => {
  let transaction = Loader.Transaction.from_bytes(transactionRaw)
  const witneses = await cardano.signTx(
    Buffer.from(
      transaction.to_bytes()
    ).toString('hex')
  )

  const signedTx = Loader.Transaction.new(
    transaction.body(),
    Loader.TransactionWitnessSet.from_bytes(
      Buffer.from(
        witneses,
        "hex"
      )
    ),
    transaction.auxiliary_data()
  )

  var signedTxHexBytes = Buffer.from(
    signedTx.to_bytes(), "hex"
  ).toString('hex');

  var txhash = null;
  try {
    txhash = await cardano.submitTx(signedTxHexBytes);
  } catch (error) {
    console.log(error);
  }


  return txhash

}
