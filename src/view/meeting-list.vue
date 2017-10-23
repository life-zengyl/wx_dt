<template>
    <div id="meetingList" class="out-box">
        <div class="ticket-box">
            <p class="ticket-title">购票详情</p>
            <table>
                <tr class="table-title">
                    <td>价格</td>
                    <td>说明</td>
                    <td>购票人数</td>
                </tr>
                <tr>
                    <td class="price">
                        <p>会议费（A套餐）</p>
                        <p>¥800:00/人</p>
                    </td>
                    <td class="explain">
                        住宿另计，回单位报销
                    </td>
                    <td class="count">
                        <span class="reduce">-</span><span class="num">4</span><span class="add">+</span>
                    </td>
                </tr>
                <tr>
                    <td class="price">
                        <p>会议费（A套餐）</p>
                        <p>¥800:00/人</p>
                    </td>
                    <td class="explain">
                        住宿另计，回单位报销
                    </td>
                    <td class="count">
                        <span class="reduce">-</span><span class="num">4</span><span class="add">+</span>
                    </td>
                </tr>
            </table>
        </div>
        <div class="divide"></div>
        <div class="list">
            <div class="list-title">
                参会人信息<span><img src="../assets/icon_add_hospital@2x.png">添加参会人员</span>
            </div>
            <div class="list-box">
                <span class="delete">-</span><span class="name">任友超</span><span class="hos">四川华西第四医院</span><span class="dept">儿科</span>
            </div>
        </div>
        <button class="submit">提交订单支付</button>
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
    #meetingList{
        font-size: 12px;
        min-height: 100%;
        background-color: #f2f2f2;
        //购票详情
        .ticket-box{
            padding-left: .12rem;
            background-color: #fff;
            .ticket-title{
                height: .45rem;
                line-height: .45rem;
                font-size: .14rem;
                color: #999;
            }
            table{
                width: 100%;
                text-align: center;
                border-spacing: 0;
                tr{
                    height: .45rem;
                    td{
                        border-top: 2px solid #f2f2f2;
                    }
                    .price{
                        p:first-child{font-size: .12rem;color: #333}
                        p:last-child{font-size: .16rem;color: #f6a623}
                    }
                    .explain{font-size: .12rem;color: #666}
                    .count{
                        .reduce,.add,.num{
                            display: inline-block;height: .2rem;width: .2rem;color: #409eef;border: 1px solid #409eef;font-size: .2rem;line-height: .2rem;
                        }
                        .num{border: none;font-size: .16rem;color: #333;margin: 0 .1rem;}
                    }
                }
                tr.table-title{
                    font-size: .13rem;
                    color: #666;
                }
            }
        }
        //分割线
        .divide{width: 100%;height: .12rem;background-color: #f2f2f2;}


        .list{padding-left: .12rem;background-color: #fff}
        .list-title{
            font-size: .14rem;color: #999;height: .45rem;line-height: .45rem;position: relative;
            border-bottom: 1px solid #e9e9e9;
            span{
                position: absolute;
                display: inline-block;
                height: .28rem;
                width: 1.2rem;
                color: #409eef;
                border: 1px solid #409eef;
                font-size: .14rem;
                text-align: center;
                line-height: .28rem;
                vertical-align: middle;
                border-radius: 4px;
                right: .12rem;
                top: .08rem;
                img{height: .16rem;vertical-align: middle;margin-right: .04rem}
            }
        }

        .list-box{
            height: .45rem;
            line-height: .45rem;
            border-bottom: 1px solid #e9e9e9;
            .delete{
                display: inline-block;
                width: .16rem;
                height: .16rem;
                border-radius: .16rem;
                background-color: #999;
                text-align: center;
                line-height: .14rem;
                font-size: .16rem;
                color: #fff;
                margin-right: .14rem;
            }
            .name{font-size: .16rem;color: #333;margin-right: .1rem}
            .hos{font-size: .12rem;color: #666;margin-right: .1rem}
            .dept{font-size: .12rem;color: #666}
        }
        .submit{position: fixed;width: 100%;max-width: 750px;bottom: 0;height: 50px;border: none;outline: none;
            background-color: #409eef;font-size: .16rem;color: #ffffff;}
        .submit img{width: 16px;margin-right: 10px}
    }
</style>