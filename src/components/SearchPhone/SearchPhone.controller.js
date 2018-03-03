export default {
    name: 'SearchBox',
    props: ["mobile"],
    data() {
        return {
            temp: "",
            condition: ""
        }
    },
    mounted() {
        this.temp = this.mobile;
    },
    methods: {
        search() {
            let keyword = this.condition,
                arr = [];
            let mobile = this.mobile.split(",");
            for (let i = 0; i < mobile.length; i++) {
                if (mobile[i].indexOf(keyword) >= 0) {
                    arr.push(mobile[i]);
                }
            }
            this.temp = arr.join(",");
            if (arr.length == 0) {
                this.$message.error("没有结果");
            }
        },
        close() {

            this.$emit("goBack");
        }
    }
}
