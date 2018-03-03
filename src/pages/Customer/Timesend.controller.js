import { Utils } from '@/model/util';
import { fail } from 'assert';
let utils = new Utils();
const TIME_COUNT = 3;
export default {
    name: 'test',
    data() {
        return {
            pickerOptions: {
                disabledDate: (time) => {
                    let min_time = new Date().getTime() + 1000 * 60 * 5;
                    let year = new Date().getFullYear() + 1;

                    let max_time = new Date(year + "-12-31" + " 23:59").getTime();
                    return time.getTime() < min_time || time.getTime() > max_time;
                }
            },
            params: {
                clientid: '',
                content: '',
                mobile: '',
                smstype: '',
            },
            form: {
                smsType: '10',
                templateType: '1',
            },
            sendtime: {
                time: "",
                formatTime: ""
            },
            timeSend: '1',
            options: [],
            list: [],
            editClientid: "",
            sign: '',
            taskId: "",
            smstypes: [{
                value: '4',
                label: '验证码'
            }, {
                value: '0',
                label: '通知'
            }, {
                value: '5',
                label: '营销'
            }],
            hysmstypes: [{
                value: '4',
                label: '验证码'
            }, {
                value: '0',
                label: '通知'
            }],
            yxsmstypes: [{
                value: '5',
                label: '营销'
            }],
            mobile: {
                checkNum: 0,
                validNum: 0,
                filterNum: 0,
                validlist: ""
            },

            charge: {
                chargeNum: 0,
                smsNum: 0
            },
            showMask: false,
            isyx: false,
            ishy: false,
            istype: true,
            isShowSelect: false,
            isShowImport: false,
            dialogVisible: false,
            timer: null,
            submit_flag: false
        }
    },
    mounted() {
        this.getUser();
        //初始化时间  
        let init_date = new Date().getTime() + 1000 * 60 * 30;
        this.sendtime.time = init_date;

        let taskId = this.$route.query.id;
        this.taskId = taskId;
        if (taskId) {
            this.getSmsInfo(taskId);
        }

    },
    watch: {
        params: {
            handler: function (val, oldVal) {
                let num = this.getChargeNum(val);

            },
            deep: true
        },
        sign: function (val, oldVal) {
            let num = this.getChargeNum();

        },
    },
    methods: {
        changeSendTime(val) {
            this.sendtime.formatTime = val || '';
        },
        checkDate(_params) {
            utils.post("/send/checkSubmitTime", { submitTime: this.sendtime.formatTime }, { emulateJSON: true }).then(res => {
                this.deliverSend(_params);
            }, res => {
                this.$message.error(res.msg);
            })
        },
        getmobileList(val) {
            this.params.mobile = val;
            this.mobilecount = val.split(',').length;
        },
        selectTemplate() {
            let _params = {};
            if (!this.params.clientid) {
                this.$message.error('请选择子账号');
                return;
            }
            this.isShowSelect = true;

        },
        getSmsInfo(id) {
            utils.post("/send/edit", { taskID: id }, { emulateJSON: true }).then(res => {
                this.params.content = res.data.content;
                this.params.smstype = res.data.smstype + "";
                this.sign = res.data.sign;
                this.timeSend = '1';
                this.params.mobile = res.data.phoneStr;
                this.params.clientid = res.data.clientid;
                this.editClientid = res.data.clientid;
            }, res => {
                this.$message.error(res.msg);
            })
        },
        exportReport() {
            if (this.isexport) {
                return;
            }
            this.isexport = true;
            utils.get("/send/downloadtemplate", {}).then(res => {
                this.isexport = false;
            }, res => {
                this.isexport = false;
                if (res.length > 0) {
                    utils.exportGet({}, "/send/downloadtemplate");
                } else {
                    this.$message.error("当前无法导出");
                }
            })

        },
        //清除无效号码
        clearMobile() {


            this.params.mobile = this.mobile.validlist;
            //更新提示
            let mobile = this.params.mobile;
            let result = JSMS.getMobileInfo(mobile);
            this.mobile = result;
        },
        closeImport() {
            this.isShowImport = false;
        },
        closeSelect() {
            this.isShowSelect = false;
        },
        upload() {
            this.isShowImport = true;
        },
        getTemplate(val) {
            if (val.smsType == '10') {
                this.ishy = true
                this.istype = false
                this.isyx = false
                this.params.smstype = '';
            } else if (val.smsType == '11') {
                this.isyx = true
                this.istype = false
                this.ishy = false
                this.params.smstype = '5';
            }
            this.sign = val.sign;
            this.params.content = val.content;
            this.isShowSelect = false;
        },
        getChargeNum(obj) {
            let params = obj || this.params;
            let mobileStr = params.mobile,
                content = params.content,
                sign = this.sign;

            var mobileRes = JSMS.getMobileInfo(mobileStr);
            this.mobile = mobileRes;
            var chargeRes = JSMS.getSmsChargeNum(mobileStr, sign, content);
            this.charge = chargeRes;

        },
        getUser() {
            let params = {};
            utils.post('/send/getclients').then(res => {
                let _options = [];
                for (var i = 0; i < res.data.length; i++) {
                    _options[i] = {};
                    _options[i].value = res.data[i].clientid;
                    _options[i].label = res.data[i].clientid + "-" + res.data[i].name;
                }
                this.options = _options
                this.params.clientid = this.editClientid;
            }).catch(res => {

            })
        },
        close() {
            this.showMask = false
        },
        sending() {
            this.clearMobile();
            let _params = {};
            if (this.sign.length > 8 || this.sign.length < 2) {
                this.$message.error("签名长度为2-8之间");
                return;
            }
            if (this.params.content.length == 0) {
                this.$message.error("短信内容不能为空");
                return;
            }
            if (this.params.mobile.length == 0) {
                this.$message.error("号码池不能为空");
                return;
            }
            if (this.params.mobile.length > 60000) {
                this.$message.error("号码不能大于60000个");
                return;
            }
            let mobileArr = this.params.mobile.split(",");
            for (let i = 0; i < mobileArr.length; i++) {
                if (!/^(00\d{8,18})|(13\d{9})|(14[5|7|9]\d{8})|(15[0|1|2|3|5|6|7|8|9]\d{8})|(170[0|1|2|3|4|5|6|7|8|9]\d{7})|(17[1|5|6|7|8]\d{8})|(173\d{8})|(18\d{9})(?=,|$)$/.test(mobileArr[i])) {
                    this.$message.error("手机号码验证不正确");
                    return;
                }
            }


            _params.clientid = this.params.clientid;
            _params.content = "【" + this.sign + "】" + this.params.content;
            _params.mobile = this.params.mobile;
            _params.smstype = this.params.smstype;
            if (this.submit_flag) {
                this.$message("3秒内不可重复提交")
                return;
            }
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.submit_flag = true;
                console.log(`timeSend: ${this.timeSend}`);
                if (this.timeSend == 0) {
                    this.normalSend(_params);
                } else {
                    this.deliverSend(_params);
                }

                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        this.submit_flag = false;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000)
            }


        },
        normalSend: function (_params) {
            utils.post("/send/sending", _params).then(res => {
                this.$message({
                    message: res.msg,
                    type: 'success'
                })
                this.submit_flag = true;
                for (var k in this.params) {
                    this.params[k] = ''
                }
                this.sign = '';
            }, res => {
                this.submit_flag = false;
                this.$message.error(res.msg);
                clearInterval(this.timer);
                this.timer = null;
            })
        },
        deliverSend: function (_params, flag) {
            let params = {};
            params.clientid = _params.clientid;
            params.mobilelist = _params.mobile;
            params.content = _params.content;
            params.smstype = _params.smstype;
            params.sendtime = this.sendtime.formatTime;
            let obj = {};
            obj.jsmsAccessTimerSms = params;
            obj.jsmsAccessTimerSms.submittype = '1';
            obj.taskId = this.taskId || "";
            obj.chargeNumTotal = this.charge.chargeNum;
            obj.compress_type = '0';
            obj.submitFlag = flag || '0';
            utils.post("/send/sendTim", obj, { emulateJSON: false }).then(res => {
                this.$alert(res.msg, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {

                        this.submit_flag = true;
                        this.$router.push("/customer/deliverlayout/deliver/timingdeliver");
                    }
                })
            }, res => {
                if (res.code == '403') {
                    this.$alert(res.msg, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            if (action != 'cancel') {
                                this.deliverSend(_params, 1);
                            }
                        }
                    })
                } else {
                    this.submit_flag = false;
                    this.$message.error(res.msg);
                    clearInterval(this.timer);
                    this.timer = null;
                }

            })
        }
    },
    components: {
        'importFile': (resolve) => {
            require(['@/components/ImportPhone/ImportPhone.vue'], resolve)
        },
        'selectTemplate': (resolve) => {
            require(['@/components/SelectTemplate/SelectTemplate.vue'], resolve)
        }
    },
}
