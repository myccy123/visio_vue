function getBaseUrl() {
    let reg = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
    let locationIp = reg.exec(window.location.href)[0];
    //如果没有配置ip地址则从浏览器输入的地址中获取ip地址
    let IC_VUE_IP = '';
    if(!IC_VUE_IP){
        IC_VUE_IP = locationIp;
    }
    return 'http://' + IC_VUE_IP + ':9000'
}

function getSliderInterval(){
    return 6*1000;
}

function getTempId() {
    return 50
}

