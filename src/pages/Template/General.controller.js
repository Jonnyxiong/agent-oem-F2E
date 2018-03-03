import { Utils } from '@/model/util';
let utils = new Utils();

export default {
    name: 'general',
    data() {
        return {
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
            params: {
                smsType: '',
                templateType: '',
                currentPage: '1',
                pageRowCount: '',
                content: '',
            },
            templateId: "", //模板id
            showAddTemplateTitle: "",
            isShowAddTemplate: false,
            isShowDesc: false,
        }
    },
    mounted() {
        this.getIntelligentList();
    },
    methods: {
        changeStartDay(val) {
            this.params.createStartTime = val.substr(0, 10)
            this.params.createEndTime = val.substr(13, 19)
        },
        getIntelligentList(val) {

            console.log(this.params)
            let _params = this.params;
            if (typeof val === 'number') {
                console.log("val", val)
                _params.currentPage = val;
            }

            this.$store.commit('LOAD_LIST', { loading: true });
            this.$store.commit('PARAMS', { params: _params });
            this.$store.dispatch('getGeneralList');
        },
        handleCurrentChange(val) {
            this.getIntelligentList(val);
        }
    },
    computed: {
        loading: function () {
            return this.$store.getters.load_list;
        },
        general_list: function () {
            return this.$store.getters.general_list;
        }
    }

}
