import { Utils } from '@/model/util';
let utils = new Utils();

export default {
    props: {
        id: String,
        name: String,
    },
    data() {
        return {
            submitFlag: false,
            params: {
                operator_code: '',
                product_type: ''
            },
            product: [{
                value: '',
                label: '全部类型'
            }, {
                value: 3,
                label: '验证码'
            }, {
                value: 4,
                label: '通知'
            }, {
                value: 1,
                label: '营销'
            }, {
                value: 0,
                label: '行业'
            }, {
                value: 2,
                label: '国际短信'
            }],
            operator: [{
                value: '',
                label: '全部类型'
            }, {
                value: 0,
                label: '全网'
            }, {
                value: 1,
                label: '移动'
            }, {
                value: 2,
                label: '联通'
            }, {
                value: 3,
                label: '电信'
            }, {
                value: 4,
                label: '国际'
            }],
            data: [],
            rechargeData: [],
            showMask: false,
            loading: false,
            clientInfo: "",
            rechargeList: []
        }
    },
    mounted() {
        this.search();
        this.clientInfo = this.id + "【" + this.name + "】"
    },
    methods: {
        close() {
            this.$emit("close");
        },
        search() {
            this.loading = true;
            let params = this.params;
            utils.post("/recharge/rollback/rechargeData", params, { emulateJSON: true }).then(res => {
                let data = res.data;
                this.loading = false;
                for (let i = 0; i < data.length; i++) {
                    data[i].updateNum = 0;
                }
                this.data = data;
            }, res => {
                this.loading = false;
            })
        },
        toggleRowSelection(row, selected) {

        },
        handleSelectionChange(val) {
            this.rechargeData = val;
        },
        handleChange(row) {
            this.$nextTick(_ => {
                let num = row.updateNum + "";
                let arr = num.split(".");
                if (arr.length > 1) {
                    row.updateNum = arr[0];
                }
                if (num == '0') {
                    this.$refs.multipleTable.toggleRowSelection(row, false);
                } else {
                    this.$refs.multipleTable.toggleRowSelection(row, true);
                }
            })

        },
        produceRecharge() {
            if (this.rechargeData.length == 0) {
                this.$message.error("请选择要充值的短信");
                return;
            }
            let arr = this.rechargeData;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].product_type == 2) {
                    arr[i].updateNumStr = arr[i].updateNum + "元"
                } else {
                    arr[i].updateNumStr = arr[i].updateNum + "条"
                }

            }
            this.rechargeList = arr;
            this.showMask = true;
        },
        commit() {
            if (this.submitFlag) {
                return;
            }
            let recharge_params = {},
                arr = [];
            let jsonData = this.rechargeData;
            for (let i = 0; i < jsonData.length; i++) {
                arr[i] = {};
                arr[i].client_id = this.id;
                arr[i].product_type = jsonData[i].product_type;
                arr[i].updateNum = jsonData[i].updateNum;
                arr[i].due_time = jsonData[i].due_time1;
                arr[i].unit_price = jsonData[i].unit_price;
                arr[i].operator_code = jsonData[i].operator_code;
                arr[i].area_code = jsonData[i].area_code;
            }
            this.submitFlag = true;
            recharge_params.batchdata = JSON.stringify(arr);
            utils.post("/recharge/rollback/recharge", recharge_params, { emulateJSON: true }).then(res => {
                this.close();
                this.submitFlag = false;
                this.$message({
                    type: "success",
                    message: "充值成功"
                })
            }, res => {
                this.close();
                this.submitFlag = false;
                this.$message.error(res.msg);
            })
        },
        goBack() {
            this.$emit("close");
            this.$emit("refresh", '1');
        }
    }
}
