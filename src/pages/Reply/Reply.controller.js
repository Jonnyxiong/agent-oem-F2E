import { Utils } from '@/model/util';
let utils = new Utils();
export default {
    name: "send_record",
    data() {
        return {
            list: [],
            currentPage: 1,
            totalCount: "",
            pageRowCount: 15,
            editable:false,
            // pickerOptions0: {
            //     disabledDate: (time) => {
            //         // return time.getTime() > Date.now() || time.getTime() < this.threeMonths;
            //         return time.getTime() > this.getCurrentMonthLast(time.getFullYear(),time.getMonth()) || time.getTime() < this.getCurrentMonthFirst(time.getFullYear(),time.getMonth());
            //     }
            // },
            pickerOptions0: {
                disabledDate: (time) => {
                    if (this.endTime != null) {
                        return time.getTime() > Date.now() || time.getTime() > this.endTime || time.getTime() < this.threeMonths ;
                    } else {
                        return time.getTime() > Date.now()
                    }
                }
            },
            pickerOptions1: {
                disabledDate: (time) => {
                    if(this.startTime != null){
                        return time.getTime() < this.startTime || time.getTime()> Date.now()  || time.getTime() > this.getCurrentMonthLast(this.startTime.getFullYear(),this.startTime.getMonth());
                    }else {
                        return time.getTime() > Date.now()
                    }
                }
            },
            options: [],
            params: {
                clientid: '',
                phone: '',
                searchContent: '',
                startReceivedate: '',
                endReceivedate: '',
                rows: 15
            },
            startTime: null,
            endTime: null,
            threeMonths: '',
            firstDay:'',
            lastDay:''
        }
    },
    created() {

        this.getThreeMonth();
        this.getConsumeUser();
    },
    methods: {
        changeStartDay(val) {
            console.log(val);
            this.endTime = val;
            this.params.startReceivedate = val || "";
        },
        changeEndDay(val) {
            this.params.endReceivedate = val || "";
        },
        getThreeMonth() {
            let curDate = (new Date()).getTime();
            let three = 90 * 24 * 3600 * 1000;
            this.threeMonths = curDate - three;
        },
        getCurrentMonthLast(year,month){
            let new_year = year;  //取当前的年份     
            let new_month = ++month;//取下一个月的第一天，方便计算（最后一天不固定）     
            if(month>11)      //如果当前大于12月，则年份转到下一年     
            {     
            new_month -=12;    //月份减     
            new_year++;      //年份增     
            }     
            let new_date = new Date(new_year,new_month,1);        //取当年当月中的第一天     
            return new_date.getTime()-1000*60*60*24      //获取当月最后一天日期 
        },
        getCurrentMonthFirst(year,month){
            let date=new Date();
            date.setMonth(month);
            date.setFullYear(year);
            date.setDate(1);
            return date.getTime();
        },
        getmologs(val) {
            let _params = {};
            _params = this.params
            _params.clientid = this.params.clientid;
            _params.page = val;
            _params.startReceivedate = this.params.startReceivedate;
            _params.endReceivedate = this.params.endReceivedate;
            utils.post('/send/getmologs', _params, { emulateJSON: true }).then(res => {
                this.list = res.data.data
                this.totalCount = res.data.totalRecord;
                this.list = res.data.data
            }, res => {
                this.$message(res.msg)
                this.list = res.data.data
            })
        },
        getConsumeUser() {
            let _params = {};
            _params.agentId = localStorage.getItem("id");
            utils.get('/client/consume/user', _params).then(res => {

            }, res => {
                let _options = [];
                for (var i = 0; i < res.length; i++) {
                    _options[i] = {};
                    _options[i].value = res[i].clientid;
                    _options[i].label = res[i].clientid + "-" + res[i].name;
                }
                this.options = _options
            }).catch(res => {

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
            _params.searchContent = this.params.searchContent;
            _params.startReceivedate = this.params.startReceivedate;
            _params.endReceivedate = this.params.endReceivedate;
            debugger;
            utils.post("/send/exportmologs", _params, { emulateJSON: true }).then(res => {
                this.isexport = false;
            }, res => {
                this.isexport = false;
                if (res.length > 0) {
                    utils.export(_params, "/send/exportmologs");
                } else {
                    this.$message.error(res.msg);
                }
            })

        },
        handleCurrentChange(val) {
            this.getmologs(val);
        }
    }
};
