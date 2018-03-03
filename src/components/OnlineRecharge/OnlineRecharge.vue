<style lang="scss" scoped>
@import '../../assets/styles/config.scss';
.pay-mask{
    width:560px;
    height: 350px;
    .item{
        .title{
            line-height: 35px;
        }
        .desc{
            line-height: 35px;
        }
        .pay{
            display: block;
            position: relative;
            float:left;
            width:144px;
            height:40px;
            border:1px solid #DDD;
            background-image: url(./img/pay.png);
            background-repeat: no-repeat;
            
            .checked{
                display: none;
            }
        }
        .alipay{
            background-position: 0 0;
        }
        .wechat{
            margin-left:40px;
            background-position: 0 -72px;
        }
        .active{
            border:1px solid $green;
            .checked{
                display: block;
                position: absolute;
                top:0px;
                right:0px;
            }
        }
    }
    .cont{
        padding:0 30px;
        .btn-group{
            margin-top:40px;
            .btn{
                width:140px;
            }
        }
    }
}
</style>

<template lang="pug">
div.mask(v-if="!showWechat")
    div.mask-ctx.pay-mask
        div(v-if="showPaymentOrder === false")
            div.mask-header 在线充值
                span.fa.fa-close(v-on:click="goBack")
            div.ctx
                .p20
                    .head-tips.tx-c 当余额为负数时，则表示存在授信欠款，充值后会优先归还欠款！
                .cont
                    div.clearfix.item
                        div.title.fl.mb10 
                            span 账户余额：
                        .desc.fl  {{price}}     
                    div.clearfix.item
                        div.title.fl.mb10 
                            span 充值金额：
                        .desc.fl.clearfix
                            input.input.input-md.fl(type="text",v-model="params.paymentAmount").mr10 
                            | 元
                    div.clearfix.item
                        div.title.fl.mb10 
                            span 支付方式：
                        .desc.fl.clearfix
                            a(href="javascript:;",v-bind:class="{active : params.paymentMode == 0}", @click="checkAli").pay.alipay
                                img.checked(src="./img/icon-check.png")
                            a(href="javascript:;",v-bind:class="{active : params.paymentMode == 1}", v-on:click="checkWechat").pay.wechat
                                img.checked(src="./img/icon-check.png")
                    div.clearfix.btn-group
                        .col-6.tx-c
                            a(href="javascript:;",v-on:click="createOrder").btn.btn-green.btn-md 下一步
                        .col-6.tx-c
                            a(href="javascript:;",v-on:click="goBack").btn.btn-green-block.btn-md 取消
        div(v-if="showPaymentOrder === true")
            div.mask-header 支付订单
                span.fa.fa-close(v-on:click="goBack")
            div.ctx
                .p20
                    .head-tips.tx-c 支付订单已生成，请完成支付
                .cont
                    div.clearfix.item
                        .col-6
                            div.title.fl.mb10 
                                span 支付剩余时间：
                            .desc.fl  {{order.countDownStr | timeFilter}}
                        .col-6
                            div.title.fl.mb10 
                                span 支付订单：
                            .desc.fl.clearfix {{order.paymentId}}
                    div.clearfix.item
                        .col-6
                            div.title.fl.mb10 
                                span 充值金额：
                            .desc.fl.clearfix {{order.paymentAmount}}
                        .col-6
                            div.title.fl.mb10 
                                span 支付方式：
                            .desc.fl.clearfix {{order.paymentModeName}}
                    div.clearfix.btn-group
                        .col-6.tx-c
                            a(href="javascript:;",v-on:click="paySubmit").btn.btn-green.btn-md 立即支付
                        .col-6.tx-c
                            a(href="javascript:;",v-on:click="payCancel").btn.btn-green-block.btn-md 取消支付
WechatRecharge(v-else,:orderId="order.paymentId",:price="order.paymentAmount",@close="closeWechat")
</template>
<script src="./OnlineRecharge.controller.js"></script>
