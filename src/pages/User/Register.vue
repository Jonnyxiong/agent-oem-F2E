<template lang="pug">
    div.register-page
        div.reg-header
            .w1000.clearfix
                img.fl(src="../../assets/images/logo.png")
                .cont.fl 用户中心
                router-link(to="/register").btn.btn-green.btn-md.fr 注册
                router-link(to="/login").btn.btn-green-block.btn-md.fr.mr10 登录
        div.container.clearfix.w1000(v-if="!showxieyi")
            .grid-register
                h2 注册用户中心
                .grid-input.border
                    input(type="text",placeholder="账号",  style="position:fixed;top:-99999999999999px;opacity:0;")
                    input(type="password", style="position:fixed;top:-99999999999999px;opacity:0;")
                    input(type="text",placeholder="请输入您的登陆邮箱", v-model="params.email", @keyup.enter="reg")
                .grid-input.border
                    input(type="text",placeholder="请输入手机号码", v-model="params.mobile", @keyup.enter="reg")  
                .grid-input.border
                    input(type="password",placeholder="密码为8-12位", v-model="params.password", @keyup.enter="reg")  
                .grid-input.border
                    input(type="password",placeholder="确认密码", v-model="params.confirmPassword", @keyup.enter="reg")  
                .grid-input.border
                    input(type="text",placeholder="邀请码(选填)", v-model="params.inviteCode", @keyup.enter="reg")  
                .grid-input.border
                    input(type="text",placeholder="请输入个人/公司名称", v-model="params.realName", @keyup.enter="reg")  
                div.mb10
                    el-select.border.citysel(v-model="params.province", placeholder="省", @change="initCity")
                        el-option(v-for="item in province", :key="item.value", :label="item.label", :value="item.value")
                    el-select.border.citysel(v-model="params.city", placeholder="市", @change="initArea", v-if="showCity")
                        el-option(v-for="item in city", :key="item.value", :label="item.label", :value="item.value")
                    el-select.border.citysel(v-model="params.area", placeholder="区" , v-if="showArea")
                        el-option(v-for="item in area", :key="item.value", :label="item.label", :value="item.value")
                .grid-input.border
                    input(type="text",placeholder="详细地址(选填)", v-model="params.address", @keyup.enter="reg")  
                .grid-input.border
                    input(type="text",placeholder="备注(选填)", v-model="params.remark", @keyup.enter="reg")  
                a(href="javascript:;", v-on:click="reg").btn.btn-lg.btn-green.btn-bk.login 注册
                p.role 点击注册，即表示您同意我们的
                    a(href="javascript:;",v-on:click="showPage").link-green &lt;&lt;云之讯短信服务协议&gt;&gt;
                p.tx-c.mt10 已有账号？    
                    router-link(to="/login").link-green 立即登陆
        div.xieyi(v-show="showxieyi")
            img(src="./images/xieyi.png")
            div.tx-c.pb100
                a(href="javascript:;",v-on:click="closeMask").btn.btn-md.btn-green 我已阅读
        div.icp
            p.tx-c &copy; 2016 ucpaas.com 版权所有 粤ICP备14046848号
</template>
<script src="./Register.controller.js"></script>
<style lang="scss" scoped>
@import '../../assets/styles/config.scss';
.register-page {
    width: 100%;
    height: 100%;
    background-color: #f8f8f8;
    .xieyi{
        width:100%;
        height:100%;
        background-color: #FFF;
        img{
            margin:0 auto;
            display: block;
            width:1000px;
        }
    }
    .reg-header {
        background-color:#FFF;
        height:60px;
        width:100%;
        box-shadow: 0px 2px 3px 2px #e6e5e6;
        position: relative;
        z-index:100;
        .cont{
            display: inline-block;
            font-weight:800;
            color:#263646;
            line-height: 60px;
            text-align: left;
            font-size:24px;
        }
        img{
            width:30px;
            height:30px;
            margin-top:15px;
            display: inline-block;
            margin-right:5px;
        }
        .btn{
            width:85px;
            margin-top:15px;
        }
    }
    .login-bg{
        margin-top:86px;
    }
    .grid-register {
        box-shadow: 0px 2px 3px 2px #e6e5e6;
        margin:20px auto;
        width: 400px;
        padding: 0 35px 25px;
        background-color: #FFF;
        border-top:3px solid $green;
        h2 {
            text-align: center;
            font-weight: normal;
            line-height: 60px;
            font-size: 18px;
        }
        input {
            border: 0 none;
            padding: 0 10px;
        }
        .role{
            font-size:12px;
            color:#333;
            line-height: 35px;
            padding-bottom:5px;
            border-bottom:1px solid $border-color;
        }
        .grid-input {
            height: 40px;
            margin-bottom:10px;
            input {
                height: 38px;
                line-height: 38px;
                width: 100%;
            }
        }
        .citysel{
            width:100px;
            margin-right:15px;
            &:last-child{
                margin:0;
            }
        }

    }
}
.icp{
    border-top:none;
    background-color: transparent;
}
</style>

