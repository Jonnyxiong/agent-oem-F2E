<template lang="pug">
    div.page-customer-open
        div.head-tips.ml20.mr20.mt20 
            span.ml10 子账户用于区分不同业务或人员。例如一个子账户用于发送验证码，另外一个子账户用于发送通知短信。
        div.ctx(v-loading="submiting")
            div.clearfix.item
                div.title.fl 
                    span.fff.opacity  占位占
                    span.bt-star *                
                    span 子账户名称
                    | ：
                input.input.input-md.fl(type="text", v-model="params.name", v-on:blur="validateName")
                span.fl.error(v-if="errName") {{NameTip}}
            div.clearfix.item
                div.title.fl 
                    span.fff.opacity  占位占位
                    span.bt-star *                
                    span 短信协议
                    | ：
                span.fl.httpjson  默认为http json协议，如需其他协议可联系客服
            div.clearfix.item
                div.title.fl 
                    span.fff.opacity  占位占位                
                    span.bt-star *
                    span 使用对象
                    | ：                    
                el-select.border.usertype(v-model="params.agentOwned", v-on:change="changeOwner")
                    el-option(v-for="item in userTypeOptions", :key="item.value", :label="item.label", :value="item.value")
                span.httpjson.ml20 自己使用的子账户无需再次资质认证，下级客户使用完成开户后需资质认证
            div.clearfix.item
                div.title.fl 
                    span.bt-star *
                    span 状态报告获取方式
                        | ：                    
                el-select.border.usertype(v-model="params.needreport")
                    el-option(v-for="item in statusReportOptions", :key="item.value", :label="item.label", :value="item.value")
            div.clearfix.item(v-if="params.needreport == 1")
                div.title.fl 
                    span.bt-star *                
                    span 状态报告回调地址
                    | ：
                input.input.input-md.fl(type="text", v-model="params.deliveryurl", v-on:blur="validateReport")
                span.fl.error(v-if="errReport") {{ReportTip}}
            div.clearfix.item
                div.title.fl 
                    span.fff.opacity  占位                               
                    span.bt-star *
                    span 上行获取方式
                        | ：                    
                el-select.border.usertype(v-model="params.needmo")
                    el-option(v-for="item in moOptions", :key="item.value", :label="item.label", :value="item.value")
            div.clearfix.item(v-if="params.needmo == 1")
                div.title.fl 
                    span.fff.opacity  占**                             
                    span.bt-star *                
                    span 上行回调地址
                        | ：
                input.input.input-md.fl(type="text", v-model="params.mourl", v-on:blur="validateMo")
                span.fl.error(v-if="errMo") {{MoTip}}
            div.clearfix.item 
                .title.fl 
                    span.fff.opacity  占位占位**
                    span 提醒邮箱：
                .fl
                     input.input.input-md.fl(type="text", v-model ="params.email")
                     span.httpjson.ml20 选填，邮箱必须唯一，可用于登录
            div.clearfix.item
                div.title.fl.mobile 
                    span.fff.opacity  占位占位**
                    span 提醒手机
                    | ：
                input.input.input-md.fl(type="text", v-model="params.mobile", v-on:blur="validateMobile" )
                span.httpjson.ml20 选填，手机必须唯一，可用于登录
            div.clearfix.item(v-if="params.agentOwned != 1")
                div.title.fl 
                    span.fff.opacity  占位占位*                
                    span 认证类型
                    | ：                    
                el-select.border.usertype(v-model="params.idType")
                    el-option(v-for="item in identifyTpyeOptions", :key="item.value", :label="item.label", :value="item.value")
            div.clearfix.item(v-if="params.agentOwned != 1")
                div.title.fl.mobile 
                    span.fff.opacity  占位占位**
                    span 证件号码
                    | ：
                input.input.input-md.fl(type="text", v-model="params.idNbr")
            div.clearfix.item(v-show="params.agentOwned != 1")
                div.title.fl 
                    span.fff.opacity  占位占位* 
                    span 证件图片：
                div.pic-upload.clearfix
                    div.fl
                        img(
                            v-if="imageUrl",
                            :src="imageUrl"
                        ).avatar
                        img(
                            v-else,
                            src="./images/enterprise-upload.png"
                        )
                    .fl  
                        div#uploader-demo
                            div#fileList.uploader-list
                            div#filePicker.ml10 选择图片
                        .uplaod-tip
                            p 注：
                            p 请用真实有效的证件，上传图片支持2M以内的JPG/PNG格式  
            div.clearfix.item 
                .title.fl 
                    span.fff.opacity  占位占位**
                    span 备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：
                .fl
                     input.input.input-md.fl(type="text", v-model ="params.remarks")
            div.clearfix.item
                div.title.fl 
                div.fl
                    a(href="javascript:;", v-on:click="open").btn.btn-green.btn-md.open 开户
        div.mask(v-if="khmsg")
            div.mask-ctx
                div.mask-header 开户信息
                    span.fa.fa-close(v-on:click="mksure")
                div.ctx.khxx
                    div.head-tips.mr20.ml20 
                        span.ml10 成功开户！开户信息如下：
                    div.msg.mr20.ml20.mt20 
                        div.clearfix.item.mt20.ml30
                            span 客户端发送平台
                        div.clearfix.item.ml30.mt20.copymsg
                            span.copymsg 1、网址：http://oemclient.sms.ucpaas.com/login
                        div.clearfix.item.ml30.mt20.copymsg
                            span.copymsg 2、登录信息
                        div.clearfix.item.ml30.copymsg
                            .col-6
                                span.copymsg 登录账户：
                                span.copymsg {{client_id}}
                            .col-6
                                span.copymsg 绑定邮箱：
                                span.copymsg {{email}}
                                span.copymsg (可用于登录)
                        div.clearfix.item.ml30
                            .col-6
                                span.copymsg 登录密码：
                                span.copymsg {{password}}
                            .col-6
                                span.copymsg 绑定手机：
                                span.copymsg {{mobile}}
                                span.copymsg (可用于登录)
                        div.copymsg.clearfix.item.ml30.mt20
                            span.copymsg.copymsg 3、接口信息
                        div.copymsg.clearfix.item.ml30
                            .col-6
                                span.copymsg 接口账户：
                                span.copymsg {{client_id}}
                            .col-6
                                span.copymsg 接口密码：
                                span.copymsg {{password}}
                                span.copymsg (默认且可修改)
                        div.clearfix.item.ml30
                            a(href="javascript:;",data-clipboard-target=".khxx").btn.btn-md.btn-white.copymsg 复制信息
                    .clearfix.mt20
                        .col-12.tx-c
                            a(href="javascript:;", v-on:click="mksure").btn.btn-lg.btn-green.mksure 确定
