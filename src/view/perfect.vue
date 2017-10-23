<template>
    <div id="perfect">
        <div class="banner">
            <img src="../assets/bg@2x.png">
            <div class="upload-box" :style="{backgroundImage: 'url('+ fullPhotoUrl +')'}">
                <input type="file" @change="uploadImg($event)">
                <img v-show="uploading" class="loading" src="../assets/loading.gif" alt="">
            </div>
        </div>
        <div class="name-hos">
            <group>
                <x-input class="username" title="真实姓名:" placeholder="请输入您的真实姓名" v-model="userName"></x-input>
               <cell class="hos" title="医院：" :value="hosName" @click.native="searchHos=true;searchName='';hosList=[{name:''}]"></cell>
            </group>
        </div>
        <div class="perfect-title">
            选填
        </div>
        <div class="name-hos">
            <group>
                <popup-picker title="科室:" placeholder="请选择您所在的科室" :data="deptList" v-model="dept"></popup-picker>
                <popup-picker title="职称:" placeholder="请选择您的职称" :data="titleList" v-model="title"></popup-picker>
            </group>
        </div>
        <a class="submit-btn" @click="perfectData" :class="{'active':isClick}">提交</a>
        <!--搜索医院-->
        <div class="hospital-modal show" id="searchHospital" v-show="searchHos">
            <div class="modal-content">
                <img src="../assets/icon_close_popup@2x.png" class="close" @click="searchHos=false">
                <p class="modal-title">选择医院</p>
                <div class="modal-input-box">
                    <img src="../assets/icon_search_hospital@2x.png" alt="" class="search-ico">
                    <input type="text" placeholder="搜索医院" v-model="searchName" @keyup="searchHospital">
                </div>
                <div class="modal-hos-result">
                    <p class="modal-hos-item" v-for="(n,index) in hosList" v-show="index<3"  @click="choiceHos(n)">{{n.name}}</p>
                    <p class="modal-hos-tips" v-if="hosList.length==0">没法找到医院，请点击添加医院</p>
                    <p class="modal-hos-none" v-if="hosList.length==0" @click="addHos=true">
                        <img src="../assets/icon_add_hospital@2x.png" alt="">
                        <span>增加新医院</span>
                    </p>
                </div>
            </div>
        </div>
        <!--新增医院-->
        <div class="hospital-modal" id="addHospital" v-show="addHos">
            <div class="modal-content">
                <img src="../assets/icon_close_popup@2x.png" class="close" @click="addHos=false">
                <p class="modal-title">增加新医院</p>
                <div class="modal-input-box">
                    <input type="text" placeholder="输入医院名称" v-model="addName">
                </div>
                <a href="javascript:;" class="enter-add" @click="addHospital">确定</a>
            </div>
        </div>
    </div>
</template>
<script>
    import {Group,PopupPicker,XInput,Cell} from 'vux'
    import api from '../server'
    export default{
        components:{
            Group,
            PopupPicker,
            XInput,
            Cell
        },
        data(){
            return {
                userName:'',
                searchHos:false,
                addHos:false,
                addName:'',
                hosList:[{name:'123'}],
                hosName:'请选择医院',
                hosId:'',
                searchName:'',
                dept:[],
                deptList:[['']],
                deptAllList:[],
                title:[],
                titleList:[[' ']],
                titleAllList:[],
                IMGURL:api.BASEIMGURL,
                uploading : false,
                fullPhotoUrl : require('../assets/portrait@2x.png'),
                photo : ''
            }
        },
        created(){
            this.$wechat.hideMenuItems({
                menuList : [ //禁止本页面分享出去
                    'menuItem:copyUrl',
                    'menuItem:share:appMessage',
                    'menuItem:share:timeline',
                ]
            })
        },
        methods:{
            searchHospital(){ //搜索医院
                var _this = this;
                var modal = {
                    name:_this.searchName
                };
                api.searchHospital(modal).then(function (res) {
                    if(res.code === '000'){
                        _this.hosList = JSON.parse(res.data);

                    }
                })
            },
            choiceHos(index){ //选择医院
                this.hosName = index.name;
                this.hosId = index.rid;
                this.searchHos = false;
            },
            addHospital(){
                var _this = this;
                api.addHospital(this.addName).then(function (res) {
                    if(res.code === '000'){
                        var data = JSON.parse(res.data);
                        _this.hosName = data.name;
                        _this.hosId = data.rid;
                        _this.addHos = false;
                        _this.searchHos = false;
                    }
                })
            },
            perfectData(){ //完善资料
                var _this = this;
                if(!this.userName){
                    this.$vux.toast.text('请填写您的真实姓名','top');
                    return false;
                }
                if(!this.hosId){
                    this.$vux.toast.text('请选择医院','top');
                    return false;
                }
                var data = {
                    name:_this.userName,
                    hospitalId:_this.hosId,
                    deptId:_this.deptId,
                    titleId:_this.titleId,
                    token:_this.$route.params.token,
                    phone:_this.$route.params.phone,
                    photo : _this.photo
                };
                api.updateDoctorInfo(data).then(function (res) {
                    if(res.code == '000'){
                        location.replace('http://www.leley.com/dt.html')
                    }
                })
            },
            uploadImg(evt){ //上传图片
                const _this = this;
                if(_this.uploading) return false;
                _this.uploading = true;
                const formdata = new FormData();
                const fileObj = evt.target.files;
                for (let i = 0; i < fileObj.length; i++){
                    formdata.append("web", fileObj[i]);
                }
                api.uploadImg(formdata,function (res) {
                    _this.uploading = false;
                    if(res.code === '000'){
                        const data = JSON.parse(res.data);
                        _this.photo = data.url;
                        _this.fullPhotoUrl = _this.IMGURL + data.url;
                    }else {
                        _this.$vux.toast.show({
                            text:'上传失败',
                            positon:'top',
                            type:'text',
                            time: 2000
                        })
                    }
                })
            }
        },
        mounted(){
            var _this = this;
              api.getDoctorTitleAndDept().then(function (res) {
                  if(res.code === '000'){
                      var data = JSON.parse(res.data);
                      _this.deptAllList = data.dept;
                      _this.titleAllList = data.title;
                      _this.deptList[0].splice(0,1);
                      _this.titleList[0].splice(0,1);
                      data.dept.sort(function (a, b) {
                          return a.deptName.localeCompare(b.deptName);
                      });
                      data.dept.map(function (index) {
                           _this.deptList[0].push(index.deptName);
                      });
                      data.title.map(function (index) {
                          _this.titleList[0].push(index.title)
                      });
                  }
              })
        },
        computed:{
            deptId(){
                var _this = this;
                var deptId;
                this.deptAllList.map(function (index) {
                    if(index.deptName == _this.dept.join('')){
                      deptId = index.rid;
                        return;
                    }
                });
                return deptId;
            },
            titleId(){
                var _this = this;
                var titleId;
                this.titleAllList.map(function (index) {
                    if(index.title == _this.title.join('')){
                        titleId = index.rid;
                        return;
                    }
                });
                return titleId;
            },
            isClick(){
                if(this.userName && this.hosId){
                    return true
                }else {
                    return false;
                }
            }
        }
    }
