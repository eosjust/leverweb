<template>
    <Row>
        <Row>
            <Button type="primary" @click="btnTest1">清空nft</Button>
            <Button type="primary" @click="btnTest2">创建</Button>
            <Button type="primary" @click="btnTest3">测试3</Button>
        </Row>
    </Row>
</template>

<script>

    import cocosadapter from '@/utils/cocosadapter';
    const pixelContract='contract.pixelgame';

    export default {
        name: "devtest",
        data() {
            return {
                loops:false
            }
        },
        created() {
        },
        mounted() {
            this.loops=true;
        },
        destroyed() {
            this.loops=false;
        },
        methods: {
            btnTest1() {
                var that = this;
                var bcxAccount=this.$store.state.bcxAccount;
                if(bcxAccount&&bcxAccount.name){
                    if(cocosadapter&&cocosadapter.curBcx){
                        that.$Loading.start();
                        cocosadapter.safeQueryNHAssetsByCreator(cocosadapter.curBcx,bcxAccount.name, 1,10,function (res) {
                            that.$Loading.finish();
                            for(var item of res.data){
                                console.info(item.id);
                                cocosadapter.safeDeleteNHAsset(cocosadapter.curBcx,item.id,null);
                            }
                        });
                    }else{
                        this.$Message.warning({
                            content: 'cocos未登录',
                        });
                    }
                }
            },
            btnTest2() {
                var that=this;
                this.$timeout.timeout(3000, function () {
                    that.createPix();
                    return that.loops;
                });
            },
            btnTest3(){
            },
            createPix(){
                let bcx = cocosadapter.curBcx;
                var that=this;
                if(bcx===null){
                    return;
                }
                that.$Loading.start();
                var valueList=[];
                valueList.push(500);
                cocosadapter.safeCallContractFunction(bcx,pixelContract, 'createNft', valueList,function (res) {
                    console.log(res);
                    if(res&&res.code===1){
                        that.$Message.success('创建成功');
                    }else{
                        let msg="";
                        if(res.message){
                            msg=":";
                            msg+=res.message;
                        }
                        that.$Message.error({
                            content: '操作失败'+msg,
                            duration: 1
                        });
                    }
                    that.$Loading.finish();
                });
            }
        },
        computed:{

        },
        watch:{
        }
    }
</script>

<style scoped>

</style>