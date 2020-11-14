<template>
    <Row>
        <Row>
            <Row style="margin-top: 20px;">
                <Row type="flex" justify="center" align="middle">
                    <img src="../assets/minecfs.png" style="width: 120px;height: 120px;"/>
                </Row>
                <Row type="flex" justify="center" align="middle">
                    <span style="font-size: 1.8em;font-weight: bold;color: #5b3926;">质押LMT获取分享平台所有收益</span>
                </Row>
            </Row>
        </Row>
        <Row type="flex" justify="center" style="margin-top: 20px;">
            <Col :xs="22" :sm="20" :md="14" :lg="10">
            <Card>
                <Row type="flex" justify="center">
                    <div style="font-size: 28px;font-weight: bold; color: #fc4482;">LMT Dividend</div>
                </Row>

                <Row type="flex" justify="space-around" style="margin-top: 10px;">
                    <Col :xs="22" :sm="22" :md="11" :lg="11" class="swap-param-bg" style="padding: 10px;margin-top: 5px;">
                    <Row type="flex" justify="start" align="middle">
                        <span style="font-size: 14px;" class="gray-title">总收益</span>
                    </Row>
                    <Row>
                        <span style="font-size: 22px;font-weight: bold;overflow:scroll;">{{totalCocosIn}}</span>
                    </Row>
                    </Col>
                    <Col :xs="22" :sm="22" :md="11" :lg="11" class="swap-param-bg" style="padding: 10px;margin-top: 5px;">
                    <Row type="flex" justify="start" align="middle">
                        <span style="font-size: 14px;" class="gray-title">已分配</span>
                    </Row>
                    <Row>
                        <span style="font-size: 22px;font-weight: bold;overflow:scroll;">{{totalShared}}</span>
                    </Row>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" style="margin-top: 10px;">
                    <Col :xs="22" :sm="22" :md="11" :lg="11" class="swap-param-bg" style="padding: 10px;margin-top: 5px;">
                    <Row type="flex" justify="start" align="middle">
                        <span style="font-size: 14px;" class="gray-title">总质押</span>
                    </Row>
                    <Row>
                        <span style="font-size: 22px;font-weight: bold;overflow:scroll;">{{totalKeys}}</span>
                    </Row>
                    </Col>
                    <Col :xs="22" :sm="22" :md="11" :lg="11" class="swap-param-bg" style="padding: 10px;margin-top: 5px;">

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
                        <mu-tabs :value.sync="tabpos" color="#fff">
                            <mu-tab style="color: #0e131c;">质押LMT</mu-tab>
                        </mu-tabs>
                    </Row>
                    <Divider/>
                    <Row class="tab-content">
                        <Row v-show="tabpos===0">
                            <Row>
                                <Row>
                                    <span style="margin-left: 8px;color: gray;"> 你的分红 </span>
                                </Row>
                                <Row style="margin-top: 10px;">
                                    <mu-container>
                                        <mu-expansion-panel>
                                            <div slot="header">
                                                <Row type="flex" justify="start" align="middle">
                                                    <mu-avatar size="36">
                                                        <img src="../assets/cocosbcx.png" style="width: 36px;height: 36px;"/>
                                                    </mu-avatar>
                                                    <Row style="margin-left: 10px;">
                                                        <div>COCOS收益</div>
                                                        <div style="color: gray;">LMT数量 : {{myKeys}}</div>
                                                        <div style="color: gray;">COCOS收入 : {{myProfit}}</div>
                                                    </Row>
                                                </Row>
                                            </div>
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
                                            <img src="../assets/cfslogo.png" style="width: 36px;height: 36px;cursor: pointer;"/>
                                        </mu-avatar>
                                        </Col>
                                        <Col span="18" style="text-align: right;cursor: pointer;">
                                        <span @click="choseCash()">LMT</span>
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
                            <Row style="margin-top: 10px;">
                                <mu-button full-width color="secondary" @click="btnStakeCash">{{$t('mainmenu.stake')}}</mu-button>
                            </Row>
                        </Row>
                    </Row>
                </Row>
            </Card>
            </Col>
        </Row>
    </Row>
</template>

