import { BscConnector } from '@binance-chain/bsc-connector'
import Web3 from "web3";

var web3adapter = {};

(function(e) {
    e.web3 = null;
    e.bscPlugin=null;
    e.activate=false;
    e.account=null;
    e.chainId=null;

    e.check=function () {
        if(!e.bscPlugin){
            e.bscPlugin=window.BinanceChain;
            if(e.bscPlugin){
                var bsc = new BscConnector({
                    supportedChainIds: [56, 97]
                });
                bsc.activate().then(function (ret) {
                    console.log(ret);
                    e.activate=ret;
                });
                bsc.getAccount().then(function (ret) {
                    console.log(ret);
                    e.account=ret;
                });
                bsc.getChainId().then(function (ret) {
                    console.log(ret);
                    e.chainId=ret;
                });

                e.bscPlugin.on('accountsChanged', (accounts) => {
                    e.account=accounts[0];
                    console.log(accounts);
                });

                e.bscPlugin.on('chainChanged', (chainId) => {
                    // Handle the new chain.
                    // Correctly handling chain changes can be complicated.
                    // We recommend reloading the page unless you have a very good reason not to.
                    window.location.reload();
                });

            }
            if(!e.web3&&e.bscPlugin){
                var web3=new Web3(e.bscPlugin);
                e.web3=web3;
            }
        }else if(!e.web3){
            var web3=new Web3(e.bscPlugin);
            e.web3=web3;
        }
    };

    e.getWeb3=function () {
        return e.web3;
    };

    e.getBsc=function () {
        return e.bscPlugin;
    };

    e.getAccount=function () {
        return e.account;
    };

    e.getChainId=function () {
        return e.chainId;
    };

})(web3adapter);


export default web3adapter;
