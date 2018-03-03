<template lang="pug">
div.mask
    div.mask-ctx
        div.mask-header {{name}}
            span.fa.fa-close(v-on:click="goBack")
        div.ctx
            el-form.dial(:model='form')
                el-form-item.mt.ml15(label="子账户：" )  
                    span.fl 
                        el-select.fl.border.w460(v-model="form.clientId",placeholder="请输入子账户",filterable,v-bind:disabled="disabledSelect")
                            el-option(v-for="item in userAccounts",:key="item.value",:label="item.label",:value="item.value")
                el-form-item(label="短信签名：" )  
                    span.fl 
                        input.input.w460(type="text", placeholder="限2-12个字，中文、英文和数字", v-model="form.sign")  
                el-form-item(label="模板属性：" )  
                    el-radio(v-model="form.smsType" ,label="10") 行业
                    el-radio(v-model="form.smsType" ,label="11") 会员营销  
                el-form-item(label="模板类型：" )  
                    el-select.fl.border.w460(v-model="form.templateType",placeholder="请选择",)
                        el-option(v-for="item in templateTypeOptions",:key="item.value",:label="item.label",:value="item.value") 
                el-form-item()                            
                    div.fl.example
                        span 示例
                    div.fl.example-ctx.w460 
                        //- 行业变量示例
                        div(v-if="form.smsType == 10 && form.templateType == 1")
                            p 验证码示例：您的验证码是{}，如非本人操作，请忽略此条短信。
                            p 通知示例：尊敬的{}用户，您的账户已入账{}元，请及时查收，如有疑问请联系客服热线。                   
                        //- 行业固定示例
                        div(v-if="form.smsType == 10 && form.templateType == 0")
                            p 因受台风天鸽影响，8月24日全市人民放假一天，请市民注意人身安全。
                        //- 会员营销固定示例
                        div(v-if="form.smsType == 11 && form.templateType == 0")
                            p 欢迎您成为酒店集团会员，我们将竭诚为您服务。如非本人操作，请致电如家客服热线。
                        //- 会员营销变量示例
                        div(v-if="form.smsType == 11 && form.templateType == 1")
                            p 尊敬的{}用户，本店将于下周举行年中大促，退订回复TD。
                el-form-item(label="模板内容：" ) 
                    el-input.fl.w460(type="textarea",:rows="5",placeholder="请输入模板内容\r\n模板内容、短信签名的总长度不可超过500个字",v-model="form.content")                             
                div.words 人工审核在30分钟内操作，请耐心等待。（工作时间09:00~22:00）
                .tx-c                            
                    a(href="javascript:;", v-on:click="add").btn.btn-md.btn-green 保存
                    a(href="javascript:;", v-on:click="addNotClose",v-if="form.templateId == ''").btn.btn-md.ml10.btn-green 保存并继续添加
                    a(href="javascript:;", v-on:click="goBack").btn.btn-md.btn-green-block.ml10 取消   
</template>
<script src="./AutoTemplateAdd.controller.js"></script>
<style lang="scss" scoped>
@import '../../assets/styles/config.scss';
.el-form-item{
    margin-bottom:10px;
}
.el-form{
    width: 100% !important;
}
textarea{
    resize:none !important;
}
.mask-ctx{
    width:650px;
    .ctx{
        padding:30px 50px;
        background-color: #FFF;
        .example{
            text-align: right;
            width:82px;
            vertical-align: middle;
            font-size: 14px;
            line-height: 1;
            padding: 11px 18px 11px 0;
            span{
                color:#666;
                background-color: #e7e7e7;
                padding:2px 5px;
            }
        }
        .example-ctx{
            p{
                line-height: 26px;
                color:$font-light;
            }
        }
        .btn{
            width:140px;
        }
    }
    .words{
        text-align: center;
        height: 40px;
        line-height: 40px;
        border: 1px solid $btn-green;
        background-color: skyblue;
        margin-bottom:40px;
    }
    .w460{
        width:460px;
    }
    
}
</style>
