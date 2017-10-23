/**
 * Created by lw on 2017-5-11.
 */
var hosName,hosId;
$(function () {
    //搜索医院
    $('#searchHospital .modal-input-box input').keyup(function () {
        var name = $(this).val().trim();
        var modal = {
            name: name
        };
        if(name){
            new HttpRequest().hospitals(modal,function (res) {
                if(res.code ='000'){
                    var data = JSON.parse(res.data);
                    var html = '';
                    if(data.length>0){
                        for(var i=0,len = data.length>3?3:data.length;i<len;i++){
                            html+='<p class="modal-hos-item" data-hosid="'+data[i].rid+'">'+data[i].name+'</p>'
                        }
                        $('.modal-hos-result').html(html)
                    }else {
                        html = '<p class="modal-hos-tips">没法找到医院，请点击添加医院</p>'+
                            ' <p class="modal-hos-none">'+
                            '<img src="./img/icon_add_hospital@2x.png" alt="">'+
                            '<span>增加新医院</span>'+
                            '</p>';
                        $('.modal-hos-result').html(html)
                    }
                }else{
                    layer.open({
                        content:'获取医院列表失败('+res.msg+')',
                        skin:'msg',
                        time:2
                    })
                }
            })
        }else {
            $('.modal-hos-result').html('<p class="modal-hos-tips">请在上方输入医院名称</p>')
        }
    });
    //选择医院
    $('.modal-hos-result').on('click','.modal-hos-item',function () {
        hosName = $(this).html();
        hosId = $(this).attr('data-hosid');
        $('#hospitalInput').val(hosName);
        $('#searchHospital').removeClass('show');
    });
    //新建医院
    $('.enter-add').click(function () {
       var name = $('#addHospital .modal-input-box input').val().trim();
       if(!name){
           layer.open({
               content:'请输入医院名称',
               skin:'msg',
               time:2
           });
           return false;
       }
       new HttpRequest().addhospital(name,function (res) {
           if(res.code == '000'){
                var data = JSON.parse(res.data);
                hosName = data.name;
                hosId = data.rid;
                $('#hospitalInput').val(hosName);
                $('#addHospital').removeClass('show');
           }else {
               layer.open({
                   content:'新增医院失败('+res.msg+')',
                   skin:'msg',
                   time:2
               })
           }
       })
    });

    //点击公司（医院）弹窗
    $('#hospitalInput').click(function () {
        $('#searchHospital').addClass('show');
        $('.modal-input-box input').val('');
        $('.modal-hos-result').html('<p class="modal-hos-tips">请在上方输入医院名称</p>')
    });
    //关闭公司（医院）弹窗
    $('.modal-content .close,.hospital-modal').click(function (e) {
        if(e.target !== e.currentTarget) return false;
        $('.hospital-modal').removeClass('show');
    });
    //展开新增医院弹窗
    $('.modal-hos-result').on('click','.modal-hos-none',function () {
        $('.hospital-modal').removeClass('show');
        $('#addHospital').addClass('show');
    });
});