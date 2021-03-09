
export const poolpeekquery = "&qryname=PoolPeek&nameordescription=poolpeek&excluderetired=1";
export const baremetalquery = "&qryname=Bare+Metal+Stake+Pools&nameordescription=etal&excluderetired=1,";
export const charityquery = "&qryname=Charity+Stake+Pools&nameordescription=harit&excluderetired=11";
export const educationquery = "&qryname=Education+Stake+Pools&nameordescription=ducat&excluderetired=1";
export const womeninblockchainquery = "&qryname=Women+In+Blockchain&nameordescription=women&excluderetired=1";

export const zeroblockpoolsquery = "&qryname=Help+0+Block+Pools&blockfrom=0&blockto=0&excluderetired=1";

export const onetotenpoolsquery = "&blockfrom=1&blockto=10&activestakefrom=0&activestaketo=10000000&excluderetired=1";

export const retiringpoolsquery = "&qryname=Retiring+Pool&onlyretiring=1";
export const retiredpoolsquery = "&qryname=Retired+Pools&onlyretired=1";

export const funtickersquery = "&op=fundumps&qryname=Fun+Tickers&dumptype=ticker";
export const funnamesquery = "&op=fundumps&qryname=Fun+Names&dumptype=name";
export const fundescriptionsquery = "&op=fundumps&qryname=Fun+Names&dumptype=description";

export const smallproduceblocksquery = "&blockfrom=1&blockto=100&activestakefrom=1210000&activestaketo=10000000&excluderetired=1";

export const twitterpoolsquery = "&activestakefrom=0&activestaketo=10000000&excluderetired=1&has_twitter=1";


export const marchsaturatedpoolsquery = "&activestakefrom=32000000";
export const marchsaturatedpoolsqueryDesc = "In March the k-parameter will be increased to 1000 from 500, this will mean the saturation level of pools will fall from roughly 64million ADA to 32million ADA staked per pool. The below pools will return less rewards in March consider distributing your stake. :) ";

export const charitypoolsqueryDesc = "Stake pools that have the text 'charity' in their name or description. Our text based pool queries look for keywords in the pool's data, the search is not exact and user is left to decide if the pool meets the actual criteria.";

export const baremetalpoolsqueryDesc = "Stake pools that have the text 'metal' in their name or description. Our text based pool queries look for keywords in the pool's data, the search is not exact and user is left to decide if the pool meets the actual criteria.";

export const dynamicduopoolsqueryDesc = "We have devoted many hours developing and maintaining PoolPeek.com. If you like what you see and want to support our efforts, please consider delegating to our stake pools or tipping us from the 'About Us' page.";

export const educationpoolsqueryDesc = "Stake pools that have the text 'education' in their name or description. Our text based pool queries look for keywords in the pool's data, the search is not exact and user is left to decide if the pool meets the actual criteria.";

export const zeroblockpoolsqueryDesc = "Stake pools that have no blocks. We support the true decentralization of the Cardano network and believe small pools are a vital part of it, think about helping one of these pools out!";

export const soonretiringpoolsqueryDesc = "Stake pools that will retire soon.";

export const retiredpoolsqueryDesc = "Stake pools that have retired.";

export const onetotenblockpoolsqueryDesc = "Stake pools that have 1 to 10 blocks and less than 10M active stake.";


export const smallproduceblocksDesc = "Small stake pools that are likely to mint blocks this epoch. Criteria is 1.21M to 10M active stake and have minted between 1 and 100 lifetime blocks.";

export const twitterpoolsqueryDesc = "The creators of PoolPeek.com are very active on twitter so we thought it only fitting we create a page for twitter pools :) The following is a list of small stake pools that have a twitter handle in their extended meta data and have less than 10M active stake.";


export const qry64milorgreater = "&activestakefrom=64000000&activestaketo=900000000&excluderetired=1&order=ActiveStake, ";
export const desc64milorgreater = "Stake pools with 64M or greater active stake."

export const qry32milto64mil = "&activestakefrom=32000000&activestaketo=63999999&excluderetired=1&order=ActiveStake, ";
export const desc32milto64mil = "Stake pools with 32M to < 64M active stake."

export const qry16milto32mil = "&activestakefrom=16000000&activestaketo=31999999&excluderetired=1&order=ActiveStake, ";
export const desc16milto32mil = "Stake pools with 16M to < 32M active stake."

export const qry8milto16mil = "&activestakefrom=8000000&activestaketo=15999999&excluderetired=1&order=ActiveStake, ";
export const desc8milto16mil = "Stake pools with 8M to < 16M active stake."




