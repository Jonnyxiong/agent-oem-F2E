<template lang="pug">
div.mask
    div.mask-ctx
        .clearfix.grid-list-head.modify-header
            a(href="javascript:;", v-bind:class="{active:!isShowGet }", v-on:click="switchGet").grid-tab.grid-change.fl 密码获取
            a(href="javascript:;", v-bind:class="{active:isShowGet }", v-on:click="switchModify").grid-tab.grid-change.fl 密码修改
            span.fa.fa-close.fr.close-modify(v-on:click="goBack")
        div.head-tips.mr20.mt20.ml20(v-show="!isShowGet") 
            span.ml10 接口密码是接口请求密钥，请妥善保管。如接口密码泄露，您的账号可能会被盗用。
        div.head-tips.mr20.mt20.ml20(v-show="isShowGet") 
            span.ml10 接口密码修改后，接口程序需同步更改，否则将无法发送短信！
        div(v-show='!isShowGet')
            div.ctx
                div.clearfix.item
                    div.title.fl.mb10 
                        span 接口账号
                        | ：
                    span.fl  {{clientId}}     
            div.ml30.aqyz.mt10 安全验证&nbsp;&nbsp;--------------------------------------------------------------------------
            div.ctx-yzm
                div.clearfix.item
                    div.title.fl.mb10.ml5.mt20 
                        span 手
                        span.fff *
                        span 机
                        span.fff *
                        span 号
                        | ：
                    span.fl.mt20  {{phone}} 
                div.clearfix.item.mt20
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
                div.clearfix.item.relative(v-show='interfacepwd') 
                    div.title.fl.mb10.ml5.absolute
                        span 接口密码
                        | ： {{getPw}} 
                                               
                a(href="javascript:;",v-on:click='getPwd').btn.btn-lg.btn-green.ml40.confirm.mt50 确定
        div(v-show='isShowGet')
            div.ctx
                div.clearfix.item
                    div.title.fl.mb10 
                        span 接口账号
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
            div.ml30.aqyz 安全验证&nbsp;&nbsp;--------------------------------------------------------------------------
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
                    input.input.input-md.fl.yzm.mr30.code(type="text",v-model.trim="formData1.code") 
                    el-button.code-btn(@click='getCode1(formData1)',:disabled="!show1",size='mini',v-bind:class="[show1 == true ? 'getcode1' : '' ]")
                        span(v-show='show1') 获取验证码
                        span(v-show='!show1') 剩余时间 {{count1}} s                
                a(href="javascript:;",v-on:click='updatePwd').btn.btn-lg.btn-green.ml40.confirm.mt20 确定

</template>
<script src="./GetInterface.controller.js"></script>
<style lang="scss" scoped>
.mask{
    z-index: 999;
    .mask-ctx{
        width:560px;
        height: 450px;
        .head-tips{
            font-size: 12px;
        }
        .modify-header{
            height: 35px;
            .grid-change{
                height: 100%;
                line-height: 35px;
            }
            .close-modify {
                position: absolute;
                top: 0;
                right: 15px;
                line-height: 36px;
                color: #BBBBBB;
                cursor: pointer;
                &:hover {
                    color: #2fb26a;
                }
            }
        }

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
            .getcode1{
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