<style lang="scss" scoped>
.mask-ctx{
    width:470px;
    border-radius: 6px;
    padding:30px 20px 20px;
    .close{
        top:25px;
        right:25px;
        cursor: pointer;
    }
    p{
        font-size:16px;
        font-weight: 800;
        line-height: 30px;
    }
    p.tip{
        span{
            margin-right: 5px;
        }
        font-size:14px;
        line-height: 22px;
    }
    .confirm{
        width:260px;
        display:block;
        margin:0 auto;
        margin-top:40px;
    }
}
</style>
<template lang="pug">
div.mask
    div.mask-ctx
        <p class="mb10">您在第三方支付平台进行在线转账操作</p>
        <p class="tip"><span class="el-icon-information link-green"></span>如在线充值遇到问题，请在订单记录内查询订单状态</p>
        <p class="tip"><span class="el-icon-information link-green"></span>如未完成您可以继续完成操作</p>
        <div class="border-t clearfix pt10 mt20">
            <a href="/#/finance/payorder" class="fr btn btn-green btn-md radius">完成充值</a>
            <a href="/#/finance/payorder" class="fr btn btn-white btn-md radius mr20">支付遇到问题</a>
        </div>
</template>
<script src="./PayDialog.controller.js"></script>
