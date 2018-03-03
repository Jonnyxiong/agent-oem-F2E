import { Utils } from '@/model/util';
let utils = new Utils();

export default {
    name: 'Own',
    data() {
        return {
            params: {
                financial_type: '',
                payment_type: '',
                order_id: '',
                currentPage: '1',
            },
            showOnlineRecharge: false,
            financial: [{
                value: '',
                label: '全部'
            }, {
                value: '0',
                label: '入账'
            }, {
                value: '1',
                label: '出账'
            }],
            payment: [{
                value: '',
                label: '所有'
            }, {
                value: '0',
                label: '充值'
            }, {
                value: '1',
                label: '扣减'
            }, {
                value: '3',
                label: '购买产品包'
            }, {
                value: '6',
                label: '后付费子账户消耗'
            }, {
                value: '4',
                label: '退款'
            }, {
                value: '5',
                label: '赠送'
            }, {
                value: '8',
                label: '后付费子账户条数返还'
            }, {
                value: '7',
                label: '回退条数'
            }, {
                value: '9',
                label: '增加授信'
            }, {
                value: '10',
                label: '降低授信'
            }],
            isexport: false,
            showSetting: false,
            showRecord: false,
            showPayDialog: false,

            record_list: [], //授信记录
            creditInfo: {}, //授信信息
        }
    },
    filters: {
        fix: function (value) {
            if (value !== undefined && value !== null) {
                return value.toFixed(2);
            }
        }
    },
    mounted() {
        console.log(this.bill_data.balance + this.bill_data.current_credit)
        this.getOwnOrderList('1');
        this.getBillData();
        this.getCreditInfo();
        this.getCreditHistory();
    },
    methods: {
        getCreditHistory() {
            utils.get('/finance/creditHistories/list').then(res => {
                this.record_list = res.data;
            }, res => {
                this.$message.error(res.msg);
            })
        },
        getCreditInfo() {
            let agent_id = this.bill_data.agent_id || localStorage.getItem("id");

            utils.get('/finance/agentBalanceAlarm/get', { customerInfo: agent_id }).then(res => {
                this.creditInfo = res.data;
            }, res => {
                this.$message.errror(res.msg);
            })
        },
        getBillData() {
            this.$store.commit('LOAD_BILLDATA', { loading: true });
            this.$store.dispatch("getBillData");
        },
        getOwnOrderList(val) {
            let params = this.params;
            params.currentPage = val;

            this.$store.commit('LOAD_LIST', { loading: true });
            this.$store.commit('PARAMS', { params: params });
            this.$store.dispatch('getOwnOrderList');
        },
        setCredit() {
            let phone = this.creditInfo.alarmPhone.split(",");
            for (let i = 0; i < phone.length; i++) {
                if (!/^[1][0-9][0-9]{9}$/.test(phone[i])) {
                    this.$message.error("手机号码格式不正确");
                    return false;
                }
            }
            if (this.isRepeat(phone)) {
                this.$message.error("手机号码重复");
                return false;
            }

            if (!/^[0-9]*$/.test(this.creditInfo.alarmAmount)) {
                this.$message.error("提醒额度为大于0的整数，且不能为空");
                return false;
            }
            if (this.creditInfo.alarmAmount > 1000000) {
                this.$message.error("提醒额度不能大于100万");
                return false;
            }
            let params = {};
            params.agentId = this.bill_data.agent_id || localStorage.getItem("id");
            params.alarmAmount = this.creditInfo.alarmAmount;
            params.alarmPhone = this.creditInfo.alarmPhone;
            utils.post('/finance/agentBalanceAlarm/edit', params, { emulateJSON: true }).then(res => {
                this.$message({
                    type: 'success',
                    message: res.msg
                });
                this.showSetting = false;
                this.getCreditInfo();
            }, res => {
                this.$message.error(res.msg);
            })

        },
        isRepeat(arr) {
            var hash = {};
            for (var i in arr) {
                if (hash[arr[i]])
                    return true;
                hash[arr[i]] = true;
            }
        },
        closeSetting() {
            this.showSetting = false;
            this.getCreditInfo();
        },
        closeRecord() {
            this.showRecord = false;
        },
        openSetting() {
            this.showSetting = true;
        },
        openRecord() {
            this.showRecord = true;
        },
        exportReport() {
            if (this.isexport) {
                return;
            }
            this.isexport = true;

            let _params = {}
            _params.order_id = this.params.order_id;
            _params.payment_type = this.params.payment_type;
            _params.financial_type = this.params.financial_type;

            // if(this.own_list.list.length > 0){
            //     utils.export(_params, "/finance/bill/self/export")
            // } else {
            //     this.$message.error("当前列表没有数据，无法导出")
            // }
            utils.post("/finance/bill/self/export", _params, { emulateJSON: true }).then(res => {
                this.isexport = false;
            }, res => {
                this.isexport = false;
                if (res.length > 0) {
                    utils.export(_params, "/finance/bill/self/export");
                } else {
                    this.$message.error("当前条件没有数据，无法导出");
                }
            })

        },
        handleCurrentChange(val) {
            this.getOwnOrderList(val);
        },
        closeOnlineRecharge() {
            this.showOnlineRecharge = false;
        },
        openOnlineRecharge() {
            this.showOnlineRecharge = true;
        },
        closePayDialog() {
            this.showPayDialog = false;
        },
        openPayDialog() {
            this.showPayDialog = true;
        }
    },

    computed: {
        loading: function () {
            return this.$store.getters.load_list;
        },
        own_list: function () {
            return this.$store.getters.own_list;
        },
        bill_data: function () {
            return this.$store.getters.bill_data;
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
