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
        handleAvatarScucess(res, file) {
            if (res.code != 0) {
                this.$message.error(res.msg);
                return;
            }
            this.fileResult = res.data;
            this.fileFlag = true;
            if (res.data.importFall > 0) {
                this.importFail = true;
            }
            
            let mobileStr = res.data.mobileList.join(',');
            console.log(mobileStr)
            this.$emit("refresh",mobileStr);
            this.goBack();
        },
        handleChange(file, fileList) {
            this.fileList = fileList.slice(-1);
        },
        beforeAvatarUpload() {
            this.fileFlag = false;
            this.importFail = false;
        },
        goBack() {
            this.$emit("goBack");
        }
    }
}
