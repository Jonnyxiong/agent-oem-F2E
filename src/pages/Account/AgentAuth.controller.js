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
        //提交资质信息
        uploadCer() {
            let params = this.params;
            if (params.id_nbr.length == 0) {
                this.nbrError = true;
                this.$message.error("证件号码不能为空");
                return;
            } else {
                this.nbrError = false;
            }
            if (params.id_nbr.length > 20) {
                this.$message.error("证件号码长度不能大于20个字符");
                return;
            }

            if (params.company.length > 60) {
                this.$message.error("公司长度不能大于60个字符");
                return;
            }
            if (params.company.length == 0) {
                this.$message.error("公司名称不能为空");
                this.companyErr = true;
                return;
            } else {
                this.companyErr = false;
            }

            if (params.imgUrl.length == 0) {
                this.$message.error("请上传图片");
                return;
            }

            //设置证件类型
            params.id_type = this.uploadData.idType;

            utils.post("/admin/cer/add", params, { emulateJSON: true }).then(res => {
                this.$store.commit('LOAD_CER', { loading: true });
                this.$store.dispatch("getCerInfo");

                this.$message({
                        type: "success",
                        message: res.msg,
                    })
                    //this.$store.commit('OAUTH_STATUS',{status : 4});
            }, res => {
                this.$message.error(res.msg);
            })
        },

    },
    mounted() {

        utils.get("/admin/cer/info").then(res => {


            this.uploadUrl = res.data.smsp_img_url + "/upload/uploadAuto.html";
            this.smsp_img_url = res.data.smsp_img_url;
            this.userId = res.data.agent_id;
            this.params.company = res.data.company;
            this.initUpload();
        }, res => {
            this.$message.error("获取资质信息失败")
        })


    },
    data() {
        return {
            imageUrl: '',
            uploadUrl: '',
            smsp_img_url: '',

            nbrError: false,
            companyErr: false,
            loadImg: false,
            params: { //提交资质信息用
                id_type: '3',
                company: '',
                id_nbr: '',
                imgUrl: '',
            },
            uploadData: {
                userId: "",
                idType: "3",
                oauthType: "1",
                fileFormats: 'png,jpg,jpeg'
            },
            options: [{
                value: '3',
                label: '组织机构证'
            }, {
                value: '4',
                label: '税务登记证'
            }, {
                value: '5',
                label: '营业执照'
            }, {
                value: '6',
                label: '三证合一(企业)'
            }, {
                value: '7',
                label: '四证合一(企业)'
            }, {
                value: '8',
                label: '登记证书号'
            }, {
                value: '1',
                label: '个人身份证'
            }]
        }
    },
    computed: {
        cerInfo() {
            return this.$store.getters.cer_info;
        },
        loading() {
            return this.$store.getters.load_cer;
        }
    }


}
