import { Utils } from '@/model/util';
let utils = new Utils();

export default {
    name: 'importFile',
    data() {
        return {
            fileList: [],
            fileResult: {},
            fileFlag: false,
            importFail: false
        }
    },
    methods: {
        exportReport() {
            utils.export({}, "/autoTemplate/downloadExcelTemplate");
        },
        handleAvatarScucess(res, file) {
            if (res.code != 0) {
                this.$message.error(res.msg);
                return;
            }
            console.log(res.data)
            this.fileResult = res.data;
            this.fileFlag = true;
            if (res.data.importFall > 0) {
                this.importFail = true;
            }
            this.$emit("refresh");
        },
        handleChange(file, fileList) {
            this.fileList = fileList.slice(-1);
        },
        beforeAvatarUpload() {
            this.fileFlag = false;
            this.importFail = false;
        },
        goBack() {
            if (this.fileFlag) {
                this.$emit("refresh");
            }
            this.$emit("goBack");
        }
    }
}
