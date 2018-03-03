export default {
    name: 'repoter',
    data() {
        return {
            pickerOptions0: {
                disabledDate: (time) => {
                    // console.log(time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate());
                    // console.log(time.getTime() > Date.now() || time.getTime() > this.endTime);
                    // console.log(this.endTime);
                    // console.log("----------------------------------------")
                    // debugger;
                    if(this.endTime != ""){
                        return time.getTime() > Date.now() || time.getTime() > this.endTime;
                    } else {
                        return time.getTime() > Date.now()
                    }
                  
                }
            },
            pickerOptions1: {
                disabledDate:(time) => {
                  return time.getTime() < this.startTime ||time.getTime() > Date.now();
                }
            },
            startTime: '',
            endTime: '',
            params : {
                customerInfo : '',
                product_type : '',
                start_time_day : '',
                end_time_day : '',
                currentPage : 1,
            },
            product : [{
                value: '',
                label: '全部'
            }, {
                value: '0',
                label: '行业'
            }, {
                value: '1',
                label: '营销'
            }, {
                value: '2',
                label: '国际'
            }]
        }
    },
    mounted (){
        this.startTime = new Date(new Date()-24*60*60*1000);
        this.endTime = new Date(new Date()-24*60*60*1000);
        console.log(this.startTime)
        this.$nextTick(_ => {
           this.getReportTotalList(1);
        })
       
    },
    methods : {
        getReportTotalList (val){
            let params = this.params;
            params.currentPage = val;
            this.$store.commit("PARAMS",{params : params})
            this.$store.commit("LOAD_LIST", {loading : true});
            this.$store.dispatch("getReportTotalList");
        },
        changeStartDay (val){
            this.params.start_time_day = val || "";
        },
        changeEndDay (val){
            this.params.end_time_day = val || "";
            // if(val === ""){
            //     this.endTime = undefined;
            // }
        },
        handleCurrentChange (val){
            
        }
    },
    computed : {
        loading (){
            return this.$store.getters.load_list;
        },
        report_total_list (){
            return this.$store.getters.report_total_list;
        }
    }
} 