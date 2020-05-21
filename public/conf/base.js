function getBaseUrl() {
    let reg = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
    let locationIp = reg.exec(window.location.href)[0];
    //如果没有配置ip地址则从浏览器输入的地址中获取ip地址
    let IC_VUE_IP = 'http://192.168.43.180:8000';
    if(!IC_VUE_IP){
        IC_VUE_IP = 'http://' + locationIp + ':9000';
    }
    return IC_VUE_IP
}

function getSliderInterval(){
    return 6*1000;
}

function getTempId() {
    return 50
}

