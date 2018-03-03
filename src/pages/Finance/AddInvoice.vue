<template lang="pug">
    .page-addInvoice
        div.head-tips.mt20 
            span.ml10 开票时间：每月10号，20号，30号统一处理邮寄。（为发票可顺利寄达，请确保邮寄地址、联系电话无误）
        div
            div.item.clearfix
                div.title 可开票金额：
                div.desc 
                    span.price {{canAmount}}
                    | &nbsp;元
            div.item.clearfix
                div.title 
                    span.link-red *
                    | 发票金额：
                div.desc 
                    input(type="text",v-model="params.invoiceAmount").input.input-md
                    | 元
            div.item.clearfix
                div.title 开票项目：
                div.desc 
                    span 信息服务费
            div.item.clearfix
                div.title 备注：
                div.desc 
                    input(type="text", v-model="params.remark").input.input-md
            div.item.clearfix
                div.title 发票类型：
                div.desc 
                    el-radio-group(v-model="params.invoiceType",v-on:change="changeType")
                        el-radio(:label="1") 普通发票（电子）
                        el-radio(:label="2") 增值税专用发票
            div.item.clearfix
                div.title 
                div.desc 
                    //- 普通发票信息 
                    .invoiceWrap(v-if="params.invoiceType == '1'")
                        .ctx
                            h3 {{normalTitle}}
                                a(href="javascript:;",v-on:click="cancelNormal",v-if="isCancelNoraml").link-grey.fr.ml10 取消
                                a(href="javascript:;",v-on:click="saveNormal",v-if="!isEditNormal").link-green.fr 确认
                                a(href="javascript:;",v-on:click="editNormal",v-if="isEditNormal").link-green.fr 修改
                            .item.clearfix(v-if="isCancelNoraml")
                                div.title 
                                    span.link-red *
                                    | 发票信息ID：
                                div.desc 
                                    p {{normalId}}
                            .item.clearfix
                                div.title 开票主体：
                                div.desc 
                                    div(v-if="!isEditNormal")
                                        el-radio(v-model="invoiceNormal.invoiceBody" label="2") 企业
                                        el-radio(v-model="invoiceNormal.invoiceBody" label="1") 个人
                                    p(v-if="isEditNormal") 
                                        span(v-if="params_normal.invoiceBody == 1") 个人
                                        span(v-if="params_normal.invoiceBody == 2") 企业
                            .item.clearfix
                                div.title 
                                    span.link-red *
                                    | 发票抬头：
                                div.desc 
                                    input(type="text",v-model="invoiceNormal.invoiceHead",v-if="!isEditNormal").input.input-md
                                    p(v-if="isEditNormal") {{params_normal.invoiceHead}}
                            .item.clearfix(v-if="invoiceNormal.invoiceBody == '2'")
                                div.title 
                                    span.link-red *
                                    | 统一社会信用代码：
                                div.desc 
                                    input(type="text",v-model="invoiceNormal.creditCode",v-if="!isEditNormal").input.input-md
                                    p(v-if="isEditNormal") {{params_normal.creditCode}}
                            .item.clearfix
                                div.title 
                                    span.link-red *
                                    | 电子邮箱：
                                div.desc 
                                    input(type="text",v-model="invoiceNormal.email",v-if="!isEditNormal").input.input-md
                                    p(v-if="isEditNormal") {{params_normal.email}}
                           
                    //-  增值发票信息
                    .invoiceWrap(v-if="params.invoiceType == '2'")
                        .ctx
                            h3 {{vataTitle}}
                                a(href="javascript:;",v-on:click="cancelVata",v-if="isCancelVata").link-grey.fr.ml10 取消
                                a(href="javascript:;",v-on:click="saveVata",v-if="!isEditVata").link-green.fr 确认
                                a(href="javascript:;",v-on:click="editVata",v-if="isEditVata").link-green.fr 修改
                            .item.clearfix(v-if="isCancelVata") 
                                div.title
                                    span.link-red *
                                    | 发票信息ID：
                                div.desc 
                                    p {{vataId}}
                            .item.clearfix
                                div.title 
                                    span.link-red *
                                    | 发票抬头：
                                div.desc 
                                    input(type="text",v-model="invoiceVata.invoiceHead",v-if="!isEditVata").input.input-md
                                    p(v-if="isEditVata") {{params_vata.invoiceHead}}
                            .item.clearfix
                                div.title 
                                    span.link-red *
                                    | 统一社会信用代码：
                                div.desc 
                                    input(type="text",v-model="invoiceVata.creditCode",v-if="!isEditVata").input.input-md
                                    p(v-if="isEditVata") {{params_vata.creditCode}}
                            .item.clearfix
                                div.title 
                                    span.link-red *
                                    | 公司注册地址：
                                div.desc 
                                    input(type="text",v-model="invoiceVata.companyRegAddr",v-if="!isEditVata").input.input-md
                                    p(v-if="isEditVata") {{params_vata.companyRegAddr}}
                            .item.clearfix
                                div.title 
                                    span.link-red *
                                    | 基本户开户银行：
                                div.desc 
                                    input(type="text",v-model="invoiceVata.bank",v-if="!isEditVata").input.input-md
                                    p(v-if="isEditVata") {{params_vata.bank}}
                            .item.clearfix
                                div.title 
                                    span.link-red *
                                    | 基本户开户账号：
                                div.desc 
                                    input(type="text",v-model="invoiceVata.bankAccount",v-if="!isEditVata").input.input-md
                                    p(v-if="isEditVata") {{params_vata.bankAccount}}
                            .item.clearfix
                                div.title 
                                    span.link-red *
                                    | 公司固定电话：
                                div.desc 
                                    input(type="text",v-model="invoiceVata.telphone",v-if="!isEditVata",placeholder="0755-XXXXXXXX").input.input-md
                                    p(v-if="isEditVata") {{params_vata.telphone}}
                            div.grid-line
                            .item.clearfix
                                div.title 
                                    span.link-red *
                                    | 收件人：
                                div.desc 
                                    input(type="text", v-model="invoiceVata.toName",v-if="!isEditVata").input.input-md
                                    p(v-if="isEditVata") {{params_vata.toName}}
                            .item.clearfix
                                div.title 
                                    span.link-red *
                                    | 收件人地址：
                                div.desc.clearfix
                                    div(v-if="!isEditVata")
                                        el-select.border.citysel.fl(v-model="address.province", placeholder="省", @change="initCity")
                                            el-option(v-for="item in province", :key="item.value", :label="item.label", :value="item.value")
                                        el-select.border.citysel.fl(v-model="address.city", placeholder="市", @change="initArea", v-if="showCity")
                                            el-option(v-for="item in city", :key="item.value", :label="item.label", :value="item.value")
                                        el-select.border.citysel.fl(v-model="address.area", placeholder="区" , v-if="showArea")
                                            el-option(v-for="item in area", :key="item.value", :label="item.label", :value="item.value")
                                    p(v-if="isEditVata") {{params_vata.toAddr}}
                            .item.clearfix
                                div.title 
                                    span.link-red *
                                    | 详细地址：
                                div.desc 
                                    input(type="text",v-model="invoiceVata.toAddrDetail",v-if="!isEditVata").input.input-md
                                    p(v-if="isEditVata") {{params_vata.toAddrDetail}}
                            .item.clearfix
                                div.title 
                                    span.link-red *
                                    | 收件人手机：
                                div.desc 
                                    input(type="text",v-model="invoiceVata.toPhone",v-if="!isEditVata").input.input-md
                                    p(v-if="isEditVata") {{params_vata.toPhone}}
                            .item.clearfix
                                div.title 收件人QQ：
                                div.desc 
                                    input(type="text", v-model="invoiceVata.toQq",v-if="!isEditVata").input.input-md
                                    p(v-if="isEditVata") {{params_vata.toQq}}
                            .grid-line
                            .item.clearfix.p-10.tip
                                span.f-sm 为避免邮寄错误，请填写正确的收件信息，发票金额大于200元包邮寄送，小于200元邮费到付
                            .item.clearfix
                                div.title 
                                div.desc 
                                   
            div.item.clearfix
                div.title 
                div.desc 
                    a(href="javascript:;",v-on:click="saveInvoice").btn.btn-md.btn-green 确定
