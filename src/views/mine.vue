<template>
    <Row>
        <Row>
            <Row style="margin-top: 20px;">
                <Row type="flex" justify="center" align="middle">
                    <img src="../assets/minecfs.png" style="width: 120px;height: 120px;"/>
                </Row>
                <Row type="flex" justify="center" align="middle">
                    <span style="font-size: 1.8em;font-weight: bold;color: #5b3926;">{{$t('mainmenu.goodDay')}}</span>
                </Row>
            </Row>
        </Row>
        <Row type="flex" justify="center" style="margin-top: 20px;">
            <Col :xs="22" :sm="20" :md="14" :lg="10">
            <Card>
                <Row type="flex" justify="center">
                    <div style="font-size: 28px;font-weight: bold; color: #fc4482;">LMT Mining</div>
                </Row>
                <Row type="flex" justify="space-around" style="margin-top: 10px;">
                    <Col :xs="22" :sm="22" :md="11" :lg="11" class="swap-param-bg" style="padding: 10px;margin-top: 5px;">
                    <Row type="flex" justify="start" align="middle">
                        <span style="font-size: 14px;" class="gray-title">已出块</span>
                    </Row>
                    <Row>
                        <span style="font-size: 22px;font-weight: bold;overflow:scroll;">{{blockNum}}</span>
                    </Row>
                    </Col>
                    <Col :xs="22" :sm="22" :md="11" :lg="11" class="swap-param-bg" style="padding: 10px;margin-top: 5px;">
                    <Row type="flex" justify="start" align="middle">
                        <span style="font-size: 14px;" class="gray-title">已产出</span>
                    </Row>
                    <Row>
                        <span style="font-size: 22px;font-weight: bold;overflow:scroll;">{{mineAward}}</span>
                    </Row>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" style="margin-top: 10px;">
                    <Col :xs="22" :sm="22" :md="11" :lg="11" class="swap-param-bg" style="padding: 10px;margin-top: 5px;">
                    <Row type="flex" justify="start" align="middle">
                        <span style="font-size: 14px;" class="gray-title">下次减产</span>
                    </Row>
                    <Row>
                        <span style="font-size: 22px;font-weight: bold;overflow:scroll;">{{nextCutTime}}</span>
                    </Row>
                    </Col>
                    <Col :xs="22" :sm="22" :md="11" :lg="11" class="swap-param-bg" style="padding: 10px;margin-top: 5px;">
                    <Row>
                        <span style="font-size: 16px;color: gray;">总质押 Cros LP: </span>
                        <span style="font-size: 16px;font-weight: bold;overflow:scroll;">{{totalCrosStake/100000}}</span>
                    </Row>
                    <Row>
                        <span style="font-size: 16px;color: gray;">总质押 BNB: </span>
                        <span style="font-size: 16px;font-weight: bold;overflow:scroll;">{{totalCashStake}}</span>
                    </Row>
                    </Col>
                </Row>
            </Card>
            </Col>
        </Row>

        <Row type="flex" justify="center" style="margin-top: 20px;">
            <Col :xs="22" :sm="20" :md="14" :lg="10">
            <Card>
                <Row style="margin-bottom: 20px;">
                    <Row style="margin-bottom: 20px;">
                        <mu-tabs :value.sync="tabpos" color="#fff" full-width>
                            <mu-tab style="color: #0e131c;">质押TOKEN</mu-tab>
                            <mu-tab style="color: #0e131c;">质押LP</mu-tab>
                        </mu-tabs>
                    </Row>
                    <Divider/>
                    <Row class="tab-content">

                        <Row v-show="tabpos===0">
                            <Row>
                                <Row>
                                    <span style="margin-left: 8px;color: gray;"> 你的质押 </span>
                                </Row>
                                <Row style="margin-top: 10px;" v-show="cashStakeList.length==0">
                                    <div class="swap-param-bg" style="padding: 10px;">
                                        您还没有质押
                                    </div>
                                </Row>
                                <Row style="margin-top: 10px;" v-show="cashStakeList.length>0">
                                    <mu-container>
                                        <mu-expansion-panel v-for="item in cashStakeList" :key="item.id">
                                            <div slot="header">
                                                <Row type="flex" justify="start" align="middle">
                                                    <mu-avatar size="36">
                                                        <img src="../assets/bnb.png" style="width: 36px;height: 36px;"/>
                                                    </mu-avatar>
                                                    <Row style="margin-left: 10px;">
                                                        <div>{{item.name}}</div>
                                                        <div style="color: gray;">BNB数量 : {{item.keys}}</div>
                                                        <div style="color: gray;">LMT收入 : {{item.profit}}</div>
                                                    </Row>
                                                </Row>
                                            </div>
                                            <Row>
                                                <Row style="margin-left: 5px;">
                                                    <div>包含质押：</div>
                                                    <div v-for="stk in item.cash_list">
                                                        <div style="color: gray;">数量: {{stk.keys}} 实际数量: {{stk.amount}} 手续费: {{(stk.tax_rate*100)+"%"}}</div>
                                                    </div>
                                                </Row>
                                            </Row>
                                            <mu-button @click="btnDrawCash()" slot="action" color="primary">{{$t('mainmenu.withdraw')}}</mu-button>
                                            <mu-button @click="btnUnStakeCash()" slot="action" color="success">{{$t('mainmenu.redeem')}}</mu-button>
                                        </mu-expansion-panel>
                                    </mu-container>
                                </Row>
                            </Row>
                            <Divider/>
                            <Row>
                                <Row type="flex" justify="space-between" align="middle">
                                    <Col span="14">
                                    <div class="font20">{{$t('mainmenu.balance')}}:{{mainBal}}</div>
                                    </Col>
                                    <Col span="10">
                                    <Row type="flex" justify="space-around" align="middle">
                                        <Col span="6" class="max-btn-bg">
                                        <div @click="btnMax(0.5)">1/2</div>
                                        </Col>
                                        <Col span="6" class="max-btn-bg">
                                        <div @click="btnMax(1)">MAX</div>
                                        </Col>
                                    </Row>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="space-between" align="middle" class="font18">
                                    <Col span="12">
                                    <Row type="flex" justify="space-between" align="middle" class="token-chose-bg"
                                         style="width: 140px;height: 44px;">
                                        <Col span="6" style="height: 36px;">
                                        <mu-avatar size="36" @click="choseCash()">
                                            <img src="../assets/bnb.png" style="width: 36px;height: 36px;cursor: pointer;"/>
                                        </mu-avatar>
                                        </Col>
                                        <Col span="18" style="text-align: right;cursor: pointer;">
                                        <span @click="choseCash()">BNB</span>
                                        <span>&nbsp;</span>
                                        <Icon @click="choseCash()" type="ios-arrow-down"/>
                                        <span>&nbsp;</span>
                                        </Col>
                                    </Row>
                                    </Col>
                                    <Col span="12" style="text-align: right;">
                                    <input type="number" v-model="cashAmount" placeholder="0.0000" min="0.0" step="10000.0"
                                           style="width: 95%;text-align:right; border:0px;outline:none;cursor:pointer;"/>
                                    </Col>
                                </Row>
                            </Row>

                            <Divider/>
                            <Row>
                                <Row type="flex" justify="center" align="middle">
                                    <Col span="24" class="swap-param-bg">
                                    <Row type="flex" justify="start" align="middle">
                                        <span class="gray-title">手续费</span>
                                        <span>&nbsp;{{cashTax}}</span>
                                    </Row>
                                    <Row type="flex" justify="start" align="middle">
                                        <span class="gray-title">质押 </span>
                                        <span>&nbsp;{{cashAmount}}</span>
                                        <span style="color: green;">&nbsp;+&nbsp;{{cashImprove}}</span>
                                    </Row>
                                    <Row type="flex" justify="start" align="middle" style="padding-left: 5px;padding-right: 5px;">
                                        <mu-slider color="secondary" :display-value="false" v-model="cashBar"></mu-slider>
                                    </Row>
                                    <Row type="flex" justify="start" align="middle">
                                        <span class="gray-title">手续费可以增幅您质押的BNB，使您在挖矿中占取更大的比例</span>
                                    </Row>
                                    <Row type="flex" justify="start" align="middle">
                                        <span class="gray-title">手续费将随机在swap中回购代币，用于提升币价</span>
                                    </Row>
                                    </Col>
                                </Row>
                            </Row>
                            <Row style="margin-top: 10px;">
                                <mu-button full-width color="secondary" @click="btnStakeCash">{{$t('mainmenu.stake')}}</mu-button>
                            </Row>
                        </Row>
                        <Row v-show="tabpos===1">
                            <Row>
                                <Row>
                                    <span style="margin-left: 8px;color: gray;"> 你的质押 </span>
                                </Row>
                                <Row style="margin-top: 10px;" v-show="crosLpStakeList.length==0">
                                    <div class="swap-param-bg" style="padding: 10px;">
                                        您还没有质押
                                    </div>
                                </Row>
                                <Row style="margin-top: 10px;" v-show="crosLpStakeList.length>0">
                                    <mu-container>
                                        <mu-expansion-panel v-for="item in crosLpStakeList" :key="item.id">
                                            <div slot="header">
                                                <Row type="flex" justify="start" align="middle">
                                                    <mu-avatar>
                                                        <img :src="item.icon"/>
                                                    </mu-avatar>
                                                    <Row style="margin-left: 10px;">
                                                        <div>{{item.name}}</div>
                                                        <div style="color: gray;">LP数量 : {{item.keys/100000}}</div>
                                                        <div style="color: gray;">LMT收入 : {{item.profit}}</div>
                                                    </Row>
                                                </Row>
                                            </div>
                                            <Row>
                                                <Row style="margin-left: 5px;">
                                                    <div>包含LP：</div>
                                                    <div v-for="lp in item.lp_list">
                                                        <div style="color: gray;">ID: {{lp.id}} 数量: {{lp.liquidity/100000}}</div>
                                                    </div>
                                                </Row>
                                            </Row>
                                            <mu-button @click="btnDrawCrosLp(item)" slot="action" color="primary">{{$t('mainmenu.withdraw')}}</mu-button>
                                            <mu-button @click="btnUnStakeCrosLp(item)" slot="action" color="success">{{$t('mainmenu.redeem')}}</mu-button>
                                        </mu-expansion-panel>
                                    </mu-container>
                                </Row>
                            </Row>
                            <Divider/>
                            <Row>
                                <Row>
                                    <span style="margin-left: 8px;color: gray;"> 你的流动性凭证 </span>
                                </Row>
                                <Row style="margin-top: 10px;" v-show="crosLpList.length==0">
                                    <div class="swap-param-bg" style="padding: 10px;">
                                        您还没有流动性凭证
                                    </div>
                                </Row>
                                <Row style="margin-top: 10px;" v-show="crosLpList.length>0">
                                    <mu-list textline="three-line">
                                        <mu-list-item v-for="item in crosLpList" :key="item.id" avatar button>
                                            <mu-list-item-action>
                                                <mu-avatar>
                                                    <img :src="item.icon"/>
                                                </mu-avatar>
                                            </mu-list-item-action>
                                            <mu-list-item-content>
                                                <mu-list-item-title style="font-size: 1em;">{{item.name}}</mu-list-item-title>
                                                <mu-list-item-sub-title style="font-size: 1em;">ID:{{item.id}}</mu-list-item-sub-title>
                                                <mu-list-item-sub-title style="font-size: 1em;">数量:{{item.liquidity}}</mu-list-item-sub-title>
                                            </mu-list-item-content>
                                            <mu-list-item-action>
                                                <mu-button small @click="btnStakeCrosLp(item)" :color="item.support?'#ec407a':'#bdbdbd'">{{item.support?$t('mainmenu.stake'):$t('mainmenu.unsupport')}}</mu-button>
                                            </mu-list-item-action>
                                        </mu-list-item>
                                    </mu-list>
                                </Row>
                            </Row>
                        </Row>
                    </Row>
                </Row>
            </Card>
            </Col>
        </Row>

        <Row>
            <Modal v-model="cash_dialog_open" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                </p>
                <div>
                    <mu-list @change="changeCash">
                        <mu-sub-header>选择Token</mu-sub-header>
                        <mu-list-item avatar button :ripple="false" value="1">
                            <mu-list-item-action>
                                <mu-avatar>
                                    <img src="../assets/bnb.png">
                                </mu-avatar>
                            </mu-list-item-action>
                            <mu-list-item-title>BNB</mu-list-item-title>
                        </mu-list-item>
                        <mu-list-item avatar button :ripple="false" value="2">
                            <mu-list-item-action>
                                <mu-avatar>
                                    <img src="../assets/cfslogo.png">
                                </mu-avatar>
                            </mu-list-item-action>
                            <mu-list-item-title>LMT</mu-list-item-title>
                        </mu-list-item>
                    </mu-list>
                </div>
                <div slot="footer">
                </div>
            </Modal>
        </Row>
    </Row>
