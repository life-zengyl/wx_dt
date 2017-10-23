/**
 * Created by lw on 2017-6-6.
 */
//解决微信模板消息bug，1. 自动添加问号(?) 2. 自动把分隔符由#!变成# 3. 分隔符后面，自动判断是否为斜杠(/)，没有则添加上
export default function () {
    let paths = window.location.href.split('#');
    paths[1] = paths[1] || '/';
    //老式的#!分隔跳转
    if(paths[0].charAt(paths[0].length-1)!='?'){
        paths[0] = `${paths[0]}?`
    }
    if(paths[1].charAt(0) === '!'){
        paths[1] = paths[1].substr(1)
    }
    let url = `${paths[0]}#${paths[1]}`;
    if(window.location.href != url){
        window.location.href = url
    }
}

