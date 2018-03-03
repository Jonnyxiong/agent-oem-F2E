import { Utils } from '@/model/util';
let utils = new Utils();

export default {
    name: 'PayOrder',
    data() {
        return {
            pickerOptions: {
                disabledDate: (time) => {
                    return time.getTime() > Date.now() - 8.64e6
                }
            },
            params: {
                paymentMode: '',
                paymentState: '',
                searchText: '',
                startPayTime: '',
                endPayTime: '',
                page: 1,
                rows: 15
            },
            datetime: null,
            list: [],
            timeQueue: [],
            pay_order_list: {},
            pay_type: [{
                value: '',
                label: '全部'
            }, {
                value: '1',
                label: '微信支付'
            }, {
                value: '0',
                label: '支付宝'
            }],
            pay_status: [{
                value: '',
                label: '全部'
            }, {
                value: '2',
                label: '支付成功'
            }, {
                value: '3',
                label: '支付失败'
            }, {
                value: '0',
                label: '待支付'
            }, {
                value: '1',
                label: '支付已提交'
            }, {
                value: '4',
                label: '支付已取消'
            }],
            showOnlineRecharge: false,
            showPayDialog: false,
            order: {
                orderId: "",
                price: "",
                payType: ""
            }

        }
    },
    mounted() {
        this.getPayOrderList('1');
    },
    methods: {
        getPayOrderList(val) {
            let params = this.params;
            params.page = val || this.params.page;
            this.clearTime();
            this.$store.commit('LOAD_LIST', { loading: true });
            utils.post('/onlinePay/queryPayOrder', params, { emulateJSON: true }).then(res => {
                this.$store.commit('LOAD_LIST', { loading: false });
                this.pay_order_list = res.data;
                this.list = res.data.data;

                this.countDown();

            }, res => {
                commit('LOAD_LIST', { loading: false })
            })

        },
        countDown() {
            let that = this;
            for (let i = 0; i < this.list.length; i++) {
                let time = setInterval(function () {
                    if (/^[0-9]+$/.test(that.list[i].countDownStr)) {
                        that.list[i].countDownStr = that.list[i].countDownStr - 1;
                        if (that.list[i].countDownStr == 0) {
                            that.getPayOrderList();
                        }
                    }
                }, 1000)
                this.timeQueue.push(time);
            }
        },
        clearTime() {
            for (let i = 0; i < this.timeQueue.length; i++) {
                clearInterval(this.timeQueue[i]);
            }
        },
        handleCurrentChange(val) {
            this.params.page = val;
            this.getPayOrderList(val);
        },
        pay(id, price, paytype) {
            this.order.orderId = id;
            this.order.price = price;
            this.order.payType = paytype;
            this.showOnlineRecharge = true;


        },
        cancelpay(id) {
            this.$confirm('此操作将取消支付订单' + id + ', 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.cancelOrder(id);
            });

        },
        openPayDialog() {
            this.showPayDialog = true;
        },
        closeOnlineRecharge() {
            this.showOnlineRecharge = false;
        },
        dateHandle(val) {
            let arr = val.split("~");

            if (arr.length > 1) {
                this.params.startPayTime = arr[0].trim();
                this.params.endPayTime = arr[1].trim();
            } else {
                this.params.startPayTime = "";
                this.params.endPayTime = "";
            }


        },
        cancelOrder(paymentId) {
            utils.post('/onlinePay/cancelPay', { paymentId: paymentId }, { emulateJSON: true }).then(res => {
                this.getPayOrderList('1');

            }, res => {
                this.$message.error(res.msg);
            })
        }
    },
    filters: {
        timeFilter: function (val) {
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
    computed: {
        loading: function () {
            return this.$store.getters.load_list;
        }
    },
    components: {
        'OnlineRecharge': (resolve) => {
            require(['@/components/OnlineRecharge/OnlineRecharge.vue'], resolve)
        },
        'PayDialog': (resolve) => {
            require(['@/components/PayDialog/PayDialog.vue'], resolve)
        },
    },

}
