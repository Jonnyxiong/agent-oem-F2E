<template lang="pug">
    div.menu
        dl
            dt
                router-link(to="/", exact)
                    span.icon.index
                    | 首页
        dl
            dt
                a(href="javascript:;", v-on:click="openMenu('service')", v-bind:class="[menu.service || keywords.service ? 'active' : '']")
                    span.icon.service 
                    | 自助服务
            transition(name="menu")  
                dd(v-show="menu.service") 
                    router-link(to="/sms/smspurchaselayout/purchase") 自助购买
            transition(name="menu")
                dd(v-show="menu.service")
                    router-link(to="/customer/selfsevicelayout/manager") 自助开户
            transition(name="menu")
                dd(v-show="menu.service")
                    router-link(to="/customer/finance") 充值回退
        dl
            dt
                a(href="javascript:;", v-on:click="openMenu('sms')", v-bind:class="[menu.sms || keywords.sms ? 'active' : '']")
                    span.icon.sms
                    | 短信服务
            transition(name="menu")  
                dd(v-show="menu.sms") 
                    router-link(to="/TestReport/TestReportLayout/test") 测试/报备
            transition(name="menu")
                dd(v-show="menu.sms")
                    router-link(to="/customer/deliverlayout/deliver") 短信发送
            transition(name="menu")
                dd(v-show="menu.sms")
                    router-link(to="/customer/sendlayout/sendrecord") 发送记录
            transition(name="menu")
                dd(v-show="menu.sms")
                    router-link(to="/customer/report/pre") 消耗报表
        dl
            dt
                a(href="javascript:;", v-on:click="openMenu('finance')", v-bind:class="[menu.finance || keywords.finance ? 'active' : '']").finance
                    span.icon.coins
                    | 财务管理
            transition(name="menu")
                dd(v-show="menu.finance")
                    router-link(to="/finance/own") 我的账单
            transition(name="menu")
                dd(v-show="menu.finance") 
                    router-link(to="/finance/bill") 短信账单
            transition(name="menu")
                dd(v-show="menu.finance") 
                    router-link(to="/finance/record") 账户消费   
            transition(name="menu")
                dd(v-show="menu.finance") 
                    router-link(to="/finance/payorder") 支付订单 
            transition(name="menu")
                dd(v-show="menu.finance") 
                    router-link(to="/finance/invoice/add") 发票申请   
        dl
            dt
                a(href="javascript:;", v-on:click="openMenu('account')", v-bind:class="[menu.account || keywords.account ? 'active' : '']").account
                    span.icon.person
                    | 个人中心
            transition(name="menu")
                dd(v-show="menu.account")
                    router-link(:to="{ path: '/account/userinfo'}" ) 个人资料
            transition(name="menu")
                dd(v-show="menu.account")
                    router-link(:to="{ path: '/account/info/base'}" ) 基本信息
            transition(name="menu")
                dd(v-show="menu.account")
                    router-link(to="/account/security") 账户安全
        dl
            dt
                router-link(to="/help")
                    span.icon.help
                    | 帮助中心
</template>
<script src="./Menu.controller.js"></script>
<style lang="scss" scoped>
@import '../../assets/styles/config.scss';
.menu {
    position: fixed;
    height: 100%;
    width: 200px;
    overflow-y: auto;
    background-color: #1f2831;
    padding-top: 75px;
    top: 0;
    left: 0;
    z-index:99;
    a {
        display: block;
        width: 100%;
        padding: 0 17px;
        color:#666;
    }
    .icon {
        background-size:100%;
        background-position: 0 0;
        background-repeat: no-repeat;
        margin-right: 15px;
        display: inline-block;
        vertical-align: middle;
    }
    .index{
        width:16px;
        height: 15px;
        background-image: url(./images/index.png);
    }
    .sms {
        margin-top:-2px;
        width:15px;
        height: 11px;
        background-image: url(./images/sms.png);
    }
    .service {
        width:16px;
        height:17px;
        background-image: url(./images/zizhu.png);
    }
    .coins {
        margin-top:-2px;
       width:16px;
       height:11px;
       background-image: url(./images/coins.png);
    }
    .person {
        width:16px;
        height:16px;
        background-image: url(./images/person.png);
    }
    .help {
        width:16px;
        height:16px; 
        background-image: url(./images/help.png);
    }
    dl{
        border-bottom:1px solid #262f37;
    }
    dt {
        
        position: relative;
        a {
            height: 48px;
            line-height: 48px;
            color:#6b7686;
            -webkit-user-select: none;
            &:hover{
                color:$green;
            } 
        }
    }
    dd {
        a {
            -webkit-user-select: none;
            height: 40px;
            line-height: 40px;
            padding-left: 48px;
            color:#abb1ba;
            &:hover {
                color: #FFF;
            }
        }
    }
    .router-link-active {
        color:$green;
    }
}

.menu-enter-active{
    transition: all .3s ease-in-out;
    // transform: translateY(0);
    height:40px;
}
.menu-enter{
    // transform: translateY(-100%);
    //  opacity: 0;
    height:0;
    opacity: 0;
}
.menu-leave-active{
     height:0;
     opacity: 0;
     transition: all .3s ease-in-out;
}
.menu-leave{
    height:40px;
}
</style>
