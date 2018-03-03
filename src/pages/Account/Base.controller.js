import { Utils } from '@/model/util';
let utils = new Utils();
export default {
    name: 'base',
    data() {
        return {
            loading: false,
            baseInfo: {},
        }
    },
    mounted() {
        this.loading = true;
        this.getBaseInfo();
    },
    methods: {
        getBaseInfo() {
            utils.get('/admin/baseinfo').then(res => {
                this.loading = false;
                this.baseInfo = res.data;
            }, res => {
                this.$message.error(res.msg);
            })
        }
    },
    computed: {
        user: function () {
            return this.$store.getters.user;
        },
        bill_data: function () {
            return this.$store.getters.bill_data;
        }
    }

}
