export default {
    name: 'International',
    props: ["id", "type"],
    data() {
        return {
            params: {
                client_id: '',
                product_type: '',
                currentPage: '1',
            },
            title: ''
        }
    },
    mounted() {
        this.params.client_id = this.id;
        this.params.product_type = this.type;
        this.getExpirationList(1);
        console.log(this.params.client_id, "==-----==", this.params.product_type)
        let product_type = this.params.product_type;
        if (product_type == 0) {
            this.title = "剩余行业短信"
        } else if (product_type == 3) {
            this.title = "剩余验证码短信"
        } else if (product_type == 4) {
            this.title = "剩余通知短信"
        } else if (product_type == 1) {
            this.title = "剩余营销短信"
        } else if (product_type == 2) {
            this.title = "剩余国际短信"
        }
    },
    methods: {
        getExpirationList(val) {
            let params = this.params;
            params.currentPage = val;

            this.$store.commit("PARAMS", { params: params });
            this.$store.dispatch('getExpirationlList')
        },
        jump(val) {
            this.getExpirationlList(val);
        },
        handleCurrentChange(val) {
            this.getExpirationlList(val);
        },
        getSummaries() {
            let total = this.expiration_list.sum;
            let sum = ["合计", "", "", "", "", "", total];
            return sum;
        },
        goBack() {
            this.$router.go(-1);
        },
        close() {
            this.$emit('close');
        }
    },
    computed: {
        loading: function () {
            return this.$store.getters.load_list;
        },
        expiration_list: function () {
            return this.$store.getters.expiration_list;
        },
    }
}
