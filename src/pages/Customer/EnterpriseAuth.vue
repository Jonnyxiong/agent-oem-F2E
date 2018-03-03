<template lang="pug">
    div.p20.page-userAuth
        div
            a(href="javascript:;", v-on:click="goBack").btn.btn-md.btn-white 
                span.fa.fa-angle-left.mr5
                | 返回上一级
        div.mt20
            div.item.clearfix
                div.title.fl 用户账号： 
                div.desc.fl {{params.clientId}}
            div.item.clearfix
                div.title.fl 证件类型：
                div.desc.fl 营业执照
            div.item.clearfix
                div.title.fl 公司名称：
                div.desc.fl 
                    input.input.input-md(placeholder="请输入与营业执照相符的公司名称", type="text", v-model="params.realName") 
            div.item.clearfix
                div.title.fl 证件号码：
                div.desc.fl 
                    input.input.input-md(placeholder="请输入营业执照号", type="text", v-model="params.idNbr")
            div.item.clearfix
                div.title.fl 证件照片：
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
            div.item.clearfix
                div.title.fl
                div.fl
                    a.upload.btn.btn-green.btn-md.uploadBtn(href="javascript:;", v-on:click="uploadCer", v-if="edit != 1") 上传资质
                    a.upload.btn.btn-green.btn-md.uploadBtn2(href="javascript:;", v-on:click="reUpload", v-else) 重新上传资质
</template>
<script src="./EnterpriseAuth.controller.js"></script>
<style lang="scss">
.page-userAuth {
    .item {
        margin-bottom: 10px;
        .title {
            line-height: 32px;
            height: 32px;
            width: 85px;
            text-align: right;
        }
        .desc {
            line-height: 32px;
        }
        .input {
            display: block;
            width: 285px;
        }
    }
    .uploadBtn{
        width:110px;
        margin-top:10px;
    }
    .uploadBtn2{
        width:130px;
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
    .avatar-uploader .el-upload:hover {
        border-color: #26be96;
        .hover-img {
            display: block;
        }
    }
    .avatar{
        width:300px;
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
.hover-img{
    position: absolute;
    top:0;
    left:0;
    z-index:10;
    width:88px;
    height:119px;
}
</style>
