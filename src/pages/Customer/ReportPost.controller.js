import { Utils } from '@/model/util';
let utils = new Utils();

export default {
    name: 'repoter_post',
    data() {
        return {
            pickerOptions0: {
                disabledDate: (time) => {
                    if (this.endTime != "") {
                        return time.getTime() > Date.now() - 8.64e7 || time.getTime() > this.endTime || time.getTime() < this.threeMonths;
                    } else {
                        return time.getTime() > Date.now() - 8.64e7 || time.getTime() < this.threeMonths;
                    }

                }
            },
            pickerOptions1: {
                disabledDate: (time) => {
                    return time.getTime() < this.startTime || time.getTime() > Date.now() - 8.64e7 || time.getTime() < this.threeMonths;
                }
            },
            startTime: '',
            endTime: '',
            params: {
                customerInfo: '',
                smstype: '',
                start_time_day: '',
                end_time_day: '',
                currentPage: 1,
            },
            smstypes: [{
                value: '',
                label: '全部'
            }, {
                value: '4',
                label: '验证码'
            }, {
                value: '0',
                label: '通知'
            }, {
                value: '5',
                label: '营销'
            }, {
                value: '8',
                label: '闪信'
            }, {
                value: '7',
                label: 'USSD'
            }],
            isexport: false,
            threeMonths: '',
        }
    },
    mounted() {
        this.startTime = new Date(new Date() - 24 * 60 * 60 * 1000);
        this.endTime = new Date(new Date() - 24 * 60 * 60 * 1000);

        this.$nextTick(_ => {
            this.getReportTotalList(1);
        })
        this.getThreeMonths();
    },
    methods: {
        showDaily(row) {
            let smstype = row.smstype;
            if (smstype != '4' && smstype != '5' && smstype != "0") {
                smstype = "";
            }
            sessionStorage.setItem("post_smstype", smstype);
            this.$router.push({ name: 'sms_report_daily_post', query: { id: row.clientid } })
        },
        getThreeMonths() {
            let curDate = (new Date()).getTime();
            let three = 90 * 24 * 3600 * 1000;
            let pastResult = curDate - three;
            this.threeMonths = new Date(pastResult).getTime();
        },
        getReportTotalList(val) {

            let params = this.params;
            params.currentPage = val;
            this.$store.commit("PARAMS", { params: params })
            this.$store.commit("LOAD_LIST", { loading: true });
            this.$store.dispatch("getReportTotalListPost");
        },
        changeStartDay(val) {
            this.params.start_time_day = val || "";
            sessionStorage.setItem("houfustart", this.params.start_time_day);
        },
        changeEndDay(val) {
            this.params.end_time_day = val || "";
            sessionStorage.setItem("houfuend", this.params.end_time_day);
        },
        handleCurrentChange(val) {
            this.getReportTotalList(val);
        },
        exportReport() {
            if (this.isexport) {
                return;
            }
            this.isexport = true;

            let _params = this.params;
            _params.paytype = '1';

            utils.post("/client/report/consume/consumeReportTotalExport", _params, { emulateJSON: true }).then(res => {
                this.isexport = false;
            }, res => {
                this.isexport = false;
                if (res.length > 0) {
                    utils.export(_params, "/client/report/consume/consumeReportTotalExport");
                } else {
                    this.$message.error("当前条件没有数据，无法导出");
                }
            })
        }
    },
    computed: {
        loading() {
            return this.$store.getters.load_list;
        },
        report_total_list() {
            return this.$store.getters.report_total_list;
        }
    }
}
