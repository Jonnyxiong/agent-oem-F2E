<template lang="pug">
    div.page-customer-test-report.p-20
        .clearfix.grid-list-head.mt10
            router-link(:to="{name : 'sms_TestReportLayout_Test'}").grid-tab.fl 内容测试
            router-link(:to="{name : 'sms_TestReportLayout_Intelligent'}").grid-tab.fl 智能模板
            router-link(:to="{name : 'sms_TestReportLayout_General'}").grid-tab.fl 通用模板
        router-view
</template>
<style lang="scss">
.page-customer-test-report {
    .top-nav{
        height: 60px;
        border-bottom: 2px solid #2ea967;
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