</script>
<style lang="less">
    #perfect{
        font-size: 12px;
        .banner{
            width: 100%;overflow: hidden;position: relative;
            img{width: 100%;}
            .upload-box{
                width: .8rem;height: .8rem;border-radius: .8rem;position: absolute;top: .3rem;margin-left: -.4rem;left: 50%;overflow: hidden;
                border: 4px solid #fff;background-size: contain;background-repeat: no-repeat;background-position: center;background-color:#fff;
                input[type='file']{width: 100%;height: 100%;border-radius: .8rem;opacity: 0}
                .loading{width: 100%;height: 100%;border-radius: 50%;position: absolute;left:0;top:0;}
            }
        }
        .name-hos{
            .weui-cells{margin: 0}
            .weui-cells:before{border-top: none}
            .weui-cell{padding: 0;height: .48rem;padding-left: .15rem}
            .weui-label{font-size: .16rem;color: #666;width: .8rem!important;}
            .vux-popup-picker-select{text-align: left!important;font-size: .16rem;color: #333;}
            .weui-input{font-size: .16rem;color: #333;}
            .weui-cell__ft:after{display: none}
            .hos .vux-cell-primary{font-size: .16rem;color: #666;p{display: inline-block;width: .8rem};flex: none}
            .weui-cell__ft{text-align: left;font-size: .16rem;}
        }
        .perfect-title{
            padding: .1rem 0 .04rem .12rem;font-size: .12rem;color: #999;
            background-color: #f2f2f2;
        }
        .submit-btn{
            width: 2.91rem;display: inline-block;height: .44rem;font-size: .18rem;color: #fff;background-color: #dfdfdf;text-align: center;
            line-height: .44rem;margin-left: .42rem;margin-top: .2rem;border-radius: .04rem;
        }
        .submit-btn.active{background-color: #409eef;}

        .hospital-modal{width: 100%;height: 100%;position: fixed;left:0;top:0;right: 0;bottom:0;margin: auto;background: rgba(0,0,0,.4);}
        .hospital-modal input{outline: none}
        .modal-content{width: 3.15rem;height: 2.19rem;left:0;right: 0;margin: auto;
            top:1.6rem;background: #fff;position: absolute;padding: .15rem .2rem .2rem;box-sizing: border-box}
        #addHospital .modal-content{height: auto;}
        .modal-content .close{width: .16rem;height: .16rem;position: absolute;right: .14rem;top:.14rem;}
        .modal-title{font-size: .16rem;color: #333;text-align: center}
        .modal-input-box{overflow: hidden;height: .32rem;border:1px solid #dfdfdf;border-radius: .04rem;margin-top: .16rem;margin-bottom: .08rem;}
        .modal-input-box .search-ico{display: inline-block;width: .15rem;height: .17rem;vertical-align: middle;margin-left: .1rem;}
        .modal-input-box>input{height: 100%;display: inline-block;border:none;margin-left: .05rem;vertical-align: middle;width: 82%;font-size: .12rem;}
        .modal-hos-result{}

        .modal-hos-item{padding: .08rem .05rem;font-size: .14rem;color: #666;}
        .modal-hos-tips{font-size: .14rem;color: #999;margin: .35rem 0 .2rem;text-align: center}
        .modal-hos-none{margin: .15rem 0 0; text-align: center;}
        .modal-hos-none>img{width: .18rem;height: .18rem;vertical-align: middle;position: relative; top: .01rem;}
        .modal-hos-none>span{font-size: .16rem;color: #338ae0;vertical-align: middle;margin-left: .06rem;}
        .enter-add{display: block;margin: .2rem auto 0;font-size: .18rem;color: #fff;
            line-height: .44rem;text-align: center;background: #338ae0;border-radius: .04rem;}

    }
</style>