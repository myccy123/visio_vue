<template>
    <div style="background-color: rgb(246,246,247);">
        <div class="title-bar">
            <img id="title-bg" :src="preUrl + '/imgs/头部色块@3x.png'" alt="header">
            <div class="text-box">
                <img id="title-logo" :src="preUrl + '/imgs/Logo@3x.png'" alt="header">
                <img id="title-text" :src="preUrl + '/imgs/标题@3x.png'" alt="header">
            </div>
            <div class="date-box">
                <img :src="preUrl + '/imgs/时钟@3x.png'"
                style="width: 20px; height: 20px;">
                <span style="font-size: 12px; color: #333;line-height: 20px;float: right">2022-04-29  星期四 18:00</span>
            </div>
        </div>
        <div class="up-box">
            <div class="up-left">
                <div style="height: 250px;">
                    <iframe :src="baseUrl + '/preview/#/?type=chart&id=748'"
                            style="width: 100%; height: 100%; border: none;"></iframe>
                </div>
                <div style="height: 250px;">
                    <iframe :src="baseUrl + '/preview/#/?type=chart&id=746'"
                            style="width: 100%; height: 100%; border: none;"></iframe>
                </div>
            </div>
            <div class="up-right">
                <div style="height: 250px;">
                    <iframe :src="baseUrl + '/preview/#/?type=chart&id=751'"
                            style="width: 100%; height: 100%; border: none;"></iframe>
                </div>
                <div style="height: 250px;">
                    <iframe :src="baseUrl + '/preview/#/?type=chart&id=746'"
                            style="width: 100%; height: 100%; border: none;"></iframe>
                </div>
            </div>
            <div class="up-center">
                <iframe :src="baseUrl + '/preview/#/?type=chart&id=749'"
                style="width: 100%; height: 100%; border: none;"></iframe>
            </div>
        </div>
        <div class="bottom-box">
            <div class="bottom-left">
                <iframe :src="baseUrl + '/preview/#/?type=chart&id=743'"
                        style="width: 100%; height: 100%; border: none;"></iframe>
            </div>
            <div class="bottom-center">
                <iframe :src="baseUrl + '/preview/#/?type=chart&id=741'"
                        style="width: 100%; height: 100%; border: none;"></iframe>
                <div class="jump-btn" @click="toNext">详细分布</div>
            </div>
            <div class="bottom-right">
                <iframe :src="baseUrl + '/preview/#/?type=chart&id=745'"
                        style="width: 100%; height: 100%; border: none;"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
import options from '../../config/options'
export default {
    name: "Test",
    data() {
        return {
            preUrl: options.PUBLIC_PATH,
            baseUrl: getBaseUrl()
        }
    },
    methods: {
        toNext() {
            window.location.href = 'http://www.baidu.com'
        }
    }
}
</script>

<style scoped>
.title-bar {
    height: 80px;
    position: relative;
    z-index: 2;
}

iframe {
    overflow: hidden;
}

.date-box {
    background-color: #EAEEF2;
    padding: 5px 20px;
    width: 170px;
    height: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
    line-height: 20px;
}

#title-bg {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    z-index: -1;
}

.text-box {
    width: 50%;
    height: 80px;
    margin: auto;
    display: flex;
    justify-content: center;
}
#title-logo {
    height: 80px;
    width: 85px;
}

#title-text {
    height: 66px;
    width: 465px;
    margin-top: 14px;
}

.up-box {
    height: 500px;
    position: relative;
    z-index: 2;
}
.up-center{
    height: 100%;
    width: 100%;
    position: absolute;
    background-color: rgb(246,246,247);
    z-index: -1;
}
.up-left {
    width: 400px;
    height: 100%;
    float: left;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 2px;
}
.up-right {
    width: 400px;
    height: 100%;
    float: right;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 2px;
}
.bottom-box {
    height: 200px;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    margin-top: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.bottom-left {
    width: 400px;
    margin: 10px;
    padding: 10px;
    flex-shrink: 0;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.bottom-right {
    width: 400px;
    margin: 10px;
    padding: 10px;
    flex-shrink: 0;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.bottom-center {
    width: 100%;
    margin: 10px;
    position: relative;
}

.jump-btn {
    opacity: 0.8;
    background-image: linear-gradient(226deg, #74A2FF 0%, #2D73FF 100%);
    box-shadow: 0px 4px 20px 0px rgba(76,140,247,0.5);
    border-radius: 24px;
    width: 136px;
    height: 48px;
    position: absolute;
    top: -80px;
    right: 0;
    z-index: 999;
    cursor: pointer;
    color: #fff;
    text-align: center;
    line-height: 48px;
}
</style>