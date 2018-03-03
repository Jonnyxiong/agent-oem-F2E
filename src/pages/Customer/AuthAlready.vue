<template lang="pug">
    div.page-base-info
        //- div.clearfix.item(v-loading="loading")
        //-     div.title
        //-         span 代理商账号
        //-         | :
        //-     div.desc {{cerInfo.agentId}}
        div.clearfix.item
            div.title.char4
                span 认证类型
                | :
            div.desc 
                span(v-if="cerInfo.clientType == 1") 个人认证
                span(v-if="cerInfo.clientType == 2") 企业认证
        div.clearfix.item
            div.title.char4
                span 公司名称
                | :
            div.desc {{cerInfo.realName}}
        div.clearfix.item
            div.title.char4
                span 证件号码
                | :
            div.desc {{cerInfo.idNbr}}
        div.clearfix.item
            div.title.char4
                span 创建时间
                | :
            div.desc {{cerInfo.createDate}}
        div.clearfix.item
            div.title.char4
                span 更新时间
                | :
            div.desc {{cerInfo.updateDate}}

        div.clearfix.item
            div.title.char4
                span 审核状态
                | :
            div.desc 
                span(v-if="cerInfo.oauthStatus == 4").link-red 审核不通过(原因：{{cerInfo.reason}})
                span(v-else-if="cerInfo.oauthStatus == 3") 已认证
                span(v-else) 待认证
        div.clearfix.item
            div.title.char4
                span 认证照片
                | :
            div.desc 
                img(:src="cerInfo.imgUrl").cer-img
        div.clearfix.item
            div.title.char4
                span.fff.opacity 认证照片:
            div.desc(v-if="cerInfo.oauthStatus == 4") 
                a(href="javascript:;", v-on:click="reAuth").btn.btn-md.btn-green 重新提交

</template>
<script src="./AuthAlready.controller.js"></script>
<style lang="scss" scoped>
.cer-img{
    display: block;
    width:220px;
}
.desc{
    margin-left:10px;
}
.char4{
    position: relative;
    left:1px;
    span{
        letter-spacing: 3px;
    }
}
</style>
