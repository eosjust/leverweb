<template>
    <Row>
        <Row>

        </Row>
        <Row>
            <Row type="flex" justify="center" style="margin-top: 20px;">
                <Col :xs="22" :sm="20" :md="14" :lg="10">
                <Card>
                    <Row class="explain-bg" style="margin: 10px 0px 10px 0px">
                        <label>测试币领取，每个账号每天可领取10w 测试币</label>
                    </Row>

                    <Row type="flex" justify="space-between" align="middle" style="margin: 10px 0px 5px 0px">
                        <Col :span="4">
                        <label>领取COCOST</label>
                        </Col>
                        <Col :span="16">
                        <Input type="text" v-model="cocostAmount" placeholder="数量">
                        </Input>
                        </Col>
                        <Col :span="4">
                        <Button type="primary" @click="claimCocost">Claim</Button>
                        </Col>
                    </Row>


                    <Row type="flex" justify="space-between" align="middle" style="margin: 10px 0px 5px 0px">
                        <Col :span="4">
                        <label>领取BTEST</label>
                        </Col>
                        <Col :span="16">
                        <Input type="text" v-model="btestAmount" placeholder="数量">
                        </Input>
                        </Col>
                        <Col :span="4">
                        <Button type="primary" @click="claimBtest">Claim</Button>
                        </Col>
                    </Row>

                    <Row type="flex" justify="space-between" align="middle" style="margin: 10px 0px 5px 0px">
                        <Col :span="4">
                        <label>领取CTEST</label>
                        </Col>
                        <Col :span="16">
                        <Input type="text" v-model="ctestAmount" placeholder="数量">
                        </Input>
                        </Col>
                        <Col :span="4">
                        <Button type="primary" @click="claimCtest">Claim</Button>
                        </Col>
                    </Row>

                    <Row type="flex" justify="space-between" align="middle" style="margin: 10px 0px 5px 0px">
                        <Col :span="4">
                        <label>领取STEST</label>
                        </Col>
                        <Col :span="16">
                        <Input type="text" v-model="stestAmount" placeholder="数量">
                        </Input>
                        </Col>
                        <Col :span="4">
                        <Button type="primary" @click="claimStest">Claim</Button>
                        </Col>
                    </Row>



                </Card>
                </Col>
            </Row>
        </Row>
    </Row>
</template>

<script>

    import cocosadapter from '@/utils/cocosadapter';

    export default {
        name: "airdrop",
        data() {
            return {
                cocostAmount:'',
                ctestAmount:'',
                btestAmount:'',
                stestAmount:'',

            }
        },
        created() {
        },
        mounted() {
        },
        destroyed() {
        },
        methods: {
            claimCocost() {
                this.claim('COCOST',this.cocostAmount);
            },
            claimCtest() {
                this.claim('CTEST',this.ctestAmount);
            },
            claimBtest() {
                this.claim('BTEST',this.btestAmount);
            },
            claimStest() {
                this.claim('STEST',this.stestAmount);
            },

            claim(symbol,amount){
                var that = this;
                if(cocosadapter&&cocosadapter.curBcx){
                    var valueList=[];
                    valueList.push(symbol);
                    valueList.push(amount);
                    cocosadapter.safeCallContractFunction(cocosadapter.curBcx,'contract.cairdrop', 'claim', valueList,function (res) {
                        if(res&&res.code===1){
                            that.$Message.success('领取成功');
                        }else{
                            let msg="";
                            if(res.message){
                                msg=":";
                                msg+=res.message;
                            }
                            that.$Message.success({
                                content: '操作失败'+msg,
                                duration: 3
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
        watch:{
        }
    }
</script>

<style scoped>
    .explain-bg {
        background-color: #f3f3f3;
        padding: 5px;
        border-radius: 5px;
    }
</style>