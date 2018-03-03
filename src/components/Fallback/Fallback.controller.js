import { Utils } from '@/model/util';
let utils = new Utils();

export default {
    props: {
        id: String,
        name: String,
    },
    data() {
        return {
            params: {
                operator_code: '',
                product_type: '',
                client_id: '',
            },
            product: [{
                value: '',
                label: '全部类型'
            }, {
                value: '0',
                label: '行业'
            }, {
                value: '4',
                label: '通知'
            }, {
                value: '3',
                label: '验证码'
            }, {
                value: '1',
                label: '营销'
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
            }],
            data: [],
            rollbackData: [],
            rollbackList: [],
            clientInfo: '',
            loading: false,
            showMask: false,
        }
    },
    mounted() {
        this.params.client_id = this.id;
        this.clientInfo = this.id + "【" + this.name + "】"
        this.search();
    },
    methods: {
        close() {
            this.$emit("close");
        },
        search() {
            this.loading = true;
            let _params = {};
            _params.clientId = this.params.client_id;
            _params.productType = this.params.product_type;
            _params.operatorCode = this.params.operator_code;
            
            utils.post("/recharge/rollback/rollbackData", _params).then(res => {
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
        toggleRowSelection(row,selected){

        },
        produceRecharge() {
            if (this.rollbackData.length == 0) {
                this.$message.error("请选择要回退的短信");
                return;
            }
            let arr = this.rollbackData;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].product_type == 2) {
                    arr[i].updateNumStr = arr[i].updateNum + "元"
                } else {
                    arr[i].updateNumStr = arr[i].updateNum + "条"
                }

            }
            this.rollbackList = arr;
            this.showMask = true;
        },
        commit() {

            let rollback_params = {},
                arr = [];
            let jsonData = this.rollbackData;
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
            rollback_params.batchback = JSON.stringify(arr);

            utils.post("/recharge/rollback/fallback", rollback_params, { emulateJSON: true }).then(res => {
                this.close();

                this.$message({
                    type: "success",
                    message: "回退成功"
                })
            }, res => {
                this.$message.error(res.msg);
            })
        },
        handleSelectionChange(val) {
            this.rollbackData = val;
        },
        handleChange(row) {
            this.$nextTick(_ => {
                let num = row.updateNum + "";
                let arr = num.split(".");
                if (arr.length > 1) {
                    row.updateNum = arr[0];
                }
                if(num == '0'){
                    this.$refs.multipleTable.toggleRowSelection(row,false);
                }else{
                    this.$refs.multipleTable.toggleRowSelection(row,true);
                }
            })
        },
        goBack() {
            this.$emit("goBack");
            this.$emit("refresh", '1');
        }
    },
}
