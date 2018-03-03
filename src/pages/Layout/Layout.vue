<template lang="pug">
    div
        PageHeader
        div.layout-wrap.relative#layout
            GridMenu
            router-view
        div.icp
            p.tx-c &copy; 2016 ucpaas.com 版权所有 粤ICP备14046848号
</template>
<style lang="scss">
@import '../../assets/styles/config.scss';
.layout-wrap{
    padding-top:60px;
    padding-bottom:60px;
    background-color: #FFF;
    padding-left:200px;
}
</style>
<script src="./Layout.controller.js"></script>

