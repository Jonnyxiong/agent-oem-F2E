<template lang="pug">
    div.page-sms-purchase
        .clearfix.top-nav.grid-list-head.mr20
            router-link(:to="{name : 'service_purchase'}").fl 自助购买
            router-link(:to="{name : 'service_international'}").fl 国际短信价格表
        router-view
</template>
<style lang="scss">
.page-sms-purchase {
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