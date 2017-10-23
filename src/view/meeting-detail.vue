<template>
    <div id="meetingDetail">
        <div class="list">
            <span>姓名<b>*</b></span>
            <input type="text" placeholder="请输入姓名" v-model="userName" id="name" maxlength="20">
        </div>
        <div class="list">
            <span>单位<b>*</b></span>
            <input type="text" placeholder="请输入单位名称" id="company" readonly v-model="hosName" @click="searchHos=true;searchName='';hosList=[];">
        </div>
        <div class="list">
            <span>地址</span>
            <input type="text" placeholder="请输入地址" id="address">
        </div>
        <div class="name-hos">
            <group>
                <popup-picker title="科室<b style='color:red;'>*</b>" placeholder="请选择您所在的科室" :data="deptList" v-model="dept"></popup-picker>
                <popup-picker title="职称<b style='color:red;'>*</b>" placeholder="请选择您的职称" :data="titleList" v-model="title"></popup-picker>
            </group>
        </div>
        <!--<div class="list">-->
            <!--<span>科室<b>*</b></span>-->
            <!--<input type="text" placeholder="请选择科室" id="dept" readonly>-->
        <!--</div>-->
        <!--<div class="list" >-->
            <!--<span>职称<b>*</b></span>-->
            <!--<select id="title">-->
                <!--<option value="">请选择</option>-->
                <!--<option value="主任医师">主任医师</option>-->
                <!--<option value="副主任医师">副主任医师</option>-->
                <!--<option value="主治医师">主治医师</option>-->
                <!--<option value="住院医师">住院医师</option>-->
                <!--<option value="助理医师">助理医师</option>-->
                <!--<option value="实习医师">实习医师</option>-->
                <!--<option value="医学生">医学生</option>-->
                <!--<option value="其他">其他</option>-->
            <!--</select>-->
        <!--</div>-->
        <div class="list">
            <span>职务</span>
            <input type="text" placeholder="请输入职务" id="duties">
        </div>
        <div class="list">
            <span>手机号码<b>*</b></span>
            <input type="tel" placeholder="请输入手机号码" id="phone">
        </div>
        <div class="list">
            <span>E-mail</span>
            <input type="text" placeholder="请输入邮箱" id="email">
        </div>
        <div class="list radio" style="padding: 10px 0;">
            <span>住宿</span>
            <input type="radio" checked id="he" name="zhu" value="合住" style="margin-left: 10px"><label for="he">合住</label> <input type="radio" id="bao" name="zhu" value="包房"><label for="bao">包房</label> <input type="radio" id="zi" name="zhu" value="自行安排">
            <label for="zi">自行安排 </label>
            <p style="margin-top: 10px;margin-left: .75rem;color: red;padding-right: .12rem;">注：标间150元左右/人/天，四川大学华西校区华西苑宾馆</p>
        </div>
        <button class="submit">提交</button>
        <!--搜索医院-->
        <div class="hospital-modal" id="searchHospital" v-show="searchHos">
            <div class="modal-content">
                <img src="../assets/icon_close_popup@2x.png" alt="" class="close" @click="searchHos=false">
                <p class="modal-title">选择医院</p>
                <div class="modal-input-box">
                    <img src="../assets/icon_search_hospital@2x.png" alt="" class="search-ico">
                    <input type="text" placeholder="搜索医院" v-model="searchName" @keyup="searchHospital()">
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
            <img src="../assets/icon_close_popup@2x.png" alt="" class="close" @click="addHos=false">
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
    export default {
        components:{
            Group,
            PopupPicker,
            XInput,
            Cell
        },
        data(){
            return{
                userName:'',
                searchHos:false,
                addHos:false,
                addName:'',
                hosList:[],
                hosName:'',
                hosId:'',
                searchName:'',
                dept:[],
                deptList:[['']],
                deptAllList:[],
                title:[],
                titleList:[['']],
                titleAllList:[],
                IMGURL:api.BASEIMGURL
            }
        },
        methods:{
            searchHospital(){ //查询医院列表
                var _this = this;
                var modal = {
                    name:_this.searchName
                };
                api.searchHospital(modal).then(function (res) {
                    if(res.code ==='000'){
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
        }
    }
</script>
<style lang="less">
    #meetingDetail{
        font-size: 12px;
    a{text-decoration: none}
    input:-webkit-autofill{-webkit-box-shadow: 0 0 0 1000px white inset !important;}
    input{outline: none}
    .out-box{width: 100%;max-width: 750px;margin: 0 auto;font-size: 12px;padding-bottom: 60px}
    .list{margin-left: .15rem;width: calc(~'100% - .15rem');padding: 2px 0;border-bottom: 1px solid #F2F2F2}
    .list span{display:inline-block;width: .7rem;font-size: .14rem;color: #333}
    .list span b{color: red}
    .list input[type=text],.list input[type=tel]{width: calc(~'100% - .9rem');border: none;height: .4rem;padding-left: 10px;outline: none;font-size: .12rem}
    #dept,#company{
        background: url("../assets/ARROW.png") no-repeat scroll right center transparent;
        background-size: 20px;
    }
    .list select{
        border: none;height: 40px;width: calc(~'100% - .9rem + .1rem');padding-left: .1rem;
        outline: none;
        font-size: .12rem;
        /*color: #999999;*/
        appearance:none;
        -moz-appearance:none;
        -webkit-appearance:none;
        background: url("../assets/ARROW.png") no-repeat scroll right center transparent;
        background-size: 20px;
        /*padding-right: 10px;*/
    }
    .submit{position: fixed;bottom: 0;width: 100%;max-width: 750px;height: 50px;border: none;outline: none;
        background-color: #409eef;font-size: .18rem;color: #ffffff;z-index: 11}
    .radio label{font-size: 14px;margin-right: 10px}
    .radio input[type=radio]{margin-right: 5px;vertical-align: text-bottom;margin-bottom: 1px}

        .name-hos{
            .weui-cells{margin: 0}
            .weui-cells:before{border-top: none}
            .weui-cell{padding: 0;height: .45rem;padding-left: .15rem}
            .weui-label{font-size: .14rem;color: #333;width: .84rem!important;}
            .vux-popup-picker-select{text-align: left!important;font-size: .12rem;color: #333;}
            .weui-input{font-size: .16rem;color: #333;}
            .weui-cell__ft:after{display: none}
            .hos .vux-cell-primary{font-size: .16rem;color: #666;p{display: inline-block;width: .8rem};flex: none}
            .weui-cell__ft{text-align: left;font-size: .16rem;}
            .vux-popup-picker-placeholder{font-size: .12rem!important;color: #666!important;}
            .weui-cells:after{border: none;}
            .vux-cell-box:before{border: none}
            .vux-cell-box:after{
                content: " ";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 1px;
                border-top: 1px solid #D9D9D9;
                color: #D9D9D9;
                transform-origin: 0 0;
                transform: scaleY(0.5);
                left: 15px;
            }
        }


    .modal{position: fixed;top: 0;left: 0;width: 100%;font-size: 12px;background-color: white;display: none;height: 100%;overflow: hidden;z-index: 12}
    .modal>div{float: left;max-height: 100%;overflow-y: scroll}
    .left-box{width: 40%}
    .left-box a{display:block;height: .4rem;text-align: center;color: #666666;width: 100%;border-right: 1px solid rgba(1,1,1,.1);
        line-height: .4rem;border-bottom: 1px solid rgba(1,1,1,.1);background-color: rgba(1,1,1,.03)}
    .left-box a.active{background: #fff;border-right-color: transparent;}
    .right-box{width: 56%;position: absolute;right: 0}
    .right-box a{display: block;width: 100%;height: .4rem;line-height: .4rem;color: #666666;border-bottom: 1px solid rgba(1,1,1,.1)}
    .left-box .active{background-color: white}



    .hospital-modal{width: 100%;height: 100%;position: fixed;left:0;top:0;right: 0;bottom:0;margin: auto;
        background: rgba(0,0,0,.4);font-size: 0}
    .hospital-modal.show{display: block;}
    .modal-content{width: 3.15rem;height: 2.19rem;left:0;right: 0;margin: auto;
        top:1.6rem;background: #fff;position: absolute;padding: .15rem .2rem .2rem;box-sizing: border-box}
    #addHospital .modal-content{height: auto;}
    .modal-content .close{width: .16rem;height: .16rem;position: absolute;right: .14rem;top:.14rem;}
    .modal-title{font-size: .16rem;color: #333;text-align: center}
    .modal-input-box{overflow: hidden;height: .32rem;border:1px solid #dfdfdf;border-radius: 4px;margin-top: .16rem;margin-bottom: .08rem;}
    .modal-input-box .search-ico{display: inline-block;width: .15rem;height: .17rem;vertical-align: middle;margin-left: .1rem;}
    .modal-input-box>input{height: 100%;display: inline-block;border:none;margin-left: .05rem;vertical-align: middle;width: 82%;}
    .modal-hos-result{}

    .modal-hos-item{padding: .08rem .05rem;font-size: .14rem;color: #666;}
    .modal-hos-tips{font-size: .14rem;color: #999;margin: .35rem 0 .2rem;text-align: center}
    .modal-hos-none{margin: .15rem 0 0; text-align: center;}
    .modal-hos-none>img{width: .18rem;height: .18rem;vertical-align: middle;position: relative; top: .01rem;}
    .modal-hos-none>span{font-size: .16rem;color: #338ae0;vertical-align: middle;margin-left: .06rem;}
    .enter-add{display: block;margin: .2rem auto 0;font-size: .18rem;color: #fff;
        line-height: .44rem;text-align: center;background: #338ae0;border-radius: 4px;}
    }
</style>