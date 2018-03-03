<template lang="pug">
    div.page-customer-test-report.p-20
        .clearfix.grid-list-head.mt10
            router-link(:to="{name : 'finance_invoice_add'}").grid-tab.fl 发票申请
            router-link(:to="{name : 'finance_invoice_list'}").grid-tab.fl 申请记录
        router-view
</template>
