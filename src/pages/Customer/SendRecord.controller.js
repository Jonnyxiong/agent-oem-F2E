import { Utils } from '@/model/util';
let utils = new Utils();
export default {
    name: "send_record",
    data() {
        return {
            list: [],
            // currentPage: 1,
            page: 1,
            totalCount: 100,
            pageRowCount: 10,
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e6
                }
            },
            params: {
                clientid: '',
                stateList: '',
                phone: '',
                searchContent: '',
                beginDate: '',
                endDate: '',
            },
            isexport: false,
            date: "",
            dateFormat: "",
            time: "",
            options: [],
            product: [{
                value: '',
                label: '全部'
            }, {
                value: '0,2',
                label: '发送中'
            }, {
                value: '3',
                label: '发送成功'
            }, {
                value: '5,7,8,9,10',
                label: '拦截'
            }, {
                value: '4,6',
                label: '发送失败'
            }, {
                value: '1',
                label: '未知'
            }]
        }
    },
    mounted() {
        let start_date = new Date();
        let year = start_date.getFullYear();
        let month = start_date.getMonth() + 1;
        let day = start_date.getDate();
        console.log(year, "-", month, "+", day);
        this.date = start_date;
        this.time = [new Date(year, month, day, 0, 0), new Date(year, month, day, 23, 59)];

        this.getConsumeUser()
    },
    methods: {
        changeStartDay(val) {
            this.dateFormat = val || "";

            if (this.time.length != 0) {
                let time1 = this.time[0].Format("hh:mm:ss");
                let time2 = this.time[1].Format("hh:mm:ss");

                this.params.beginDate = this.dateFormat + " " + time1;
                this.params.endDate = this.dateFormat + " " + time2;
            }
        },
        changeTime(val) {
            let time1 = val.split("-")[0];
            let time2 = val.split("-")[1];

            this.params.beginDate = this.dateFormat + " " + time1;
            this.params.endDate = this.dateFormat + time2;
        },
        getSendRecordList(val) {
            let _params = this.params;
            // this.params.currentPage = val;
            this.params.page = val;
            this.params.beginDate = this.params.beginDate.trim();
            this.params.endDate = this.params.endDate.trim();

            this.$store.commit('LOAD_LIST', { loading: true });
            this.$store.commit('PARAMS', { params: _params });
            this.$store.dispatch('getSendRecordList');
        },

        getConsumeUser() {
            let _params = {};
            _params.agentId = localStorage.getItem("id");
            utils.get('/client/consume/user', _params).then(res => {

            }).catch(res => {
                let _options = [];
                // this.params.beginDate = new Date(new Date());
                this.params.clientid = res[0].clientid;
                this.getSendRecordList('1');
                for (var i = 0; i < res.length; i++) {
                    _options[i] = {};
                    _options[i].value = res[i].clientid;
                    _options[i].label = res[i].clientid + "-" + res[i].name;
                }
                this.options = _options
            })
        },
        exportReport() {
            if (this.isexport) {
                return;
            }
            this.isexport = true;

            let _params = {}
            _params.clientid = this.params.clientid;
            _params.phone = this.params.phone;
            _params.stateList = this.params.stateList;
            _params.searchContent = this.params.searchContent;
            _params.beginDate = this.params.beginDate;
            _params.endDate = this.params.endDate;

            for (let i = 0; i < this.product.length; i++) {
                if (this.product[i].value == this.params.stateList) {
                    _params._stateList = this.product[i].label;
                }
            }
            utils.post("/send/exportrecords", _params, { emulateJSON: true }).then(res => {
                this.isexport = false;
                console.log('xxxx====')
                utils.export(_params, "/send/exportrecords");
            }, res => {
                if (res.code) {
                    this.isexport = false;
                    this.$message.error(res.msg);
                    return;
                }

                if (res.length > 0) {
                    this.isexport = false;
                    utils.export(_params, "/send/exportrecords");
                }
            })

        },
        handleCurrentChange(val) {
            this.getSendRecordList(val);
        }
    },
    computed: {
        loading: function () {
            return this.$store.getters.load_list;
        },
        send_record_list: function () {
            return this.$store.getters.send_record_list;
        }
    }
};
