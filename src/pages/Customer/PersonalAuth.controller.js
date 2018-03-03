import { Utils } from '@/model/util';
let utils = new Utils();


export default {
    name: 'enterpriseAuth',
    methods: {
        //初始化上传控件
        initUpload() {
            let that = this;
            let uploadUrl = this.uploadUrl;
            let uploader = WebUploader.create({

                // 选完文件后，是否自动上传。
                auto: true,

                // swf文件路径
                swf: +'/static/upload/Uploader.swf',

                //表单name
                fileVal: "photoFile",
                // 文件接收服务端。
                server: uploadUrl,

                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: '#filePicker',

                // 只允许选择图片文件。
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                }
            })
            uploader.on('fileQueued', function (file) {
                // 创建缩略图
                // 如果为非图片文件，可以不用调用此方法。
                // thumbnailWidth x thumbnailHeight 为 100 x 100
                uploader.makeThumb(file, function (error, src) {
                    if (error) {
                        that.$message.error("图片预览失败");
                        //$img.replaceWith('<span>不能预览</span>');
                        return;
                    }
                    that.imageUrl = src;
                });
            });
            // 文件上传成功，给item添加成功class, 用样式标记上传成功。
            uploader.on('uploadSuccess', function (file, res) {
                if (res.result == "success") {
                    that.params.imgUrl = res.path;
                }
            });
        },
        goBack() {
            this.$router.go(-1);
        },
        uploadCer() {
            let params = this.params;
            if (params.idNbr.length == 0) {
                // this.nbrError = true;
                this.$message.error("证件号码不能为空");
                return;
            } else {
                this.nbrError = false;
            }
            if (params.idNbr.length > 20) {
                this.$message.error("证件号码长度不能大于20个字符");
                return;
            }
            if (params.realName.length == 0) {
                this.$message.error("真实姓名不能为空");
                return;
            }
            if (params.realName.length > 20) {
                this.$message.error("真实姓名长度不能大于20个字符");
                return;
            }
            if (params.imgUrl.length == 0) {
                this.$message.error("请上传图片");
                return;
            }
            utils.post("/client/cer/add", params, { emulateJSON: true }).then(res => {
                this.$store.commit('LOAD_CER', { loading: true });
                this.$store.dispatch("getCustomerCer");
                this.$message({
                    type: 'success',
                    message: res.msg
                })
            }, res => {
                this.$message.error(res.msg);
            })
        },
        reUpload() {
            let params = this.params;
            if (params.idNbr.length == 0) {
                // this.nbrError = true;
                this.$message.error("证件号码不能为空");
                return;
            } else {
                this.nbrError = false;
            }
            if (params.idNbr.length > 20) {
                this.$message.error("证件号码长度不能大于20个字符");
                return;
            }
            if (params.realName.length == 0) {
                this.$message.error("真实姓名不能为空");
                return;
            }
            if (params.realName.length > 20) {
                this.$message.error("真实姓名长度不能大于20个字符");
                return;
            }
            utils.post("/client/cer/edit", params, { emulateJSON: true }).then(res => {
                this.$store.commit('LOAD_CER', { loading: true });
                this.$store.dispatch("getCustomerCer");
                this.$router.replace({ name: 'customer_manager_auth', params: { id: this.clientId }, query: { status: 2, type: 1 } })
                this.$message({
                    type: 'success',
                    message: res.msg
                })
            }, res => {
                this.$message.error(res.msg);
            })
        },
        getUploadUrl() {
            let client_id = this.$route.params.id;
            utils.get("/client/cer/info", { clientId: client_id }).then(res => {
                this.uploadUrl = res.data.smsp_img_url + "/upload/uploadAuto.html";
                this.params.realName = res.data.cerInfo.realName;
                this.params.idNbr = res.data.cerInfo.idNbr;
                this.imageUrl = res.data.cerInfo.imgUrl;
                this.initUpload();
            }, res => {

            })
        }
    },
    data() {
        return {
            edit: '',
            imageUrl: '',
            uploadUrl: '',

            clientId: '',


            params: {
                clientId: '',
                clientType: '',
                realName: '',
                idNbr: '',
                imgUrl: '',
                idType: '5'
            },
            uploadData: {
                userId: "",
                idType: "5",
                oauthType: "1",
                fileFormats: 'png,jpg,jpeg'
            },
        }
    },
    mounted() {
        this.getUploadUrl();

        this.edit = this.$route.query.edit;
        //初始话数据
        this.clientId = this.customer_data.clientid;
        this.uploadData.userId = this.customer_data.clientid;
        this.params.clientId = this.customer_data.clientid;
        this.params.clientType = this.customer_data.client_type;
    },
    computed: {
        customer_data: function () {
            return this.$store.getters.customer_data;
        },
        customer_cer: function () {
            return this.$store.getters.customer_cer;
        },
        loading: function () {
            return this.$store.getters.load_cer;
        }
    }

}
