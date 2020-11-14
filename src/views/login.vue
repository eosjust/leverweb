<template>
    <Row>
        <Row type="flex" justify="center" style="margin-top: 40px;">
            <Col :xs="22" :sm="20" :md="14" :lg="10">
            <Card>
                <Form :model="loginForm" autocomplete="off">
                    <input type="text" style="display:none"/>
                    <input type="password" style="display:none"/>
                    <FormItem label="账户名">
                        <Input v-model="loginForm.userName" autocomplete="new-password" name="userName">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem label="密码">
                        <Input type="password" v-model="loginForm.password" autocomplete="new-password" name="password">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" long @click="passwordLogin">登录</Button>
                    </FormItem>
                </Form>
            </Card>
            </Col>

        </Row>
    </Row>
</template>

<script>
    import cocosadapter from '@/utils/cocosadapter';

    export default {
        name: "login",
        data() {
            return {
                loginForm:{
                    userName:'',
                    password:''
                },

            }
        },
        mounted() {
            console.log("login mounted");
        },
        methods: {
            passwordLogin(){
                var that = this;
                var curBcx = cocosadapter.curBcx;
                that.$Loading.start();
                curBcx.passwordLogin({
                    account: that.loginForm.userName,
                    password: that.loginForm.password,
                }).then(res => {
                    if (1 !== res.code) {
                        that.$Loading.error();
                        that.$Message.error('登录失败'+res.code);
                    } else {
                        that.$Loading.finish();
                        cocosadapter.safeGetAccountInfo(curBcx,function (account) {
                            that.$e.$emit("loginResult",account);
                        });

                        that.$router.push('/');
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>