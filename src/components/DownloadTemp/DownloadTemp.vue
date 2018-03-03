<template lang="pug">
div.mask
    div.mask-ctx
        div.mask-header 下载导入模板
            span.fa.fa-close(v-on:click="goBack")
        .ctx
            .col-12.clearfix        
                .col-4.tx-c
                    img(src="./img/icon-csv.png")
                    a(href="javascript:;",v-on:click="exportCsv").btn.btn-green.btn-sm 下载模板
                    div.link-red.btn-md.f-sm 推荐
                .col-4.tx-c
                    img(src="./img/icon-txt.png")
                    a(href="javascript:;",v-on:click="exportTxt").btn.btn-green.btn-sm 下载模板
                    div.link-red.btn-md.f-sm 推荐
                .col-4.tx-c
                    img(src="./img/icon-excel.png")
                    a(href="javascript:;",v-on:click="exportExcel").btn.btn-green.btn-sm 下载模板
</template>
<script src="./DownloadTemp.controller.js"></script>
<style lang="scss" scoped>

.mask{
    // z-index: 9999;
    .mask-ctx{
        width:560px;
        height: 310px;
        .ctx{
            padding:70px 50px 90px;
            
            img{
                display: block;
                margin:0 auto;
            }
            a{
                margin-top:36px;
            }
        }
       
    }
}
</style>