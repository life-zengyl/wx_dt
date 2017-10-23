/**
 * Created by lw on 2017-5-31.
 */
import axios from 'axios'
import qs from 'qs'
import $ from 'jquery'


//预发配置
const MODEL = 'dev';
//线上配置
// const MODEL = 'dist';

let BASEURL,DOCURL,BASEIMGURL,UPLOADIMGURL;
if(MODEL === 'dev'){
    BASEURL = 'http://101.201.146.121/';
    DOCURL = 'http://api.leley.org:8082/';
    BASEIMGURL = 'http://img.leley.org/';
    UPLOADIMGURL = 'http://oss.leley.org:8085/';
}else if(MODEL === 'dist'){
     BASEURL = 'http://47.93.158.251';
     DOCURL = 'http://api.leley.com';
     BASEIMGURL = 'http://img.leley.com/';
     UPLOADIMGURL = 'http://oss.leley.com/';
}
axios.defaults.timeout = 15000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    //在发送请求之前做某件事
    var defaultParam = {
        'REQTIME' : Date.now()
    };
    config.data=$.extend({},config.data,defaultParam);
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
    // _.toast("错误的传参", 'fail');
    return Promise.reject(error);
});

const errorAlert = function (errorStr) {
    const html = '<div id="modalErrorTips" style="position: fixed;top: 0;left: 0;width:100%;height:100%;text-align: center;font-size: .12rem;opacity: 0;z-index: 999">' +
        '<p style="display:inline-block;background-color: rgba(1,1,1,.7);padding: .1rem .15rem;border-radius: .08rem;color: white;">'+errorStr+'</p>' +
        '</div>';
    $('body').append(html);
    setTimeout(function () {
        $('#modalErrorTips').css({opacity:'1',top:'.15rem',transition:'all .1s linear'})
    },10);
    setTimeout(function () {
        $('#modalErrorTips').css({opacity:'0',top:'0',transition:'all .1s easy-out'})
    },1000);
    setTimeout(function () {
        $('#modalErrorTips').remove();
    },1100);
};
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
    if(res.data && res.data.code!== '000' && res.data.code!=='2001'
        && res.request.responseURL.indexOf('wx/dt/js/getPhoneByCode') < 0
        && res.request.responseURL.indexOf('wxUser/bindingPhone') < 0
    ) errorAlert(res.data.msg || '接口请求失败');
    return res;
}, (error) => {
    errorAlert('网络错误，请检查网络设置');
    return Promise.reject(error);
});


//返回一个Promise(发送post请求)
export function fetch(modal) {
    return new Promise((resolve, reject) => {
        const obj = {
            method: 'post'
        };
        modal = $.extend(true,obj,modal);
        axios(obj).then(response =>{
            resolve(response.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}

export default {
    MODEL,
    BASEIMGURL,
    UPLOADIMGURL,
    getPhoneByCode(code){ //获取openid和phone
        return fetch({
            url: BASEURL + 'wx/dt/js/getPhoneByCode',
            data: {
                code:code
            }
        })
    },
    getWxConfig(data){  //获取微信签名
        return fetch({
            url :  BASEURL +'wx/dt/js/getsign',
            data : data
        })
    },
    uploadImg(data,callback){ //上传图片
        $.ajax({
            type: 'POST',
            url: UPLOADIMGURL + 'live/uploadImg',
            data: data,
            contentType: false,
            processData: false,
            complete: function (XMLHttpRequest, textStatus) {
                var json = '';
                try{
                    json = JSON.parse(XMLHttpRequest.responseText);
                }catch(e){
                    json = {
                        code : '99999',
                        msg : '服务器错误'
                    }
                }
                callback(json,textStatus);
            }
        })
    },
    setCode(phone){  //获取验证码
        return fetch({
            url: BASEURL + 'doctor/sendRegisteSms',
            data:{
                phone:phone
            }
        })
    },
    smsRegiste(data){ //快速注册
        return fetch({
            url : BASEURL + 'doctor/smsRegiste',
            data: data
        })
    },
    updateDoctorInfo(data){ //完善资料
        return fetch({
            url: BASEURL + 'doctor/updateDoctorInfo',
            data: data
        })
    },
    searchHospital(modal){ //搜索医院
        return fetch({
            url: DOCURL +'v1/cloud/userdata',
            data:{
                METHOD:'hospitals',
                RECDATA:JSON.stringify(modal)
            }
        })
    },
    addHospital(name){ //新增医院
        return fetch({
            url:DOCURL+ 'v1/cloud/userdata',
            data:{
                METHOD:'addhospital',
                RECDATA:JSON.stringify({
                    hospitalname:name
                })
            }
        })
    },
    getDoctorTitleAndDept(){ //获取职称和科室
        return fetch({
            url : DOCURL + 'v1/cloud/userdata',
            data:{
                METHOD:'getdoctortitleanddept',
                RECDATA:''
            }
        })
    }




}