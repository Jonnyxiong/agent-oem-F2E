<template lang="pug">
.page-remindSetting
    .mask
        div.mask-ctx.result
            div.mask-header 提醒设置
                span.fa.fa-close(v-on:click="close")     
            .ctx
                .clearfix.mb10
                    .title.fl 子账号：
                    .desc.fl {{id_name}}
                .clearfix.mb10
                    .title.fl 验证码短信低于：
                    .desc.fl
                        input(type="text",v-model="params.yzmAlarmNumber").input
                        span.ml10 条时，提醒一次。
                .clearfix.mb10
                    .title.fl 通知短信低于：
                    .desc.fl
                        input(type="text",v-model="params.tzAlarmNumber").input
                        span.ml10 条时，提醒一次。
                .clearfix.mb10
                    .title.fl 营销短信低于：
                    .desc.fl
                        input(type="text",v-model="params.yxAlarmNumber").input
                        span.ml10 条时，提醒一次。
                .clearfix.mb10
                    .title.fl 国际短信低于：
                    .desc.fl
                        input(type="text",v-model="params.gjAlarmAmount").input
                        span.ml10 元时，提醒一次。
                .head-tips.mb10.p-10 提示：设置为0时默认为不提醒。
                .clearfix.mb10
                    .title.fl 短信提醒：
                    .desc.fl
                        input(type="text",placeholder="手机号码1",v-model="phone1").input.input-sm
                        input(type="text",placeholder="手机号码2",v-model="phone2").input.input-sm.ml10
                .clearfix.mb10
                    .title.fl 邮件提醒：
                    .desc.fl
                        input(type="text",placeholder="邮箱1",v-model="email1").input.input-sm
                        input(type="text",placeholder="邮箱2",v-model="email2").input.input-sm.ml10
                .clearfix.mb10
                    .title.fl 提醒时间：
                    .desc.fl 08:00～22:00
                .clearfix.mb10
                    .title.fl 
                    .desc.fl 
                        a(href="javascript:;",v-on:click="confirm").btn.btn-green.btn-md.confirm 确定
                    
</template>
<script src="./RemindSetting.controller.js"></script>
<style lang="scss">
.page-remindSetting{
    .mask-ctx{
        width:700px;
    }
    .ctx{
        padding:20px;
    }
    .title{
        width:200px;
        text-align: right;
        line-height: 36px;
        height:36px;
    }
    .desc{
        line-height: 36px;
        .input{
            width:255px;
            display: inline-block;
        }
        .input-sm{
            width:180px;
        }
        .confirm{
            width:270px;
        }
    }
}
</style>
