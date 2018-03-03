<template lang="pug">
     div.p20.page-userAuth
        div.mt20 
            div.item.clearfix
                div.title.fl 用户账号： 
                div.desc.fl {{cerInfo.agent_id}}
            div.item.clearfix
                div.title.fl 证件类型：
                div.desc.fl 
                    el-select.fl.border.sel(
                        v-model="uploadData.idType",
                    )
                        el-option(
                            v-for="item in options",
                            :key="item.value",
                            :label="item.label",
                            :value="item.value"
                        )
            div.item.clearfix
                div.title.fl 证件号码：
                div.desc.fl 
                    input.input.input-md(placeholder="请输入证件号码", type="text", v-model="params.id_nbr", v-bind:class="[nbrError? 'error' : '']")
            div.item.clearfix
                div.title.fl 公司名称：
                div.desc.fl 
                    input.input.input-md(placeholder="请输入与营业执照相符的公司名称", type="text", v-model="params.company", v-bind:class="[companyErr ? 'error' : '']")
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
                            div#filePicker 选择图片
                        .uplaod-tip
                            p 注：
                            p 请用真实有效的证件，上传图片支持2M以内的JPG/PNG格式      
            div.item.clearfix
                div.title.fl
                div.fl
                    a.upload.btn.btn-green.btn-md.uploadBtn2(href="javascript:;", v-on:click="uploadCer") 重新上传资质
</template>
<script src="./ReAuth.controller.js"></script>
<style lang="scss">
.page-userAuth{
    .el-input__inner{
        height:30px;
    }
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
    .uploadBtn2{
        width:120px;
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
    .error{
        border:1px solid red;
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