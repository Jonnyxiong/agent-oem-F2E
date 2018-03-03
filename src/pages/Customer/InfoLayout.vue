<template lang="pug">
    div.page-user-info
        h1.page-title.border-b 
            router-link(:to="{name : 'service_manager'}").btn.btn-md.btn-white.ml20
                span.fa.fa-angle-left.ml5
                | 返回上一级
            span.p-20 子账户资料
        .clearfix.top-nav
            router-link(:to="{name : 'customer_manager_info', parmas : {id : client_id},  query : {status : oauth_status, type : type}}").fl 基本信息
            router-link(:to="{path : '/customer/manager/'+ client_id + '/auth', query : {status : oauth_status, type : type} }").fl 资质信息
        router-view
</template>
<script src="./InfoLayout.controller.js"></script>