/**
 * Created by xiewl on 2017/6/30.
 */
import api from '../server'
export default function (Vue) {
    (function regWxConfig(reset) {
        api.getWxConfig({
            url : window.location.href.split('#')[0],
            reset : reset
        }).then(function (res) {
            if(res.code === '000'){
                const data = res.data;
                Vue.wechat.config({
                    debug: false,
                    appId: data.appId,
                    timestamp: data.timestamp,
                    nonceStr: data.noncestr,
                    signature: data.signature,
                    jsApiList: ['openLocation','scanQRCode','chooseWXPay','hideMenuItems','startRecord','stopRecord','playVoice','uploadVoice']
                })
            }
        });
        Vue.wechat.ready(function(){
            Vue.wechat.hideMenuItems({
                menuList : ['menuItem:share:qq','menuItem:share:weiboApp','menuItem:favorite','menuItem:share:facebook','menuItem:share:QZone','menuItem:openWithSafari','menuItem:share:email']
            });
        });
        Vue.wechat.error(function(){
            if(reset == 0) regWxConfig(1);
        });
    })(0);
}