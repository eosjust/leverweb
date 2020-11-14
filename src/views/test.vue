<template>
    <Row>
        <Row>
            <Button type="primary" @click="btnTest1">测试1</Button>
            <Button type="primary" @click="btnTest2">测试2</Button>
            <Button type="primary" @click="btnTest3">测试3</Button>

            <Button type="primary" @click="btnTest4">质押</Button>

            <Button type="primary" @click="btnTest5">提取</Button>
        </Row>
    </Row>
</template>

<script>

    import Web3 from "web3";

    export default {
        name: "",
        data() {
            return {
                bscPlugin: null,
                web3:null,
                contractAbi1:[
                    {
                        "inputs": [
                            {
                                "internalType": "uint256",
                                "name": "a",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "b",
                                "type": "uint256"
                            }
                        ],
                        "name": "add",
                        "outputs": [
                            {
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "inputs": [],
                        "name": "getCount",
                        "outputs": [
                            {
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    }
                ],
                contractAbi:[
                    {
                        "inputs": [],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "constructor"
                    },
                    {
                        "anonymous": false,
                        "inputs": [
                            {
                                "indexed": true,
                                "internalType": "address",
                                "name": "owner",
                                "type": "address"
                            },
                            {
                                "indexed": true,
                                "internalType": "address",
                                "name": "spender",
                                "type": "address"
                            },
                            {
                                "indexed": false,
                                "internalType": "uint256",
                                "name": "value",
                                "type": "uint256"
                            }
                        ],
                        "name": "Approval",
                        "type": "event"
                    },
                    {
                        "anonymous": false,
                        "inputs": [
                            {
                                "indexed": true,
                                "internalType": "address",
                                "name": "from",
                                "type": "address"
                            },
                            {
                                "indexed": true,
                                "internalType": "address",
                                "name": "to",
                                "type": "address"
                            },
                            {
                                "indexed": false,
                                "internalType": "uint256",
                                "name": "value",
                                "type": "uint256"
                            }
                        ],
                        "name": "Transfer",
                        "type": "event"
                    },
                    {
                        "constant": true,
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "",
                                "type": "address"
                            }
                        ],
                        "name": "allowance",
                        "outputs": [
                            {
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "constant": false,
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "spender",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "value",
                                "type": "uint256"
                            }
                        ],
                        "name": "approve",
                        "outputs": [
                            {
                                "internalType": "bool",
                                "name": "",
                                "type": "bool"
                            }
                        ],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "constant": true,
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "",
                                "type": "address"
                            }
                        ],
                        "name": "balanceOf",
                        "outputs": [
                            {
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "constant": true,
                        "inputs": [],
                        "name": "blockNumber",
                        "outputs": [
                            {
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "constant": true,
                        "inputs": [],
                        "name": "decimals",
                        "outputs": [
                            {
                                "internalType": "uint8",
                                "name": "",
                                "type": "uint8"
                            }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "constant": true,
                        "inputs": [],
                        "name": "gameKeys",
                        "outputs": [
                            {
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "constant": true,
                        "inputs": [],
                        "name": "gameMask",
                        "outputs": [
                            {
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "constant": true,
                        "inputs": [],
                        "name": "gameProfits",
                        "outputs": [
                            {
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "constant": false,
                        "inputs": [],
                        "name": "getLMP",
                        "outputs": [],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "constant": false,
                        "inputs": [
                            {
                                "internalType": "uint256",
                                "name": "amount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "feePerBlock",
                                "type": "uint256"
                            }
                        ],
                        "name": "mining",
                        "outputs": [],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "constant": true,
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "",
                                "type": "address"
                            }
                        ],
                        "name": "miningList",
                        "outputs": [
                            {
                                "internalType": "uint256",
                                "name": "userKeys",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "userMask",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "statBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "fee",
                                "type": "uint256"
                            }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "constant": true,
                        "inputs": [],
                        "name": "name",
                        "outputs": [
                            {
                                "internalType": "string",
                                "name": "",
                                "type": "string"
                            }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "constant": true,
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "",
                                "type": "address"
                            }
                        ],
                        "name": "nonces",
                        "outputs": [
                            {
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "constant": true,
                        "inputs": [],
                        "name": "symbol",
                        "outputs": [
                            {
                                "internalType": "string",
                                "name": "",
                                "type": "string"
                            }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "constant": true,
                        "inputs": [],
                        "name": "totalSupply",
                        "outputs": [
                            {
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "constant": false,
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "to",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "value",
                                "type": "uint256"
                            }
                        ],
                        "name": "transfer",
                        "outputs": [
                            {
                                "internalType": "bool",
                                "name": "",
                                "type": "bool"
                            }
                        ],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "constant": false,
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "from",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "to",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "value",
                                "type": "uint256"
                            }
                        ],
                        "name": "transferFrom",
                        "outputs": [
                            {
                                "internalType": "bool",
                                "name": "",
                                "type": "bool"
                            }
                        ],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "constant": false,
                        "inputs": [],
                        "name": "withdraw",
                        "outputs": [],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                    }
                ],
            }
        },
        created() {
        },
        mounted() {
            var bscPlugin = window.BinanceChain;
            this.bscPlugin = bscPlugin;
            var web3=new Web3(this.bscPlugin);
            this.web3=web3;
            console.log(bscPlugin);
        },
        destroyed() {
        },
        methods: {
            btnTest1() {
                console.log(this.bscPlugin);
                var web3=this.web3;
                console.log(web3);
                var data={
                    from:"0xa8fe2a38d6617b0C1823361486e58d4BD02B138e",
                    to:"0x06F1598D5581C410bc0929D84e2D544c8C02Ba95",
                    value: 10000000000000000,
                    chainId: 0x61,
                    nonce: 0,
                };
                // web3.eth.sendTransaction(data,(error,res)=>{
                //     if(error){
                //         console.log(error);
                //     }
                //     if(res){
                //         console.log(res);
                //     }
                // });

                var contractAddress = "0x347ae2ea94b45ede6c8f8849b722ba383e5d5a3c";
                var myContract = new web3.eth.Contract(this.contractAbi,contractAddress);
                myContract.methods.add(2,3).send({from: "0xa8fe2a38d6617b0C1823361486e58d4BD02B138e"});

                // myContract.methods.add(111).call({from: "0xa8fe2a38d6617b0C1823361486e58d4BD02B138e"}).then(function (ret) {
                //     console.log(ret);
                // });

                this.bscPlugin.requestAccounts().then(function (ret) {
                    console.log(ret);
                });
            },
            btnTest2() {
                this.bscPlugin.transfer({
                    fromAddress: "0xa8fe2a38d6617b0C1823361486e58d4BD02B138e",
                    toAddress: "0x06F1598D5581C410bc0929D84e2D544c8C02Ba95",
                    asset: "BNB", amount: 1,
                    accountId: "289debbfd72f929e964df49c99f4af8059e38ba23e95424d3bf91de312764f969d2bfcc4c0fcfd6552ff80d7e3f2980abca3f7e88cba81d65495bd5ba4461850",
                    networkId: "bsc-testnet"
                }).then(function (ret) {
                    console.log(ret);
                });
            },
            btnTest3() {
                var web3=this.web3;
                var contractAddress = "0x347ae2ea94b45ede6c8f8849b722ba383e5d5a3c";
                var myContract = new web3.eth.Contract(this.contractAbi1,contractAddress);
                myContract.methods.add(2,3).send({from: "0xa8fe2a38d6617b0C1823361486e58d4BD02B138e"});
                // myContract.methods.add(111).call({from: "0xa8fe2a38d6617b0C1823361486e58d4BD02B138e"}).then(function (ret) {
                //     console.log(ret);
                // });
            },

            btnTest4() {
                var web3=this.web3;
                var contractAddress = "0xffd302B308766532FcB41348dD15F2482451f803";
                var myContract = new web3.eth.Contract(this.contractAbi,contractAddress);
                myContract.methods.mining(1000000,10).send({from: web3.eth.accounts[0]}).then(function (err,ret) {
                    if(err){
                        console.log(err);
                    }
                    if(ret){
                        console.log(ret);
                    }
                });
            },
            btnTest5() {
                var web3=this.web3;
                var contractAddress = "0xffd302B308766532FcB41348dD15F2482451f803";
                var myContract = new web3.eth.Contract(this.contractAbi,contractAddress);
                myContract.methods.withdraw().send({from: web3.eth.accounts[0]}).then(function (err,ret) {
                    if(err){
                        console.log(err);
                    }
                    if(ret){
                        console.log(ret);
                    }
                });
            },
        },
        computed: {},
        watch: {}
    }
</script>

<style scoped>

</style>