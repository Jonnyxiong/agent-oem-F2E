import Buy from './Buy';
import { Utils } from '@/model/util';
let utils = new Utils();

export default {
    name: 'purchase',
    data() {
        return {
            submitFlag: false,
            isShowDesc: false,
            total: 0,
            submitFlag: false,
            multipleSelection: [],
            updateList: [],
            params: {
                operatorCode: '',
                productType: '',
                condition: ''
            },
            product: [{
                value: '',
                label: '全部类型'
            }, {
                value: '3',
                label: '验证码'
            }, {
                value: '4',
                label: '通知'
            }, {
                value: '1',
                label: '会员营销'
            }, {
                value: '0',
                label: '行业'
            }, {
                value: '2',
                label: '国际短信'
            }],
            operator: [{
                value: '',
                label: '全部类型'
            }, {
                value: '0',
                label: '全网'
            }, {
                value: '1',
                label: '移动'
            }, {
                value: '2',
                label: '联通'
            }, {
                value: '3',
                label: '电信'
            }, {
                value: '4',
                label: '国际'
            }],
        }
    },
    mounted() {
        this.getSmsList("1");
    },
    filters: {
        fix: function (value) {
            return value.toFixed(3);
        }
    },
    methods: {
        setRowClass(row, index) {
            if (row.flag == '1') {
                return "discount-icon"
            }
        },
        getSmsList(val) {
            let params = this.params;
            params.currentPage = val;

            this.$store.commit('PARAMS', { params: params });
            this.$store.commit('LOAD_LIST', { loading: true });
            this.$store.dispatch('getSmsList');
        },
        showDesc(row) {
            if (this.accountMsg.oauth_status != 3) {
                this.$message.error("请先认证后再购买短信");
                return;
            }
            this.smsDesc = row;
            this.isShowDesc = true;
        },
        jump(val) {
            this.getSmsList(val);
        },
        toggleRowSelection(row, selected) {

        },
        handleChange(row) {
            let rowMoney;

            this.$nextTick(_ => {
                let num = row.purchaseNum + "";
                let arr = num.split(".");
                if (arr.length > 1) {
                    row.purchaseNum = arr[0];
                    return;
                }
                if (row.productType == 2) {
                    rowMoney = row.purchaseNum * row.discountPriceStr.substring(4);
                } else {
                    rowMoney = row.purchaseNum * row.discountPriceStr;
                }
                row.price = rowMoney.toFixed(4);
                if (num == '0') {
                    this.$refs.multipleTable.toggleRowSelection(row, false);
                } else {
                    this.$refs.multipleTable.toggleRowSelection(row, true);
                }
                this.handleSelectionChange(this.multipleSelection)
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.total = 0;
            for (let i = 0; i < val.length; i++) {
                let lineMoney = val[i].price * 1;
                this.total += lineMoney;
            }
            this.total = this.total.toFixed(4);

        },
        confirm() {
            if (this.multipleSelection.length == 0) {
                this.$message.error("请选择要购买的短信");
                return;
            }
            let arr = this.multipleSelection;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].productType == 2) {
                    arr[i].purchaseNumStr = arr[i].purchaseNum + "元";
                } else {
                    arr[i].purchaseNumStr = arr[i].purchaseNum + "条";
                }
            }
            this.updateList = arr;
            this.isShowDesc = true;
        },
        commit() {
            if (this.submitFlag) {
                return;
            }

            let arr = [];
            let jsonData = this.multipleSelection;
            for (let i = 0; i < jsonData.length; i++) {
                arr[i] = {};
                arr[i].productId = jsonData[i].productId;
                arr[i].purchaseNum = jsonData[i].purchaseNum;
            }
            this.submitFlag = true;
            utils.post("/sms/order/jsmsAdd", JSON.stringify(arr)).then(res => {
                this.close();
                this.submitFlag = false;
                this.$message({
                    type: "success",
                    message: "购买成功"
                })
            }, res => {
                this.close();
                this.submitFlag = false;
                this.$message.error(res.msg);
            })
        },
        close() {
            this.isShowDesc = false;
        }
    },
    computed: {
        loading: function () {
            return this.$store.getters.load_list;
        },
        sms_list: function () {
            return this.$store.getters.sms_list;
        },
    }
}
