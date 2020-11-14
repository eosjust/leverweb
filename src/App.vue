<template>
    <Row id="app">
        <div class="layout">
            <Layout style="min-height:100vh;">
                <Row>
                    <Row>
                        <Menu v-show="!ismobile" ref="mainMenu" mode="horizontal" theme="dark" active-name="1"
                              @on-select="menuChanged">
                            <Row>
                                <Col span="14">
                                <Row type="flex" justify="start" v-show="ismobile">
                                    <div>
                                        <MenuItem name="draw-menu-main">
                                            <Row type="flex" justify="space-between" align="middle">
                                                <img :src="cfslogo" style="width: 36px;height: 36px;"/>
                                                <span>LMT</span>
                                            </Row>
                                        </MenuItem>
                                    </div>
                                </Row>
                                <Row type="flex" justify="start" v-show="!ismobile">
                                    <div>
                                        <MenuItem name="menu-cfs">
                                            <Row type="flex" justify="space-between" align="middle">
                                                <img :src="cfslogo" style="width: 36px;height: 36px;"/>
                                                <span>LMT</span>
                                            </Row>
                                        </MenuItem>
                                        <MenuItem name="menu-mine">
                                            <!--<Icon type="md-nutrition" />-->
                                            <icon style="cursor: pointer;" name="mining" scale="1.3"></icon>
                                            {{$t('mainmenu.mine')}}
                                        </MenuItem>
                                        <MenuItem name="menu-swap">
                                            <Icon type="md-swap"/>
                                            {{$t('mainmenu.swap')}}
                                        </MenuItem>
                                        <!--<MenuItem name="menu-profit">-->
                                            <!--<Icon type="ios-pie" />-->
                                            <!--{{$t('mainmenu.profit')}}-->
                                        <!--</MenuItem>-->


                                        <!--<MenuItem name="menu-wpaper">-->
                                            <!--<Icon type="md-book"/>-->
                                            <!--{{$t('mainmenu.wpaper')}}-->
                                        <!--</MenuItem>-->
                                    </div>
                                </Row>
                                </Col>
                                <Col span="10">
                                <Row type="flex" justify="end" v-show="ismobile">

                                    <MenuItem name="draw-user-main" v-show="!$store.state.bcxAccount.name">
                                        <Icon type="md-person"/>
                                        {{$t('mainmenu.login')}}
                                    </MenuItem>
                                    <MenuItem name="draw-user-name-main" v-show="$store.state.bcxAccount.name">
                                        <Icon type="md-person"/>
                                        <div style="text-align: center;width: 120px;text-overflow:ellipsis;overflow: hidden;">
                                            {{$store.state.bcxAccount.name}}
                                        </div>
                                    </MenuItem>
                                </Row>
                                <Row type="flex" justify="end" v-show="!ismobile">
                                    <MenuItem name="user-lang">
                                        <!--<Icon type="md-person" />-->
                                        <Row type="flex" justify="space-between" align="middle">
                                            <img :src="$store.state.lang==='en'?usflag:cnflag"
                                                 style="width: 28px;height: 28px;"/>
                                            <span>{{$t('mainmenu.language')}}</span>
                                        </Row>
                                    </MenuItem>
                                    <MenuItem name="user-login" v-show="!$store.state.bcxAccount.name">
                                        <Icon type="md-person"/>
                                        {{$t('mainmenu.login')}}
                                    </MenuItem>
                                    <Submenu name="user-name" v-show="$store.state.bcxAccount.name" >
                                        <template slot="title" >
                                            <Icon type="md-person"/>
                                            {{$store.state.bcxAccount.name}}
                                        </template>
                                        <MenuGroup title="操作"
                                                   v-show="bcxSource==='local'&&!$store.state.bcxAccount.locked">
                                            <MenuItem name="user-logout"
                                                      v-show="bcxSource==='local'&&!$store.state.bcxAccount.locked">
                                                <Icon type="md-exit"/>
                                                {{$t('mainmenu.logout')}}
                                            </MenuItem>
                                        </MenuGroup>
                                    </Submenu>
                                </Row>
                                </Col>
                            </Row>
                        </Menu>
                        <Row v-show="ismobile">
                            <Row>
                                <Row type="flex" justify="center">
                                    <img :src="cfslogo" style="width: 34px;height: 34px;"/>
                                </Row>
                            </Row>
                            <Row type="flex" justify="center" class="mobile-menu-bg">
                                <Col span="4">
                                <div style="text-align: center;">
                                    <router-link to="mine" >
                                        {{$t('mainmenu.mine')}}
                                    </router-link>
                                </div>
                                </Col>
                                <!--<Col span="4">-->
                                <!--<div style="text-align: center;">-->
                                    <!--<router-link to="profit">-->
                                        <!--{{$t('mainmenu.profit')}}-->
                                    <!--</router-link>-->
                                <!--</div>-->
                                <!--</Col>-->
                                <Col span="4">
                                <div style="text-align: center;" @click="openCroswap">
                                    <router-link to="">
                                        {{$t('mainmenu.swap')}}
                                    </router-link>
                                </div>
                                </Col>
                                <!--<Col span="4">-->
                                <!--<div style="text-align: center;">-->
                                    <!--<router-link to="vote">-->
                                        <!--{{$t('mainmenu.vote')}}-->
                                    <!--</router-link>-->
                                <!--</div>-->
                                <!--</Col>-->
                                <!--<Col span="4">-->
                                <!--<div style="text-align: center;" @click="openWpaper">-->
                                    <!--<router-link to="">-->
                                        <!--{{$t('mainmenu.wpaper')}}-->
                                    <!--</router-link>-->
                                <!--</div>-->
                                <!--</Col>-->
                            </Row>
                            <Row type="flex" justify="center" class="mobile-menu-bg">
                                <Col v-show="!$store.state.bcxAccount.name" span="4">
                                <div  @click="btnLogin" style="text-align: center;">
                                    <a>
                                        {{$t('mainmenu.login')}}
                                    </a>
                                </div>
                                </Col>
                                <Col v-show="$store.state.bcxAccount.name" span="4">
                                <div  style="text-align: center;width: 120px;text-overflow:ellipsis;overflow: hidden;">
                                    <a style="">
                                        {{$store.state.bcxAccount.name}}
                                    </a>
                                </div>
                                </Col>
                                <Col span="4">
                                <div @click="changeLang()" style="text-align: center;">
                                    <a>{{$store.state.lang==='en'?'EN':'CN'}}</a>
                                </div>
                                </Col>
                            </Row>
                        </Row>

                        <Drawer :title="$t('mainmenu.menu')" placement="left" :closable="false"
                                v-model="leftDrawerOpen">
                            <CellGroup @on-click="leftDrawCellChanged">
                                <Cell :title="$t('mainmenu.mine')" to="/"></Cell>
                                <Cell :title="$t('mainmenu.swap')" to="swap"></Cell>
                                <Cell :title="$t('mainmenu.bancor')" to="bancor"></Cell>
                                <!--<Cell :title="$t('mainmenu.airdrop')"  to="airdrop"></Cell>-->
                                <Cell :title="$t('mainmenu.wpaper')" to="about"></Cell>
                            </CellGroup>
                            <CellGroup @on-click="changeLang()">
                                <Cell :title="$t('mainmenu.language')"
                                      :extra="$store.state.lang==='en'?'English':'Chinese'"></Cell>
                            </CellGroup>
                        </Drawer>
                        <Drawer :title="$t('mainmenu.account')" placement="right" :closable="false"
                                v-model="rightDrawerOpen">
                            <CellGroup @on-click="rightDrawCellChanged">
                                <Cell title="COCOS" :label="$store.state.bcxAccount.cocos"></Cell>
                                <Cell title="GAS" :label="$store.state.bcxAccount.gas"></Cell>
                            </CellGroup>
                            <CellGroup @on-click="rightDrawCellChanged">
                                <Cell :title="$t('mainmenu.logout')"
                                      v-show="bcxSource==='local'&&!$store.state.bcxAccount.locked"
                                      name="drawLogout"></Cell>
                            </CellGroup>
                        </Drawer>


                    </Row>
                </Row>
                <Content>
                    <!--<Input ref="myinput" placeholder="Enter something..." style="width: 50px" />-->
                    <!--<Button @click="btnCheck">btnCheck</Button>-->
                    <!--<Button @click="btnLogin">btnLogin</Button>-->
                    <router-view/>
                </Content>
                <Footer class="layout-footer-center">2018-2020 &copy; cfs.cool</Footer>
            </Layout>
        </div>
    </Row>