</template>
<script src="./Open.controller.js"></script>
<style lang="scss">
.page-customer-open {
    .ctx {
        padding: 25px;
        .title {
            width: 140px !important;
            line-height: 32px;
            height:32px;
        }
        .item{
            margin-bottom:10px;
            .httpjson{
                height: 32px;
                line-height: 32px;
                color: #a9a9a9;
            }
        }
        .usertype{
            width:290px;
        }
        .citysel{
            width:90px;
            margin-right:10px;
        }
        .open{
            margin-top:10px;
            width:100px;
            letter-spacing: 5px;
        }
    }
    .item .input {
        display: block;
        width: 290px;
    }
    .el-input__inner{
        height:32px;
    }
    .error{
        margin-left:20px;
        line-height: 32px;
        color:red;
    }
    .uploadBtn{
        width:110px;
        margin-top:10px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        img {
            display: block;
        }

        .hover-img {
            display: none;
        }
    }
    .avatar{
        width:300px;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #26be96;
        .hover-img {
            display: block;
        }
    }
     .uplaod-tip{
        width:200px;
        color:#999;
        font-size:12px;
        line-height: 16px;
        margin-left:10px;
    }
}

</style>
<style lang="scss" scoped>
.mask-ctx{
    background-color: #FFF ;
    width:700px;
    height:480px;
    position: absolute;
    top:50%;
    left:50%;
    transform : translatex(-50%) translateY(-50%);

    .ctx{
        padding:40px 0;
        p{
            width:80%;
            margin:0 auto;
            text-align: center;
            padding-bottom:40px;
        }
        .msg{
            height: 270px;
            border: 1px solid #989898;
        }
        .btn{
            width:130px;
        }
        .mksure{
            width:275px;
        }
    }
}
.hover-img{
    position: absolute;
    top:0;
    left:0;
    z-index:10;
    width:88px;
    height:119px;
}
.loading{
    width:100px;
    height:50px;
}
</style>