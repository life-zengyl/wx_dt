<template>
    <div id="pay">
        <div class="pay-title">
            购票详情
        </div>
        <div class="list-box">
            <div class="list">
                <span class="name">订单号：</span>
                <span class="detail">PSADJKHJADKJ</span>
            </div>
            <div class="list">
                <span class="name">票种名称：</span>
                <span class="detail">会议费</span>
            </div>
            <div class="list">
                <span class="name">数量：</span>
                <span class="detail">4 <span>张</span></span>
            </div>
            <div class="list">
                <span class="name">实付：</span>
                <span class="detail price">¥3200</span>
            </div>
        </div>
        <div class="btn">
            <button>微信支付</button>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{

            }
        },
        methods:{

        }
    }
</script>
<style lang="less">
    #pay{
        font-size: 12px;
        min-height: 100%;
        background-color: #f2f2f2;
        .pay-title{
            background-color: #fff;
            height: .45rem;line-height: .45rem;padding-left: .12rem;font-size: .14rem;color: #999;border-bottom: 1px solid #f2f2f2;
        }
        .list-box{
            padding-left: .12rem;
            background-color: #fff;
            .list{
                height: .45rem;
                line-height: .45rem;
                border-bottom: 1px solid #f2f2f2;
                .name{
                    display: inline-block;
                    width: .8rem;
                    text-align: right;
                    font-size: .16rem;
                    color: #999;
                }
                .detail{
                    font-size: .16rem;
                    color: #333;
                    span{color: #999}
                }
                .detail.price{color: #F6A623}
            }
        }
        .btn{
            width: 100%;
            max-width: 750px;
            text-align: center;
            margin-top: .3rem;
            button{
                border: none;
                outline: none;
                width: 3.32rem;
                height: .49rem;
                background-color: #1bac19;
                color: #fff;
                border-radius: 4px;
                font-size: .18rem;
            }
        }

    }
</style>