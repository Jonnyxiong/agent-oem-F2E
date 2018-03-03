import { Utils } from '@/model/util';
import md5 from 'md5';

let utils = new Utils();
export default {
    name: 'login',
    data() {
        return {
            username: '',
            password: '',
            checked: '',
        }
    },

    methods: {
        login() {
            let username = this.username,
                password = this.password;

            if (!username) {
                this.$message.error("请输入帐户名");
                return;
            }
            if (!password) {
                this.$message.error("请输入密码");
                return;
            }
            //去前后空格操作
            if (username) {
                username = username.replace(/(^\s*)|(\s*$)/g, "");
            }
            let isEmail = username.split("@").length;
            if (isEmail > 1) {
                if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(username)) {
                    this.$message.error("邮箱格式不正确");
                    return false;
                }

            } else {
                if (!/^[1][0-9][0-9]{9}$/.test(username)) {
                    this.$message.error("手机号码格式不正确");
                    return false;
                }
            }

            utils.post('/login', { username: username, password: md5(password) }, { emulateJSON: true }).then(res => {
                //记住我 功能
                this.remember();
                this.$message({
                    message: '登录成功',
                    type: 'success'
                });
                this.$store.commit('ISLOGGED', { login: true });
                this.$router.push(this.$route.query.redirect || '/');
            }, res => {
                this.$message.error(res.msg)
            })
        },
        remember() {
            let username = this.username;
            let password = this.password;
            if (this.checked) {
                this.setCookie("user", username, 7);
                this.setCookie("pwd", password, 7);
            }
        },
        setCookie(name, value, day) {
            let date = new Date();
            date.setDate(date.getDate() + day);
            document.cookie = name + '=' + value + ';expires=' + date;
        },
        getCookie(name) {
            let reg = RegExp(name + '=([^;]+)');
            let arr = document.cookie.match(reg);
            if (arr) {
                // console.log(arr)
                return arr[1];
            } else {
                return '';
            }
        },
        delCookie(name) {
            this.setCookie(name, null, -1);
        },
        changeRemember() {
            if (!this.checked) {
                this.delCookie("user");
                this.delCookie("pwd");
            }
        }
    },
    mounted() {
        if (this.getCookie("user") && this.getCookie("pwd")) {
            this.username = this.getCookie("user");
            this.password = this.getCookie("pwd");

            console.log(this.getCookie("pwd"))
            this.checked = true;
        }
    }
}
