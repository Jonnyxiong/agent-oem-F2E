<template lang="pug">
    div.page-password
        div.page-title.p-20.border-b
            a(href="javascript:;", v-on:click="goBack").btn.btn-md.btn-white 
                span.fa.fa-angle-left.mr5
                | 返回上一级
        div.ctx(v-loading="loading")
            div.item.clearfix
                div.fl.title.spacing 
                    span 原密码
                    | ：
                div.fl
                    input.input.input-md(type="password",placeholder="请输入原密码", v-model="oldpassword", v-on:input="setinput")
            div.item.clearfix
                div.fl.title.spacing 
                    span 新密码
                    | ：
                div.fl
                    input.input.input-md(type="password", placeholder="请输入8-12位新密码", v-model="newpassword", v-on:input="setinput")
            div.item.clearfix
                div.fl.title 确认密码：
                div.fl
                    input.input.input-md(type="password", placeholder="请再输入一次密码", v-model="repassword", v-on:input="setinput")
            div.item.clearfix
                div.fl.title
                a(href="javascript:;", v-on:click="confirm", v-bind:class="[showBtn ? 'btn-green' : 'btn-disable']").btn.btn-md.confirm 确认修改
</template>
<script src="./ChangePassword.controller.js"></script>
<style lang="scss">
.page-password{
    .ctx{
        padding-left:20px;
        padding-top:25px;
    }
    .item{
        margin-bottom:10px;
        .spacing{
            position: relative;
            left:-1px;
            span{
                letter-spacing: 5px;
            }
        }
        .title{
            height:32px;
            line-height: 32px;
            width:75px;
        }
        .input{
            width:290px;
        }
        .confirm{
            width:100px;
            margin-top:10px;
        }
    }
}
</style>
