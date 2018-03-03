import {Utils} from '@/model/util';
let utils = new Utils();
export default {
    name: "record",
    data(){
        return {
            currentPage: 1,   
            totalCount:100,
            pageRowCount:10,         
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
            params: {
                clientid: '',
                realname: '',
                order_type: '',
                product_type: '',
                start_time_day: '',
                end_time_day: '',
                
            },
            operate: [{
                value: '',
                label: '全部'
            }, {
                value: '3',
                label: '条数返还'
            }],
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
            }]
        }
    },
    mounted(){
        this.getRecorList('1');
    },
    methods:{
        changeStartDay(val) {
            this.params.start_time_day = val || '';
        },
        changeEndDay(val) {
            this.params.end_time_day = val || '';
        },
        getRecorList(val) {
            let params = this.params;
            params.currentPage = val;
            this.$store.commit('LOAD_LIST', { loading: true });
            this.$store.commit('PARAMS', { params: params });
            this.$store.dispatch('getRecorList');
        },
        exportReport() {
            if (this.isexport) {
                return;
            }
            this.isexport = true;

            let _params = {}
            _params.clientid = this.params.clientid;
            _params.realname = this.params.realname;            
            _params.order_type = this.params.order_type;
            _params.product_type = this.params.product_type;
            _params.start_time_day = this.params.start_time_day;
            _params.end_time_day = this.params.end_time_day;

            // if(this.own_list.list.length > 0){
            //     utils.export(_params, "/finance/bill/self/export")
            // } else {
            //     this.$message.error("当前列表没有数据，无法导出")
            // }
            utils.post("/finance/bill/purchaseHistory/export", _params, { emulateJSON: true }).then(res => {
                this.isexport = false;
            }, res => {
                this.isexport = false;
                if (res.length > 0) {
                    utils.export(_params, "/finance/bill/purchaseHistory/export");
                } else {
                    this.$message.error("当前条件没有数据，无法导出");
                }
            })

        },
        handleCurrentChange(val) {
            this.getRecorList(val);
        }
    },
    computed: {
        loading: function() {
            return this.$store.getters.load_list;
        },
        record_list: function() {
            return this.$store.getters.record_list;
        }
    }
};