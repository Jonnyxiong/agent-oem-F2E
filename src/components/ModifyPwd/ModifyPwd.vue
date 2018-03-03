<template lang="pug">
div.mask
    div.mask-ctx
        div.mask-header 登录密码修改
            span.fa.fa-close(v-on:click="goBack")
        div.ctx
            div.clearfix.item
                div.title.fl.mb10 
                    span 登录账号
                    | ：
                span.fl  {{clientId}}     
            div.clearfix.item
                div.title.fl.mb10 
                    span 设置密码
                    | ：
                input.input.input-md.fl(type="password", v-model="password")
            div.clearfix.item
                div.title.fl.mb10 
                    span 确认密码
                    | ：
                input.input.input-md.fl(type="password", v-model="confirm")   
        div.ml30.aqyz 安全验证&nbsp;&nbsp;-------------------------------------------------------------------
        div.ctx-yzm
            div.clearfix.item
                div.title.fl.mb10.ml5 
                    span 手
                    span.fff *
                    span 机
                    span.fff *
                    span 号
                    | ：
                span.fl  {{phone}} 
            div.clearfix.item
                div.title.fl.mb10.ml5
                    span 验
                    span.fff *
                    span 证
                    span.fff *
                    span 码
                    | ：
                input.input.input-md.fl.yzm.mr30.code(type="text",v-model.trim="formData.code") 
                el-button.code-btn(@click='getCode(formData)',:disabled="!show",size='mini',v-bind:class="[show == true ? 'getcode' : '' ]")
                    span(v-show='show') 获取验证码
                    span(v-show='!show') 剩余时间 {{count}} s                
            a(href="javascript:;",v-on:click='updatePwd').btn.btn-lg.btn-green.ml40.confirm.mt40 确定
</template>
<script src="./ModifyPwd.controller.js"></script>
<style lang="scss" scoped>
.mask{
    z-index: 999;
    .mask-ctx{
        width:560px;
        height: 410px;
        .ctx{
            margin-left: 110px;
            margin-top: 40px;
            font-size: 16px;
            color: #5d5d5d;
            .item{
                span {
                height: 32px;
                line-height: 32px;
                vertical-align: middle;
                }

            }
            .input{
                width: 290px;
            }
        }
        .ctx-yzm{
            margin-left: 110px;
            font-size: 16px;
            color: #5d5d5d;
            .item{
                span {
                height: 32px;
                line-height: 32px;
                vertical-align: middle;
                }

            }
            .input{
                width: 290px;
            }
            .yzm{
                width: 190px;
            }
            .getcode{
                background-color: #2fb26a;
                color: #fff;       
            }
            .confirm{
                width: 275px;
            }
        }
        .aqyz{
            color: #989898;
            font-size: 16px;
        }
    }
}

</style>