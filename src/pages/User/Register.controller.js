import { Utils } from '@/model/util';
let utils = new Utils();

export default {
    name: "register",
    data() {
        return {
            showCity: true, //是否显示城市选择
            showArea: true, //是否显示区级选择
            showxieyi: false,
            loading: false,
            repeatsubmit: false,
            repassword: "",
            citylist: [],
            province: [],
            city: [],
            area: [],
            p_map: {}, //省份map，根据名字获取数字下标
            c_map: {}, //城市map，根据名字获取数字下标
            a_map: {}, //地区map，根据名字获取数字下标
            params: {
                password: "",
                province: "",
                city: "",
                area: "",
                confirmPassword: "",
                email: "",
                mobile: "",
                realName: "",
                inviteCode: "",
                remark: "",
                address: ""
            }
        }
    },
    mounted() {
        let wrap = document.querySelectorAll("body")[0];
        wrap.style.backgroundColor = "#F8F8F8";

        this.getCityList();
    },
    methods: {
        getCityList() {
            utils.get_("/static/scripts/city.json").then(res => {
                this.citylist = res.citylist;
                this.initProvince();
            }, res => {

            })
        },
        showPage() {
            this.showxieyi = true;
            console.log(this.showxieyi)
        },
        closeMask() {
            this.showxieyi = false;
        },
        reg() {

            if (this.repeatsubmit) {
                return;
            }

            let params = this.params;
            if (!/^[0-9a-zA-Z]+$/.test(params.password)) {
                this.$message.error("密码格式为8-12为数字字母组合")
                return;
            }
            //开启标示
            this.repeatsubmit = true;
            utils.post("/userCenter/agentRegister", params).then(res => {
                this.$message(res.msg);
                this.$router.push('/login');
            }, res => {
                if (res.code == '501') {
                    this.$confirm(res.msg, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.loading = true;
                        params.flag = '1';
                        utils.post("/userCenter/agentRegister", params).then(res => {
                            this.$message(res.msg);
                            this.$router.push('/login');
                        }, res => {
                            if (res.code == '500') {
                                this.$message.error(res.msg);
                                this.repeatsubmit = false;
                                return false;
                            }
                        })
                    }).catch(() => {
                        this.repeatsubmit = false;
                    });
                } else if (res.code == '500') {
                    this.$message.error(res.msg);
                    this.repeatsubmit = false;
                }
            })
        },
        initProvince() {
            let citylist = this.citylist;
            let p = [],
                p_map = {};
            for (let i = 0; i < citylist.length; i++) {
                p[i] = {
                    key: citylist[i].p,
                    value: citylist[i].p,
                    label: citylist[i].p
                }
                p_map[citylist[i].p] = i;
            }
            this.province = p;
            this.p_map = p_map;
        },
        initCity() {
            this.params.city = "";
            this.params.area = "";
            let current_p = this.params.province;
            let index = this.p_map[current_p];
            let target = this.citylist[index].c;

            //没有下一级的情况， 选中国外的时候
            if (target === undefined || target === null || target === '') {
                this.showArea = false;
                this.showCity = false;
                return;
            } else {
                this.showArea = true;
                this.showCity = true;
            }
            let c = [],
                c_map = {};
            for (let i = 0; i < target.length; i++) {
                c[i] = {
                    key: target[i].n,
                    value: target[i].n,
                    label: target[i].n
                }
                c_map[target[i].n] = i;
            }

            this.city = c;
            this.c_map = c_map;


            if (target[0].a === undefined || target[0].a === null) {
                this.showArea = false;

            } else {
                this.showArea = true;

            }
        },
        initArea() {
            if (this.params.city === "") {
                return;
            }
            let current_p = this.params.province;
            let current_c = this.params.city;
            let index_c = this.c_map[current_c];
            let index_p = this.p_map[current_p];
            let target = this.citylist[index_p].c[index_c].a;

            if (target === undefined || target === null || target === '') {
                return;
            }

            let a = [];
            for (let i = 0; i < target.length; i++) {
                a[i] = {
                    key: target[i].s,
                    value: target[i].s,
                    label: target[i].s
                }
            }

            this.area = a;
        },
    },
    beforeRouteLeave(to, from, next) {
        let body = document.querySelectorAll("body")[0];
        body.style.backgroundColor = "";
        next();
    }

}
