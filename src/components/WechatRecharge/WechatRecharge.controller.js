import { Utils } from '@/model/util';
let utils = new Utils();

export default {
    name: "WechatRecharge",
    props: ["orderId", "price"],
    data() {
        return {
            imgUrl: '',
            imgLoad: false,
            isSubmit: false
        }
    },
    mounted() {
        this.wechatPay();
    },
    methods: {
        wechatPay() {
            this.imgLoad = true;
            utils.post('/onlinePay/getPaymentAddrForWeChat', { paymentId: this.orderId }, { emulateJSON: true }).then(res => {
                let wechat_res = res.data;

                let url = "/api/onlinePay/getQRCodeImgForWeChat?paymentAddr=" + wechat_res + '&timestamp=' + Date.parse(new Date());
                //加载图片
                let img = new Image();
                let that = this;
                this.isSubmit = true;
                this.btnText = '立即支付';
                //that.getPaymentStatus();
                img.onload = function () {
                    that.imgUrl = url;
                    that.imgLoad = false;
                    //获取流水状态
                    that.getPaymentStatus();
                }
                img.error = function () {
                    this.$message.error("二维码加载失败");
                }
                img.src = url;
            }, response => {
                this.$message.error("网络错误，请重试");
            })
        },
        getPaymentStatus() {
            let params = {};
            let that = this;
            params.paymentId = this.orderId;
            utils.get('/onlinePay/getOnlinePaymentState', params).then(res => {
                if (res.data && res.data.payment_state == 2) {
                    location.href = "/#/finance/payorder";
                } else {
                    setTimeout(function () {
                        that.getPaymentStatus();
                    }, 1500)
                }
            }, res => {
                setTimeout(function () {
                    that.getPaymentStatus();
                }, 1500)
            })
        }
    },


}
