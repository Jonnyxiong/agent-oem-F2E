<template lang="pug">
    div.page-safe 
         h1.page-title.p-20.border-b 账户安全
         div.ctx
            div.clearfix.item
                div.fl.title 登录邮箱：
                div.fl.desc {{user.email}}
            div.clearfix.item
                div.fl.title 登录手机：
                div.fl.desc {{user.mobile}}
            div.clearfix.item
                div.fl.title 登录密码：
                div.fl.desc ******
                router-link(
                    to="/account/security/password"
                ).link-green.link.pwd 修改密码
</template>
<script src="./Security.controller.js"></script>
<style lang="scss">
.page-safe{
    .ctx{
        padding:30px;
        .item{
            margin-bottom:25px;
            .pwd{
                margin-left:200px;
            }
        }
    }
}
</style>