</template>

<script>
    // @ is an alias to /src
    import web3adapter from '@/utils/web3adapter';
    import cocosadapter from '@/utils/cocosadapter';

    export default {
        name: 'App',
        components: {},
        data() {
            return {
                clientWidth: 1,
                clientHeight: 1,
                bcxSource: 'unknow',
                ismobile: false,
                chki: true,
                leftDrawerOpen: false,
                rightDrawerOpen: false,
                pluginTryLoginTimes: 0,
                pluginTryLoginMaxTimes: 2,
                accountMenuOpen: false,
                activeIndex: "1",
                cnflag: require("./assets/cnflag.png"),
                usflag: require("./assets/usflag.png"),
                cfslogo: require("./assets/cfslogo.png"),
            }
        },
        // props: {
        //     msg: String,
        //     userName:String,
        // },
        created() {
            console.log("created");
        },
        mounted() {
            console.log("mounted");
            this.chki = true;
            var that = this;
            this.initClientWatch();
            let lang = this.$store.state.lang;
            this.setLang(lang);
            this.$timeout.timeout(3000, function () {
                that.btnLogin();
                return false;
            });
            this.$timeout.timeout(2000, function () {
                web3adapter.check();
                return that.chki;
            });
            this.$timeout.timeout(2000, function () {
                cocosadapter.check();
                return that.chki;
            });
            web3adapter.check();

            this.$e.$on("loginResult", function (account) {
                that.updateAccountInfo(account);
            });



            // this.$Message.info({
            //     content: "由于主网近期不稳定，为减少损失<br>CFS已于2020年10月6日11:34分暂停挖矿，待主网恢复后重新开启挖矿。<br>目前由于主网安全限制，合约功能也已屏蔽，预计2~3天恢复",
            //     duration: 20,
            //     closable: true
            // });
        },
        destroyed() {
            this.chki = false;
            console.log("destroyed");
        },
        methods: {
            menuChanged(name) {
                console.log(name);
                var that = this;
                if (name === 'draw-menu-main') {
                    this.leftDrawerOpen = !this.leftDrawerOpen;
                } else if (name === 'draw-user-main') {
                    this.btnLogin();
                } else if (name === 'draw-user-name-main') {
                    this.rightDrawerOpen = !this.rightDrawerOpen;
                } else if (name === 'menu-bancor') {
                    this.$router.push('/bancor');
                } else if (name === 'menu-swap') {
                    // this.$router.push('swap');
                    window.open("http://croswap.com/", 'top');
                } else if (name === 'menu-wpaper') {
                    // this.$router.push('about');
                    window.open("https://github.com/boom-game/coswap-contract/blob/master/README.md", 'top');
                } else if (name === 'user-unlock') {

                } else if (name === 'user-logout') {
                    this.btnLogout();
                } else if (name === 'user-lang') {
                    this.changeLang();
                } else if (name === 'draw-user-lang') {
                    this.changeLang();
                } else if (name === 'menu-airdrop') {
                    this.$router.push('airdrop');
                } else if (name === 'menu-mine') {
                    this.$router.push('mine');
                } else if (name === 'menu-cfs') {
                    this.$router.push('/');
                }else if(name==='menu-profit'){
                    this.$router.push('profit');
                }else if(name === 'menu-vote'){
                    this.$router.push('vote');
                }
                if (name === 'user-login') {
                    this.btnLogin();
                }
            },
            leftDrawCellChanged(name) {
                this.leftDrawerOpen = !this.leftDrawerOpen;
            },
            rightDrawCellChanged(name) {
                this.rightDrawerOpen = !this.rightDrawerOpen;
                if ('drawLogout' === name) {
                    this.btnLogout();
                }
            },
            openWpaper(){
                window.open("https://github.com/boom-game/coswap-contract/blob/master/README.md", 'top');
            },
            openCroswap(){
                window.open("http://croswap.com", 'top');
            },
            changeLang() {
                let lang = this.$store.state.lang;
                if (lang === 'en') {
                    lang = 'cn';
                } else {
                    lang = 'en';
                }
                this.setLang(lang);
            },
            setLang(lang) {
                this.$i18n.locale = lang;
                this.$store.commit('setLang', lang);
            },
            btnLogin() {
                var that = this;
                if(web3adapter.getBsc()){
                    web3adapter.getBsc().requestAccounts().then(function (ret) {
                        that.updateAccountInfo(web3adapter.getAccount());
                    });
                }
            },
            btnLogout() {

            },
            initClientWatch() {
                var that = this;
                that.clientWidth = document.documentElement.clientWidth;
                that.clientHeight = document.documentElement.clientHeight;
                that.onClientSizeChange(that.clientWidth, that.clientHeight);
                window.onresize = () => {
                    return (() => {
                        that.clientWidth = document.documentElement.clientWidth;
                        that.clientHeight = document.documentElement.clientHeight;
                        that.onClientSizeChange(that.clientWidth, that.clientHeight);
                    })()
                };
            },
            onClientSizeChange(width, height) {
                if (width > height) {
                    this.ismobile = false;
                    this.$store.commit('setIsMobile', this.ismobile);
                } else {
                    this.ismobile = true;
                    this.$store.commit('setIsMobile', this.ismobile);
                }
            },
            btnCheck() {

            },
            updateAccountInfo(account) {
                if (account) {
                    var bcxAccount = this.$store.state.defBcxAccount;
                    bcxAccount.id = null;
                    bcxAccount.name = account;
                    bcxAccount.locked = false;
                    this.$store.commit('setBcxAccount', bcxAccount);
                    this.$Message.success('欢迎' + account);
                } else {
                    var bcxAccount = this.$store.state.defBcxAccount;
                    bcxAccount.id = null;
                    bcxAccount.name = null;
                    bcxAccount.locked = true;
                    this.$store.commit('setBcxAccount', bcxAccount);
                }
            },
        }

    }
</script>

<style>
    #app {
        font-family: Mercado Sans, PingFang SC, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .layout-footer-center {
        text-align: center;
    }

    .mobile-menu-bg {
        margin: 10px 5px 10px 5px;
    }

    .mobile-menu-item-bg {
        background-color: wheat;
    }

    .grad_botton_text {
        color: #fff;
        font-weight: bold;
        text-align: center;
        line-height: 36px;
    }

    .grad_blue_btn_bg {
        cursor: pointer;
        height: 36px;
        width: 76px;
        border: 3px solid;
        border-image: -webkit-gradient(linear, right top, left top, from(#45d1e1), to(#09483f));
        border-image: linear-gradient(270deg, #45d1e1, #09483f) 1 1 stretch;
        padding: 4px;
    }

    .grad_red_btn_bg {
        cursor: pointer;
        height: 36px;
        width: 76px;
        border: 3px solid;
        border-image: -webkit-gradient(linear, right top, left top, from(#9b3608), to(#4a0d2c)) 1 1 stretch;
        border-image: linear-gradient(270deg, #9b3608, #4a0d2c) 1 1 stretch;
        padding: 4px;
    }
</style>
