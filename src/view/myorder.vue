<template>
    <div id="myOrder">
        <div class="order-list">
            <div class="order-box">
                <span class="name">订单号：</span>
                <span class="detail">TASJDAJD</span>
            </div>
            <div class="order-box">
                <span class="name">人数：</span>
                <span class="detail">4</span>
            </div>
            <div class="order-box">
                <span class="name">实付款：</span>
                <span class="detail">¥3200:00</span>
                <span class="pay">去支付</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{

            }
        }
    }
</script>
<style lang="less">
    #myOrder{
        font-size: 12px;
        min-height: 100%;
        background-color: #f2f2f2;
        .order-list{
            padding: .12rem;
            background-color: #fff;
            .order-box:not(:last-child){
                margin-bottom: .05rem;
            }
            .order-box{
                position: relative;
                .name{
                    display: inline-block;
                    width: .6rem;
                    text-align: right;
                    font-size: .14rem;
                    color: #999;
                }
                .detail{
                    font-size: .14rem;color: #333;
                }
                .pay{
                    display: inline-block;
                    width: .6rem;
                    height: .2rem;
                    text-align: center;
                    line-height: .2rem;
                    font-size: .14rem;
                    color: #1bac19;
                    border: 1px solid #1bac19;
                    border-radius: 4px;
                    position: absolute;
                    right: 0;
                    top: 0;
                }
            }
        }
    }
</style>