import { Utils } from '@/model/util';


let utils = new Utils();

export default {
    name: "OnlineRecharge",
    props: ["price", "directPay", "orderId", "payType"],
    data() {
        return {
            showPaymentOrder: null,
            order: {
                paymentId: "",
                paymentModeName: "",
                paymentAmount: "",
                countDownStr: "",
                paymentMode: "",
            },
            gateway: {},
            payUrl: "",
            showWechat: false,
            params: {
                paymentMode: '0',
                paymentAmount: "",
            }
        }
    },
    mounted() {
        if (this.directPay == 1) {
            this.order.paymentId = this.orderId;
            this.order.paymentAmount = this.price;

            if (this.payType == 1) {
                this.showWechat = true;
                return;
            }
            this.showPaymentOrder = true;
            this.getOrderInfo(this.orderId);
        } else {
            this.showPaymentOrder = false;
        }
    },
    filters: {
        timeFilter(val) {
            if (val === "" || val === null || val === undefined || !/^[0-9]*$/.test(val)) {
                return "00:00"
            }
            let min = parseInt(val / 60);
            let sec = val % 60;

            min = _format(min);
            sec = _format(sec);

            return min + ":" + sec;

        }
    },
    methods: {
        goBack() {
            this.$emit("goBack");
        },
        createOrder() {
            //调生成支付订单的接口,我先跳转到列表去，
            if (!/^[0-9]+$/.test(this.params.paymentAmount)) {
                this.$message.error("充值金额必须为整数，且不能为空");
                return;
            }
            // if (this.params.paymentAmount < 50) {
            //     this.$message.error("50起充");
            //     return;
            // }
            if (this.params.paymentAmount > 1000000) {
                this.$message.error("最大金额不能超过1000000");
                return;
            }
            utils.post("/onlinePay/createOrder", this.params, { emulateJSON: true }).then(res => {
                let id = res.data.paymentId;
                this.getOrderInfo(id);
            }, res => {
                this.$message.error(res.msg);
            })

        },
        //获取订单信息
        getOrderInfo(id) {
            this.showPaymentOrder = true;
            utils.post("/onlinePay/getPaymentInfo", { paymentId: id }, { emulateJSON: true }).then(res => {
                this.gateway.payType = res.data.payType;
                this.gateway.payAmount = res.data.payAmount;
                this.gateway.orderId = id;
                this.gateway.payTime = res.data.payTime;
                this.gateway.sign = res.data.sign;
                this.gateway.notifyUrl = res.data.notifyUrl;
                this.gateway.merId = res.data.merId;
                this.gateway.userId = res.data.userId;

                this.order.paymentModeName = res.data.paymentModeName;
                this.order.paymentAmount = res.data.paymentAmount;
                this.order.paymentId = id;
                this.order.countDownStr = res.data.countDownStr;
                this.order.paymentMode = res.data.paymentMode;

                this.payUrl = res.data.payUrl;

                this.countDown();
            }, res => {

            })
        },
        //立即支付 
        paySubmit() {
            //微信支付
            if (this.order.paymentMode == "1") {
                this.showWechat = true;
            } else {
                this.postGateWay();
            }

        },
        countDown() {
            let order = this.order,
                that = this;
            setTimeout(function () {
                debugger;
                if (order.countDownStr > 0 && /^[0-9]*$/.test(order.countDownStr)) {
                    order.countDownStr = order.countDownStr - 1;
                    that.countDown();
                }
            }, 1000)
        },
        closeWechat() {
            this.showWechat = false;
        },
        //取消支付
        payCancel() {
            utils.post('/onlinePay/cancelPay', { paymentId: this.order.paymentId }, { emulateJSON: true }).then(res => {
                this.$message({
                    type: 'success',
                    message: '取消支付成功!'
                });
                if (this.directPay == 1) {
                    console.log("123")
                    this.$emit("refresh");
                }
                this.goBack();
            }, res => {
                this.$message.error(res.msg);
            })
        },
        postGateWay() {
            //改变订单状态
            utils.post("/onlinePay/paySubmit", { paymentId: this.order.paymentId }, { emulateJSON: true }).then(res => {

            }, res => {

            })
            let options = this.gateway;
            //表单模拟提交到支付网关
            let turnForm = document.createElement("form");
            document.body.appendChild(turnForm);
            turnForm.method = 'post';
            turnForm.action = this.payUrl;
            turnForm.target = '_blank';
            let str = '?';
            //创建表单
            for (let key in options) {
                //  str += key + "=" + options[key] + "&";
                let newElement = document.createElement("input");
                newElement.setAttribute("name", key);
                newElement.setAttribute("type", "hidden");
                newElement.setAttribute("value", options[key]);
                turnForm.appendChild(newElement);
            }
            turnForm.submit();
            this.getPaymentStatus();
            // 打开弹窗
            this.$emit("open");
            this.goBack();
        },
        getPaymentStatus() {
            let params = {};
            let that = this;
            params.paymentId = this.gateway.orderId;
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
        },
        checkWechat() {
            this.params.paymentMode = 1;
        },
        checkAli() {
            this.params.paymentMode = 0;
        }
    },
    components: {
        'WechatRecharge': (resolve) => {
            require(['@/components/WechatRecharge/WechatRecharge.vue'], resolve)
        },
    }
}
