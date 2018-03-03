import { Utils } from '@/model/util';
import client from '@/assets/scripts/loginClient'
let utils = new Utils();

export default {
    name: 'manager',
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
            params: {
                currentPage: '1',
                start_time_day: '',
                end_time_day: '',
                customerInfo: '',
            },
            startTime: null,
            endTime: null,
            clientStat: {},

            //组件传值
            isfrozen: false,
            client_name: '',
            client_id: '',
            mobile:'',
            remarks: '',
            type: '', //冻结类型
            isrecharge: false,
            isfallback: false,
            isremark: false,
            isexport: false,
            isgetInterface: false,
            ismodifyPwd: false
        }
    },
    mounted() {
        this.getManagerList(1);
        this.getClientStat();
    },

    methods: {
        changeStartDay(val) {
            this.params.start_time_day = val || "";
        },
        changeEndDay(val) {
            this.params.end_time_day = val || "";
        },
        handleCurrentChange(val) {
            this.getManagerList(val)
        },
        getManagerList(val) {

            let params = this.params;
            params.currentPage = val;
            this.$store.commit("PARAMS", { params: params });
            this.$store.commit('LOAD_LIST', { loading: true });
            this.$store.dispatch("getManagerList");

        },
        getClientStat() {
            utils.get('/client/stat').then(res => {
                this.clientStat = res.data;
            }, res => {
                this.$message.error(res.msg)
            })
        },
        getInterface(id,mobile) {
            this.client_id = id;
            this.mobile = mobile;                 
            this.isgetInterface = true;
        },
        modifyPwd(id,mobile) {
            this.client_id = id;    
            this.mobile = mobile;     
            this.ismodifyPwd = true;
            console.log(this.mobile)
            
        },
        handleCurrentChang(val) {
            this.getManagerList(val);
        },
        exportReport() {
            if (this.isexport) {
                return;
            }
            this.isexport = true;
            let turnForm = document.createElement("form");
            document.body.appendChild(turnForm);
            turnForm.method = 'post';
            turnForm.action = '/api/client/account/export';
            //turnForm.target = '_blank';
            let params = this.params;
            let output = {
                customerInfo: params.customerInfo,
                start_time_day: params.start_time_day,
                end_time_day: params.end_time_day
            }
            for (let k in output) {
                let newElement = document.createElement("input");
                newElement.setAttribute("name", k);
                newElement.setAttribute("type", "hidden");
                newElement.setAttribute("value", output[k]);
                turnForm.appendChild(newElement);
            }

            utils.post("/client/account/export", output, { emulateJSON: true }).then(res => {
                this.isexport = false;
            }, res => {
                this.isexport = false;
                if (res.length > 0) {
                    turnForm.submit();
                } else {
                    this.$message.error("当前条件没有数据，无法导出");
                }
            })


        },
        frozen(name, id, t) {
            this.client_name = name;
            this.client_id = id;
            this.isfrozen = true;
            this.type = t;
        },
        closeFrozen() {
            this.isfrozen = false;
        },
        CusRecharge(id, name) {
            this.client_id = id;
            this.client_name = name;
            this.isrecharge = true;
            // utils.post("/client/account/recharge/data").then(res => {
            //     this.$store.commit("RECHARGE_DATA", { data: res.data });

            // }, res => {

            // })

        },
        closeRecharge() {
            this.isrecharge = false;
        },
        closeModifyPwd(){
            this.ismodifyPwd = false;
        },
        closeGetInterface(){
            this.isgetInterface = false;
            
        },
        CusFallback(id, name) {
            this.client_id = id;
            this.client_name = name;
            this.isfallback = true;

        },
        closeFallback() {
            this.isfallback = false;
        },
        remark(id, remarks) {
            this.client_id = id;
            this.remarks = remarks;
            this.isremark = true;
        },
        closeRemark() {
            this.isremark = false;
        },
        loginClient(user, pwd) {

            let cli_params = {};
            cli_params.loginAccount = user;
            cli_params.password = pwd;

            client(user, pwd);
        }
    },
    computed: {
        loading: function () {
            return this.$store.getters.load_list;
        },
        manager_list: function () {
            return this.$store.getters.manager_list;
        },
    },
    components: {
        'Frozen': (resolve) => {
            require(['@/components/Frozen/Frozen.vue'], resolve)
        },
        'Recharge': (resolve) => {
            require(['@/components/Recharge/Recharge.vue'], resolve)
        },
        'ModifyPwd': (resolve) => {
            require(['@/components/ModifyPwd/ModifyPwd.vue'], resolve)
        },
        'GetInterface': (resolve) => {
            require(['@/components/GetInterface/GetInterface.vue'], resolve)
        },
        // 'Remark': (resolve) => {
        //     require(['@/components/Remark/Remark.vue'], resolve)
        // }
    },
}
