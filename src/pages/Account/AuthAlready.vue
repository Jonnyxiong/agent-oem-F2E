<template lang="pug">
    div.page-base-info.relative
        img.absolute.icon-auth(src="./images/icon-already.png", v-if="cerInfo.oauth_status == 3")
        div.clearfix.item
            div.title
                span 用户账号
                | :
            div.desc {{cerInfo.agent_id}}
        div.clearfix.item
            div.title.char4
                span 认证类型
                | :
            div.desc  {{cerInfo.id_type}}
        div.clearfix.item
            div.title.char4
                span 公司名称
                | :
            div.desc {{cerInfo.company}}
        div.clearfix.item
            div.title.char4
                span 证件号码
                | :
            div.desc {{cerInfo.id_nbr}}
        div.clearfix.item
            div.title.char4
                span 创建时间
                | :
            div.desc {{cerInfo.create_date}}
        div.clearfix.item
            div.title.char4
                span 更新时间
                | :
            div.desc {{cerInfo.update_date}}

        div.clearfix.item
            div.title.char4
                span 审核状态
                | :
            div.desc 
                span(v-if="cerInfo.oauth_status == 4").link-red 审核不通过(原因：{{cerInfo.remark}})
                span(v-else-if="cerInfo.oauth_status == 3") 已认证
                span(v-else) 待审核
        div.clearfix.item
            div.title.char4
                span 认证照片
                | :
            div.desc 
                img(:src="cerInfo.smsp_img_url + path + cerInfo.img_url").cer-img
        div.clearfix.item
            div.title.char4
                span.fff 认证照片:
            div.desc(v-if="cerInfo.oauth_status == 4")
                router-link(:to="{name : 'account_reauth'}").btn.btn-green.btn-md 重新认证

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
<style lang="scss">
.page-base-info{
    .icon-auth{
        left:260px;
        top:125px;
    }
}
</style>

