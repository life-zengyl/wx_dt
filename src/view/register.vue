<template>
    <div id="register">
        <div class="info-box">
            <group>
                <x-input name="mobile" v-model="phone" placeholder="请输入手机号"  is-type="china-mobile" :max="11"></x-input>
            </group>
            <group class="code">
                <x-input placeholder="请输入验证码"  class="weui-vcode" :max="6" v-model="codeNum">
                    <x-button slot="right"  mini @click.native="getCode" :disabled="isClick">{{code}}</x-button>
                </x-input>
            </group>
            <group class="password">
                <x-input placeholder="请设置密码" type="text" v-model="password"></x-input>
            </group>
            <a class="submit-btn" @click="smsRegiste" :class="{'active':isActive}">注册</a>
            <p class="tips">如果没有收到验证码，可致电 <span><a href="tel:0284001816107">400-181-6107</a></span></p>
            <p class="want-login">
                <!--已有账号<span>我要登录</span>-->
            </p>
        </div>
        <div class="select-modal" v-show="showModal" @click.self="showModal=false">
            <div class="modal-box">
                <p class="hd">检测提示</p>
                <div class="bd">
                   <p>检测到您的手机号已注册乐乐医生，请点击下载App！</p>
                </div>
                <a class="fd" href="http://www.leley.com/dt.html">
                    点击下载
                </a>
                <img src="../assets/close@2x.png" class="close-modal" @click="showModal=false">
            </div>
        </div>
    </div>
</template>
<script>
    import {Group,XInput,XButton,Countdown,md5} from 'vux'
    import api from '../server'
    import isMobilePhone from 'validator/lib/isMobilePhone'
    export default{
        _this:this,
        components:{
            Group,
            XInput,
            XButton,
            Countdown,
        },
        data(){
            return {
                showModal:false,
                time:15,
                start:false,
                code:'发送验证码',
                isClick:false,
                phone:'',
                codeNum:'',
                password:''
            }
        },
        computed:{
           isPhone(){
               return isMobilePhone(this.phone,'zh-CN');
           },
            isActive(){
               if(this.isPhone && this.codeNum && this.password){
                   return true;
               }else {
                   return false;
               }
            }
        },
        methods:{
            getCode(){ //获取验证码
                var _this = this;
                if(!this.isPhone){
                    this.$vux.toast.text('请输入正确的手机号！','top');
                    return false;
                }
                this.code = 30;
                this.isClick = true;
                var t = setInterval(function () {
                   _this.code --;
                   if(_this.code == 0){
                       clearInterval(t);
                       _this.code = '重新获取';
                       _this.isClick = false;
                   }
                },1000);
                api.setCode(_this.phone).then(function (res) {
                    if(res.code == '000'){
                        _this.$vux.toast.text('验证码已发送','top')
                    }else if(res.code == '2001'){
                        clearInterval(t);
                        _this.code = '重新获取';
                        _this.isClick = false;
                        _this.showModal = true;
                    }
                })
            },
            smsRegiste(){ //注册
                if(!this.isPhone){
                    this.$vux.toast.text('请输入正确的手机号码！','top');
                    return false;
                }
                if(!this.codeNum){
                    this.$vux.toast.text('请输入验证码','top');
                    return false;
                }
                if(this.password.length<6){
                    this.$vux.toast.text('密码至少6位','top');
                    return false;
                }
                var data = {
                    phone: this.phone,
                    validateCode: this.codeNum,
                    password: md5(this.password).toUpperCase()
                };
                var _this = this;
                api.smsRegiste(data).then(function (res) {
                    if(res.code === '000'){
                        var data = res.data;
                        _this.$router.push('/perfect/'+data.token+'/'+data.uid)
                    }
                })
            }
        }
    }
</script>
<style lang="less">
    #register{
        font-size: 12px;
        .info-box{
            margin: 0 .2rem;
        }
        .weui-cells{margin: 0;}
        .weui-input{height: 2em;line-height:1.6em;overflow: auto;}
        .code .weui-cells:before{border-top: none;}
        .password .weui-cells:before{border-top: none}
        .weui-cell{padding: 0;height: .48rem;font-size: .16rem;color: #333;}
        button.weui-btn_mini{
            width: 1rem;
            height: .28rem;
            background: transparent;
            color: #409eef;
            font-size: .16rem;
            line-height: .28rem;
            border: 1px solid #409eef;
            padding: 0;
        }
        .submit-btn{
            display:inline-block;width: 100%;margin: .2rem 0 .1rem;border-radius: 5px;height: .46rem;text-align: center;line-height: .46rem;
                font-size: .18rem;color: #fff;background-color: #dfdfdf}
        .submit-btn.active{background-color: #409eef}
        .tips{color: #999;font-size: .14rem;span{color: #409eef}}
        .want-login{
            position: fixed;left: 0;bottom: .4rem;text-align: center;width: 100%;font-size: .14rem;color: #999;
            span{color: #409eef}
        }

        .select-modal{
            position: fixed;left: 0;top: 0;z-index: 13;
            width: 100%;
            height: 100%;
            background-color: rgba(1,1,1,.3);
            .modal-box{width: 2.71rem;height: 1.55rem;background-color: #fff;border-radius: .12rem;text-align: center;position: relative;
                margin: 0 auto;margin-top: -0.88rem;top: 50%;padding-top: .2rem;
                .hd{color: #666;font-size: .18rem;margin-bottom: .3rem;}
                .bd a{color: #999;font-size: .16rem;border: 1px solid #999;border-radius: 1rem;padding: .02rem .05rem;}
                .bd a:last-child{margin-left: .1rem}
                .bd a.active{color: #00a560;border-color: #00a560;}
                .bd p{font-size: .14rem;color: #333;padding: 0 .12rem}
                .fd{position: absolute;display:block;height: .48rem;border-top: 1px solid #e9e9e9;bottom: 0;width: 100%;text-align: center;line-height: .48rem;
                    color: #409eef;font-size: .18rem;
                }
                .close-modal{position: absolute;right: -.2rem;top: -.3rem;width: .3rem}
            }
        }
    }
</style>