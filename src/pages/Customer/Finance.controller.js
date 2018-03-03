import { Utils } from '@/model/util';
let utils = new Utils();

export default {
    name: 'customerFinance',
    data() {
        return {
            params: {
                customerInfo: ""
            },
            isexport: false,
            client_name: "",
            client_id: "",
            sms_type: "",
            showSetting: false,
            showRecharge: false,
            showFallback: false,
            showExpiration: false,
        }
    },
    mounted() {
        this.getFinaceList("1");
    },
    methods: {
        exportReport() {
            if (this.isexport) {
                return;
            }
            this.isexport = true;
            let turnForm = document.createElement("form");
            document.body.appendChild(turnForm);
            turnForm.method = 'post';
            turnForm.action = '/api/recharge/rollback/recharge/export';
            //turnForm.target = '_blank';
            let params = this.params;
            let output = {
                customerInfo: params.customerInfo,
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
        getFinaceList(val) {
            let params = this.params;
            params.currentPage = val;
            this.$store.commit("PARAMS", { params: params });
            this.$store.commit('LOAD_LIST', { loading: true });
            this.$store.dispatch("getFinaceList");
        },
        recharge(id, name) {
            this.client_id = id;
            this.client_name = name;
            this.showRecharge = true;
        },
        fallback(id, name) {
            this.client_id = id;
            this.client_name = name;
            this.showFallback = true;
        },
        remind(id, name) {
            this.client_id = id;
            this.client_name = name;
            this.showSetting = true;
        },
        getExpiration(id, type) {
            this.client_id = id;
            this.sms_type = type;
            this.showExpiration = true;
        },
        closeSetting() {
            this.showSetting = false;
        },
        closeRecharge() {
            this.showRecharge = false;
        },
        closeFallback() {
            this.showFallback = false;
        },
        closeExpiration() {
            this.showExpiration = false;
        },
        handleCurrentChange(val) {
            this.getFinaceList(val);
        }
    },
    computed: {
        loading: function () {
            return this.$store.getters.load_list;
        },
        finace_list: function () {
            return this.$store.getters.finace_list;
        },
    },
    components: {
        'RemindSetting': (resolve) => {
            require(['@/components/RemindSetting/RemindSetting.vue'], resolve)
        },
        'Fallback': (resolve) => {
            require(['@/components/Fallback/Fallback.vue'], resolve)
        },
        'Recharge': (resolve) => {
            require(['@/components/Recharge/Recharge.vue'], resolve)
        },
        'Expiration': (resolve) => {
            require(['@/components/Expiration/Expiration.vue'], resolve)
        }
    },
}
