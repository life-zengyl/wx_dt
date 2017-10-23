<template>
  <div id="app" class="show">
    <x-progress v-bind:percent="percent" v-bind:class="{disabled : (percent == 0)}"
                :show-cancel="false"></x-progress>
    <router-view></router-view>
  </div>
</template>

<script>
    import {XProgress} from 'vux'
    import { mapState } from 'vuex'
    import api from './server'
    export default {
        components:{
            XProgress
        },
        data () {
          return {
              percent:0
          }
        },
        beforeCreate(){
            const _this =this;
            //禁止在非微信页面中打开
            if(navigator.userAgent.toLocaleLowerCase().indexOf('micromessenger') < 0){
                _this.$router.replace('/error');
            }
            //获取url中的search
            let paramObj = {};
            if(location.search){
                const paramStr = location.search.split('?')[1];
                const temp = paramStr.split('&');
                temp.map(function (item) {
                    paramObj[item.split('=')[0]] = item.split('=')[1];
                });
            }
            //获取openId和phone
            if(api.MODEL === 'dev'){
                _this.$store.state.openId = localStorage.openId;
                _this.$store.state.phone = localStorage.phone;
            }else if(api.MODEL === 'dist'){
                _this.$store.state.openId = localStorage.openId;
                _this.$store.state.phone = localStorage.phone;
            }
            //计数器，防止接口错误进入死循环
            localStorage.getOpenIdTimes = localStorage.getOpenIdTimes || 0;
            //获取OpenId和phone
            if(paramObj.code && localStorage.code != paramObj.code){
                localStorage.code = paramObj.code;
                api.getPhoneByCode(paramObj.code).then(function (res) {
                    localStorage.getOpenIdTimes++;
                    if(res.code === '000'){
                        localStorage.removeItem('getOpenIdTimes');
                        const data = res.data;
                        if(data.subscribe == '1'){
                            _this.$store.state.openId = localStorage.openId = data.openId || '';
                            _this.$store.state.phone = localStorage.phone = data.phone || '';
                        }else {
                            _this.$router.replace('/error')
                        }
                    }else {
                        if(localStorage.getOpenIdTimes <2 ){
                            const href = encodeURIComponent(location.origin + '/' + location.hash);
                            let appid = '';
                            if(api.MODEL === 'dev'){
                                appid = 'wx8843ccd5d6dde708';
                            }else if(api.MODEL === 'dist'){
                                appid = 'wxf7335c0beef7ae9c';
                            }
                            location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ appid +'&redirect_uri='+ href +'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
                        }else {
                            _this.$router.replace('/error');
                            localStorage.getOpenIdTimes = 0;
                        }

                    }
                })
            }
        },
        computed:{
            ...mapState({
                isLoading: state => state.isLoading
            }),
        },
        watch: {
            isLoading : function () {
                if(this.isLoading === true){
                    this.percent = 95;
                }else if(this.isLoading === false){
                    this.percent = 0;
                }
            },
        },
        created(){
            (function calcHtmlFontSize() {
                let width = document.body.clientWidth;
                if(width < 320) width = 320;
                else if(width > 750) width = 750;
                document.getElementsByTagName('html')[0].style.fontSize = width*100/375 + 'px';
                window.onresize = function () {
                    let width = document.body.clientWidth;
                    if(width < 320) width = 320;
                    else if(width > 750) width = 750;
                    document.getElementsByTagName('html')[0].style.fontSize = width*100/375 + 'px';
                };
            })();
        },
}
</script>

<style>
    html{font-size:100px}
    html,body,#app{height: 100%;background: #fff;font-family:'Microsoft YaHei','宋体',sans-serif;}
    #app{width:100%;max-width:750px;margin:0 auto;opacity: 0;visibility: hidden;}
    #app.show{opacity: 1;visibility: visible;}
    *{margin:0;padding:0}
    i{font-style:normal}
    h1,h2{font-weight:400}
    ul{list-style-type:none;padding:0}
    li{display:inline-block;margin:0 10px}
    a{text-decoration:none;color: inherit;}
    input,textarea{font-family: 'Microsoft YaHei','宋体',sans-serif}

    /*进度条*/
    .weui-progress{position:fixed;top:0;width:100%;z-index:999;max-width:750px;left:0;right:0;margin:auto}
    .weui-progress.disabled{opacity:0;visibility:hidden}
    .weui-progress__inner-bar{transition:all .35s ease-out;background-color:#01A7E1!important}
    .weui-progress__bar{position:relative}
    /*.weui-progress__bar:after{background-image:url(./assets/loading_2.gif);width:8px;height:8px;position:absolute;right:0;left:0;margin:auto;bottom:-12px;background-size:100%}*/
    .component-fade-enter-active,.component-fade-leave-active{transition:opacity .3s ease}
    .component-fade-enter,.component-fade-leave-active{opacity:0}
  /**/
    .vux-x-dialog{font-size: 0;}
    .weui-mask{background: rgba(0,0,0,.3)!important;}
    .weui-dialog{width: 2.66rem !important;max-width: 2.7rem !important;border-top: 4px solid #01A7E1}
    .weui-dialog__hd{padding: .15rem 0 .2rem 0 !important;color: #666;font-size: .18rem}
    .weui-dialog__bd{font-size: .14rem!important;color: #333!important;padding:0 0 .2rem 0!important;min-height: .14rem!important;}
    .weui-dialog__ft{font-size: .18rem!important;}
    .weui-dialog__btn_default{color: #999 !important;height: .52rem!important;}
    .weui-dialog__btn_primary{color: #01A7E1 !important;height: .52rem!important;}
    .weui-dialog__ft:after{border: none!important;}
    .weui-dialog__btn:after{border-left: none!important;}

    .weui-toast.weui-toast_text{width: auto!important;padding: .1rem .15rem!important;border-radius: .08rem!important;height: auto;top: .15rem;}
    .weui-toast_text .weui-toast__content{padding: 0!important;font-size: .12rem;}

    #tableBar{position:fixed;bottom:0;left:0;max-width:750px;right:0;margin:auto}
    .weui-tabbar__item{background-color:#fff;padding-top:.05rem!important}
    .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon>i,.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{color:#01A7E1!important}
    .weui-tabbar__item:nth-of-type(3).weui-bar__item_on .weui-tabbar__label{color: #e2bc81!important;}
    .weui-tabbar__icon{width:.26rem!important;height:.22rem!important;margin-bottom: .04rem;}
    .weui-tabbar__label{font-size:.12rem!important}
    .weui-tabbar__label{line-height:1!important;margin-bottom:.05rem;margin-top:.01rem}
</style>
