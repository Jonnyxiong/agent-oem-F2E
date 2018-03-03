<template lang="pug">
div.mask
    div.mask-ctx
        div.mask-header 批量导入手机号码
            span.fa.fa-close(v-on:click="goBack")
        div.ctx
            el-upload(
                class="upload-demo",
                drag,
                action="/api/send/importMobile",
                :on-success="handleAvatarScucess",
                :on-change="handleChange",
                :before-upload="beforeAvatarUpload",
                :file-list="fileList",
                name="excel")
                i.el-icon-upload
                .el-upload__text 将文件拖到此处，或
                    em.green 点击上传                                
</template>
<script src="./ImportPhone.controller.js"></script>
<style lang="scss" scoped>
.mask{
    z-index: 99999;
    .mask-ctx{
        width:500px;
        height: 300px;
        .ctx{
            padding:5px 40px;
        }
    }
}

</style>

