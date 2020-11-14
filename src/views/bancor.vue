<template>
    <Row>
        <Row>

        </Row>
        <Row type="flex" justify="center" style="margin-top: 20px;">
            <Col :xs="22" :sm="20" :md="14" :lg="10">
            <Card>
                <Row style="margin-bottom: 20px;">
                    <mu-tabs :value.sync="tabpos" color="#fff" full-width>
                        <mu-tab style="color: #0e131c;">{{$t('mainmenu.bancorTrade')}}</mu-tab>
                        <mu-tab style="color: #0e131c;">{{$t('mainmenu.stake')}}</mu-tab>
                    </mu-tabs>
                </Row>
                <Divider/>
                <Row class="swap-content">
                    <Row v-show="tabpos===0">
                        <Row>
                            <Row type="flex" justify="space-between" align="middle">
                                <Col span="12">
                                <div class="font20">{{$t('mainmenu.balance')}}:{{mainBal}}</div>
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
                                    <span @click="chose1()">COCOS</span>
                                    <span>&nbsp;</span>
                                    <Icon @click="chose1()" type="ios-arrow-down"/>
                                    <span>&nbsp;</span>
                                    </Col>
                                </Row>
                                </Col>
                                <Col span="12" style="text-align: right;">
                                <input type="number" placeholder="0.0000" min="0.0"  step="10000.0"
                                       style="width: 95%;text-align:right; border:0px;outline:none;cursor:pointer;"/>
                                </Col>
                            </Row>
                        </Row>
                        <Divider>
                            <icon name="swap" scale="4" style="cursor: pointer;"></icon>
                        </Divider>
                        <Row>
                            <Row type="flex" justify="space-between" align="middle">
                                <Col span="12">
                                <div class="font20">{{$t('mainmenu.balance')}}:{{subBal}}</div>
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
                                    <span @click="chose2()">BOOM</span>
                                    <span>&nbsp;</span>
                                    <Icon @click="chose2()" type="ios-arrow-down"/>
                                    <span>&nbsp;</span>
                                    </Col>
                                </Row>
                                </Col>
                                <Col span="12" style="text-align: right;">
                                <input type="number" placeholder="0.0000" min="0.0"  step="10000.0"
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
                                    <icon style="cursor: pointer;" name="swap-h" scale="2.8"></icon>
                                    <span class="gray-title">{{$t('mainmenu.fees')}}</span>
                                    <span>&nbsp;</span>
                                    <span>0.5%</span>
                                </Row>
                                <Row>
                                    <span>1 </span>
                                    <span>{{sym1}}</span>
                                    <span> ≈ </span>
                                    <span>{{curPrice}} </span>
                                    <span>{{sym2}}</span>
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
                            <mu-button full-width color="secondary" @click="btnSwap">{{$t('mainmenu.swap')}}</mu-button>
                        </Row>
                    </Row>
                    <Row v-show="tabpos===1">
                        <Row>
                            <Row type="flex" justify="space-between" align="middle">
                                <Col span="12">
                                <div class="font20">{{$t('mainmenu.balance')}}:{{subBal}}</div>
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
                                    <span @click="chose1()">COCOS</span>
                                    <span>&nbsp;</span>
                                    <Icon @click="chose1()" type="ios-arrow-down"/>
                                    <span>&nbsp;</span>
                                    </Col>
                                </Row>
                                </Col>
                                <Col span="12" style="text-align: right;">
                                <input type="number" placeholder="0.0000" min="0.0" step="10000.0"
                                       style="width: 95%;text-align:right; border:0px;outline:none;cursor:pointer;"/>
                                </Col>
                            </Row>
                        </Row>

                        <Divider/>
                        <Row>
                            <Row type="flex" justify="center" align="middle">
                                <Col span="24" class="swap-param-bg">
                                <Row type="flex" justify="start" align="middle">
                                    <span class="gray-title">{{$t('mainmenu.allStaked')}}</span>
                                    <span>&nbsp;{{totalStake}}</span>
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
                                <Row type="flex" justify="space-between" align="middle">
                                    <Col span="14">
                                    <span class="gray-title">{{$t('mainmenu.stakeProfit')}}</span>
                                    <span>&nbsp;{{stakeProfit}} </span>
                                    </Col>
                                    <Col span="10">
                                    <div style="text-align: right;padding-right: 10px;"><a>&nbsp;&nbsp; {{$t('mainmenu.withdrawProfit')}} </a></div>
                                    </Col>
                                </Row>
                                </Col>
                            </Row>
                        </Row>
                        <Row style="margin-top: 10px;">
                            <mu-button full-width color="secondary" @click="btnSwap">{{$t('mainmenu.stake')}}</mu-button>
                        </Row>
                        <Divider>
                        </Divider>

                        <Row>
                            <Row type="flex" justify="space-between" align="middle" class="font18">
                                <Col span="12">
                                <span>{{$t('mainmenu.myStaked')}}: {{myStake}}</span>
                                </Col>
                                <Col span="12" style="text-align: right;">
                                <input type="number" placeholder="0.0000" min="0.0"  step="10000.0"
                                       style="width: 95%;text-align:right; border:0px;outline:none;cursor:pointer;"/>
                                </Col>
                            </Row>
                        </Row>

                        <Row style="margin-top: 10px;">
                            <mu-button full-width color="success" @click="btnSwap">{{$t('mainmenu.redeem')}}</mu-button>
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
        name: 'bancor',
        components: {},
        data() {
            return {
                loops: false,
                bt1: 'yes',
                mainBal:'0.0000',
                subBal:'0.0000',
                buyAmount: '100',
                sellAmount: '100',

                tabpos:0,

                bancorInx:1,

                ratio:0.5,
                sym1:'COCOS',
                supply1:1000,
                unit1:100000,

                sym2:'BOOM',
                supply2:1000,
                unit2:10000,

                mainSym:'COCOS',
                subSym:'BOOM',

                fstSym:'COCOS',
                secSym:'BOOM',

                mainAmount:'-',
                subAmount:'-',
                priceMode:0,
                curPrice:'-',

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
            this.$timeout.timeout(5000, function () {
                that.queryContract();
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
            queryContract(){
                let bcx = cocosadapter.curBcx;
                var that=this;
                if(bcx===null){
                    return;
                }
                bcx.queryContract({
                    nameOrId:'contract.bancor',
                    callback:function(res){
                        console.log(res);
                        if(res.code===1){
                            that.mainAmount = res.data.contract_data.R;
                            that.subAmount = res.data.contract_data.S;
                            let F=res.data.contract_data.F;
                            that.curPrice = that.mainAmount/(that.subAmount*F);
                            that.curPrice=1/that.curPrice;
                        }
                    }
                })
            },

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