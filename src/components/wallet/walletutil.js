export async function getWallet(wallet) {
    console.log('Wallet selected: ' + wallet)
    if (wallet === "nami") {
        console.log("nami")
        return await window.cardano.nami.enable();

    } else if (wallet === "flint") {
        console.log("flint")
        return await window.cardano.flint.enable();
    }
    else if (wallet === "eternl") {
        console.log("eternl")
        return await window.cardano.eternl.enable();
    }
    else if (wallet === "typhon") {
        console.log("typhon")
        return await window.cardano.typhon.enable();
    }
    else if (wallet === "gero") {
        console.log("gero")
        return await window.cardano.gerowallet.enable();
    }
    else if (wallet === "yoroi") {
        console.log("yoroi")
        return await window.cardano.yoroi.enable();
    }
}
