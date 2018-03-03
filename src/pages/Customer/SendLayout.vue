<template lang="pug">
    div.page-send-record
        .p-20.mt10
            .clearfix.grid-list-head
                router-link(:to="{name : 'sms_sendrecord'}").grid-tab.fl 发送记录
                router-link(:to="{name : 'sms_reply'}").grid-tab.fl 用户回复
        router-view
</template>
<style lang="scss">
.page-send-record {
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