function getHrefIp() {
    let reg = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
    let ip = reg.exec(window.location.href)[0];
    return 'http://' + ip + ':9000'
}

function getBaseUrl() {
    let baseUrl = 'http://127.0.0.1:8000';
    // let baseUrl = 'http://119.3.241.33:9000';
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

function getTempList() {
    // {switchableTemplateId: [templateId, templateId, templateId ...]}
    return {
        1: [209, 210]
    }
}

function getSecuryMode() {
    return true
}
