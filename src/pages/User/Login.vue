<template lang="pug">
    div.forget-page
        div.login-header
            .w1000.clearfix
                img.fl(src="../../assets/images/logo.png")
                .cont.fl 用户中心
                router-link(to="/register").btn.btn-green.btn-md.fr 注册
                router-link(to="/login").btn.btn-green-block.btn-md.fr.mr10 登录
        div.container.clearfix.w1000
            .fl.login-bg
                img(src="./images/login-bg.png")
            div.grid-login.fr
                div.ctx
                    h2 登录用户中心
                    .grid-input.border
                        input(type="text",placeholder="账号",  style="position:fixed;top:-99999999999999px;opacity:0;")
                        input(type="password", style="position:fixed;top:-99999999999999px;opacity:0;")
                        input(type="text",placeholder="账号", v-model="username", @keyup.enter="login")
                    .grid-input.border
                        input(type="password",placeholder="密码", v-model="password", @keyup.enter="login")     
                    a(href="javascript:;", v-on:click="login").btn.btn-lg.btn-green.btn-bk.login 登录
                    .clearfix.mt10
                        //- el-checkbox(v-model="checked", @change="changeRemember").fl.col-6 记住账号
                        router-link(to="/forget").fr.link-green 忘记密码
                        span.fr.link-green.ml5.mr5 |  
                        router-link(to="/register").fr.link-green 新用户注册  
        div.icp
            p.tx-c &copy; 2016 ucpaas.com 版权所有 粤ICP备14046848号
</template>
<script src="./Login.controller.js"></script>
<style lang="scss" scoped>
@import '../../assets/styles/config.scss';
.forget-page {
    position: fixed;
    background-color: #083c54;
    width: 100%;
    height: 100%;
    top: 60px;
    left: 0;
    .login-header {
        background-color:#FFF;
        height:60px;
        position: fixed;
        width:100%;
        left:0;
        top:0;
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
    .grid-login {
        margin-top:110px;
        width: 400px;
        padding: 24px 35px  50px;
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
        .grid-input {
            height: 40px;
            margin-top:20px;
            input {
                height: 38px;
                line-height: 38px;
                width: 100%;
            }
        }
        .ctx {
            border-bottom:1px solid $border-color;
            padding-bottom:15px;
            .login{
                margin-top:25px;
                margin-bottom: 50px;
            }
        }
    }
}
.icp{
    border-top:none;
    background-color: transparent;
}
</style>

