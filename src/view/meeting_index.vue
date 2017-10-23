<template>
    <div id="meetingIndex" class="out-box">
        <img src="../assets/group.png" alt="banner" class="banner">
        <div class="title">
            <h2>2017年国家级继续教育学习班<br>四川省医学会第三届儿科心血管学组第四次会议</h2>
            <p>时间：2017.10.27-10.29</p>
            <p>地点：四川省成都市人民南路三段20号四川大学华西第二医院西部妇幼研究院二楼一会议室，四楼二会议室</p>
        </div>
        <div class="divid"></div>
        <div class="group">
            <div class="g-list active" @click="itemchange($event)">
                <span>主页</span>
            </div>
            <div class="g-list" @click="itemchange($event)">
                <span>参会嘉宾</span>
            </div>
            <div class="g-list" @click="itemchange($event)">
                <span>会议日程</span>
            </div>
            <div class="g-list" @click="itemchange($event)">
                <span>联系我们</span>
            </div>
            <div class="clear"></div>
        </div>
        <div class="context-box">
            <div class="index">
                <div class="index-list">
                    <div class="index-title">
                        <span>- 会议内容 -</span>
                    </div>
                    <ul>
                        <li><span></span>儿科心血管疾病热点问题的识别及处理：心律失常、休克、心力衰竭、晕厥、咯血等。</li>
                        <li><span></span>川崎病临床实践特殊问题：川崎病休克综合征、急腹症为首发症状的川崎病、不完全川崎病的识别等。</li>
                        <li><span></span>先天性心脏病的整体评估及规范化管理，包括新生儿为重先心病的识别及处理等。</li>
                        <li><span></span>心肌炎临床整治若干问题、心肌病病因症断及临床处理。</li>
                        <li><span></span>感染性心内膜炎、风湿热/心脏炎/瓣膜病等的临床处理。</li>
                        <li><span></span>胎儿心血管疾病产前症断、产前干预及咨询的相关培训，包括胎儿心血管疾病围生期规范化管理、羊水穿刺/无创DNA筛查的意义、产前症断报告的解读、遗传咨询相关知识培训等。</li>
                    </ul>
                </div>
            </div>
            <div class="date hide">
                <img src="../assets/doc.png" alt="date">
            </div>
            <div class="plan hide">
                <p class="plan-title">会议时间</p>
                <p class="plan-text">2017年5月26日-5月28日</p>
                <p class="plan-title">报道时间</p>
                <p class="plan-text">2017年5月26日（星期五） 上午8:00-21:00 <br>5月29日撤离</p>
                <p class="plan-title">会议地点</p>
                <p class="plan-text">苏州市三元宾馆（苏州市人民路 887 号）</p>
                <div id="map" style="height: 2rem;width: 100%"></div>
                <p class="plan-title">注册费</p>
                <p class="plan-text">注册费 800 元/人, 研究生凭学生证缴纳注册费 400 元/人，苏州市区医院代表缴纳注册费 400 元/人</p>
            </div>
            <div class="concat hide">
                <img src="../assets/us.png" alt="contact">
            </div>
        </div>
        <button class="submit" @click="modalshow()">提交报名</button>

        <div class="code" v-show="isshow">
            <input type="tel" id="phone" placeholder="请输入手机号码">
            <div class="write-code">
                <input type="tel" id="code" placeholder="请输入验证码">
                <input type="button" maxlength="6" value="获取验证码" id="getCode">
            </div>
            <button id="btn">进入报名</button>
        </div>
        <div class="modal" v-show="isshow" @click="modalhide()"></div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                isshow:false
            }
        },
        methods:{
            modalshow(){ //报名弹出
               this.isshow = true;
            },
            modalhide(){ //报名隐藏
                this.isshow = false;
            },
            itemchange(e){
                var _this = e.currentTarget;
                $(_this).addClass('active').siblings().removeClass('active');
                var index = $('.g-list').index($(_this));
                $('.context-box>div').eq(index).removeClass('hide').siblings().addClass('hide');
//                if(index == 2){
//                    baiduMap();
//                }
            }
        }
    }
