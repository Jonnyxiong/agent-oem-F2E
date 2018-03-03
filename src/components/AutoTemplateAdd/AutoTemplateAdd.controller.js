import { Utils } from '@/model/util';
let utils = new Utils();

export default {
    name: "addTemp",
    props: ['id', 'name','status'],
    data() {
        return {
            userAccounts: [], //用户账号
            templateTypeOptions: [{
                value: '0',
                label: '固定模板'
            }, {
                value: '1',
                label: '变量模板'
            }],
            form: {
                templateId: '',
                clientId: '',
                sign: '',
                smsType: '10',
                templateType: '1',
                content: ''
            },
            clientId: "",
            data: [],
            loading: false,
            isAdd: false,
            disabledSelect: false,
        }
    },
    mounted() {
        if (this.id) {
            this.form.templateId = this.id;
            this.getTempInfo();
        }
        if(this.status != 0 && this.status){
            this.disabledSelect = true;
        }
        this.getAccountsData();
    },
    methods: {
        getAccountsData() {
            let params = {};
            params.agentId = localStorage.getItem("id");
            utils.get('/autoTemplate/autoTemplateAccounts', params).then(res => {


            }).catch(res => {
                let _options = [];
                for (var i = 0; i < res.length; i++) {
                    _options[i] = {};
                    _options[i].value = res[i].clientid;
                    _options[i].label = res[i].clientid + "-" + res[i].name;
                }
                this.userAccounts = _options
            })
        },
        getTempInfo() {
            utils.get('/autoTemplate/autoTemplateModify?templateId=' + this.id).then(res => {
                this.form.templateId = res.data.templateId;
                this.form.clientId = res.data.clientId;
                this.form.sign = res.data.sign;
                this.form.smsType = res.data.smsType + '';
                this.form.templateType = res.data.templateType + '';
                this.form.content = res.data.content;
            }, res => {

            });
        },
        checkTemp() {
            let params = this.form;
            params.agentId = localStorage.getItem("id");
            if (params.clientId == "") {
                this.$message.error("请选择用户账号");
                return false;
            }
            if (params.sign.length > 12 || params.sign.length < 2) {
                this.$message.error("请输入正确的签名");
                return false;
            }
            if (!/^([a-z0-9\u4E00-\u9FA5])+$/i.test(params.sign)) {
                this.$message.error("签名内容请勿输入特殊字符");
                return false;
            }
            if ((params.content.length + params.sign.length) > 500) {
                this.$message.error("模板内容+签名长度超过500");
                return false;
            }

            if (/([\u4E00-\u9FA5]|[\（\）\《\》\——\；\，\。\“\”\！\【\】])/.test(params.content)) {
                //中文短信
                if (params.content.indexOf('【') != -1 || params.content.indexOf('】') != -1 || params.content.indexOf('【】') != -1) {
                    this.$message.error("中文短信模板内容不能包含【,】和【】");
                    return false;
                }
            } else {
                if (params.content.indexOf('[') != -1 || params.content.indexOf(']') != -1 || params.content.indexOf('【') != -1 || params.content.indexOf('】') != -1) {
                    this.$message.error("英文短信模板内容不能包含[,]和[]");
                    return false;
                }
            }
            let placeHolderReg0 = RegExp("\\{.*?\\}", "g");
            //0是固定模板 1是变量模板
            if (params.templateType == 0 && placeHolderReg0.test(params.content)) {
                this.$message.error("模板内容中包含变量，请修改模板类型");
                return false;
            }
            return params;
        },
        //保存
        add(params, callback) {
            var params = this.checkTemp()
            if (!params) {
                return;
            }
            utils.post('/autoTemplate/autoTemplateSave', params, { emulateJSON: true }).then(res => {
                this.$message({
                    message: res.msg,
                    type: 'success'
                });
                //如果存在回调函数
                if (!!callback) {
                    this.isAdd = true;
                    callback.call(this);
                } else {
                    this.$emit("goBack");
                    this.$emit("refresh");
                }
            }).catch(res => {
                this.$message.error(res.msg);
                return;
            })
        },
        addNotClose() {
            var params = this.checkTemp()
            if (!params) {
                return;
            }
            this.add(params, this.clearForm)
        },
        clearForm() {
            this.form = {
                clientId: '',
                sign: '',
                smsType: '10',
                templateType: '1',
                content: '',
                templateId: ''
            }
        },
        goBack() {
            if (this.isAdd) {
                this.$emit("refresh");
            }
            this.isAdd = false;
            this.$emit("goBack");
        }
    },
}
