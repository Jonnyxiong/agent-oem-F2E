<template lang="pug">
    div.page-self-sevice
        .clearfix.top-nav.grid-list-head.mr20
            router-link(:to="{name : 'service_manager'}").fl 子账户管理
            router-link(:to="{name : 'service_open'}").fl 自助开户
        router-view
</template>
<style lang="scss">
.page-self-sevice {
    .top-nav{
        height: 60px;
        border-bottom: 2px solid #2ea967;
        margin-left: 20px;
        a{
            display: inline-block;
            padding:0 20px;
            line-height: 45px;
            height: 45px;
            text-align: center;
            font-size: 16px;
            margin-top: 15px;
        }
        .router-exact--active {
            color: #2ea967;
            border: 1px solid #dadada;
            border-bottom: 1px solid #FFF;
        }
    }
}
</style>