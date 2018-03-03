import { Utils } from '@/model/util';
let utils = new Utils();

export default {
    name: 'selectemplate',
    props: {
        clientId: String
    },
    data() {
        return {
            aotoTemplist: {},
            generalTempList: {},
            autoParams: {
                templateType: "",
                applicationScenarios: "",
            },
            generalParams: {
                smsType: "",
                content: ""
            },
            typeOption: [{
                value: '',
                label: '全部类型'
            }, {
                value: '0',
                label: '固定模板'
            }, {
                value: '1',
                label: '变量模板'
            }],
            temolateAttribute: [{
                value: '',
                label: '全部类型'
            }, {
                value: '10',
                label: '行业'
            }, {
                value: '11',
                label: '会员营销'
            }],
            isShowGeneral: false
        }
    },
    mounted() {
        this.getAutoTempList(1);
    },
    methods: {
        goBack() {
            this.$emit("goBack");
        },
        autoTempPageChange(val) {
            this.getAutoTempList(val);
        },
        generalTempPageChange(val) {
            this.getGeneralTempList(val);
        },
        importContent(smsType, sign, content) {
            let _params = {};
            _params.smsType = smsType;
            _params.sign = sign;
            _params.content = content;
            this.$emit("refresh", _params);

        },
        getAutoTempList(val) {
            let _params = this.autoParams;
            _params.clientId = this.clientId;
            _params.rows = 5;
            if (typeof val === 'number') {
                _params.page = val;
            }
            utils.post('/send/autoTemplateList', _params, { emulateJSON: true }).then(res => {

            }, res => {
                this.aotoTemplist = res;
            })
        },
        getGeneralTempList(val) {
            let _params = this.generalParams;
            _params.rows = 5;
            if (typeof val === 'number') {
                _params.page = val;
            }
            utils.post('/send/autoTemplateCommonList', _params, { emulateJSON: true }).then(res => {

            }, res => {
                console.log(res);
                this.generalTempList = res;
            })
        },
        switchAuto() {
            this.isShowGeneral = false;
            this.getAutoTempList(1);


        },
        switchGeneral() {
            this.isShowGeneral = true;

            this.getGeneralTempList(1);


        }
    }
}