</template>
<script src="./AddInvoice.controller.js"></script>
<style lang="scss">
@import '../../assets/styles/config.scss';
.page-addInvoice{
    .price{
        color:#2fb26a;
        font-size:16px;
        font-weight: 800;
    }
    .citysel{
        &:first-child{
            margin:0;
        }
        width:80px;
        margin-left:5px;
    }
    .item {
        margin-bottom:10px;
        .title{
            float: left;
            width:85px;
            height:30px;
            text-align: right;
            line-height: 30px;
        }
        .desc{
            float: left;
            line-height: 30px;
            width:428-135 + px;
            .input{
                width:250px;
            }
            p{
                word-break: break-all;
            }
        }
    }
    .invoiceWrap{
        position: relative;
        width:460px;
        padding:0px 5px;
        border:1px solid $border-color;
        border-radius: 5px;
        background-color: #FFF;
        box-shadow: 2px 2px 2px 0px #DDD;
        h3{
            line-height: 60px;
            border-bottom:1px dashed $border-color;
            margin-bottom:10px;
            overflow: hidden;
            a{
                line-height: 60px;
                font-weight:normal;
                font-size:14px;
            }
        }
        .grid-line{
            margin-bottom:10px;
            border-top:1px dashed $border-color;
        }
        .tip{
            line-height: 14px;
        }
        .ctx{
            padding:10px;
        }
        .title{
            width:135px;
        }
    }
}
</style>
