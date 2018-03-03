<template lang="pug">
div.page-recharge
    .mask
        div.mask-ctx.result
            div.mask-header 查看号码
                span.fa.fa-close(v-on:click="close")  
            div.ctx
                div
                    input.input.input-md(type="text",placeholder="手机号码", v-on:keyup.enter="search()", v-model="condition")
                    a(href="javascript:;",v-on:click="search").btn.btn-green.btn-md.ml10 搜索
                div.border.mt20.mobileWrap {{temp}}

</template>
<script src="./SearchPhone.controller.js"></script>
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
        .mobileWrap{
            width:100%;
            height:300px;
            word-break: break-all;
            overflow: auto;
        }
    }
}
</style>
