import { Utils } from '@/model/util';
import md5 from 'md5';
let Base64 = require('Base64');

let utils = new Utils();
const TIME_COUNT = 60;
export default {
    name: 'modifypwd',
    props: ["id", "mobile"],
    data() {
        return {
            formData: {
                phone: '',
                code: '',
            },
            clientId: '',
            password: '',
            confirm: '',
            phone: '',
            show: true,
            count: '',
            timer: null,
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
                _params.sendType = '0';
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
        getClientId() {
            this.clientId = this.id;
            let mphone = localStorage.getItem("mobile");
            mphone = mphone.substr(0, 3) + '****' + mphone.substr(7);
            this.phone = mphone;
        },
        updatePwd() {
            let _params = {};
            _params.password = Base64.btoa(this.password);
            _params.clientId = this.clientId;
            _params.verifyCode = this.formData.code;
            if (this.password != this.confirm) {
                this.$message.error('两次密码不一致')
                return false;
            }
            utils.post('/account/updatePwd', _params).then(res => {
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