<script>
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
                totalCocosIn:'0',
                totalShared:'0',
                totalKeys:'0',
                myKeys:'0',
                myProfit:'0',
                cash_dialog_open:false,
                pageVisiable:false,
                mainBal:0,
                mineProfit:0,
                cashAmount:0.0000,
                totalCashStake:0.0000,
                stakeBtnColor:'#ec407a',
                stakeDisableColor:'#bdbdbd',
                crosLpStakeList:[],
                cashStakeList:[],
                globalData:{},
                cfsProfitTable: {
                    cocos_in: "0",
                    cocos_mask: "0",
                    cocos_out: "0",
                    keys: "0"
                },
                stakeProfitTable:{
                    keys: "0",
                    cocos_mask: "0",
                    cocos_out: "0",
                },
                balanceList:[

                ],
            }
        },
        created() {
        },
        mounted() {
            var that = this;
            this.loops=true;
            this.pageVisiable=true;
            that.queryContract();
            that.queryUserContractData();
            this.$timeout.timeout(3000, function () {
                that.queryContract();
                that.queryUserContractData();
                return that.loops;
            });
            this.$timeout.timeout(300,function () {
                that.tickView();
                return that.loops;
            });
            this.$timeout.timeout(2000,function () {
                that.queryUserBalances();
                return that.loops;
            });
            this.$timeout.timeout(1500,function () {
                if(that.pageVisiable){
                    that.totalCocosIn=that.cfsProfitTable.cocos_in;
                    that.totalShared=that.cfsProfitTable.cocos_out;
                    that.totalKeys=that.cfsProfitTable.keys;
                    that.myKeys=that.stakeProfitTable.keys;
                    that.myProfit=that.stakeProfitTable.profit;
                }
                return that.loops;
            });
            // 监听当前页面 显示状态
            window.addEventListener('visibilitychange', this.hanldeVisiblityChange);
            // 当页面被销毁时 移除监听
            this.$on('hook:beforeDestroy', () => {
                window.removeEventListener('visibilitychange', this.hanldeVisiblityChange)
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
                        var cfs_profit_table = public_data.cfs_profit_table;
                        that.cfsProfitTable=cfs_profit_table;
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
                            var val = res.data.contract_data.stake_profit_table;
                            if(val){
                                that.stakeProfitTable=val;
                            }
                            if(that.cfsProfitTable&&that.cfsProfitTable.cocos_mask&&that.stakeProfitTable){
                                that.stakeProfitTable.profit=that.cfsProfitTable.cocos_mask*that.stakeProfitTable.keys-that.stakeProfitTable.cocos_mask;
                                if(that.stakeProfitTable.profit<0.00000001){
                                    that.stakeProfitTable.profit=0;
                                }
                            }
                        }
                    });
                }
            },
            choseCash(){

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
                            that.mainBal=that.balanceList[that.$mineSym];
                        }
                    });
                }

            },

            btnMax(rate){
                if(this.mainBal&&parseFloat(this.mainBal)>0){
                    this.cashAmount=this.mainBal*rate;
                }
            },

            tickView(){

            },
            hanldeVisiblityChange() {
                if (document.visibilityState === 'hidden') {
                    this.pageVisiable=false;
                }
                else if (document.visibilityState === 'visible') {
                    this.pageVisiable=true;
                }
            },
            btnStakeCash(){
                let bcx = cocosadapter.curBcx;
                var that=this;
                if(bcx===null){
                    return;
                }
                var bcxAccount=this.$store.state.bcxAccount;
                if(bcxAccount&&bcxAccount.name){
                    var valueList=[];
                    valueList.push(that.cashAmount);
                    that.$Loading.start();
                    cocosadapter.safeCallContractFunction(bcx,that.$mainContract, 'stake_cfs', valueList,function (res) {
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
            },
            btnDrawCash(){
                let bcx = cocosadapter.curBcx;
                var that=this;
                if(bcx===null){
                    return;
                }
                var bcxAccount=this.$store.state.bcxAccount;
                if(bcxAccount&&bcxAccount.name){
                    var valueList=[];
                    valueList.push(0);
                    that.$Loading.start();
                    cocosadapter.safeCallContractFunction(bcx,that.$mainContract, 'draw_cfs', valueList,function (res) {
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
                    that.$Loading.start();
                    cocosadapter.safeCallContractFunction(bcx,that.$mainContract, 'draw_cfs', valueList,function (res) {
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