<template lang="pug">
    div.page-customer-info
        .clearfix(v-loading="loading")
            div.fl.base-left
                div.clearfix.item
                    div.title
                        span 子&nbsp;帐&nbsp;户&nbsp;ID
                        | :
                    div.desc {{customerInfo.clientid}}
                //- div.clearfix.item
                //-     div.title
                //-         span 子账号密码
                //-         | :
                //-     div.desc.clearfix 
                //-         span.fl(v-if="!isChangePwd" ) ******
                //-         a.link-green.href-green.fr.changepwd(href="javascript:;", v-on:click="changePwd") 重置密码
                div.clearfix.item
                    div.title
                        span(v-if="customerInfo.client_type == 2") 企业名称
                        span(v-else) 子账户名称
                        | :
                    div.desc(v-show="!isUpdate") {{customerInfo.name}} 
                    input.input.input-md.fl.yzm.mr30.code(type="text",v-show="isUpdate",v-model="params.name") 
                div.clearfix.item
                    div.title.char4
                        span 账户状态
                        | :
                    div.desc {{customerInfo.status}}
                div.clearfix.item.char4
                    div.title
                        span 认证状态
                        | :
                    div.desc {{customerInfo.oauth_status}}
                div.clearfix.item.char4
                    div.title
                        span 认证时间
                        | :
                    div.desc {{customerInfo.oauth_date}}
                div.clearfix.item.char4
                    div.title
                        span 手机号码
                        | :
                    div.desc(v-show="!isUpdate") {{customerInfo.mobile}} 
                    input.input.input-md.fl.yzm.mr30.code(type="text",v-show="isUpdate",v-model="params.mobile") 
                div.clearfix.item
                    div.title.char4
                        span 邮
                            i.fff 占位
                            |箱
                        | :
                    div.desc(v-show="!isUpdate") {{customerInfo.email}} 
                    input.input.input-md.fl.yzm.mr30.code(type="text",v-show="isUpdate",v-model="params.email") 
                div.clearfix.item
                    div.title.char4
                        span(v-if="customerInfo.client_type == 2") 公司地址
                        span(v-else) 个人地址
                        | :
                    div.desc(v-show="!isUpdate")
                        span.address {{customerInfo.province || ''}} {{customerInfo.city || ''}} {{customerInfo.area || ''}} {{customerInfo.address || ''}}
                    input.input.input-md.fl.yzm.mr30.code(type="text",v-show="isUpdate",v-model="params.address") 
                div.clearfix.item
                    div.title.char4
                        span(v-if="customerInfo.client_type == 2") 公司名称
                        span(v-else) 个人姓名
                        | :
                    div.desc(v-show="!isUpdate") {{customerInfo.realname}}
                    input.input.input-md.fl.yzm.mr30.code(type="text",v-show="isUpdate",v-model="params.realname") 
                div.clearfix.item
                    div.title.char4
                        span 用户等级
                        | :
                    div.desc {{customerInfo.client_level}}
            div.fl.base-right
                div.clearfix.item
                    div.title.char4
                        span 是否需要状态报告
                        | :
                    div.desc(v-show="!isUpdate") {{customerInfo.needreport}}
                    el-select.border(v-model="params.needreport",v-show="isUpdate",@change="changeReport")
                        el-option(v-for="item in statusReportOptions", :key="item.value", :label="item.label", :value="item.value")
                div.clearfix.item
                    div.title.char4
                        span 是否需要上行
                        | :
                    div.desc(v-show="!isUpdate") {{customerInfo.needmo}}
                    el-select.border.usertype(v-model="params.needmo",v-show="isUpdate",@change="changeMo")
                        el-option(v-for="item in moOptions", :key="item.value", :label="item.label", :value="item.value")
                div.clearfix.item
                    div.title.char4
                        span 是否需要审核
                        | :
                    div.desc {{customerInfo.needaudit}}
                div.clearfix.item
                    div.title.char4
                        span 创建时间
                        | :
                    div.desc {{customerInfo.createtime}}
                div.clearfix.item
                    div.title.char4
                        span 验证IP
                        | :
                    div.desc {{customerInfo.ip}}
                div.clearfix.item
                    div.title.char4
                        span 状态报告回调地址
                        | :
                    div.desc(v-show="!isUpdate") {{customerInfo.deliveryurl}}
                    input.input.input-md.fl.yzm.mr30.code(type="text",v-show="isUpdate && isNeedreport",v-model="params.deliveryurl") 
                div.clearfix.item
                    div.title.char4
                        span 上行回调地址
                        | :
                    div.desc(v-show="!isUpdate") {{customerInfo.mourl}}
                    input.input.input-md.fl.yzm.mr30.code(type="text",v-show="isUpdate && isNeedmo",v-model="params.mourl") 
                div.clearfix.item
                    div.title.char4
                        span 连接节点数
                        | :
                    div.desc {{customerInfo.nodenum}}
                div.clearfix.item
                    div.title.char4
                        span 付费类型
                        | :
                    div.desc {{customerInfo.paytype}}
                div.clearfix.item
                    div.title.char4
                        span 是否支持自扩展
                        | :
                    div.desc {{customerInfo.needextend}}
                div.clearfix.item
                    div.title.char4
                        span 备
                            span.fff 占位
                            |注
                        | :
                    div.desc {{customerInfo.remarks}}
        a(href="javascript:;",v-on:click='modify',v-show="!isUpdate").btn.btn-lg.btn-green.ml40.confirm.mt40.updateClient 修改
        a(href="javascript:;",v-show="isUpdate",v-on:click='updateClient').btn.btn-lg.btn-green.ml40.confirm.mt40.updateClient 确定
        a(href="javascript:;",v-on:click='cancel',v-show="isUpdate").btn.btn-lg.btn-white.ml40.confirm.mt40.updateClient 取消


</template>
<script src="./CustomerInfo.controller.js"></script>
<style lang="scss">
.page-customer-info{
    padding: 25px 30px;
    .updateClient{
        width: 120px;
    }
    .item {
        margin-bottom: 10px;
        .title {
            float: left;
            line-height: 30px;
            height:32px;
        }
        .desc {
            float: left;
            line-height: 32px;
            .address{
                line-height: 20px;
            }
        }
        .changepwd{
            margin-right:70px;
        }
        .save{
            margin-right:40px;
        }
        .cancle{
            margin-right:20px;
        }
    }
    .base-left {
        width:460px;
        .title {
            width: 85px;
        }
        .desc{
            width:460-85px;
        }
        .char {
            span {
                letter-spacing: 3px;
            }
        }
        .char4 {
            position: relative;
            left:1px;
            span {
                letter-spacing: 3px;
            }
        }
    }
    .base-right{
        width:465px;
        .title{
            width:150px;
            text-align: right;
        }
        .char4{
            span{
                letter-spacing: 3px;
            }
        }
    }
}
</style>