
//export const baseUrl = "http://localhost:8081";
export const baseUrl = "https://smashpeek.com/services";

export const baseUrlPoolPeekService = "http://localhost:8087";
//export const baseUrlPoolPeekService = "https://smashpeek.com/ppservices";



//
export const dashboardData = "/dashboard/data";
// export const recommendedPools = "/pool/recommendedpp";
// export const allPools = "/pool/allpp";
//export const geoLocs = "/pool/geopp"


//poolpeek service
export const allPoolsPPS = "/pooldetails/getall";
export const getPoolById = "/pooldetails/getone/";
export const getmappools = "/pooldetails/getmappools";//getmappools
export const getallmobile = "/pooldetails/getallmobile";//getallmobile
export const getPoolForSearchList = "/pooldetails/getallsearchlist";//
export const getPoolDelegates = "/pooldelegates/get/";//
export const getStakeFeedHistory = "/pooldelegates/get/history/"
export const getPoolForRecommendedList = "/pooldetails/getrecommendedpools";
export const getSaturatedPools = "/pooldetails/getSaturatedPools"
export const getPoolsAtRiskOfSaturation = "/pooldetails/getPoolsAtRiskOfSaturation"
export const getRetiredPools = "/pooldetails/getRetiredPools"

export const getPoolByStakeAddress = "/pooldetails/getone/stakeaddress/";//{stakeaddress}

export const getPoolDelegatesHistory= "/pooldelegates/get/history/";//
export const getPoolsRetiringAcrossEpoch = "/pool/retiring/acrossepochs";
export const getPoolAdvertising = "/pooladvert/requested";
export const requestPoolAdvertising = "/pooladvert/request/";//{poolId}

//ISOS
export const getisopools = "/pooldetails/getisopools/"//{isoname} GET
export const getisopoolsPost = "/pooldetails/getisopools/"// POST

//Alliances
export const getAlliancePools = "/alliance/details/";

export const mintNFT = "/nft/mint/";//{nftId}
export const chainLoadData = "/chainload/website";

//Blocks

export const blocksFeed = "/blocks/blockfeed";



