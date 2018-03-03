import { Utils } from '@/model/util';
let utils = new Utils();


export default {
    name: "header",
    data() {
        return {
            showMask: false,
            oemUrl: ''
        }
    },
    components: {
        'LoginClient': (resolve) => {
            require(['@/components/LoginClient/LoginClient.vue'], resolve)
        },
    },
    mounted() {

    },
    methods: {
        logout() {
            utils.post("/logout", { emulateJSON: true }).then(res => {
                this.$message({
                    type: "success",
                    message: "退出成功"
                })
                localStorage.clear();
                this.$router.push("/login");
            }, res => {

            })
        },
        close() {
            this.showMask = false;
        },
        open() {
            this.$confirm('是否创建短信发送账号?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.createAccount();
            }).catch(() => {

            });
        },
        createAccount() {
            utils.post("/client/account/test/add").then(res => {
                this.showMask = true; //打开提示窗
                this.oemUrl = res.data.oemUrl;
                this.$store.commit("CAN_CREATE", { data: false });
            }, res => {
                this.$message.error(res.msg);
            })
        }
    },
    computed: {
        user: function() {
            return this.$store.getters.user;
        },
        can_create: function() {
            return this.$store.getters.can_create;
        }
    }
}