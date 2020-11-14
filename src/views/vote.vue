<template>

    <Row>
        <Row style="margin-top: 20px;">
            <Row type="flex" justify="center" align="middle">
                <img src="../assets/minecfs.png" style="width: 120px;height: 120px;"/>
            </Row>
            <Row type="flex" justify="center" align="middle">
                <span style="font-size: 1.8em;font-weight: bold;color: #5b3926;">投票决定LMT未来发展</span>
            </Row>
        </Row>
        <Row type="flex" justify="center" style="margin-top: 20px;">
            <Col :xs="22" :sm="20" :md="14" :lg="10">
            <Card>
                <Row style="margin-bottom: 20px;">
                    <Row style="margin-bottom: 20px;">
                        <mu-tabs :value.sync="tabpos" color="#fff">
                            <mu-tab style="color: #0e131c;">当前投票</mu-tab>
                        </mu-tabs>
                    </Row>
                    <Divider/>
                    <Row class="tab-content">
                        <Row>
                            <h3>投票名称</h3>
                        </Row>
                        <Row>
                            <RadioGroup v-model="vertical" vertical>
                                <Radio label="apple">
                                    <Icon type="social-apple"></Icon>
                                    <span>Apple</span>
                                </Radio>
                                <Radio label="android">
                                    <Icon type="social-android"></Icon>
                                    <span>Android</span>
                                </Radio>
                                <Radio label="windows">
                                    <Icon type="social-windows"></Icon>
                                    <span>Windows</span>
                                </Radio>
                            </RadioGroup>
                        </Row>
                        <Row>
                            <div>
                                <span>选项1</span>
                                <Progress :percent="25"/>
                            </div>
                            <div>
                                <span>选项2</span>
                                <Progress :percent="45"/>
                            </div>
                        </Row>
                        <Row>
                            <div>
                                你的票数：{{stakeProfitTable.keys}}
                            </div>
                        </Row>
                        <Row>
                            <mu-button full-width color="secondary">投票</mu-button>
                        </Row>
                    </Row>
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
                            <mu-tab style="color: #0e131c;">即将开始</mu-tab>
                        </mu-tabs>
                    </Row>
                    <Divider/>
                    <Row class="tab-content">
                        <Row>
                            <mu-expansion-panel>
                                <div slot="header">Panel 1</div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                                <mu-button slot="action" flat>Cancel</mu-button>
                                <mu-button slot="action" flat color="primary">Save</mu-button>
                            </mu-expansion-panel>
                            <mu-expansion-panel>
                                <div slot="header">Panel 2</div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </mu-expansion-panel>
                            <mu-expansion-panel>
                                <div slot="header">Panel 3</div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </mu-expansion-panel>
                        </Row>
                    </Row>
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
                            <mu-tab style="color: #0e131c;">历史投票</mu-tab>
                        </mu-tabs>
                    </Row>
                    <Divider/>
                    <Row class="tab-content">
                        <Row>
                            <mu-expansion-panel>
                                <div slot="header">Panel 1</div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                                <mu-button slot="action" flat>Cancel</mu-button>
                                <mu-button slot="action" flat color="primary">Save</mu-button>
                            </mu-expansion-panel>
                            <mu-expansion-panel>
                                <div slot="header">Panel 2</div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </mu-expansion-panel>
                            <mu-expansion-panel>
                                <div slot="header">Panel 3</div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </mu-expansion-panel>
                        </Row>
                    </Row>
                </Row>
            </Card>
            </Col>
        </Row>
    </Row>

</template>


<script>

    export default {
        name: "vote",
        data() {
            return {
                stakeProfitTable:{
                    keys:0,
                }
            }
        },
        created() {
        },
        mounted() {
            var that = this;
            this.loops=true;
            that.queryContract();
            that.queryUserContractData();
            this.$timeout.timeout(3000, function () {
                that.queryContract();
                that.queryUserContractData();
                return that.loops;
            });
        },
        destroyed() {
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
                            var private_data=res.data.contract_data;
                            var stake_profit_table = private_data.stake_profit_table;
                            if(stake_profit_table){
                                that.stakeProfitTable=stake_profit_table;
                            }
                        }
                    });
                }
            },
        },
        computed:{

        },
        watch:{
        }
    }
</script>

<style scoped>

</style>