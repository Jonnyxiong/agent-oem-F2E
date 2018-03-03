import { Utils } from '@/model/util';
let utils = new Utils();

export default {
    name: 'smsTask',
    data() {
        return {
            startTime: '',
            taskMobile: "", //任务里面的手机号码
            showSearchPhone: false,
            endTime: null,
            smscont: "",
            openContCopy: false,
            clients: [],
            status: [{
                value: "",
                label: "全部"
            }, {
                value: "0",
                label: "处理中"
            }, {
                value: "1",
                label: "等待中"
            }, {
                value: "2",
                label: "进行中"
            }, {
                value: "3",
                label: "已完成"
            }, {
                value: "4",
                label: "已取消"
            }],
            smstype: [{
                value: "",
                label: "全部"
            }, {
                value: "0",
                label: "通知"
            }, {
                value: "4",
                label: "验证码"
            }, {
                value: "5",
                label: "营销"
            }],
            params: {
                smstype: '',
                page: '1',
                rows: '15',
                id: "",
                sign: "",
                creator: "",
                content: '',
                clientId: '',
                createTimeStart: '',
                createTimeEnd: ''
            },
            timeout : true,  //倒计时标识

        }
    },
    mounted() {

        this.getUser();
        let that = this;
        let endTime = new Date();
        let startTime = new Date(endTime.getTime() - 90 * 24 * 3600 * 1000);
        this.startTime = [startTime, endTime];

        let count = 180;
        let time = setInterval(function(){
            console.log(that.timeout)
            if(count >= 2 && that.timeout){
                count -= 2;
                that.getTimeDeliverList();
            } else {
                clearInterval(time);
            }
           

        }, 2000);
    },
    methods: {
        changeStartDay(val) {
            let arr = val.split("~");
            this.params.createTimeStart = arr[0].trim();
            this.params.createTimeEnd = arr[1].trim();
        },
        showCont(str) {
            this.smscont = str;
            this.openContCopy = true;
        },
        closeContCopy() {
            this.openContCopy = false;
        },
        getTimeDeliverList(val) {

            let _params = this.params;
            if (typeof val === 'number') {
                _params.page = val;
            } else {
                _params.page = 1;
            }
            // this.$store.commit('LOAD_LIST', { loading: true });
            this.$store.commit('PARAMS', { params: _params });
            this.$store.dispatch('getSmsTaskList');
        },
        getUser() {
            let params = {};
            utils.post('/send/getclients', { getAll: 1 }).then(res => {
                let _options = [];
                for (var i = 0; i < res.data.length; i++) {
                    _options[i] = {};
                    _options[i].value = res.data[i].clientid;
                    _options[i].label = res.data[i].clientid + "-" + res.data[i].name;
                }
                _options.unshift({ value: "", label: "全部账户" })
                this.clients = _options;
                this.getTimeDeliverList();
            }).catch(res => {

            })
        },
        handleCurrentChange(val) {
            this.getTimeDeliverList(val);
        },
    },
    components: {
        'CopySms': (resolve) => {
            require(['@/components/CopySms/CopySms.vue'], resolve)
        }
    },
    computed: {
        loading: function () {
            return this.$store.getters.load_list;
        },
        smstask_list: function () {
            return this.$store.getters.smstask_list;
        }
    },
    beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
        this.timeout = false;
        next();
    },

}
