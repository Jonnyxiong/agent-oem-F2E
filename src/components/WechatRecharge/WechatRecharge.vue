<style lang="scss" scoped>
.pay-dialog{width: 560px;background-color: #fff;z-index: 101;}
.pay-dialog .top{height: 42px;line-height: 42px;padding-left: 15px;position: relative;}
.pay-dialog .info .title{padding: 30px 0 15px;text-align: center;width: 340px;}
.pay-dialog .info .title p{font-size: 14px;}
.pay-dialog .info .title p.num{font-size: 24px;color: #ff6600;font-weight: bold;}
.pay-dialog .info .img{border-bottom: 1px solid #e8e8e8;display: inline-block;border: 1px solid #d1d7da;margin: 0 20px 42px 80px;}
.pay-dialog .info .img .img-txt{padding-left: 60px;background: url(./images/pay-weixin-icon.png) 16px 3px no-repeat;margin: 10px 0;}
.pay-dialog .info .img .img-txt p{margin-bottom: 0;line-height: 20px;}
.pay-dialog .info .img .img-l{width: 170px;height: 168px;}
.pay-dialog .info .img .img-r{position: absolute;top: 124px;left: 285px;}
.pay-dialog .info .btm{text-align: center;padding: 20px 0 ;}
.pay-dialog .info .btm a{display: inline-block;width: 120px;height: 36px;line-height: 36px;font-size: 14px;background-color:#2fb26a;color: #fff;border: 1px solid #2fb26a;}
.pay-dialog .info .btm a.first{background-color: #fff;border: 1px solid #e8e8e8;color: #374552;margin-right: 20px;}
.pay-dialog .info .btm a.first:hover{background-color: #2fb26a;border-color: #2fb26a;color: #fff;}
.pay-dialog .info .btm a.second:hover{background-color: #40C57C;border-color: #40C57C;}
.pay-dialog .info .error{top: 526px;left: 146px;}

.mask-ctx{
    width:560px;
}
</style>

<template lang="pug">
    .mask
        .mask-ctx.pay-dialog
            .info
                .title
                    p 扫一扫付款(元)
                    p.num {{price}}
                .img
                    .relative(style="width:170px;height:168px;")
                        .absolute(style="width:100%;height:100%;line-height:168px;text-align:center;",v-if="imgLoad")
                            span.el-icon-loading(style="font-size:26px;")
                        img(:src="imgUrl",alt="",v-if="imgUrl").wechart_img_path.img-l
                    .img-txt
                        p 打开手机微信
                        p 扫一扫继续付款
                    .img-r
                        img(src="./images/pay-weixin-bg.png")
                .btm(v-if="isSubmit")
                    a(href="/#/finance/payorder").first.pay_fail 完成充值
                    a(href="/#/finance/payorder").second.pay_success 支付遇到问题
</template>
<script src="./WechatRecharge.controller.js"></script>
