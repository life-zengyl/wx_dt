/**
 * Created by lw on 2017-7-7.
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

export default  new Router({
    routes:[
        {
            path:'/',
            component:function (resolve) {
                require(['./view/register.vue'],resolve)
            },
            name:'register',
            meta:{
                title:'快速注册'
            }
        },
        {
            path:'/perfect/:token/:phone',
            component:function (resolve) {
                require(['./view/perfect.vue'],resolve)
            },
            name:'perfect',
            meta:{
                title:'资料完善'
            }
        },
        {
            path:'/meetingindex',
            component:function (resolve) {
                require(['./view/meeting_index.vue'],resolve)
            },
            name:'meetingindex',
            meta:{
                title:'会议主页'
            }
        },
        {
            path:'/meetinglist',
            component:function (resolve) {
                require(['./view/meeting-list.vue'],resolve)
            },
            name:'meetinglist',
            meta:{
                title:'人员列表'
            }
        },
        {
            path:'/meetingdetail',
            component:function (resolve) {
                require(['./view/meeting-detail.vue'],resolve)
            },
            name:'meetingdetail',
            meta:{
                title:'添加详情'
            }
        },
        {
            path:'/pay',
            component:function (resolve) {
                require(['./view/pay.vue'],resolve)
            },
            name:'name',
            meta:{
                title:'支付'
            }
        },
        {
            path:'/error',
            component:function (resolve) {
                require(['./view/error.vue'],resolve)
            },
            name:'error',
            meta:{
                title:'错误'
            }
        },
        {
            path:'/myorder',
            component:function (resolve) {
                require(['./view/myorder.vue'],resolve)
            },
            name:'myorder',
            meta:{
                title:'我的订单'
            }
        }
    ]
})