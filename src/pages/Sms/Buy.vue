<template lang="pug">
    div.page-sms-buy
        div.page-title.p-20.border-b
            a(href="javascript:;", v-on:click="goBack" ).btn.btn-md.btn-white
                span.fa.fa-angle-left.mr5
                | 返回上一级
        div.ctx
            .clearfix.item
                .title.fl.char.char1
                    span 产品ID
                    |:
                .desc.fl {{smsDesc.product_id}}
            .clearfix.item
                .title.fl
                    span 产品名称
                    |:
                .desc.fl {{smsDesc.product_name}}
            .clearfix.item
                .title.fl
                    span 产品代码
                    |:
                .desc.fl {{smsDesc.product_code}}
            .clearfix.item
                .title.fl
                    span 到期时间
                    |:
                .desc.fl {{smsDesc.due_time}}
            .clearfix.item
                .title.fl
                    span 产品类型
                    |:
                .desc.fl.weight.f-deep {{smsDesc.product_type_name}}
            .clearfix.item
                .title.fl.char
                    span 创建者
                    |:
                .desc.fl {{smsDesc.creator}}
            .clearfix.item
                .title.fl
                    span 折后价格
                    |:
                .desc.fl 
                    span(v-if="smsDesc.product_type == 0") {{smsDesc.unit_price*accountMsg.hy_sms_discount | fix}}元
                    span(v-else-if="smsDesc.product_type == 1") {{smsDesc.unit_price*accountMsg.yx_sms_discount | fix}}元
                    span(v-else-if="smsDesc.product_type == 2") 请参考国际短信价格表
            .clearfix.item
                .title.fl
                    span 购买数量
                    |:
                .desc.fl.clearfix 
                    input.goods-num.input.input-md.fl(type="text", v-on:input="inputNum", v-model="num", v-bind:class="[auth ? 'wrong' : '']") 
                    span.fl {{smsMsg.smsUnit}}
                    span.error.fl(v-if="auth") {{errorText}}
            .clearfix.item
                .title.fl.char
                    span 总金额
                    |:
                .desc.fl 
                    span.total {{totalPrice}} 
                    |元
            a.btn.btn-green.btn-md.confirm(href="javascript:;", v-on:click="BuySms") 立即购买
        .mask(v-if="isShowMask")
            .mask-ctx
                .mask-title.relative 提醒
                    span.fa.fa-close.close.absolute(v-on:click="close")
                .mask-cont
                    p 购买{{smsMsg.smsName}}短信：
                        span 
                            i.mr5 {{num}}
                            | {{smsMsg.smsUnit}}
                    p(v-if="totalPrice > 10") 需消耗返点账户金额：
                        span
                            i.mr5 {{accountMsg.rebate_useable}}
                            | 元
                    p 需消耗账户余额：
                        span
                            i.mr5 {{payMoney | fix}}
                            | 元
                    a(href="javascript:;", v-on:click="addOrder" ).btn.btn-green.btn-lg.bk.confirm 确定
</template>
<script src="./Buy.controller.js"></script>
<style lang="scss">
@import '../../assets/styles/config.scss';
.page-sms-buy{
    .mask-ctx{
        position: absolute;
        width:500px;
        height:305px;
        background: #FFF;
        top:50%;
        left:50%;
        margin-left:-250px;
        margin-top:-153px;
        .mask-title{
            padding:0 15px;
            line-height: 36px;
            background-color: #E7E7E7;
            .close{
                line-height: 36px;
                top:0;
                right:15px;
                color:#BBBBBB;
                cursor: pointer;
                &:hover{
                    color:$btn-green;
                }
            }
        }
        .mask-cont{
            padding-top:45px;
            p{
                width:300px;
                margin: 0 auto;
                font-size:16px;
                line-height: 30px;
            }
            span{
                font-size:12px;
                i{
                    font-style: normal;
                    color:$btn-green;
                    font-size:24px;
                }
            }
            .confirm{
                display: block;
                width:266px;
                margin:0 auto;
                margin-top:30px;
            }
        }
    }
    .ctx{
        padding:20px 35px;
        .item{
            margin-bottom: 5px;
            .error{
                color:#FF0000;
                margin-left:20px;
            }
            .wrong{
                border:1px solid #FF0000;
            }
        }
        .goods-num{
            width:105px;
            margin-right:5px;
        }
        .title{
            line-height: 32px;
            width:70px; 
        }
        .char{
            position: relative;
            left:-1px;
            span{
                letter-spacing: 5px;
            }
        }
        .char1{
            span{
                letter-spacing: 4px;
            }
        }
        .desc{
            line-height: 32px;
        }
        .confirm{
            margin-top:5px;
            width:100px;
        }
    }
}
</style>
