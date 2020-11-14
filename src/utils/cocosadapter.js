import timeout from "timeout";
import socketadapter from "./socketadapter";

// const nodeUrl="ws://39.100.85.16:8701";
const nodeUrl="wss://api.cocosbcx.net";

const cocosConfig = {
    ws_node_list: [
        {url: nodeUrl, name: "Cocos"},
    ],
    networks: [
        {
            core_asset: "COCOS",
            chain_id: "6057d856c398875cac2650fe33caef3d5f6b403d184c5154abbff526ec1143c4"
        }
    ],
    faucet_url: "https://faucet.cocosbcx.net",
    auto_reconnect: true,
    real_sub: true,
    check_cached_nodes_data: false,
};

// const cocosConfig = {
//     ws_node_list: [
//         {url: "ws://188.131.130.220:58048", name: "Cocos"},
//     ],
//     networks: [
//         {
//             core_asset: "COCOS",
//             chain_id: "6057d856c398875cac2650fe33caef3d5f6b403d184c5154abbff526ec1143c4"
//         }
//     ],
//     faucet_url: "https://faucet.cocosbcx.net",
//     auto_reconnect: true,
//     real_sub: true,
//     check_cached_nodes_data: false,
// };


// const cocosConfig = {
//     ws_node_list: [
//         {url: "ws://139.199.113.96:18049", name: "Cocos"},
//     ],
//     networks: [
//         {
//             core_asset: "COCOS",
//             chain_id: "6057d856c398875cac2650fe33caef3d5f6b403d184c5154abbff526ec1143c4"
//         }
//     ],
//     faucet_url: "https://faucet.cocosbcx.net",
//     auto_reconnect: true,
//     real_sub: true,
//     check_cached_nodes_data: false,
// };

// var cocosConfig = {
//     ws_node_list: [
//         {url: "wss://test.cocosbcx.net", name: "Cocos"},
//     ],
//     networks: [
//         {
//             core_asset: "COCOS",
//             chain_id: "1ae3653a3105800f5722c5bda2b55530d0e9e8654314e2f3dc6d2b010da641c5"
//         }
//     ],
//     faucet_url:"https://test-faucet.cocosbcx.net",
//     auto_reconnect: true,
//     real_sub: true,
//     check_cached_nodes_data: false,
// };

var cocosadapter = {};

