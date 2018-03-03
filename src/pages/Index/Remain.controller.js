import { Utils } from '@/model/util';
let utils = new Utils();

export default {
    data() {
        return {
            params: {
                operator_code: '',
                product_type: ''
            },
            product: [{
                value: '',
                label: '全部类型'
            }, {
                value: '0',
                label: '行业'
            }, {
                value: '4',
                label: '通知'
            }, {
                value: '3',
                label: '验证码'
            }, {
                value: '1',
                label: '营销'
            }, {
                value: '2',
                label: '国际短信'
            }],
            operator: [{
                value: '',
                label: '全部类型'
            }, {
                value: '0',
                label: '全网'
            }, {
                value: '1',
                label: '移动'
            }, {
                value: '2',
                label: '联通'
            }, {
                value: '3',
                label: '电信'
            }, {
                value: '4',
                label: '国际'
            }],
            remain_list: [],
            total: '',
            loading: false,
        }
    },
    mounted() {
        this.params.product_type = this.$route.query.type + "";
        this.getRemainList();
    },
    methods: {
        getRemainList() {
            this.loading = true;
            let p = this.params;
            utils.post('/agent/newpools', p, { emulateJSON: true }).then(res => {
                this.remain_list = res.data.data;
                this.total = res.data.total;
                this.loading = false;
            }, res => {
                this.loading = false;
            })
        },
        goBack() {
            this.$router.go(-1);
        },
        getSummaries() {
            let total = this.total;
            let sum = ["合计", "", "", "", total];
            return sum;
        }
    },
}