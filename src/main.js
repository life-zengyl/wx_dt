import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import regWechat from './utils/regWechat'
import {AlertPlugin,ToastPlugin,WechatPlugin} from 'vux'

Vue.use(AlertPlugin);
Vue.use(ToastPlugin);
Vue.use(WechatPlugin);
router.beforeEach(function (to, from, next) {//路由开始变化
    store.state.isLoading = true;
    next();
});
router.afterEach(function (to, from) {//路由变化结束
    setTimeout(function () {
        store.state.isLoading = false;
    },500);
    //更新title
    document.title = to.meta.title || '';
    regWechat(Vue);
});
new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App)
});
