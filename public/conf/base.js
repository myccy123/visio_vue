function getHrefIp() {
    let reg = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
    let ip = reg.exec(window.location.href)[0];
    return 'http://' + ip + ':9000'
}

function getBaseUrl() {
    let baseUrl = 'http://192.168.2.116:8000';
    // let baseUrl = 'http://183.251.100.172:9000';
    // 如果没有配置ip地址则从浏览器输入的地址中获取ip地址
    if(!baseUrl){
        return getHrefIp()
    }
    return baseUrl
}

function getPublicPath() {
    return '/static/vue_vision/'
}

function getSliderInterval(){
    return 3 * 1000;
}

function getTempId() {
    return 109
}

