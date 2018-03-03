<template lang="pug">
    div.clearfix.bg-fff
        div.fl.enterprise.item
            img(src="./images/img-gongsi.png")
            router-link(to="/account/info/base/auth/enterprise").btn.btn-green.btn-md.bk 申请企业认证
        div.fl.person.item
            img(src="./images/img-shenfen.png")
            router-link(to="/account/info/base/auth/personal").btn.btn-green.btn-md 申请个人认证
</template>
<style lang="scss" scoped>
.item{
    width:180px;
    margin-top:175px;
    img{
        width:180px;
        height:133px;
        display: block;
    }
    .btn{
        width:100%;
        margin-top:40px;
    }
    &:nth-child(1){
        margin-left:215px;
    }
    &:nth-child(2){
        margin-left:190px;
    }
}
</style>

