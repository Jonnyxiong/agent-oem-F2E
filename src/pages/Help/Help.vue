<template lang="pug">
.page-help.p10
    .grid-list-head 
        .grid-tab.active 帮助中心
    .mt10
        .title 1、验证码/通知、会员营销、国际短信接口文档。详见附件
        .paragraph 
            a(href="/api/help/httpsdoc") 下载  短信https接口文档  V1.0.docx
        .paragraph 
            a(href="/api/help/cmppdoc") 下载  短信cmpp接口文档  V2.0.doc
        .paragraph 
            a(href="/api/help/sgipdoc") 下载  短信sgip接口文档  V1.2.doc
        .paragraph 
            a(href="/api/help/smgpdoc") 下载  短信smgp接口文档  V3.0.doc
        .paragraph 
            a(href="/api/help/smppdoc") 下载  短信smpp接口文档  V3.4.pdf
        .paragraph 
            a(href="/api/help/smstemplatedoc") 下载  模板短信接口文档V1.0.docx
        .title 2、FAQ文档，详见附件
        .paragraph 
            a(href="/api/help/faqdoc") 下载  FAQ文档  V1.0.docx
</template>
<script src="./Help.controller.js"></script>
<style lang="scss">
@import '../../assets/styles/config.scss';
.page-help{
    .title{
        line-height: 45px;
        background-color: #F8F8F8;
        border:1px solid $border-color;
        padding-left:10px;
    }
    .paragraph{
        line-height: 60px;
        border:1px solid $border-color;
        padding-left:30px;
        border-top:0;
        a{
            color:$green;
            &:hover{
                text-decoration: underline;
            }
        }
       
    }
}
</style>
