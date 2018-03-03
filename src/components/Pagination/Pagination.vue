<template>
    <div class="smsc-pagination">
        <div class="tx-r">
            <a href="href:javascript:;" class="smsc_prop" v-on:click="pageProp" v-if="currentPage > 1"></a>
            <a href="href:javascript:;" class="smsc_prop disable" v-else></a>
            <span class="page">{{currentPage}}/{{totalPage}}</span>
            <a href="href:javascript:;" class="smsc_next" v-on:click="pageNext" v-if="currentPage < totalPage"></a>
            <a href="href:javascript:;" class="smsc_next disable" v-on:click="pageNext" v-else></a>
            <input type="text" v-model="pagenow" v-on:keyup.enter="goPage">
            <a href="javascript:;" class="smsc-go_btn" v-on:click="goPage">跳转</a>
        </div>
    </div>
</template>
<script src="./Pagination.controller.js"></script>
<style lang="scss" scoped>
.smsc-pagination{
    height:30px;
    *{
        box-sizing: border-box;
    }
}
    .smsc_prop,.smsc_next{
        background: #FFF;
        border:1px solid #e4e4e4;
        width:30px;
        height:30px;
        background-position: center center;
        background-repeat: no-repeat;
    }
    .smsc_prop{
        background-image: url(./images/icon-page-left.png);
    }
    .smsc_next{
        background-image: url(./images/icon-page-right.png);
    }
    .page{
        display: inline-block;
        line-height: 30px;
        vertical-align: top;
        padding:0 10px;
    }
    a{
        display: inline-block;
        vertical-align: top;
        &:hover{
            background-color: #F8F8F8;
        }

    }
    input{
        display: inline-block;
        vertical-align: top;
        width:75px;
        height:30px;
        border:1px solid #e4e4e4; 
        line-height: 30px;
        padding:0 10px;
    }
    .smsc-go_btn{
        width:70px;
        text-align: center;
        border:1px solid #e4e4e4;
        line-height: 28px;
    }
    .disable{
        background-color: #F8F8F8;
        cursor:not-allowed;
    }
</style>
