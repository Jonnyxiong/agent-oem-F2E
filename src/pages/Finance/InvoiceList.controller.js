import { Utils } from '@/model/util';
let utils = new Utils();

export default {
    name: 'invoice_list',
    data() {
        return {
            pickerOptions: {
                disabledDate: (time) => {
                    return time.getTime() > Date.now() - 8.64e6
                }
            },
            params: {
                createTimeStart: "",
                createTimeEnd: "",
                status: "",
                applicationOEM: "",
                page: '1'
            },
            status_type: [{
                value: '',
                label: '全部'
            }, {
                value: '0',
                label: '待审核'
            }, {
                value: '1',
                label: ' 已取消'
            }, {
                value: '2',
                label: '审核不通过'
            }, {
                value: '3',
                label: '开票中'
            }, {
                value: '4',
                label: '已邮寄'
            }, {
                value: '5',
                label: '已返还'
            }],
            datetime: "",
            invoice: {},
            isShowInvoice: false,
        }
    },
    mounted() {
        let endTime = new Date();
        let startTime = new Date(endTime.getTime() - 90 * 24 * 3600 * 1000);
        this.datetime = [startTime, endTime];
        this.$nextTick(function () {
            this.getInvoiceList('1');
        });

    },
    methods: {
        dateHandle(val) {
            console.log(val);
            let arr = val.split("~");

            if (arr.length > 1) {
                this.params.createTimeStart = arr[0].trim();
                this.params.createTimeEnd = arr[1].trim();
            } else {
                this.params.createTimeStart = "";
                this.params.createTimeEnd = "";
            }
        },
        handleCurrentChange(val) {
            this.getInvoiceList(val);
        },
        getInvoiceList(val) {
            if (/^[0-9]*$/.test(val)) {
                this.params.page = val;
            }
            console.log(this.params);
            let params = this.params;
            this.$store.commit('LOAD_LIST', { loading: true });
            this.$store.commit('PARAMS', { params: params });
            this.$store.dispatch('getInvoiceList');
        },
        view(id, invoiceType) {
            utils.post("/invoice/invoiceDetailed", { id: id, invoiceType: invoiceType }, { emulateJSON: true }).then(res => {
                this.invoice = res.data;
                this.isShowInvoice = true;
            }, res => {
                this.$message.error(res.msg);
            });
        },
        beforeCancel(id, invoiceId, status, updateTime) {
            this.$confirm('您确定取消此发票申请?', '取消提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.cancel(id, invoiceId, status, updateTime);
            }).catch(() => {

            });
        },
        cancel(id, invoiceId, status, updateTime) {
            let params = {
                id: id,
                invoiceId: invoiceId,
                status: status,
                updateTime: updateTime
            }
            utils.post("/invoice/invoiceCancelApply", params, { emulateJSON: false }).then(res => {
                this.$message({
                    message: res.msg,
                    type: 'success'
                });
                this.getInvoiceList();
            }, res => {
                this.$message.error(res.msg);
            })
        },
        close() {
            this.isShowInvoice = false;
        }
    },
    computed: {
        invoice_list: function () {
            return this.$store.getters.invoice_list;
        },
        loading: function () {
            return this.$store.getters.load_list;
        },
    },
}
