<template lang="pug">
div.page-recharge
    .mask
        div.mask-ctx.result
            div.mask-header 短信内容
                span.fa.fa-close(v-on:click="close")  
            div.ctx
                div.border.p20#cont {{cont}}
                a(href="javascript:;",data-clipboard-action="copy",data-clipboard-target="#cont").btn.btn-green.btn-md.mt20.copy 复制
                a(href="javascript:;",v-on:click="close").btn.btn-green-block.btn-md.mt20.ml10 关闭
</template>
<script src="./CopySms.controller.js"></script>
<style lang="scss" scoped>
@import '../../assets/styles/config.scss';

.mask-ctx{
    background-color: #FFF;
    width:740px;
    position: absolute;
    top:50%;
    left:50%;
    transform : translatex(-50%) translateY(-50%);
    .ctx{
        padding:20px;
        height:500px;
    }
}
</style>
