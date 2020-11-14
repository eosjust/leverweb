import Vue from 'vue'
import Router from 'vue-router'
import fomo from './views/fomo.vue'
import bancor from './views/bancor.vue'
import swap from './views/swap.vue'
import mine from './views/mine.vue'
import about from './views/About.vue'
import login from './views/login.vue'
import chat from './views/chat.vue'
import test from './views/test.vue'
import airdrop from './views/airdrop.vue'
import profit from './views/profit.vue'
import vote from './views/vote.vue'
import devtest from './views/devtest.vue'


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: mine
        },
        {
            path: '/fomo',
            name: 'fomo',
            component: fomo
        },
        {
            path: '/bancor',
            name: 'bancor',
            component: bancor
        },
        {
            path: '/swap',
            name: 'swap',
            component: swap
        },
        {
            path: '/mine',
            name: 'mine',
            component: mine
        },
        {
            path: '/profit',
            name: 'profit',
            component: profit
        },
        {
            path: '/vote',
            name: 'vote',
            component: vote
        },
        {
            path: '/about',
            name: 'about',
            component:about,
            // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/chat',
            name: 'chat',
            component: chat
        },
        {
            path: '/test',
            name: 'test',
            component: test
        },
        {
            path: '/devtest',
            name: 'devtest',
            component: devtest
        },
        {
            path: '/airdrop',
            name: 'airdrop',
            component: airdrop
        }
    ]
})