(function(e) {
    e.source = null;
    e.localBcx=null;
    e.pluginBcx=null;
    e.curBcx=null;

    var checkBcxSourceTimes = 0;
    var checkBcxSourceMaxTimes = 3;
    var pluginTryLoginTimes = 0;
    var pluginTryLoginMaxTimes = 2;

    e.check=function () {
        if(!e.localBcx){
            e.localBcx = new BCX(cocosConfig);
            console.log("new BCX once");
        }
        if(!e.pluginBcx){
            e.pluginBcx = window.BcxWeb;
        }
        if(!e.curBcx){
            if(e.pluginBcx){
                e.curBcx=e.pluginBcx;
                e.source = 'plugin';
                checkBcxSourceTimes = checkBcxSourceMaxTimes;
                console.log("use pluginBcx");
            }else if(e.localBcx){
                checkBcxSourceTimes += 1;
                console.log("checkBcxSourceTimes"+checkBcxSourceTimes);
                console.log("checkBcxSourceMaxTimes"+checkBcxSourceMaxTimes);
                if(checkBcxSourceTimes >= checkBcxSourceMaxTimes){
                    e.curBcx=e.localBcx;
                    e.source = 'local';
                    console.log("try "+checkBcxSourceTimes+" times, use localBcx");
                }
            }
        }
    };

    e.switchLocal=function () {
        if(e.localBcx){
            e.source='local';
            e.curBcx=e.localBcx;
        }
    };
    e.switchPlugin=function () {
        if(e.pluginBcx){
            e.source='plugin';
            e.curBcx=e.pluginBcx;
        }
    };

    e.safeQueryContract = function (curBcx,nameOrId,callback) {
        try {
            var callRet = curBcx.queryContract({
                nameOrId:nameOrId,
                callback:callback
            });
            if(callRet instanceof Promise){
                callRet.then(res => {
                    callback(res);
                }).catch((ex) => {
                    throw ex;
                });
            }
        }catch(ex){
            throw ex;
        }
    };

    e.safeQueryAccountContractData = function (curBcx,account,contractNameOrId,callback) {
        try {
            var callRet = curBcx.queryAccountContractData({
                account:account,
                contractNameOrId:contractNameOrId,
                callback:callback
            });
            if(callRet instanceof Promise){
                callRet.then(res => {
                    callback(res);
                }).catch((ex) => {
                    throw ex;
                });
            }
        }catch(ex){
            throw ex;
        }
    };

    e.safeQueryAccountNHAssets = function (curBcx,account,worldView,page,pageSize,callback) {
        try {
            var worldViews=[];
            if(worldView){
                worldViews=worldView.split(",");
            }
            var callRet = curBcx.queryAccountNHAssets({
                account:account,
                worldViews,
                page:page,
                pageSize:pageSize,
                callback:callback
            });
            if(callRet instanceof Promise){
                callRet.then(res => {
                    callback(res);
                }).catch((ex) => {
                    throw ex;
                });
            }
        }catch(ex){
            throw ex;
        }
    };

    e.safeQueryNHAssetsByCreator = function (curBcx,account,page,pageSize,callback) {
        try {
            var callRet = curBcx.queryNHAssetsByCreator({
                account:account,
                page:page,
                pageSize:pageSize,
                callback:callback
            });
            if(callRet instanceof Promise){
                callRet.then(res => {
                    callback(res);
                }).catch((ex) => {
                    throw ex;
                });
            }
        }catch(ex){
            throw ex;
        }
    };

    e.safeDeleteNHAsset = function (curBcx,nhids,callback) {
        try {
            var NHAssetIds=[];
            if(nhids){
                NHAssetIds=nhids.split(",");
            }
            var callRet = curBcx.deleteNHAsset({
                NHAssetIds:NHAssetIds,
                callback:callback
            });
            if(callRet instanceof Promise){
                callRet.then(res => {
                    callback(res);
                }).catch((ex) => {
                    throw ex;
                });
            }
        }catch(ex){
            throw ex;
        }
    };



    e.safeGetAccountInfo = function (curBcx,callback) {
        try {
            var callRet = curBcx.getAccountInfo();
            if(callRet){
                if(callRet instanceof Promise){
                    callRet.then(res => {
                        callback(res);
                    }).catch((ex) => {
                        throw ex;
                    });
                }else{
                    callback(callRet);
                }
            }
        }catch(ex){
            throw ex;
        }
    };

    e.safeCallContractFunction = function (curBcx,nameOrId,functionName,valueList,callback) {

        try {
            var callRet = curBcx.callContractFunction({
                nameOrId,
                functionName,
                valueList,
                callback:callback
            });
            if(callRet instanceof Promise){
                callRet.then(res => {
                    callback(res);
                }).catch((ex) => {
                    throw ex;
                });
            }
        }catch(ex){
            throw ex;
        }
    };

    e.safeGetAccountBalance = function (curBcx,account,callback) {

        try {
            var callRet = curBcx.queryAccountAllBalances({
                account:account,
                callback:callback
            });
            if(callRet){
                if(callRet instanceof Promise){
                    callRet.then(res => {
                        callback(res);
                    }).catch((ex) => {
                        throw ex;
                    });
                }else{
                    callback(callRet);
                }
            }
        }catch(ex){
            throw ex;
        }


        try {
            var balances = curBcx.queryAccountAllBalances({
                account:account,
            });
            if(balances){
                if(balances instanceof Promise){
                    return balances;
                }else{
                    return new Promise(function (resolve, reject) {
                        if(balances){
                            resolve(balances);
                        }else{
                            reject('balances is null');
                        }
                    });
                }
            }else{
                return new Promise(function (resolve, reject) {
                    reject('balances is null');
                });
            }
        }catch(ex){
            return new Promise(function (resolve, reject) {
                reject(ex);
            });
        }
    };

    e.init = function () {

    };
})(cocosadapter);


export default cocosadapter;