</script>
<style lang="less">
    #meetingIndex{
        font-size: 12px;
        width: 100%;
        max-width: 750px;
        margin: 0 auto;
        input{-webkit-appearance: none;}
        .banner{width: 100%}
        .title{padding: .1rem;border-bottom: 1px solid #F2F2F2}
        .title>*{margin-bottom: .03rem}
        .title h2{color: #333333;font-size: .18rem;}
        .title p{font-size: .12rem;color: #666}
        .divid{width: 100%;height: .06rem;background-color: #F6F6F6}
        .group{width: 100%;height: .4rem;border-bottom: 1px solid #f2f2f2}
        .clear{clear: both}
        .group .g-list{float: left;width: 25%;text-align: center;height: 100%;line-height: .4rem;font-size: .14rem;color: #999}
        .group .active{color: #409eef}
        .active span{border-bottom: 3px solid #409eef;padding-bottom: .11rem}
        /*主页*/
        .context-box{padding: 0.1rem;padding-bottom: .6rem}
        .index-title{text-align: center;padding: .3rem 0;border-bottom: 1px dashed #f2f2f2}
        .index-title span {padding: .05rem .1rem;font-size: .14rem;background-color: #409EEF;color: #ffffff;position: relative}
        .index-title span:after{content: '';display: inline-block;border: 1px solid #B3D8F9;
            position: absolute;top: 3px;left: 3px;width: 100%;height: 100%;z-index: -1}
        /*.index-list ul{padding-left: .12rem}*/
        .index-list ul li{padding: .1rem 0;border-bottom: 1px dashed #f2f2f2;list-style: none;font-size: .12rem;color: #333333}
        .index-list ul li span{display: inline-block;width: 5px;height: 5px;border-radius: 20px;background-color: #bdbdbd;
            margin-right: 5px;vertical-align: middle}
        .hide{display: none}
        /*会议安排*/
        .plan-title{padding: .05rem 0;font-size: .12rem;color: #999999}
        .plan-text{color: #333333;font-size: .14rem;margin-bottom: .1rem}
        /*联系我们*/
        .concat-title{padding: .1rem 0;font-size: .12rem;color: #999999;}
        .concat-text{font-size: .14rem;color: #333333;margin-bottom: .05rem}
        .submit{position: fixed;bottom: 0;width: 100%;max-width: 750px;height: .4rem;color: #ffffff;font-size: .16rem;
            background-color: #409eef;border: none;outline: none}
        .concat img{width: 100%}
        /*日程安排*/
        .date{padding: .1rem 0}
        .date img{width: 100%}
        /*弹窗*/
        .code{position: fixed;bottom: 0;width: 100%;max-width: 750px;background-color: #F2F2F2;height: 200px;z-index: 12;}
        .code>input{margin: 20px;width: calc(~'100% - .5rem');height: 40px;border-radius: 4px;border:1px solid #bdbdbd;padding-left: 10px;font-size: .14rem}
        .code>div{margin:0 20px;width: calc(~'100% - .4rem');position: relative}
        .write-code input{height: .4rem;border-radius: 4px;border: 1px solid #bdbdbd}
        .write-code input[type=tel]{width: calc(~'60% - .1rem');padding-left: 10px;font-size: .14rem}
        .write-code input[type=button]{width: 35%;position: absolute;right: 0;background-color: #EAF7FF;font-size: .12rem;
            color: #529EDE}
        .code>button{margin: 20px;width: calc(~'100% - .4rem');height: 45px;border: none;outline: none;
            border-radius: 4px;background-color: #409eef;font-size: .16rem;color: #ffffff}
        .modal{width: 100%;height: 100%;background-color: rgba(1,1,1,.4);position: fixed;top: 0;left: 0;z-index: 11;}
    }
</style>