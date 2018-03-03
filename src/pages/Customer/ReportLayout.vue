<template lang="pug">
    div.page-customer-report
        .p-20.mt10
            .clearfix.grid-list-head.mr20
                router-link(:to="{name : 'sms_report_pre'}").grid-tab.fl 子账户(预付费)
                router-link(:to="{name : 'sms_report_post'}").grid-tab.fl 子账户(后付费)
        router-view
</template>
<style lang="scss">
.page-customer-report {
    .top-nav{
        height: 60px;
        border-bottom: 2px solid #2ea967;
        padding-left: 20px;
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