import { Utils } from '@/model/util';
let utils = new Utils();

let map_key = {
    "invoiceHead": "发票抬头",
    "creditCode": "统一社会信用代码",
    "companyRegAddr": "公司注册地址",
    "bank": "基本开户银行",
    "bankAccount": "基本开户银行账号",
    "telphone": "公司固定电话",
    "toName": "收件人",
    "toAddr": "收件人地址",
    "toAddrDetail": "详细地址",
    "toPhone": "收件人手机",
    "toQq": "收件人QQ",
}

export default {
    name: "addInvoice",
    data() {
        return {
            params: {
                invoiceType: '1',
                invoiceAmount: "",
                remark: "",
            },
            params_vata: {
                invoiceBody: '2',
                invoiceHead: "",
                creditCode: "",
                companyRegAddr: "",
                bank: "",
                bankAccount: "",
                telphone: "",
                toAddr: "",
                toAddrDetail: "",
                toPhone: "",
                toQq: "",
                toName: ""
            },
            params_normal: {
                invoiceBody: '1',
                invoiceHead: "",
                creditCode: "",
                email: ""
            },
            invoiceNormal: {
                invoiceBody: '2',
                invoiceHead: "",
                creditCode: "",
                email: "",
            },
            invoiceVata: {
                invoiceHead: "",
                creditCode: "",
                companyRegAddr: "",
                bank: "",
                bankAccount: "",
                telphone: "",
                toAddr: "",
                toAddrDetail: "",
                toPhone: "",
                toQq: "",
                toName: ""
            },
            nomralId: "",
            vataId: "",
            normalTitle: "新增普通(电子)发票",
            vataTitle: "新增增值税专用发票",
            canAmount: "", //可使用金额
            isEditNormal: false,
            isCancelNoraml: false,
            isEditVata: false,
            isCancelVata: false,
            submitflag: false,
            address: {
                city: "",
                province: "",
                area: ""
            },
            province: [],
            city: [],
            area: [],
            p_map: {}, //省份map，根据名字获取数字下标
            c_map: {}, //城市map，根据名字获取数字下标
            a_map: {}, //地区map，根据名字获取数字下标
            citylist: null,
            showCity: true, //是否显示城市选择
            showArea: true, //是否显示区级选择
        }
    },
    mounted() {
        this.getCanInvoiceAmount();
        this.getNormalInvoice();
        this.getTaxInvoice();

        this.getCityList();
    },
    methods: {
        getCityList() {
            utils.get_("/static/scripts/city.json").then(res => {
                this.citylist = res.citylist;
                this.initProvince();
            }, res => {})
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

            this.address.city = "";
            this.address.area = "";
            let current_p = this.address.province;
            //  let index = this.p_map[current_p];
            let index;
            for (let k in this.p_map) {
                if (current_p.indexOf(k) != -1) {
                    index = this.p_map[k];
                }
            }
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
            if (this.address.city === "") {
                return;
            }
            let current_p = this.address.province;
            let current_c = this.address.city;
            let index_p, index_c;
            for (let k in this.p_map) {
                if (current_p.indexOf(k) != -1) {
                    index_p = this.p_map[k];
                }
            }
            // let index_c = this.c_map[current_c];
            for (let j in this.c_map) {
                if (current_c.indexOf(j) != -1) {
                    index_c = this.c_map[j];
                }
            }
            // let index_p = this.p_map[current_p];
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
        changeType(val) {
            // if (val == 1){
            //     this.cancelNormal();
            // } else {
            //     this.cancelVata();
            // }

        },
        //可开票金额
        getCanInvoiceAmount() {
            utils.post("/invoice/getCanInvoiceAmount").then(res => {

            }, res => {
                this.canAmount = res;
            })

        },
        //普通发票信息
        getNormalInvoice() {
            utils.post("/invoice/getOrdinaryInvoiceConfig").then(res => {

            }, res => {
                if (res.invoiceBody) {
                    this.isEditNormal = true;

                    this.normalId = res.id;
                    this.params_normal.invoiceBody = res.invoiceBody + "";
                    this.invoiceNormal.invoiceBody = res.invoiceBody + "";
                    this.params_normal.invoiceHead = res.invoiceHead;
                    this.params_normal.creditCode = res.creditCode;
                    this.params_normal.email = res.email;
                    this.normalTitle = "普通(电子)发票信息";
                }

            })
        },
        //增值发票信息
        getTaxInvoice() {
            utils.post("/invoice/getAddedTaxInvoiceConfig").then(res => {

            }, res => {
                if (res.invoiceBody) {
                    this.isEditVata = true;
                    this.vataId = res.id;
                    this.params_vata.invoiceHead = res.invoiceHead;
                    this.params_vata.bank = res.bank;
                    this.params_vata.bankAccount = res.bankAccount;
                    this.params_vata.creditCode = res.creditCode;
                    this.params_vata.companyRegAddr = res.companyRegAddr;
                    this.params_vata.telphone = res.telphone;
                    this.params_vata.toName = res.toName;
                    this.params_vata.toAddr = res.toAddr;
                    this.params_vata.toAddrDetail = res.toAddrDetail;
                    this.params_vata.toPhone = res.toPhone;
                    this.params_vata.toQq = res.toQq;
                    this.vataTitle = "增值税专用发票信息";
                }
            })
        },
        saveInvoice() {
            if (this.submitflag) {
                return;
            }
            let obj = {};
            if (this.params.invoiceType == '1') {
                obj = Object.assign(obj, this.params, this.params_normal);
            } else {
                obj = Object.assign(obj, this.params, this.params_vata);
            }

            if (!/^\d+(?:\.\d{1,2})?$/.test(obj.invoiceAmount)) {
                this.$message.error("发票金额必须为数字,最多保留两位小数");
                return;
            }
            if (obj.invoiceAmount == 0) {
                this.$message.error("发票金额不能为0");
                return;
            }
            if (this.params.invoiceType == '1' && this.isCancelNoraml) {
                this.$message.error("请确认普通（电子）发票信息");
                return;
            }
            if (this.params.invoiceType == '2' && this.isCancelVata) {
                this.$message.error("请确认增值税专用发票信息");
                return;
            }
            this.submitflag = true;

            utils.post("/invoice/initInvoice", obj).then(res => {
                this.$message({
                    message: res.msg,
                    type: 'success'
                });
                this.submitflag = false;
                this.$router.push("/finance/invoice/add/list");
            }, res => {
                this.submitflag = false;
                this.$message.error(res.msg);
            })
        },
        saveNormal() {
            let origin = this.invoiceNormal;

            if (origin.invoiceHead == "") {
                this.$message.error("发票抬头不能为空");
                return;
            }
            if (origin.invoiceHead.length > 50) {
                this.$message.error("发票抬头长度不能超过50个字");
                return;
            }
            this.params_normal.invoiceHead = origin.invoiceHead;
            if (origin.email == "") {
                this.$message.error("邮箱不能为空");
                return;
            }
            this.params_normal.email = origin.email;

            if (origin.invoiceBody == '2' && origin.creditCode != "") {
                this.params_normal.creditCode = origin.creditCode;
            } else if (origin.invoiceBody == '2' && origin.creditCode == "") {
                this.$message.error("统一社会信用代码不能为空");
                return;
            }

            let params = this.invoiceNormal;
            params.invoiceBody = origin.invoiceBody;
            params.invoiceType = this.params.invoiceType;
            utils.post("/invoice/checkObject", params).then(res => {

            }, res => {
                if (!res.code) {
                    this.params_normal.invoiceBody = origin.invoiceBody;

                    this.normalTitle = "普通发票(电子)信息"
                    this.isCancelNoraml = false;
                    this.isEditNormal = true;
                } else {
                    this.$message.error(res.msg);
                }
            });

        },
        editNormal() {
            this.isEditNormal = false;
            this.isCancelNoraml = true;
            this.normalTitle = "修改普通发票(电子)信息"
            this.invoiceNormal.invoiceBody = this.params_normal.invoiceBody;
            this.invoiceNormal.invoiceHead = this.params_normal.invoiceHead;
            this.invoiceNormal.email = this.params_normal.email;
            if (this.params_normal.invoiceBody == '2') {
                this.invoiceNormal.creditCode = this.params_normal.creditCode;
            }
        },
        cancelNormal() {
            this.isCancelNoraml = false;
            this.isEditNormal = true;
            this.invoiceNormal.invoiceBody = this.params_normal.invoiceBody;

            this.normalTitle = "普通发票(电子)信息"
        },
        saveVata() {
            let origin = this.invoiceVata;
            let params = this.invoiceVata;
            params.invoiceBody = '2';
            params.invoiceType = this.params.invoiceType;
            if (this.address.area) {
                params.toAddr = this.address.province + '-' + this.address.city + '-' + this.address.area;
            } else {
                params.toAddr = this.address.province + '-' + this.address.city;
            }
            utils.post("/invoice/checkObject", params).then(res => {}, res => {
                if (!res.code) {
                    for (let k in origin) {
                        if (origin[k] == "" && k != 'toAddr' && k != 'toQq') {
                            this.$message.error(map_key[k] + "不能为空");
                            return false;
                        } else if (k != 'toAddr') {
                            this.params_vata[k] = origin[k];
                        }
                    }
                    if (this.address.area) {
                        this.params_vata.toAddr = this.address.province + '-' + this.address.city + '-' + this.address.area;
                    } else {
                        this.params_vata.toAddr = this.address.province + '-' + this.address.city;
                    }

                    this.vataTitle = "增值税专用发票信息"
                    this.isEditVata = true;
                    this.isCancelVata = false;
                } else {
                    this.$message.error(res.msg);
                }
            });

        },
        editVata() {
            this.isEditVata = false;
            this.isCancelVata = true;
            this.vataTitle = "修改增值税发票信息";
            let add = this.params_vata.toAddr.split("-");
            this.invoiceVata.invoiceHead = this.params_vata.invoiceHead;
            this.invoiceVata.creditCode = this.params_vata.creditCode;
            this.invoiceVata.companyRegAddr = this.params_vata.companyRegAddr;
            this.invoiceVata.bank = this.params_vata.bank;
            this.invoiceVata.bankAccount = this.params_vata.bankAccount;
            this.invoiceVata.telphone = this.params_vata.telphone;
            this.invoiceVata.toName = this.params_vata.toName;
            this.invoiceVata.toAddrDetail = this.params_vata.toAddrDetail;
            this.invoiceVata.toPhone = this.params_vata.toPhone;
            this.invoiceVata.toQq = this.params_vata.toQq;
            this.address.province = add[0];
            this.initCity();
            this.address.city = add[1];
            this.initArea();
            if (add[2]) {
                this.address.area = add[2];
            } else {
                this.address.area = "";
                this.showArea = false;
            }
        },
        cancelVata() {
            this.isCancelVata = false;
            this.isEditVata = true;
            this.vataTitle = "增值税专用发票信息"
        }
    }

}
