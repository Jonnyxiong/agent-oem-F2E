<template lang="pug">
div.mask
    div.mask-ctx
        div.mask-header 批量导入智能模板
            span.fa.fa-close(v-on:click="goBack")
        div.ctx
            el-upload(
                class="upload-demo",
                drag,
                action="/api/autoTemplate/addAutoTemplateBatch",
                :on-success="handleAvatarScucess",
                :on-change="handleChange",
                :before-upload="beforeAvatarUpload",
                :file-list="fileList",
                name="excel")
                i.el-icon-upload
                .el-upload__text 将文件拖到此处，或
                    em.green 点击上传     
            div(v-if="fileFlag")
                p 成功导入
                    span.link-green {{fileResult.importSuccess}}
                    | 条
                p 共计导入
                    span.link-base {{fileResult.importTotal}}
                    | 条
                p 导入失败
                    span.link-red {{fileResult.importFall}}
                    | 条
            p(v-if="importFail") 点击
                a(href="/api/autoTemplate/exportImportResult").link-yellow 下载
                | 导入失败结果列表
            .tx-c.mt20                    
                a(href="javascript:;",v-on:click="goBack").btn.btn-md.btn-green-block.ml10 关闭                                 
                a(href="javascript:;", v-on:click="exportReport").btn.btn-md.ml10.btn-green 下载Excel模板
</template>
<script src="./ImportFile.controller.js"></script>
<style lang="scss" scoped>
.mask{
    z-index: 99999;
    .mask-ctx{
        width:500px;
        .ctx{
            padding:10px 40px;
        }
    }
}

</style>

