import { Utils } from '@/model/util';
let utils = new Utils();

export default {
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
            value: '',
            params: {
                customerInfo: '',
                smstype: '',
                start_time_day: '',
                end_time_day: '',
                currentPage: 1,
            },
            isexport: false,
            threeMonths: ''
        }
    },
    mounted() {
        this.params.customerInfo = this.$route.query.id;


        // this.params.start_time_day = sessionStorage.getItem("houfustart");
        // this.params.end_time_day = sessionStorage.getItem("houfuend");

        let start_date_arr = sessionStorage.getItem("houfustart").split("-");
        let end_date_arr = sessionStorage.getItem("houfuend").split("-");

        let start_year = start_date_arr[0],
            start_month = start_date_arr[1] * 1 - 1,
            start_day = start_date_arr[2];

        let end_year = end_date_arr[0],
            end_month = end_date_arr[1] * 1 - 1,
            end_day = end_date_arr[2];

        let start_date = new Date();
        start_date.setFullYear(start_year);
        start_date.setMonth(start_month)
        start_date.setDate(start_day);

        let end_date = new Date();
        end_date.setFullYear(end_year);
        end_date.setMonth(end_month)
        end_date.setDate(end_day);

        this.startTime = start_date;
        this.endTime = end_date;

        // this.params.product_type = sessionStorage.getItem("post_product_type");
        let smstype = sessionStorage.getItem("post_smstype");
        if (smstype != 4 && smstype != 5 && smstype != 0) {
            this.params.smstype = "";
        } else {
            this.params.smstype = smstype;
        }

        this.$nextTick(_ => {
            this.getReportDailyList(1);
        })

        this.getThreeMonths();
    },
    methods: {
        getThreeMonths() {
            let curDate = (new Date()).getTime();
            let three = 90 * 24 * 3600 * 1000;
            let pastResult = curDate - three;
            this.threeMonths = new Date(pastResult).getTime();
        },
        getReportDailyList(val) {
            this.params.currentPage = val;
            this.$store.commit("LOAD_LIST", { loading: true });
            this.$store.commit("PARAMS", { params: this.params });
            this.$store.dispatch("getReportDailyListPost");
        },
        goBack() {
            this.$router.go(-1);
        },
        changeStartDay(val) {
            this.params.start_time_day = val || "";
        },
        changeEndDay(val) {
            this.params.end_time_day = val || "";
        },
        handleCurrentChange(val) {
            this.getReportDailyList(val);
        },
        exportReport() {
            if (this.isexport) {
                return;
            }
            this.isexport = true;

            let _params = this.params;
            _params.paytype = '1';

            // if(this.own_list.list.length > 0){
            //     utils.export(_params, "/finance/bill/self/export")
            // } else {
            //     this.$message.error("当前列表没有数据，无法导出")
            // }
            //utils.export(_params, "/client/report/consume/consumeReportDayExport");
            utils.post("/client/report/consume/consumeReportDayExport", _params, { emulateJSON: true }).then(res => {
                this.isexport = false;
            }, res => {
                this.isexport = false;
                if (res.length > 0) {
                    utils.export(_params, "/client/report/consume/consumeReportDayExport");
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
        daily_list() {
            return this.$store.getters.report_daily_list;
        }
    }
}