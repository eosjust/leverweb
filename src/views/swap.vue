<template>
    <Row>
        <Row>

        </Row>
        <Row type="flex" justify="center" style="margin-top: 20px;">
            <Col :xs="22" :sm="20" :md="14" :lg="10">
            <Card>
                <Row style="margin-bottom: 20px;">
                    <mu-tabs :value.sync="tabpos" color="#fff" full-width>
                        <mu-tab style="color: #0e131c;">{{$t('mainmenu.swapTrade')}}</mu-tab>
                        <mu-tab style="color: #0e131c;">{{$t('mainmenu.addLiquidity')}}</mu-tab>
                    </mu-tabs>
                </Row>
                <Divider/>
                <Row class="swap-content">
                    <Row v-show="tabpos===0">
                        <Row>
                            <Row type="flex" justify="space-between" align="middle">
                                <Col span="12">
                                <div class="font20">{{$t('mainmenu.balance')}}:{{bal1}}</div>
                                </Col>
                                <Col span="12">
                                <div style="text-align: right;padding-right: 20px;" class="font20">{{$t('mainmenu.payment')}}</div>
                                </Col>
                            </Row>
                            <Row type="flex" justify="space-between" align="middle" class="font18">
                                <Col span="12">
                                <Row type="flex" justify="space-between" align="middle" class="token-chose-bg"
                                     style="width: 140px;height: 44px;">
                                    <Col span="6" style="height: 36px;">
                                    <mu-avatar size="36" @click="chose1()">
                                        <img src="../assets/cocosbcx.png" style="width: 36px;height: 36px;"/>
                                    </mu-avatar>
                                    </Col>
                                    <Col span="18" style="text-align: right;">
                                    <span @click="chose1()">{{sym1}}</span>
                                    <span>&nbsp;</span>
                                    <Icon @click="chose1()" type="ios-arrow-down"/>
                                    <span>&nbsp;</span>
                                    </Col>
                                </Row>
                                </Col>
                                <Col span="12" style="text-align: right;">
                                <input type="number" v-model="tradeAmount1" placeholder="0.0000" min="0.0"  step="10000.0"
                                       style="width: 95%;text-align:right; border:0px;outline:none;cursor:pointer;"/>
                                </Col>
                            </Row>
                        </Row>
                        <Divider>
                            <div @click="btnPairTurn">
                                <icon name="swap" scale="4" style="cursor: pointer;"></icon>
                            </div>
                            <!--<img @click="btnPairTurn()" src="../assets/swap-pink.png" style="width: 36px;height: 36px;cursor: pointer;"/>-->
                        </Divider>
                        <Row>
                            <Row type="flex" justify="space-between" align="middle">
                                <Col span="12">
                                <div class="font20">{{$t('mainmenu.balance')}}:{{bal2}}</div>
                                </Col>
                                <Col span="12">
                                <div style="text-align: right;padding-right: 20px;" class="font20">{{$t('mainmenu.received')}}</div>
                                </Col>
                            </Row>
                            <Row type="flex" justify="space-between" align="middle" class="font18">
                                <Col span="12">
                                <Row type="flex" justify="space-between" align="middle" class="token-chose-bg"
                                     style="width: 140px;height: 44px;" >
                                    <Col span="6" style="height: 36px;">
                                    <mu-avatar size="36" @click="chose2()">
                                        <img src="../assets/cocosbcx.png" style="width: 36px;height: 36px;"/>
                                    </mu-avatar>
                                    </Col>
                                    <Col span="18" style="text-align: right;">
                                    <span @click="chose2()">{{sym2}}</span>
                                    <span>&nbsp;</span>
                                    <Icon @click="chose2()" type="ios-arrow-down"/>
                                    <span>&nbsp;</span>
                                    </Col>
                                </Row>
                                </Col>
                                <Col span="12" style="text-align: right;">
                                <input type="number" v-model="tradeAmount2" placeholder="0.0000" min="0.0"  step="10000.0"
                                       style="width: 95%;text-align:right; border:0px;outline:none;cursor:pointer;"/>
                                </Col>
                            </Row>
                        </Row>
                        <Divider/>
                        <Row>
                            <Row type="flex" justify="center" align="middle">
                                <Col span="24" class="swap-param-bg">
                                <Row type="flex" justify="start" align="middle">
                                    <span class="gray-title">{{$t('mainmenu.swapPrice')}}</span>
                                    <div @click="btnPriceTurn" style="text-align: center;">
                                        <icon @click="btnPriceTurn" style="cursor: pointer;" name="swap-h" scale="2.8"></icon>
                                    </div>
                                    <span class="gray-title">{{$t('mainmenu.fees')}}</span>
                                    <span>&nbsp;</span>
                                    <span>{{feeRate}}</span>
                                </Row>
                                <Row>
                                    <span>1 </span>
                                    <span>{{priceSym1}}</span>
                                    <span> ≈ </span>
                                    <span>{{curPrice}} </span>
                                    <span>{{priceSym2}}</span>
                                </Row>
                                <Row type="flex" justify="start" align="middle">
                                    <span class="gray-title">{{$t('mainmenu.liquidity')}}</span>
                                </Row>
                                <Row>
                                    <span>{{supply1}} </span>
                                    <span>{{sym1}}</span>
                                    <span> / </span>
                                    <span>{{supply2}} </span>
                                    <span>{{sym2}}</span>
                                </Row>
                                </Col>
                            </Row>
                        </Row>
                        <Row style="margin-top: 10px;">
                            <mu-button full-width color="secondary" @click="tradeSwap">{{$t('mainmenu.swap')}}</mu-button>
                        </Row>
                    </Row>
                    <Row v-show="tabpos===1">
                        <Row>
                            <Row type="flex" justify="space-between" align="middle">
                                <Col span="12">
                                <div class="font20">{{$t('mainmenu.balance')}}:{{bal1}}</div>
                                </Col>
                                <Col span="12">
                                <div style="text-align: right;padding-right: 20px;" class="font20">{{$t('mainmenu.payment')}}</div>
                                </Col>
                            </Row>
                            <Row type="flex" justify="space-between" align="middle" class="font18">
                                <Col span="12">
                                <Row type="flex" justify="space-between" align="middle" class="token-chose-bg"
                                     style="width: 140px;height: 44px;">
                                    <Col span="6" style="height: 36px;">
                                    <mu-avatar size="36" @click="chose1()">
                                        <img src="../assets/cocosbcx.png" style="width: 36px;height: 36px;"/>
                                    </mu-avatar>
                                    </Col>
                                    <Col span="18" style="text-align: right;">
                                    <span @click="chose1()">{{sym1}}</span>
                                    <span>&nbsp;</span>
                                    <Icon @click="chose1()" type="ios-arrow-down"/>
                                    <span>&nbsp;</span>
                                    </Col>
                                </Row>
                                </Col>
                                <Col span="12" style="text-align: right;">
                                <input type="number" v-model="liquidAmount1" placeholder="0.0000" min="0.0"  step="10000.0"
                                       style="width: 95%;text-align:right; border:0px;outline:none;cursor:pointer;"/>
                                </Col>
                            </Row>
                        </Row>
                        <Divider>
                            <div @click="btnPairTurn">
                                <icon name="add" scale="4" style="cursor: pointer;"></icon>
                            </div>
                        </Divider>
                        <Row>
                            <Row type="flex" justify="space-between" align="middle">
                                <Col span="12">
                                <div class="font20">{{$t('mainmenu.balance')}}:{{bal2}}</div>
                                </Col>
                                <Col span="12">
                                <div style="text-align: right;padding-right: 20px;" class="font20">{{$t('mainmenu.payment')}}</div>
                                </Col>
                            </Row>
                            <Row type="flex" justify="space-between" align="middle" class="font18">
                                <Col span="12">
                                <Row type="flex" justify="space-between" align="middle" class="token-chose-bg"
                                     style="width: 140px;height: 44px;" >
                                    <Col span="6" style="height: 36px;">
                                    <mu-avatar size="36" @click="chose2()">
                                        <img src="../assets/cocosbcx.png" style="width: 36px;height: 36px;"/>
                                    </mu-avatar>
                                    </Col>
                                    <Col span="18" style="text-align: right;">
                                    <span @click="chose2()">{{sym2}}</span>
                                    <span>&nbsp;</span>
                                    <Icon @click="chose2()" type="ios-arrow-down"/>
                                    <span>&nbsp;</span>
                                    </Col>
                                </Row>
                                </Col>
                                <Col span="12" style="text-align: right;">
                                <input type="number" v-model="liquidAmount2" placeholder="0.0000" min="0.0"  step="10000.0"
                                       style="width: 95%;text-align:right; border:0px;outline:none;cursor:pointer;"/>
                                </Col>
                            </Row>
                        </Row>
                        <Divider/>
                        <Row>
                            <Row type="flex" justify="center" align="middle">
                                <Col span="24" class="swap-param-bg">
                                <Row type="flex" justify="start" align="middle">
                                    <span class="gray-title">{{$t('mainmenu.swapPrice')}}</span>
                                    <div @click="btnPriceTurn" style="text-align: center;">
                                        <icon @click="btnPriceTurn" style="cursor: pointer;" name="swap-h" scale="2.8"></icon>
                                    </div>
                                </Row>
                                <Row>
                                    <span>1 </span>
                                    <span>{{priceSym1}}</span>
                                    <span> ≈ </span>
                                    <span>{{curPrice}} </span>
                                    <span>{{priceSym2}}</span>
                                </Row>
                                <Row type="flex" justify="start" align="middle">
                                    <span class="gray-title">{{$t('mainmenu.liquidity')}}</span>
                                </Row>
                                <Row>
                                    <span>{{supply1}} </span>
                                    <span>{{sym1}}</span>
                                    <span> / </span>
                                    <span>{{supply2}} </span>
                                    <span>{{sym2}}</span>
                                </Row>
                                </Col>
                            </Row>
                        </Row>
                        <Row style="margin: 10px 0px 10px 0px">
                            <mu-button full-width color="secondary" @click="addLiquidity">{{$t('mainmenu.addLiquidity')}}</mu-button>
                        </Row>
                        <Row>
                            <Row type="flex" justify="center" align="middle">
                                <Col span="24" class="swap-param-bg">
                                <Row type="flex" justify="start" align="middle">
                                    <span class="gray-title">{{$t('mainmenu.myLiquidity')}}</span>
                                </Row>
                                <Row>
                                    <span>{{supply1}} </span>
                                    <span>{{sym1}}</span>
                                    <span> / </span>
                                    <span>{{supply2}} </span>
                                    <span>{{sym2}}</span>
                                </Row>
                                <Row type="flex" justify="start" align="middle">
                                    <span class="gray-title">{{$t('mainmenu.liquidityProfit')}}</span>
                                </Row>
                                <Row type="flex" justify="space-between" align="middle">
                                    <Col span="14">
                                        <span>{{supply1}} </span>
                                        <span>{{sym1}}</span>
                                        <span> / </span>
                                        <span>{{supply2}} </span>
                                        <span>{{sym2}}</span>
                                    </Col>
                                    <Col span="10">
                                    <div style="text-align: right;padding-right: 10px;"><a>&nbsp;&nbsp; {{$t('mainmenu.withdrawProfit')}} </a></div>
                                    </Col>
                                </Row>

                                <Row type="flex" justify="space-between" align="middle">
                                    <Col span="14">
                                    <span class="gray-title">{{$t('mainmenu.mineProfit')}}</span>
                                    <span>&nbsp;{{mineProfit}} </span>
                                    </Col>
                                    <Col span="10">
                                    <div style="text-align: right;padding-right: 10px;"><a>&nbsp;&nbsp; {{$t('mainmenu.withdrawProfit')}} </a></div>
                                    </Col>
                                </Row>
                                </Col>
                            </Row>
                        </Row>

                        <Divider>
                        </Divider>

                        <Row>
                            <Row type="flex" justify="space-between" align="middle" class="font18">
                                <Col span="12">
                                <span>{{$t('mainmenu.certificate')}}: {{myCertificate}}</span>
                                </Col>
                                <Col span="12" style="text-align: right;">
                                <input type="number" placeholder="0.0000" min="0.0"  step="10000.0"
                                       style="width: 95%;text-align:right; border:0px;outline:none;cursor:pointer;"/>
                                </Col>
                            </Row>
                        </Row>

                        <Row style="margin: 10px 0px 10px 0px">
                            <mu-button full-width color="success" @click="btnSwap">{{$t('mainmenu.withdraw')}}</mu-button>
                        </Row>
                    </Row>
                </Row>


            </Card>
            </Col>
        </Row>
        <Row>
            <mu-dialog title="Phone Ringtone" width="360" scrollable :open.sync="openScroll">
                <mu-list>
                    <mu-list-item :key="option" v-for="option in options">
                        <mu-list-item-content>
                            <mu-radio  :label="option" :value="option" v-model="ringtone"></mu-radio>
                        </mu-list-item-content>
                    </mu-list-item>
                </mu-list>
                <mu-button slot="actions" flat color="primary" @click="closeChoseDialog">ok</mu-button>
            </mu-dialog>
        </Row>
    </Row>
