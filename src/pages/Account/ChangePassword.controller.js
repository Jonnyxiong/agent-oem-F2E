import { Utils } from '@/model/util';
let utils = new Utils();

import md5 from 'md5';

export default {
    name: 'ChangePassword',
    data() {
        return {
            oldpassword: '',
            newpassword: '',
            repassword: '',
            showBtn: false,
            loading: false,
        }
    },
    methods: {
        confirm() {
            if (this.newpassword.length > 12 || this.newpassword.length < 8) {
                this.$message.error("密码长度为8-12位之间")
                return;
            }
            console.log(this.newpassword)
            if (!/^[0-9a-zA-Z]+$/.test(this.newpassword)) {
                this.$message.error("密码格式为8-12为数字字母组合")
                return;
            }
            if (this.newpassword != this.repassword) {
                this.$message.error("两次输入密码不一致")
                return;
            }
            let old = md5(this.oldpassword);
            let newp = md5(this.newpassword);

            this.loading = true;
            utils.post("/password/save", { oldPassword: old, newPassword: newp }, { emulateJSON: true }).then(res => {
                this.$router.go(-1);
                this.$message({
                    type: 'success',
                    message: '密码修改成功'
                })
                this.loading = false;
            }, res => {
                this.$message.error(res.msg);
                this.loading = false;
            })
        },
        setinput() {
            if (this.oldpassword != '' && this.newpassword != '' && this.repassword != '' && this.newpassword === this.repassword) {
                this.showBtn = true;
            }
        },
        goBack() {
            this.$router.go(-1);
        }
    },

}
