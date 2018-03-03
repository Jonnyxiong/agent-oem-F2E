<template lang="pug">
    div.mask
        div.mask-ctx
            div.mask-header
                | 提示
                span.fa.fa-close(v-on:click="close")
            div.ctx
                p 短信发送账号创建成功，账号密码已发至邮箱
                div.col-12.clearfix
                    div.col-6.tx-c
                        a(:href="oemUrl", target="_blank").btn.btn-green.btn-lg 立即登录
                    div.col-6.tx-c
                        a(href="javascript:;", v-on:click="close").btn.btn-green-block.btn-lg 取消
</template>
<script src="./LoginClient.controller.js"></script>
<style lang="scss" scoped >
.mask-ctx{
    position: absolute;
    background-color: #FFF;
    width:500px;
    top:50%;
    left:50%;
    transform:translateX(-50%) translateY(-50%);
    .ctx{
        padding:60px 30px;
        p{
            text-align: center;
            margin-bottom:70px;
            font-size:16px;
        }
        .btn{
            display: inline-block;
            width:125px;
            margin:0 auto;
            line-height: 36px;
        }
    }
}
</style>