</template>

<script>
    import web3adapter from '@/utils/web3adapter';
    import cocosadapter from '@/utils/cocosadapter';
    import Big from 'big.js';
    import date from 'date-and-time';

    export default {
        name: "",
        data() {
            return {
                tabpos:0,
                loops:false,
                blockNum:0,
                mineAward:0,
                cashBar:0,
                cashTax:0,
                cashImprove:0,
                crosWordView:'CROSWAP',
                cash_dialog_open:false,
                nextCutTime:'23:59:59',
                totalCrosStake:0,
                mainBal:0,
                mineProfit:0,
                cashAmount:0.0000,
                totalCashStake:0.0000,
                stakeBtnColor:'#ec407a',
                stakeDisableColor:'#bdbdbd',
                crosLpStakeList:[],
                cashStakeList:[],
                crosLpList:[],
                globalData:{},
                curCashInx:1,
                drawCashCnt:0,
                supportCrosName:[
                    "COCOS-BTC-LP"
                ],
                supportCashName:[
                    "COCOS"
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
                crosPool:[

                ],
                nowCrosPool:[

                ],
                cashPool:[

                ],
                nowCashPool:[

                ],
                balanceList:[

                ],


            }
        },
        created() {
        },
        mounted() {
            var that = this;
            this.loops=true;
            that.queryContract();
            this.$timeout.timeout(5000, function () {
                that.queryUserNhts(that.crosWordView);
                that.queryUserContractData();
                that.queryContract();
                return that.loops;
            });
            this.$timeout.timeout(300,function () {
                that.tickMine();
                that.tickView();
                return that.loops;
            });
            this.$timeout.timeout(2000,function () {
                return that.loops;
            });
        },
        destroyed() {
            this.loops=false;
        },
        methods: {
            queryContract() {
                let bcx = cocosadapter.curBcx;
                var that=this;
                if(bcx===null){
                    return;
                }
                cocosadapter.safeQueryContract(bcx,that.$mainContract,function (res) {
                    if(res&&res.code==1){
                        var public_data=res.data.contract_data;
                        that.globalData.last_block_num=public_data.last_block_num;
                        that.globalData.last_mine_award=public_data.last_mine_award;
                        that.globalData.last_mine_time=public_data.last_mine_time;
                        that.globalData.pause_time=public_data.pause_time;
                        that.globalData.restart_time=public_data.restart_time;
                        that.supportCrosName=[];
                        that.supportCashName=[];
                        that.cashPool=[];
                        that.crosPool=[];

                        for(var key in public_data.stake_cros_lp_pool){
                            var cros_lp_item=public_data.stake_cros_lp_pool[key];
                            that.supportCrosName.push(cros_lp_item.name);
                            let stakeItem={};
                            stakeItem.keys=Big(cros_lp_item.keys);
                            stakeItem.mask=Big(cros_lp_item.mask);
                            stakeItem.name=cros_lp_item.name;
                            stakeItem.inx=key;
                            stakeItem.weight=parseInt(cros_lp_item.weight);
                            that.crosPool.push(stakeItem);
                        }
                        for(var key in public_data.stake_cash_pool){
                            var cash_item=public_data.stake_cash_pool[key];
                            that.supportCashName.push(cash_item.name);
                            let stakeItem={};
                            stakeItem.keys=Big(cash_item.keys);
                            stakeItem.mask=Big(cash_item.mask);
                            stakeItem.name=cash_item.name;
                            stakeItem.inx=key;
                            stakeItem.weight=parseInt(cash_item.weight);
                            that.cashPool.push(stakeItem);
                        }
                    }
                });
            },
            queryUserContractData() {
                let bcx = cocosadapter.curBcx;
                var that=this;
                if(bcx===null){
                    return;
                }
                var bcxAccount=this.$store.state.bcxAccount;
                if(bcxAccount&&bcxAccount.name){
                    cocosadapter.safeQueryAccountContractData(bcx,bcxAccount.name,that.$mainContract,function (res) {
                        if(res&&res.code==1){
                            that.drawCashCnt=res.data.contract_data.last_draw_cnt;
                            console.log("已领取:"+that.drawCashCnt);
                            var stake_cros_lp_list = res.data.contract_data.stake_cros_lp_list;
                            var stakeList=[];
                            for(var inx in stake_cros_lp_list){
                                var item=stake_cros_lp_list[inx];
                                if(item&&item.lp_items&&item.lp_share){
                                    var stakeItem={};
                                    var lp_items=item.lp_items;
                                    var lp_share=item.lp_share;
                                    var lp_list=[];
                                    for(var lpid in lp_items){
                                        var lpsb={};
                                        var lp=lp_items[lpid];
                                        lpsb.id=lp.id;
                                        lpsb.liquidity=lp.liquidity;
                                        lp_list.push(lpsb);
                                    }
                                    stakeItem.lp_list=lp_list;
                                    stakeItem.inx=item.inx;
                                    stakeItem.name=item.name;
                                    stakeItem.icon=item.icon;
                                    stakeItem.drawed=lp_share.drawed;
                                    stakeItem.keys=lp_share.keys;
                                    stakeItem.mask=lp_share.mask;
                                    stakeItem.profit='0.00000';
                                    if(stakeItem.keys>0){
                                        var poolItem=null;
                                        for(var pi of that.nowCrosPool){
                                            if(pi.name===item.name){
                                                poolItem=pi;
                                            }
                                        }
                                        if(poolItem){
                                            var profit=(poolItem.nowMask.mul(stakeItem.keys)).sub(stakeItem.mask);
                                            if(profit){
                                                stakeItem.profit=profit.toFixed(6);
                                            }
                                        }
                                        stakeList.push(stakeItem);
                                    }
                                }
                            }
                            that.crosLpStakeList=stakeList;
                            //
                            var stake_cash_list = res.data.contract_data.stake_cash_list;
                            var stakeList=[];
                            for(var inx in stake_cash_list){
                                var item=stake_cash_list[inx];
                                if(item&&item.cash_items){
                                    var stakeItem={};
                                    stakeItem.inx=item.inx;
                                    stakeItem.name=item.name;
                                    stakeItem.drawed="0";
                                    stakeItem.keys="0";
                                    stakeItem.profit="0";
                                    var cash_items=item.cash_items;
                                    var cash_list=[];
                                    for(var cid in cash_items){
                                        var cash=cash_items[cid];
                                        cash_list.push(cash);
                                        if(cash.keys&&parseFloat(cash.keys)>0){
                                            stakeItem.keys = Big(cash.keys).add(stakeItem.keys).toFixed(5);
                                            var poolItem=null;
                                            for(var pi of that.nowCashPool){
                                                if(pi.name===stakeItem.name){
                                                    poolItem=pi;
                                                }
                                            }
                                            if(poolItem){
                                                var profit=(poolItem.nowMask.mul(cash.keys)).sub(cash.mask);
                                                if(profit){
                                                    stakeItem.profit=profit.add(stakeItem.profit).toFixed(6);
                                                }
                                            }
                                        }
                                    }
                                    stakeItem.cash_list=cash_list;
                                    if(stakeItem.keys>0){
                                        stakeList.push(stakeItem);
                                    }
                                }
                            }
                            that.cashStakeList=stakeList;
                        }
                    });
                }
            },
            queryUserBalances() {
                let bcx = cocosadapter.curBcx;
                var that=this;
                if(bcx===null){
                    return;
                }
                var bcxAccount=this.$store.state.bcxAccount;
                if(bcxAccount&&bcxAccount.name){
                    cocosadapter.safeGetAccountBalance(bcx,bcxAccount.name,function (res) {
                        console.log(res);
                        if(res&&res.code===1){
                            for(var item of res.data){
                                that.balanceList[item.symbol]=item.available_balance;
                            }
                            that.mainBal=that.balanceList['COCOS'];
                        }
                    });
                }

            },
            queryUserNhts(worldView) {
                let bcx = cocosadapter.curBcx;
                var that=this;
                if(bcx===null){
                    return;
                }
                var bcxAccount=this.$store.state.bcxAccount;
                if(bcxAccount&&bcxAccount.name){
                    cocosadapter.safeQueryAccountNHAssets(bcx,bcxAccount.name,worldView,1,1000,function (res) {
                        if(res&&res.code===1){
                            var lpList=[];
                            for(var item of res.data){
                                if(item&&item.world_view===that.crosWordView){
                                    var lpItem={};
                                    let describeJson=JSON.parse(item.base_describe);
                                    lpItem.id=item.id;
                                    lpItem.liquidity=describeJson.liquidity;
                                    lpItem.version=describeJson.version;
                                    lpItem.name=describeJson.name;
                                    lpItem.icon=describeJson.icon;
                                    if(that.supportCrosName.indexOf(lpItem.name)>=0){
                                        lpItem.support=true;
                                    }else{
                                        lpItem.support=false;
                                    }
                                    lpList.push(lpItem);
                                }
                            }
                            lpList.sort(function (a,b) {
                                if(a.support&&(!b.support)){
                                    return -1;
                                }else{
                                    return b.liquidity-a.liquidity;
                                }
                            });
                            that.crosLpList=lpList;
                        }
                    });
                }
            },
            btnStakeCrosLp(item){
                var that=this;
                if(!item.support){
                    that.$Message.warning({
                        content: '暂不支持此交易对的质押',
                        duration: 3
                    });
                }else{
                    let bcx = cocosadapter.curBcx;
                    var that=this;
                    if(bcx===null){
                        return;
                    }
                    var bcxAccount=this.$store.state.bcxAccount;
                    if(bcxAccount&&bcxAccount.name){
                        var valueList=[];
                        valueList.push(item.id);
                        that.$Loading.start();
                        cocosadapter.safeCallContractFunction(bcx,that.$mainContract, 'stake_cros_lp', valueList,function (res) {
                            if(res&&res.code===1){
                                that.$Message.success('抵押成功');
                            }else{
                                let msg="";
                                if(res.message){
                                    msg=":";
                                    msg+=res.message;
                                }
                                that.$Message.error({
                                    content: '操作失败'+msg,
                                    duration: 5
                                });
                            }
                            console.info(res);
                            that.$Loading.finish();
                        });
                    }
                }
            },
            btnUnStakeCrosLp(item){
                let bcx = cocosadapter.curBcx;
                var that=this;
                if(bcx===null){
                    return;
                }
                var bcxAccount=this.$store.state.bcxAccount;
                if(bcxAccount&&bcxAccount.name){
                    var valueList=[];
                    valueList.push(item.inx);
                    valueList.push(1);
                    that.$Loading.start();
                    cocosadapter.safeCallContractFunction(bcx,that.$mainContract, 'draw_cros_mine', valueList,function (res) {
                        if(res&&res.code===1){
                            that.$Message.success('赎回成功');
                        }else{
                            let msg="";
                            if(res.message){
                                msg=":";
                                msg+=res.message;
                            }
                            that.$Message.error({
                                content: '操作失败'+msg,
                                duration: 5
                            });
                        }
                        console.info(res);
                        that.$Loading.finish();
                    });
                }
            },
            btnDrawCrosLp(item){
                let bcx = cocosadapter.curBcx;
                var that=this;
                if(bcx===null){
                    return;
                }
                var bcxAccount=this.$store.state.bcxAccount;
                if(bcxAccount&&bcxAccount.name){
                    var valueList=[];
                    valueList.push(item.inx);
                    valueList.push(0);
                    that.$Loading.start();
                    cocosadapter.safeCallContractFunction(bcx,that.$mainContract, 'draw_cros_mine', valueList,function (res) {
                        if(res&&res.code===1){
                            that.$Message.success('提现成功');
                        }else{
                            let msg="";
                            if(res.message){
                                msg=":";
                                msg+=res.message;
                            }
                            that.$Message.error({
                                content: '操作失败'+msg,
                                duration: 5
                            });
                        }
                        console.info(res);
                        that.$Loading.finish();
                    });
                }
            },
            choseCash(){
                // this.cash_dialog_open=true;
            },
            changeCash(inx){
                // this.cash_dialog_open=false;
                // console.log(inx);

            },
            calCutTime(allsec){
                var second = parseInt ((allsec)%60  ) ;  //秒
                var minute =parseInt((allsec/60)%60  ) ;  //  分钟
                var hour =parseInt((allsec/60/60)%24 ) ;   //小时
                var day=parseInt((allsec/60/60/24)%30);   //天数
                var ret = day+"天"+hour+"小时"+minute+"分"+second+"秒";
                return ret;
            },
            btnMax(rate){
                if(this.mainBal&&parseFloat(this.mainBal)>0){
                    this.cashAmount=this.mainBal*rate;
                }
            },
            getPassSec(now_time_sec,last_tick_time){
                var pause_time=this.globalData.pause_time;
                var restart_time=this.globalData.restart_time;
                if(!pause_time) {
                    pause_time=this.$stopTime;
                }

                if(!restart_time) {
                    restart_time = 0;
                }
                if(restart_time>pause_time){
                    if(restart_time>last_tick_time) {
                        return (now_time_sec-restart_time);
                    }else{
                        return (now_time_sec-last_tick_time);
                    }
                }else{
                    if(pause_time>last_tick_time) {
                        return (pause_time-last_tick_time);
                    }else{
                        return 0;
                    }
                }
            },
            tickMine(){
                var that = this;
                if(!that.globalData){
                    return;
                }
                var last_block_num=that.globalData.last_block_num;
                if(!last_block_num){
                    return;
                }
                if(last_block_num<1){
                    return;
                }
                var last_mine_award=that.globalData.last_mine_award;
                var last_mine_time=that.globalData.last_mine_time;
                var now_time=Math.floor((new Date().getTime())/1000);
                var fly_time=that.getPassSec(now_time,last_mine_time);

                var fly_block=fly_time*2;
                var BLOCK_CUT=1209600;
                if (last_mine_time > -1 && fly_block > -1){
                    var total_block = fly_block + last_block_num;
                    var old_cut_times=Math.floor(last_block_num / BLOCK_CUT);
                    var now_cut_times = Math.floor(total_block / BLOCK_CUT);
                    var extra_block = total_block - now_cut_times * BLOCK_CUT;
                    var cut_rate = 0.8;
                    var now_rate = 1;
                    var init_award = 0.25;
                    var now_mine_award = 0;
                    for(var i=0;i<old_cut_times;i++){
                        now_rate = now_rate*cut_rate;
                    }

                    if(now_cut_times>old_cut_times) {
                        var fly_cnt=now_cut_times-old_cut_times;
                        var head_block=(old_cut_times+1)*BLOCK_CUT-last_block_num;
                        now_mine_award=now_mine_award+(init_award*head_block*now_rate);
                        var tail_cnt=fly_cnt-1;
                        if(tail_cnt > 0) {
                            for(var i=0;i<tail_cnt;i++){
                                now_rate = now_rate*cut_rate;
                                now_mine_award = now_mine_award+(init_award*BLOCK_CUT*now_rate);
                            }
                        }
                        if (extra_block > 0) {
                            now_rate = now_rate*cut_rate;
                            now_mine_award = now_mine_award+(init_award*extra_block*now_rate);
                        }
                    }else{
                        now_mine_award=now_mine_award+(init_award*fly_block*now_rate);
                    }
                    var need_block=0;
                    if(extra_block>0){
                        need_block=BLOCK_CUT-extra_block;
                    }
                    var need_time=need_block/2;
                    that.nextCutTime = that.calCutTime(need_time);
                    that.blockNum=total_block;
                    that.mineAward= Big(now_mine_award).add(last_mine_award).toFixed(2);

                    now_mine_award=Big(now_mine_award);

                    var total_mine_weight = 0;
                    that.totalCrosStake=Big(0);
                    that.totalCashStake=Big(0);
                    for(var item of that.cashPool){
                        if(item&&item.keys&&item.keys>0){
                            total_mine_weight+=item.weight;
                            that.totalCashStake=that.totalCashStake.add(item.keys);
                        }
                    }
                    for(var item of that.crosPool){
                        if(item&&item.keys&&item.keys>0){
                            total_mine_weight+=item.weight;
                            that.totalCrosStake=that.totalCrosStake.add(item.keys);
                        }
                    }
                    that.totalCrosStake=that.totalCrosStake.toFixed(0);
                    that.totalCashStake=that.totalCashStake.toFixed(5);
                    if(total_mine_weight>0){
                        var profit_per_weight=now_mine_award.div(total_mine_weight);
                        that.nowCashPool=[];
                        for(var item of that.cashPool){
                            if(item&&item.keys&&item.keys>0&&item.weight>0){
                                var profit_per_key=(profit_per_weight.mul(item.weight)).div(item.keys);
                                item.nowMask=item.mask.add(+profit_per_key);
                                var log_pk=profit_per_key.toFixed(18);
                                var log_mask=item.nowMask.toFixed(18);
                                item.nowKeys=item.keys;
                                that.nowCashPool.push(item);
                            }
                        }
                        that.nowCrosPool=[];
                        for(var item of that.crosPool){
                            if(item&&item.keys&&item.keys>0&&item.weight>0){
                                var profit_per_key=(profit_per_weight.mul(item.weight)).div(item.keys);
                                item.nowMask=item.mask.add(profit_per_key);
                                var log_pk=profit_per_key.toFixed(18);
                                var log_mask=item.nowMask.toFixed(18);
                                item.nowKeys=item.keys;
                                that.nowCrosPool.push(item);
                            }
                        }
                    }
                }
            },
            tickView(){
                var that=this;
                if(that.nowCrosPool&&that.crosLpStakeList){
                    for(var stakeItem of that.crosLpStakeList){
                        if(stakeItem.keys>0){
                            var poolItem=null;
                            for(var pi of that.nowCrosPool){
                                if(pi.name===stakeItem.name){
                                    poolItem=pi;
                                }
                            }
                            if(poolItem){
                                var profit=(poolItem.nowMask.mul(stakeItem.keys)).sub(stakeItem.mask);
                                if(profit){
                                    stakeItem.profit=profit.toFixed(6);

                                }
                            }
                        }
                    }
                }
                if(that.nowCashPool&&that.cashStakeList){
                    for(var stakeItem of that.cashStakeList){
                        var cash_list = stakeItem.cash_list;
                        stakeItem.profit="0";
                        if(cash_list){
                            for(var cash of cash_list){
                                if(cash.keys&&parseFloat(cash.keys)>0){
                                    var poolItem=null;
                                    for(var pi of that.nowCashPool){
                                        if(pi.name===stakeItem.name){
                                            poolItem=pi;
                                        }
                                    }
                                    if(poolItem){
                                        var profit=(poolItem.nowMask.mul(cash.keys)).sub(cash.mask);
                                        if(profit){
                                            stakeItem.profit=profit.add(stakeItem.profit).toFixed(6);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            btnStakeCash(){
                var web3=web3adapter.getWeb3();
                var contractAddress = "0xffd302B308766532FcB41348dD15F2482451f803";
                var myContract = new web3.eth.Contract(this.contractAbi,contractAddress);
                myContract.methods.mining(1000000000000,10).send({from: web3adapter.getAccount()}).then(function (err,ret) {
                    if(err){
                        console.log(err);
                    }
                    if(ret){
                        console.log(ret);
                    }
                });
            },
            btnDrawCash(){
                var web3=web3adapter.getWeb3();
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
            btnUnStakeCash(){
                let bcx = cocosadapter.curBcx;
                var that=this;
                if(bcx===null){
                    return;
                }
                var bcxAccount=this.$store.state.bcxAccount;
                if(bcxAccount&&bcxAccount.name){
                    var valueList=[];
                    valueList.push(1);
                    valueList.push(1);
                    that.$Loading.start();
                    cocosadapter.safeCallContractFunction(bcx,that.$mainContract, 'draw_cash', valueList,function (res) {
                        if(res&&res.code===1){
                            that.$Message.success('赎回成功');
                        }else{
                            let msg="";
                            if(res.message){
                                msg=":";
                                msg+=res.message;
                            }
                            that.$Message.error({
                                content: '操作失败'+msg,
                                duration: 5
                            });
                        }
                        console.info(res);
                        that.$Loading.finish();
                    });
                }
            }
        },
        computed:{

        },
        watch:{
            cashBar(val){
                var bgval=Big(val/20);
                this.cashTax=bgval.toFixed(2)+"%";
                if(this.cashAmount){
                    this.cashImprove=bgval.mul(this.cashAmount).mul(10).toFixed(5);
                }
            }
        }
    }
</script>

<style scoped>
    .gray-title {
        color: gray;
    }

    .swap-param-bg {
        background-color: #f3f3f3;
        padding: 5px;
        margin-left: 8px;
        margin-right: 8px;
        border-radius: 5px;
    }

    .max-btn-bg {
        background-color: #f3f3f3;
        text-align: center;
        cursor: pointer;
        font-size: 14px;
        height: 24px;
        padding: 2px;
        border-radius: 3px;
    }
</style>