import { Utils } from '@/model/util';
let utils = new Utils();

export default {
    name: "bbil",
    data() {
        return {
            pickerOptions0: {
                disabledDate: (time) => {
                    if (this.endTime != "") {
                        return time.getTime() > Date.now() || time.getTime() > this.endTime;
                    } else {
                        return time.getTime() > Date.now()
                    }
                }
            },
            pickerOptions1: {
                disabledDate: (time) => {
                    return time.getTime() < this.startTime || time.getTime() > Date.now();
                }
            },
            startTime: null,
            endTime: null,
            headerData: {
                agentPoolRemainNumData: {},
                data: {}
            },
            options: [{
                value: "",
                label: "全部类型"
            }, {
                value: "0",
                label: "短信购买"
            }, {
                value: "1",
                label: "子账户充值"
            }, {
                value: "2",
                label: "子账户回退"
            }, {
                value: "3",
                label: "回退条数"
            }],
            params: {
                order_type: '', //0 OEM代理商购买 1 OEM代理商给客户充值 other 
                orderInfo: '', //订单编号。客户ID。客户名称
                start_time_day: '',
                end_time_day: '',
                currentPage: ''
            },
            isexport: false,
        };
    },
    mounted() {
        this.getHeaderData();
        this.getBillList();
    },
    methods: {
        getHeaderData() {
            utils.get("/finance/bill/sms/data").then(res => {
                this.headerData = res.data;
            }, res => {
                this.$message.error(res.msg)
            })
        },
        getBillList(val) {
            let params = this.params;
            params.currentPage = val;

            this.$store.commit('PARAMS', { params: params })
            this.$store.commit('LOAD_LIST', { loading: true })
            this.$store.dispatch("getBillList");
        },
        changeStartDay(val) {
            this.params.start_time_day = val || '';
        },
        changeEndDay(val) {
            this.params.end_time_day = val || '';
        },
        handleCurrentChange(val) {
            this.getBillList(val);
        },
        exportReport() {
            if (this.isexport) {
                return;
            }
            this.isexport = true;
            let export_params = {};
            export_params.order_type = this.params.order_type;
            export_params.orderInfo = this.params.orderInfo;
            export_params.start_time_day = this.params.start_time_day;
            export_params.end_time_day = this.params.end_time_day;


            utils.post("/finance/bill/sms/export", export_params, { emulateJSON: true }).then(res => {
                    this.isexport = false;
                }, res => {
                    this.isexport = false;
                    if (res.length > 0) {
                        utils.export(export_params, "/finance/bill/sms/export");
                    } else {
                        this.$message.error("当前条件没有数据，无法导出")
                    }
                })
                // utils.export(export_params, "/finance/bill/sms/export");

            // if(this.bill_list.list.length > 0){
            //      utils.export(export_params, "/finance/bill/sms/export");
            // } else {
            //     this.$message.error("当前列表没有数据，无法导出")
            // }
        }
    },
    computed: {
        loading: function() {
            return this.$store.getters.load_list;
        },
        bill_list: function() {
            return this.$store.getters.bill_list;
        },
    }
};