<template lang="pug">
.page-notice
    .notice {{noticeName}}
    .noticeTime {{releaseTime}}
    .content(v-html='noticeContent') 

        
</template>
<script src="./View.controller.js"></script>
<style lang="scss">
@import '../../assets/styles/config.scss';
.page-notice{
    .notice {
        width: 100%;
        text-align: center;
        font-size: 28px;
        margin-top: 50px;
        font-weight: 900;
    }
    .noticeTime{
        margin-left: 200px;
        margin-right: 200px;
        margin-top: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e4e4e4;
    }
    .content{
        margin-left: 200px;
        margin-right: 200px;
        margin-top: 60px;
    }
}
</style>