import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState({
        paths: [
            'lang',
        ]
    })],
    state: {
        lang: 'cn',
        ismobile: false,
        defBcxAccount:{
            id:null,
            name:null,
            pluginTryTimes:0,
            locked:true,
            mode:null,
            cocos:'0.00',
            gas:'0.00',
            ptest:'0.00',
            btest:'0.00',
        },
        bcxAccount:{
            id:null,
            name:null,
            pluginTryTimes:0,
            locked:true,
            mode:null,
            cocos:'0.00',
            gas:'0.00',
            ptest:'0.00',
            btest:'0.00',
        }
    },
    mutations: {
        setIsMobile(state,ismobile){
            state.ismobile=ismobile;
        },
        setBcxAccount(state,bcxAccount){
            if(bcxAccount){
                state.bcxAccount.id = bcxAccount.id;
                state.bcxAccount.name = bcxAccount.name;
                state.bcxAccount.locked = bcxAccount.locked;
                state.bcxAccount.mode = bcxAccount.mode;
                state.bcxAccount.cocos = bcxAccount.cocos;
                state.bcxAccount.gas = bcxAccount.gas;
                state.bcxAccount.ptest = bcxAccount.ptest;
                state.bcxAccount.btest = bcxAccount.btest;
            }
        },
        setLang(state,lang){
            state.lang=lang;
        },
    },
    actions: {}
})
