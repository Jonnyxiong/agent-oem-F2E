import { Utils } from '@/model/util';
let utils = new Utils();
let Base64 = require('Base64');

export default {
    name: 'open',
    data() {
        return {
            client_id: '', //开户成功返回的client_id
            userTypeOptions: [{
                value: '0',
                label: '下级客户'
            }, {
                value: '1',
                label: '自己使用'
            }],
            statusReportOptions: [{
                value: '0',
                label: '不获取'
            }, {
                value: '1',
                label: '系统推送'
            }, {
                value: '3',
                label: '自己拉取'
            }],
            moOptions: [{
                value: '0',
                label: '不获取'
            }, {
                value: '1',
                label: '系统推送'
            }, {
                value: '3',
                label: '自己拉取'
            }],
            identifyTpyeOptions: [{
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
                label: '三证合一（企业）'
            }, {
                value: '7',
                label: '四证合一（企业）'
            }, {
                value: '8',
                label: '登记证书号'
            }, {
                value: '1',
                label: '个人身份证'
            }],
            params: {
                name: '',
                mobile: '',
                agentOwned: '1',
                needmo: '0',
                needreport: '0',
                deliveryurl: '',
                mourl: '',
                remarks: '',
                email: '',
                idType: '1',
                idNbr: '',
                imgUrl: '',
            },
            isOwnChanged: false, //适用对象是否变化过,用于上传组件的初始化
            password: '',
            errEmail: false,
            EmailTip: "邮箱格式不正确",
            errMobile: false,
            errName: false,
            NameTip: "",
            errReport: false,
            ReportTip: "",
            errMo: false,
            MoTip: "",
            MobileTip: "手机号码格式不正确",
            errRemark: false,
            RemarkTip: false,
            errAddress: false,
            AddressTip: false,
            isOpenSucc: false,
            submiting: false,
            imageUrl: '',
            uploadUrl: '',
            smsp_img_url: '',
            nbrError: false,
            companyErr: false,
            loadImg: false,
            mobile: '',
            email: '',
            submiting: false,
            khmsg: false,
            uploadData: {
                userId: "",
                idType: "3",
                oauthType: "1",
                fileFormats: 'png,jpg,jpeg'
            },
        }
    },

    mounted() {
        let that = this;

        const clipboard = new Clipboard('.copymsg');
        clipboard.on('success', function (e) {
            that.$message("复制成功", { time: 1000 })
        });
        clipboard.on('error', function (e) {
            that.$message("复制失败，复制功能只支持 Chrome 42+、Firefox 41+、IE 9+、Opera 29+", { time: 3000 })
        });
        this.getOauthStatus();
        utils.get("/admin/cer/info").then(res => {
            this.uploadUrl = res.data.smsp_img_url + "/upload/uploadAuto.html";
            this.smsp_img_url = res.data.smsp_img_url;
            this.userId = res.data.agent_id;
            // this.params.company = res.data.company;
        }, res => {
            this.$message.error("获取资质信息失败")
        })
    },
    methods: {
        //初始化上传控件
        initUpload() {
            console.log("------")
            this.isOwnChanged = true;
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
                //允许文件多次上传
                duplicate:true,
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
        //修改使用对象
        changeOwner(val) {
            console.log(`val: ${val}`);
            if (val == 0 && !this.isOwnChanged) {
                this.$nextTick(_ => {
                    this.initUpload();
                })

            }
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
        getOauthStatus() {
            utils.get("/client/oauth").then(res => {
                if (res.data.oauth_status != 3) {
                    this.$message.error("请先认证再开户");
                }
            }, res => {

            })
        },
        validateEmail() {
            if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.params.email) && this.params.email.length > 0) {
                this.errEmail = true;
                this.EmailTip = "邮箱格式不正确 "
                return false;
            }
            this.errEmail = false;
        },
        validateName() {
            if (this.params.name == '') {
                this.errName = true;
                this.NameTip = "账户名称不能为空";
                return false;
            }
            this.errName = false;
        },
        validateReport() {
            if (this.params.deliveryurl == '' && this.params.needreport == '1') {
                this.errReport = true;
                this.ReportTip = "状态报告回调地址不能为空";
                return false;
            }
            this.errReport = false;
        },
        validateMo() {
            if (this.params.mourl == '' && this.params.needmo == '1') {
                this.errMo = true;
                this.MoTip = "上行回调地址不能为空";
                return false;
            }
            this.errMo = false;
        },
        validateMobile() {
            if (!/^[1][0-9][0-9]{9}$/.test(this.params.mobile) && this.params.mobile.length > 0) {

                this.errMobile = true;
                this.MobileTip = "手机号码格式不正确"
                return false;
            }
            this.errMobile = false;
        },
        validateRemark() {
            if (this.params.remarks.length > 50) {
                this.RemarkTip = "备注最大长度不超过50个字符"
                this.errRemark = true;
                return;
            }
            this.errRemark = false;
        },
        open() {
            this.validateName();
            this.validateMobile();
            this.validateEmail();
            this.validateRemark();
            this.validateReport();
            this.validateMo();
            let _params = {};
            if (this.errName) {
                this.$message.error("账户名称不能为空");
                return
            }
            if (this.errEmail) {
                this.$message.error("提醒邮箱格式不正确");
                return
            }
            if (this.errMobile) {
                this.$message.error("手机号码格式不正确");
                return
            }
            if (this.errMo) {
                this.$message.error("请填写上行获取方式");
                return
            }
            if (this.errReport) {
                this.$message.error("请填写状态报告获取方式");
                return
            }
            if (this.errRemark) {
                this.$message.error("备注填写错误");
                return
            }
            this.submiting = true;
            if (this.params.needreport == '1') {
                _params.deliveryurl = this.params.deliveryurl;
            }
            if (this.params.needmo == '1') {
                _params.mourl = this.params.mourl;
            }
            if (this.params.agentOwned == '1') {
                _params.agentOwned = this.params.agentOwned;
                _params.email = this.params.email;
                _params.mobile = this.params.mobile;
                _params.name = this.params.name;
                _params.needmo = this.params.needmo;
                _params.needreport = this.params.needreport;
                _params.remarks = this.params.remarks;
            } else {
                _params.agentOwned = this.params.agentOwned;
                _params.email = this.params.email;
                _params.mobile = this.params.mobile;
                _params.name = this.params.name;
                _params.needmo = this.params.needmo;
                _params.needreport = this.params.needreport;
                _params.remarks = this.params.remarks;
                _params.idType = this.params.idType;
                _params.idNbr = this.params.idNbr;
                _params.imgUrl = this.params.imgUrl;

            }
            utils.post("/client/account/addUser", _params).then(res => {
                this.$message({
                    type: 'success',
                    message: "开户成功"
                })
                this.submiting = false;
                this.password = Base64.atob(res.data.password);
                this.mobile = res.data.mobile;
                this.email = res.data.email;
                this.client_id = res.data.clientid;
                this.khmsg = true;

            }, res => {
                this.submiting = false;
                this.$message.error(res.msg)

            })
            
        },
        repeatMobile() {
            utils.get("/client/account/validate/mobile", { mobile: this.params.mobile }).then(res => {
                if (res.data) {
                    this.errMoblie = false;
                    this.save();
                } else {
                    this.errMobile = true;
                    this.MobileTip = "手机号码已存在";
                    this.submiting = false;
                }
            }, res => {
                this.submiting = false;
            })
        },
        closeTip() {
            this.isOpenSucc = false;
        },
        openTip() {
            this.isOpenSucc = true;
        },
        //上传资质
        uploadAuth() {
            // let type   = this.params.client_type;
            // let id     = this.client_id;
            // let status = 2;
            let route_params = {};
            route_params.id = this.client_id;
            let route_query = {};
            route_query.status = 2;
            route_query.type = this.params.client_type;
            this.$router.push({ name: 'customer_manager_auth', params: route_params, query: route_query });
        },
        mksure() {
            this.khmsg = false;
            for (var k in this.params) {
                this.params[k] = '';
            }
            this.params.agentOwned = '1';
            this.params.needreport = '0';
            this.params.needmo = '0';
            this.params.idType = '1';
            this.imageUrl = '';
            this.params.imgUrl = '';
        }
    },
    computed: {
        oauth_status: function () {
            return this.$store.getters.oauth_status;
        },
        cerInfo() {
            return this.$store.getters.cer_info;
        },
        loading() {
            return this.$store.getters.load_cer;
        }
    }
}
