import { Utils } from '@/model/util';
import { fail } from 'assert';
let Base64 = require('Base64');


let utils = new Utils();
const TIME_COUNT = 60;
const TIME_COUNT_1 = 60;
export default {
    name: 'getinterface',
    props: ["id", "mobile"],
    data() {
        return {
            formData: {
                phone: '',
                code: '',
            },
            formData1: {
                phone: '',
                code: '',
            },
            clientId: '',
            password: '',
            confirm: '',
            phone: '',
            show: true,
            show1:true,
            count: '',
            timer: null,
            count1: '',
            timer1: null,
            interfacepwd: false,
            getPw: '1111',
            isShowGet:false
        }
    },
    mounted() {
        this.getClientId();
    },
    methods: {
        goBack() {
            this.$emit("goBack");
        },
        getCode(formData) {
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                let _params = {};
                _params.mobile = localStorage.getItem("mobile");
                _params.clientId = this.clientId;
                _params.sendType = '1';
                utils.post('/account/sendCode', _params).then(res => {
                    console.log(res)
                }, res => {
                    console.log(res)
                })
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        this.show = true;
                        clearInterval(this.timer);
                        this.timer = null;
                    }

                }, 1000)
            }
        },
        getCode1(formData) {
            if (!this.timer1) {
                this.count1 = TIME_COUNT_1;
                this.show1 = false;
                let _params = {};
                _params.mobile = localStorage.getItem("mobile");
                _params.clientId = this.clientId;
                _params.sendType = '1';
                utils.post('/account/sendCode', _params).then(res => {
                    console.log(res)
                }, res => {
                    console.log(res)
                })
                this.timer1 = setInterval(() => {
                    if (this.count1 > 0 && this.count1 <= TIME_COUNT_1) {
                        this.count1--;
                    } else {
                        this.show1 = true;
                        clearInterval(this.timer1);
                        this.timer1 = null;
                    }

                }, 1000)
            }
        },
        getClientId() {
            this.clientId = this.id;
            let mphone = localStorage.getItem("mobile");
            mphone = mphone.substr(0, 3) + '****' + mphone.substr(7);
            this.phone = mphone;
        },
        switchGet() {
            this.isShowGet =false;
        },
        switchModify() {
            this.isShowGet =true;
        },
        getPwd() {
            let _params = {};
            _params.clientId = this.clientId;
            _params.verifyCode = this.formData.code;
            utils.post('/account/getPwd', _params).then(res => {
                this.getPw = Base64.atob(res.data)
                this.interfacepwd = true;
                this.$message({
                    type: "success",
                    message: res.msg
                })
            }, res => {
                this.$message.error(res.msg)
            })
        },
        updatePwd() {
            let _params = {};
            _params.password = Base64.btoa(this.password);
            _params.clientId = this.clientId;
            _params.verifyCode = this.formData1.code;
            if (this.password != this.confirm) {
                this.$message.error('两次密码不一致')
                return false;
            }
            utils.post('/account/updateClientPwd', _params).then(res => {
                this.goBack()
                this.$message({
                    type: "success",
                    message: res.msg
                })
            }, res => {
                this.$message.error(res.msg)
            })
        }
    }
}
