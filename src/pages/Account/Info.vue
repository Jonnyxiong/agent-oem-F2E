<template lang="pug">
    .page-user-info
        .clearfix.top-nav
            router-link(to="/account/info/base", exact).fl 基本信息
            router-link(to="/account/info/base/auth").fl 资质信息
        router-view

</template>
<script src="./Info.controller.js"></script>
<style lang="scss">
@import '../../assets/styles/config.scss';
.page-user-info{
    .top-nav{
        height:60px;
        border-bottom:1px solid $border-color;
        padding-left:20px;
        a{
            display: inline-block;
            width:130px;
            line-height: 45px;
            height:45px;
            text-align: center;
            font-size:16px;
            margin-top:15px;
        }
        .router-link-active{
            color:$btn-green;
            border:1px solid $border-color;
            border-bottom: 1px solid #FFF;
        }
    }
}
</style>
