<template>
    <Row>
        <Row>
            {{lastSockState}}
        </Row>
        <Row type="flex" justify="center">
            <Col :xs="22" :sm="20" :md="14" :lg="12">
            <Row style="height: 400px;overflow: auto;">
                <Card dis-hover v-for="(item, index) in list1" :key="index" style="margin: 32px 0">
                    userName: {{ item.userName }},message: {{ item.message }}
                </Card>
            </Row>
            <Row>
                <Input v-model="message" placeholder="Enter something..." style="width: 300px"/>
                <Button type="primary" @click="btnChat">发送</Button>
                <Button type="primary" @click="btnTest">测试</Button>
                <Button type="primary" @click="btnTest2">测试2</Button>
            </Row>
            </Col>
        </Row>

    </Row>
</template>

<script>
    import socketadapter from '@/utils/socketadapter';


    export default {
        name: "",
        data() {
            return {
                lastSockState:-1,
                userName:'',
                message:'',
                list1: []
            }
        },
        created() {
        },
        mounted() {
            var that = this;
            that.sockLoop = true;
            this.userName='user' + Math.floor((Math.random()*1000)+1);
            that.lastSockState = socketadapter.state;
            that.updateSocketListener();
            socketadapter.onStateChange(function (newState) {
                that.updateSocketListener();
                that.lastSockState=newState;
            });
        },
        destroyed() {
            this.sockLoop = false;
            this.removeSocketListener();
        },
        methods: {
            btnChat() {
                var that = this;
                if(socketadapter.state===2){
                    var jsonObject = {
                        userName: that.userName,
                        message: that.message
                    };
                    var client = socketadapter.client;
                    client.emit('chatevent', jsonObject);
                }
            },
            btnTest() {
                this.updateSocketListener();
            },
            btnTest2(){

            },
            updateSocketListener(){
                var that = this;
                let client=socketadapter.client;
                let state=socketadapter.state;
                if(client&&state===2){
                    client.removeListener('chatevent', that.onChatEvent);
                    client.on('chatevent', that.onChatEvent);
                }
            },
            removeSocketListener(){
                var that = this;
                let client=socketadapter.client;
                let state=socketadapter.state;
                try {
                    client.removeListener('chatevent', that.onChatEvent);
                }catch (ex){

                }
            },
            onChatEvent(data){
                this.list1.push(data);
            }
        },
        computed:{
            // sockState(){
            //     if(socketadapter.state){
            //         return socketadapter.state;
            //     }
            //     return -1;
            // }
        },
        watch:{
        }
    }
</script>

<style scoped>

</style>