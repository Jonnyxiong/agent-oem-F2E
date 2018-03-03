<template lang="pug">
    div.mask
        div.mask-ctx
            div.mask-header
                | 提示
                span.fa.fa-close(v-on:click="close")
            div.ctx
                p 确定要
                    span(v-if="type == '5'") 冻结
                    span(v-else) 解冻
                    | “{{name}}”吗？ 
                a.btn.btn-green.btn-lg(href="javascript:;", v-on:click="frozen", v-if="type == 5" ) 确定
                a.btn.btn-green.btn-lg(href="javascript:;", v-on:click="frozen", v-else) 确定
</template>
<script src="./Frozen.controller.js"></script>
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
            margin-bottom:50px;
            font-size:16px;
        }
        .btn{
            display: block;
            width:265px;
            margin:0 auto;
        }
    }
}
</style>
