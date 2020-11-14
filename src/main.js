import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VConsole from 'vconsole'
import i18n from './lang';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';


import 'material-icons/iconfont/material-icons.css';

import timeout from 'timeout';
import Icon from 'vue-svg-icon/Icon.vue';

Vue.config.productionTip = false;




Vue.use(iView);
Vue.use(MuseUI);
Vue.component('icon', Icon);

// if (process.env.NODE_ENV === 'production') {
// let vConsole = new VConsole();
// Vue.use(vConsole);
// }

// let vConsole = new VConsole();
// Vue.use(vConsole);

Vue.prototype.$e = new Vue();
Vue.prototype.$timeout=timeout;
//正式配置
Vue.prototype.$mainContract="contract.coswap";
Vue.prototype.$mineSym="CFS";
Vue.prototype.$stopTime=1601868870;

//测试配置
// Vue.prototype.$mainContract="contract.costest";
// Vue.prototype.$mineSym="CFSTEST";
// Vue.prototype.$stopTime=1601810002;



new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
