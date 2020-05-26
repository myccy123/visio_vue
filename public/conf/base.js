function getBaseUrl() {
    let reg = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
    let locationIp = reg.exec(window.location.href)[0];
    // 如果没有配置ip地址则从浏览器输入的地址中获取ip地址
    let IC_VUE_IP = 'http://183.251.100.172:9000';
    if(!IC_VUE_IP){
        IC_VUE_IP = 'http://' + locationIp + ':9000';
    }
    return IC_VUE_IP
}

function getSliderInterval(){
    return 3 * 1000;
}

function getTempId() {
    return 105
}

