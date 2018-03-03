<template lang="pug">
    div.mask
        div.mask-ctx
            div.mask-header
                | 修改备注
                span.fa.fa-close(v-on:click="close")
            div.ctx
                textarea(v-model="remark_text")
                .tx-r.mt20
                    a.btn.btn-green.btn-md(href="javascript:;", v-on:click="changeRemark").mr20 确定
                    a.btn.btn-white.btn-md(href="javascript:;", v-on:click="close") 取消 

</template>
<script src="./Remark.controller.js"></script>
<style lang="scss" scoped>
.mask-ctx{
    background-color: #FFF;
    width:400px;
    position: absolute;
    top:50%;
    left:50%;
    transform : translatex(-50%) translateY(-50%);
    .ctx{
        padding:20px 40px 20px;
        textarea{
            display: block;
            width:100%;
            height: 70px;
            resize:none;
            padding:5px;
        }
        .btn{
            display: inline-block;
        }
    }
}
</style>
