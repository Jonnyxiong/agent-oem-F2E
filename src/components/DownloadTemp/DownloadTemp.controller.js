import { Utils } from '@/model/util';
let utils = new Utils();

export default {
    name: "downloadTemp",
    data() {
        return {
            isexport: false
        }
    },
    mounted() {

    },
    methods: {
        goBack() {
            this.$emit("goBack");
        },
        exportExcel() {
            if (this.isexport) {
                return;
            }
            this.isexport = true;
            utils.get("/send/downloadtemplate", {}).then(res => {
                this.isexport = false;
            }, res => {
                this.isexport = false;
                if (res.length > 0) {
                    utils.exportGet({}, "/send/downloadtemplate");
                } else {
                    this.$message.error("当前无法导出");
                }
            });
            this.goBack();
        },
        exportCsv() {
            if (this.isexport) {
                return;
            }
            this.isexport = true;
            utils.get("/send/downloadtemplateCSV", {}).then(res => {
                this.isexport = false;
            }, res => {
                this.isexport = false;
                if (res.length > 0) {
                    utils.exportGet({}, "/send/downloadtemplateCSV");
                } else {
                    this.$message.error("当前无法导出");
                }
            });
            this.goBack();
        },
        exportTxt() {
            if (this.isexport) {
                return;
            }
            this.isexport = true;
            utils.get("/send/downloadtemplateTXT", {}).then(res => {
                this.isexport = false;
            }, res => {
                this.isexport = false;
                if (res.length > 0) {
                    utils.exportGet({}, "/send/downloadtemplateTXT");
                } else {
                    this.$message.error("当前无法导出");
                }
            });
            this.goBack();
        }
    }
}
