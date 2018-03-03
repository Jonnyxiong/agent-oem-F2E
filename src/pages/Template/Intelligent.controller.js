import { Utils } from '@/model/util';
let utils = new Utils();

export default {
    name: 'intelligent',
    data() {
        return {
            // pickerOptions0: {
            //     disabledDate: (time) => {
            //         if (this.endTime != "") {
            //             return time.getTime() > Date.now() || time.getTime() > this.endTime;
            //         } else {
            //             return time.getTime() > Date.now()
            //         }
            //     }
            // },
            // pickerOptions1: {
            //     disabledDate: (time) => {
            //         return time.getTime() < this.startTime || time.getTime() > Date.now();
            //     }
            // },
            startTime: '',
            endTime: null,
            list: [],
            audit: [{
                value: '',
                label: '所有状态'
            }, {
                value: '0',
                label: '待审核'
            }, {
                value: '1',
                label: '审核通过'
            }, {
                value: '3',
                label: '审核不通过'
            }],
            property: [{
                value: '',
                label: '全部类型'
            }, {
                value: '10',
                label: '行业'
            }, {
                value: '11',
                label: '会员营销'
            }],
            type: [{
                value: '',
                label: '全部类型'
            }, {
                value: '0',
                label: '固定模板'
            }, {
                value: '1',
                label: '变量模板'
            }],
            type1: [{
                value: '0',
                label: '固定模板'
            }, {
                value: '1',
                label: '变量模板'
            }],
            userAccounts: [], //用户账号
            params: {
                state: '',
                smsType: '',
                templateType: '',
                currentPage: '1',
                pageRowCount: '',
                templateId: '',
                sign: '',
                content: '',
                clientId: '',
                createStartTime: '',
                createEndTime: '',
            },
            templateId: "", //模板id
            showAddTemplateTitle: "",
            isShowAddTemplate: false,
            isShowDesc: false,
            isShowImport: false,
            dialogVisible: false,
            status:''

        }
    },
    mounted() {
        this.getIntelligentList();
        this.getAccountsData();
    },
    methods: {
        changeStartDay(val) {
            this.params.createStartTime = val.substr(0, 10)
            this.params.createEndTime = val.substr(13, 19)
        },
        close() {
            this.isShowAddTemplate = false;
        },
        closeImport() {
            this.isShowImport = false;
        },
        upload() {
            this.isShowImport = true;
        },
        getIntelligentList(val) {

            console.log(this.params)
            let _params = this.params;
            if (typeof val === 'number') {
                console.log("val", val)
                _params.currentPage = val;
            }
            _params.agentId = localStorage.getItem("id");

            this.$store.commit('LOAD_LIST', { loading: true });
            this.$store.commit('PARAMS', { params: _params });
            this.$store.dispatch('getIntelligentList');
        },
        getAccountsData() {
            let params = {};
            params.agentId = localStorage.getItem("id");
            utils.get('/autoTemplate/autoTemplateAccounts', params).then(res => {


            }).catch(res => {
                let _options = [{value:'',label:'全部'}];
                for (var i = 0; i < res.length; i++) {
                    let obj = {};
                    obj.value = res[i].clientid;
                    obj.label = res[i].clientid + "-" + res[i].name;
                    _options.push(obj)
                }
                this.userAccounts = _options
            })
        },
        del(id) {
            this.templateId = id;
            this.dialogVisible = true;
        },
        delTemplate() {
            utils.post('/autoTemplate/del', { templateId: this.templateId }, { emulateJSON: true }).then(res => {
                if (res.code != 0) {
                    this.$message.error(res.msg);
                    return;
                }
                this.$message({
                    message: "删除成功",
                    type: 'success'
                });
                this.dialogVisible = false;
                this.getIntelligentList()


            }).catch(res => {

            })
        },
        add() {
            this.templateId = false;
            this.showAddTemplateTitle = "添加智能模板";
            this.isShowAddTemplate = true;
            this.status = false;
        },
        edit(id,status) {
            this.templateId = id + '';
            this.showAddTemplateTitle = "编辑智能模板";
            this.isShowAddTemplate = true;
            this.status = status;
        },
        reload() {
            for (var k in this.params) {
                this.params[k] = '';
            }
            this.startTime = null;
            this.endTime = null;
        },
        handleCurrentChange(val) {
            this.getIntelligentList(val);
        }
    },
    components: {
        'autoTemplate': (resolve) => {
            require(['@/components/AutoTemplateAdd/AutoTemplateAdd.vue'], resolve)
        },
        'importFile': (resolve) => {
            require(['@/components/ImportFile/ImportFile.vue'], resolve)
        }
    },
    computed: {
        loading: function () {
            return this.$store.getters.load_list;
        },
        intelligent_list: function () {
            return this.$store.getters.intelligent_list;
        }
    }

}
