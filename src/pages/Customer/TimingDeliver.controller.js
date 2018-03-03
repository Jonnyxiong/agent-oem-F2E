import { Utils } from '@/model/util';
let utils = new Utils();

export default {
    name: 'intelligent',
    data() {
        return {
            startTime: '',
            taskMobile: "", //任务里面的手机号码
            showSearchPhone: false,
            endTime: null,
            smscont: "",
            openContCopy: false,
            clients: [],
            property: [{
                value: '0',
                label: '创建时间'
            }, {
                value: '1',
                label: '发送时间'
            }],
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
                taskId: "",
                sign: "",
                status: "",
                content: '',
                clientId: '',
                timeStart: '',
                timeEnd: '',
                selectTimeFlag: '0'
            }

        }
    },
    mounted() {
        this.getUser();
        let endTime = new Date();
        let startTime = new Date(endTime.getTime() - 90 * 24 * 3600 * 1000);
        this.startTime = [startTime, endTime]
    },
    methods: {
        changeStartDay(val) {
            let arr = val.split("~");
            this.params.timeStart = arr[0].trim();
            this.params.timeEnd = arr[1].trim();
        },
        changeEndDay(val) {
            this.params.createEndTime = val || '';
        },
        close() {
            this.isShowAddTemplate = false;
        },
        checkDate(id, time) {
            utils.post("/send/checkSubmitTime", { submitTime: time }, { emulateJSON: true }).then(res => {
                this.$confirm(res.msg, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    utils.post('/send/undoSend', { taskID: id, submitTime: time }, { emulateJSON: true }).then(res => {

                        this.getTimeDeliverList();
                    }).catch(res => {

                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '操作取消'
                    });
                });

            }, res => {
                this.$message.error(res.msg);
            })
        },
        getTimeDeliverList(val) {

            let _params = this.params;
            if (typeof val === 'number') {
                _params.page = val;
            } else {
                _params.page = 1;
            }
            this.$store.commit('LOAD_LIST', { loading: true });
            this.$store.commit('PARAMS', { params: _params });
            this.$store.dispatch('getTimeDeliverList');
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
        //获取手机号码
        getTaskMobile(id, time) {
            utils.post('/send/getAllPhone/list', { taskID: id, submitTime: time }, { emulateJSON: true }).then(res => {
                this.taskMobile = res.data;
                this.showSearchPhone = true;
            }).catch(res => {
                this.$message.error(res.msg);
            })
        },
        cancelSend(id, time) {
            this.checkDate(id, time);

        },
        //重新编辑
        edit(id) {
            this.$confirm('开始重新编辑任务，原记录将自动删除，确定重新编辑？', '编辑提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$router.push({ name: 'sms_timesend', query: { id: id } })
            }).catch(() => {

            });

        },
        handleCurrentChange(val) {
            this.getTimeDeliverList(val);
        },
        closeSearchPhone() {
            this.showSearchPhone = false;
        },
        //查看短信内容
        showCont(ctx) {
            this.smscont = ctx;
            this.openContCopy = true;
        },
        closeContCopy() {
            this.openContCopy = false;
        }
    },
    components: {
        'SearchPhone': (resolve) => {
            require(['@/components/SearchPhone/SearchPhone.vue'], resolve)
        },
        'CopySms': (resolve) => {
            require(['@/components/CopySms/CopySms.vue'], resolve)
        }
    },
    computed: {
        loading: function () {
            return this.$store.getters.load_list;
        },
        timesender_list: function () {
            return this.$store.getters.timesender_list;
        }
    }

}