</template>

<script>
    import cocosadapter from '@/utils/cocosadapter';

    export default {
        name: 'swap',
        components: {},
        data() {
            return {
                loops: false,
                buyAmount: '100',
                sellAmount: '100',


                tabpos:0,

                tradePairInx:1,
                tradePairTurn:0,
                tradePriceTurn:0,
                pairTable:{},
                platformAward:{},
                balanceTable:[],

                ratio:1,
                feeRate:"0.3%",
                sym1:'-',
                priceSym1:'-',
                bal1:'0.0000',
                supply1:1000,
                liquidAmount1:"0",
                tradeAmount1:"0",
                unit1:5,

                sym2:'-',
                priceSym2:'-',
                bal2:'0.0000',
                supply2:1000,
                liquidAmount2:"0",
                tradeAmount2:"0",
                unit2:5,

                curPrice:'-',

                myCertificate:'0',

                totalStake:'0.0000',
                myStake:'0.0000',
                mineProfit:'0.0000',
                stakeProfit:'0.0000',
                openScroll: false,
                ringtone: 'None',
                options: [
                    'None',
                    'Atria',
                    'Callisto',
                    'Dione',
                    'Ganymede',
                    'Hangouts Call',
                    'Luna',
                    'Oberon',
                    'Phobos',
                    'Pyxis',
                    'Sedna',
                    'Titania',
                    'Triton',
                    'Umbriel'
                ]
            }
        },
        props: {
            msg: 'yes'
        },
        created() {
        },
        mounted() {
            this.loops=true;
            var that=this;
            that.queryChainData();
            this.$timeout.timeout(5000, function () {
                that.queryChainData();
                return that.loops;
            });
        },
        destroyed() {
            this.loops=false;
        },
        methods: {
            btnClick() {
                console.log("btnClick");
            },
            chose1(){
                this.openScroll=true;
            },
            chose2(){
                this.openScroll=true;
            },
            closeChoseDialog(){
                this.openScroll=false;
            },
            btnSwap(){
                console.log(this.tabpos);
            },
            btnPairTurn(){
                if(this.tradePairTurn===0){
                    this.tradePairTurn=1
                }else{
                    this.tradePairTurn=0
                }
                this.parseContractData();
            },
            btnPriceTurn(){
                if(this.tradePriceTurn===0){
                    this.tradePriceTurn=1
                }else{
                    this.tradePriceTurn=0
                }
                this.parseContractData();
            },
            parseContractData(){
                if(this.pairTable){
                    var tradePair=this.pairTable[this.tradePairInx];
                    if(!tradePair){
                        return;
                    }
                    if(this.tradePairTurn){
                        this.sym1=tradePair.sub_sym;
                        this.supply1=tradePair.sub_supply;
                        this.uint1=tradePair.sub_unit;

                        this.sym2=tradePair.main_sym;
                        this.supply2=tradePair.main_supply;
                        this.uint2=tradePair.main_unit;
                        this.feeRate=(tradePair.sub_fee*100)+"%";
                    }else{
                        this.sym1=tradePair.main_sym;
                        this.supply1=tradePair.main_supply;
                        this.uint1=tradePair.main_unit;

                        this.sym2=tradePair.sub_sym;
                        this.supply2=tradePair.sub_supply;
                        this.uint2=tradePair.sub_unit;
                        this.feeRate=(tradePair.main_fee*100)+"%";
                    }

                    if(this.tradePriceTurn){
                        this.priceSym1=tradePair.sub_sym;
                        this.priceSym2=tradePair.main_sym;
                        if(tradePair.main_supply>0&&tradePair.sub_supply>0){
                            this.curPrice=tradePair.main_supply/(tradePair.sub_supply*tradePair.ratio);
                        }else{
                            this.curPrice="0.00";
                        }
                    }else{
                        this.priceSym1=tradePair.main_sym;
                        this.priceSym2=tradePair.sub_sym;
                        if(tradePair.main_supply>0&&tradePair.sub_supply>0){
                            this.curPrice=tradePair.main_supply/(tradePair.sub_supply*tradePair.ratio);
                            this.curPrice=1/this.curPrice;
                        }else{
                            this.curPrice="0.00";
                        }
                    }
                }
            },
            queryChainData(){
                let bcx = cocosadapter.curBcx;
                var that=this;
                if(bcx===null){
                    return;
                }
                //获取合约信息
                bcx.queryContract({
                    nameOrId:that.$mainContract,
                    callback:function(res){
                        if(res.code===1){
                            console.log("queryContract");
                            console.log(res);
                            that.pairTable = res.data.contract_data.pair_table;
                            that.platformAward = res.data.contract_data.platform_award;
                            that.parseContractData();
                        }
                    }
                });
                var bcxAccount=this.$store.state.bcxAccount;
                if(bcxAccount&&bcxAccount.name){
                    //获取账户余额
                    cocosadapter.safeGetAccountBalance(bcx,bcxAccount.name,function (res) {
                        if(res&&res.code===1){
                            console.log(res);
                            if(res.data&&res.data.length>0){
                                for(var item of res.data){
                                    that.balanceTable[item.symbol]=item;
                                }
                            }

                        }
                    });
                    //获取账户合约数据
                    bcx.queryAccountContractData({
                        account:bcxAccount.name,
                        contractNameOrId:that.$mainContract,
                        callback:function(res){
                            console.log(res);
                            if(res.code===1){
                                console.log("queryAccountContractData");
                                console.log(res);
                            }
                        }
                    });
                }
            },
            addLiquidity(){
                var that = this;
                that.$Message.warning('暂未上线');
                return;

                if(cocosadapter&&cocosadapter.curBcx){
                    var valueList=[];
                    valueList.push(this.tradePairInx);
                    var mainAmount = 0;
                    var subAmount = 0;
                    if(this.tradePairTurn){
                        mainAmount=this.liquidAmount2;
                        subAmount=this.liquidAmount1;
                    }else{
                        mainAmount=this.liquidAmount1;
                        subAmount=this.liquidAmount2;
                    }
                    valueList.push(mainAmount);
                    valueList.push(subAmount);
                    cocosadapter.safeCallContractFunction(cocosadapter.curBcx,that.$mainContract, 'add_liquidity', valueList,function (res) {
                        if(res&&res.code===1){
                            that.$Message.success('添加成功');
                        }else{
                            let msg="";
                            if(res.message){
                                msg=":";
                                msg+=res.message;
                            }
                            that.$Message.error({
                                content: '操作失败'+msg,
                                duration: 10
                            });
                        }
                        console.info(res);
                    });
                }else{
                    this.$Message.warning({
                        content: 'cocos未登录',
                    });
                }
            },
            tradeSwap(){
                var that = this;
                that.$Message.warning('暂未上线');
                return;
                if(cocosadapter&&cocosadapter.curBcx){
                    var valueList=[];
                    valueList.push(this.tradePairInx);
                    valueList.push(this.sym1);
                    valueList.push(this.tradeAmount1);
                    valueList.push(this.sym2);
                    valueList.push(this.tradeAmount2)
                    cocosadapter.safeCallContractFunction(cocosadapter.curBcx,that.$mainContract, 'trade', valueList,function (res) {
                        if(res&&res.code===1){
                            that.$Message.success('交易成功');
                        }else{
                            let msg="";
                            if(res.message){
                                msg=":";
                                msg+=res.message;
                            }
                            that.$Message.error({
                                content: '操作失败'+msg,
                                duration: 10
                            });
                        }
                        console.info(res);
                    });
                }else{
                    this.$Message.warning({
                        content: 'cocos未登录',
                    });
                }
            }

        },
        computed:{

        },

    }
</script>

<style scoped>
    .font22 {
        font-size: 22px;
    }

    .font20 {
        font-size: 20px;
    }

    .font18 {
        font-size: 18px;
    }

    .token-chose-bg {
        cursor: pointer;
    }

    .gray-title {
        color: gray;
    }

    .swap-param-bg {
        background-color: #f3f3f3;
        padding: 5px;
        margin-left: 5px;
        margin-right: 5px;
        border-radius: 5px;
    }

</style>