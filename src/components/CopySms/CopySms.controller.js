export default {
    name: 'SearchBox',
    props: ["cont"],
    data() {
        return {

        }
    },
    mounted() {
        let that = this;
        let clipboard = new Clipboard(".copy");

        clipboard.on('success', function (e) {
            that.$message({
                message: '复制成功',
                type: 'success'
            });
            //that.close();
            e.clearSelection();
        });
    },
    methods: {
        close() {
            this.$emit("goBack");
        }
    }
}
