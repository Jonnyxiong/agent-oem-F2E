<template lang="pug">
    div.header
        div.header-cont.clearfix
            img(src="./img/logo-white.png").fl.logo
            router-link.fl.title(to="/")  用户中心
            div.fr.mr20.relative.header-menu
                span Hi,{{user.realname}} 
                    span.triangle
                div.pop-menu
                    router-link(to="/account/userinfo") 个人中心
                    router-link(to="/help") 帮助中心
                    a(href="javascript:;", v-on:click="logout") 退出
            //- a(href="javascript:;", v-on:click="open", v-if="can_create").fr.createUser 一键创建短信发送账号
        LoginClient(@close="close",v-if="showMask" :oemUrl="oemUrl")
</template>
<script src="./Header.controller.js"></script>
<style lang="scss">
@import '../../assets/styles/config.scss';
.header {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    height: 60px;
    background-color:$header-color;
    a {
        color: #FFF;
        line-height: 60px;
    }
    .logo{
        padding-top:15px;
        margin-right:10px;
    }
    .title {
        font-size: 22px;
    }
    .createUser{
        color:$btn-green;
        border:1px solid $btn-green;
        line-height:28px;
        padding:0 8px;
        margin-top:15px;
        margin-right:30px;
        &:hover{
            color:#FFF;
            background-color: $btn-green;
        }
    }
    .header-cont {
        padding: 0 20px;
        margin: 0 auto;
    }
    .header-menu{
        height:60px;
        span{
            color:#FFF;
            line-height: 60px;
        }
        &:hover{
            .pop-menu{
                display: block;
            }
            .triangle{
                transform: rotate(180deg);
            }
        }
    }
    .pop-menu{
        display: none;
        position: absolute;
        width:80px;
        top:40px;
        background-color:#FFF;
        border:1px solid $border-color;
        a{
            width:100%;
            display: inline-block;
            text-align: center;
            color:$green;
            line-height: 35px;
            &:hover{
                color:#FFF;
                background-color: $green;
            }
            &:visited,&:actived{
                color:$green;
            }
        }
    }
    .triangle {
        transition:all .3s linear;
        display:inline-block;width:0;height:0;overflow:hidden;
        line-height:0;
        font-size:0;
        vertical-align:middle;
        border-top:5px solid #FFFFFF;
        border-bottom:0 none;
        border-left:5px solid transparent;
        border-right:5px solid transparent;
        _color:#FF3FFF;
        _filter:chroma(color=#FF3FFF);
    }

}
</style>
