import { Utils } from '@/model/util';
import { fail } from 'assert';
let utils = new Utils();
const TIME_COUNT = 3;

export default {
    name: 'test',
    data() {
        return {
            params: {
                clientId: '',
                content: '',
                mobile: '',
                smstype: '',
            },
            cerinfo: {},
            form: {
                smsType: '10',
                templateType: '1',
            },
            uploader: null,
            fileInfo: {
                data: [{
                    name: '',
                    percent: '',
                    size: '',
                }],
                params: {
                    fileMd5: '',
                    jindutiao: 0,
                    fileName: '',
                },
                byte: "",
                state: 'pending',
                id: '',
                url: '',
                ext: '',
                uploadTip: "等待文件上传中...",
                loadingFile: false,
            },
            isUploadSuccess: false,
            isUploading: false,
            isFileResolve: false,
            options: [],
            list: [],
            clientId: "",
            sign: '',
            smstypes: [{
                value: '4',
                label: '验证码'
            }, {
                value: '0',
                label: '通知'
            }, {
                value: '5',
                label: '营销'
            }],
            hysmstypes: [{
                value: '4',
                label: '验证码'
            }, {
                value: '0',
                label: '通知'
            }],
            yxsmstypes: [{
                value: '5',
                label: '营销'
            }],
            importMode: 1,
            mobilecount: 0,
            fileMobile: {
                err_num: '0',
                submit_total: '0',
                repeat_num: '0'
            },
            mobile: {
                checkNum: 0,
                validNum: 0,
                filterNum: 0,
                validlist: ""
            },
            charge: 0,
            showMask: false,
            isyx: false,
            ishy: false,
            istype: true,
            isShowSelect: false,
            isShowImport: false,
            isShowDownlaod: false,
            dialogVisible: false,
            timer: null,
            submit_flag: false,
            api: {
                uploadServerUrl: "",
                progressUrl: "",
                checkUrl: "",
                mergeUrl: "",
                delUrl: "",
                downloadUrl: ""
            }
        }
    },
    mounted() {
        this.getCerInfo();
        this.getUser();

    },
    watch: {
        params: {
            handler: function (val, oldVal) {
                let num = this.getChargeNum(val);

                this.charge = num;
            },
            deep: true
        },
        sign: function (val, oldVal) {
            let num = this.getChargeNum();
            this.charge = num;

        },
    },
    methods: {
        getCerInfo() {
            utils.get("/admin/cer/info").then(res => {
                this.cerinfo = res.data;
                let img_url = res.data.smsp_img_url;
                // let img_url = "http://172.16.1.190:8080/;
                this.api.uploadServerUrl = img_url + "/chunks/file_save.html";
                this.api.progressUrl = img_url + "/chunks/progress.html";
                this.api.checkUrl = img_url + "/chunks/check.html";
                this.api.mergeUrl = img_url + "/chunks/merge.html";
                this.api.delUrl = img_url + "/chunks/del_chunks.html";
                this.api.downloadUrl = img_url + "/file/downloadFile.html";
                this.initWebUploader();
            }, res => {

            })
        },
        downloadUploadFile() {
            let turnForm = document.createElement("form");
            document.body.appendChild(turnForm);
            turnForm.method = 'get';
            turnForm.action = this.api.downloadUrl;
            //turnForm.target = '_blank';
            let params = {
                path: this.fileInfo.url
            };

            for (let k in params) {
                let newElement = document.createElement("input");
                newElement.setAttribute("name", k);
                newElement.setAttribute("type", "hidden");
                newElement.setAttribute("value", params[k]);
                turnForm.appendChild(newElement);
            }
            turnForm.submit();
        },
        initWebUploader() {
            let that = this;
            //注册事件
            WebUploader.Uploader.register({
                    "before-send-file": "beforeSendFile", //整个文件上传前  
                    "before-send": "beforeSend", //每个分片上传前  
                    "after-send-file": "afterSendFile", //分片上传完毕  
                }, {
                    //时间点1：所有分块进行上传之前调用此函数    
                    beforeSendFile: function (file) {

                    },
                    //时间点2：如果有分块上传，则每个分块上传之前调用此函数    
                    beforeSend: function (block) {
                        var deferred = WebUploader.Deferred();

                        $.ajax({
                            type: "POST",
                            url: that.api.checkUrl, //ajax验证每一个分片
                            data: {
                                fileName: that.fileInfo.params.fileName,
                                progress: that.fileInfo.params.jindutiao,
                                fileMd5: that.fileInfo.params.fileMd5, //文件唯一标记    
                                chunk: block.chunk, //当前分块下标    
                                chunkSize: block.end - block.start, //当前分块大小
                                flag: that.cerinfo.agent_id
                            },
                            cache: false,
                            async: false, // 与js同步
                            timeout: 1000, //todo 超时的话，只能认为该分片未上传过
                            dataType: "json",
                            success: function (response) {
                                if (response.isExist) {
                                    //分块存在，跳过
                                    deferred.reject();
                                } else {
                                    //分块不存在或不完整，重新发送该分块内容
                                    deferred.resolve();
                                }
                            }
                        });
                        this.owner.options.formData.fileMd5 = that.fileInfo.params.fileMd5;
                        deferred.resolve();
                        return deferred.promise();
                    },
                    //时间点3：所有分块上传成功后调用此函数    
                    afterSendFile: function () {
                        //如果分块上传成功，则通知后台合并分块    
                        $.ajax({
                            type: "POST",
                            url: that.api.mergeUrl, //ajax将所有片段合并成整体
                            data: {
                                fileName: that.fileInfo.params.fileName,
                                fileMd5: that.fileInfo.params.fileMd5,
                                flag: that.cerinfo.agent_id
                            },
                            success: function (data) {
                                if (data != '' && data != undefined && data != null) {
                                    let res = JSON.parse(data);
                                    console.log(data);
                                    that.fileInfo.url = res.pathFileName;
                                    if (that.fileInfo.url) {
                                        that.resolveFile(); //解析文件
                                    }

                                }
                            }
                        });

                    }
                })
                //初始化
            let uploader = WebUploader.create({
                // 选完文件后，是否自动上传。
                auto: false,

                // swf文件路径
                swf: '/static/upload/Uploader.swf',

                //表单name
                fileVal: "photoFile",
                formData: { flag: that.cerinfo.agent_id },
                chunked: true, //开启分片上传  
                chunkSize: 1 * 1024 * 1024, // 如果要分片，分多大一片？默认大小为5M  
                chunkRetry: 3, //如果某个分片由于网络问题出错，允许自动重传多少次  
                threads: 3, //上传并发数。允许同时最大上传进程数[默认值：3]      
                duplicate: false, //是否重复上传（同时选择多个一样的文件），true可以重复上传  
                prepareNextFile: true, //上传当前分片时预处理下一分片  
                server: that.api.uploadServerUrl, // 文件接收服务端  
                fileSizeLimit: 50 * 1024 * 1024, //100M 验证文件总大小是否超出限制, 超出则不允许加入队列  
                fileSingleSizeLimit: 100 * 1024 * 1024, //100M 验证单个文件大小是否超出限制, 超出则不允许加入队列  
                pick: {
                    id: '#filePicker', //这个id是你要点击上传文件按钮的外层div的id  
                    multiple: false //是否可以批量上传，true可以同时选择多个文件  
                },
                accept: [{
                    extensions: "txt,xls,xlsx,csv",
                    mimeTypes: '.txt,.xls,.xlsx,.csv'
                }]
            });

            //当有文件被添加进队列的时候（点击上传文件按钮，弹出文件选择框，选择完文件点击确定后触发的事件）    
            uploader.on('fileQueued', function (file) {
                console.log(file);
                //限制单个文件的大小 超出了提示  
                if (file.size > 50 * 1024 * 1024) {
                    that.$message.error("单个文件大小不能超过50M");
                    return false;
                }

                if (file.name.length > 30) {
                    that.$message.error("文件名称不能超过30个字符");
                    return false;
                }
                that.fileInfo.uploadTip = "等待文件上传中..."
                that.fileInfo.loadingFile = true;

                //执行上传

                uploader.md5File(file, 0, 10 * 1024 * 1024)
                    // 及时显示进度
                    .progress(function (percentage) {

                    }).then(function (val) {
                        let ext = file.ext,
                            extStr = '';
                        if (ext == 'txt') {
                            extStr = 2
                        } else if (ext == 'csv') {
                            extStr = 3
                        } else if (ext == 'xls' || ext == 'xlsx') {
                            extStr = 1
                        }
                        that.isUploading = true;
                        that.fileInfo.ext = extStr;
                        that.fileInfo.data[0].name = file.name;
                        that.fileInfo.data[0].size = (file.size / 1024 / 1024).toFixed(2) + "M";
                        that.fileInfo.data[0].percent = 0;
                        that.fileInfo.params.fileMd5 = val;
                        that.fileInfo.id = file.id;
                        that.fileInfo.byte = file.size;
                        that.fileInfo.params.fileName = file.name; //为自定义参数文件名赋值  
                        that.fileInfo.loadingFile = false;
                        $.ajax({
                            type: "POST",
                            url: that.api.progressUrl, //先检查该文件是否上传过，如果上传过，上传进度是多少
                            data: {
                                fileName: file.name, //文件名
                                flag: that.cerinfo.agent_id,
                                fileSize: file.size,
                                fileMd5: val
                            },
                            cache: false,
                            async: false, // 同步
                            dataType: "json",
                            success: function (data) {
                                var progress = data.progress;
                                var filePath = data.pathFileName;

                                if (progress == 100) {
                                    that.fileInfo.params.jindutiao = progress;
                                    that.fileInfo.data[0].percent = progress;

                                    that.fileInfo.url = filePath;
                                    that.isUploadSuccess = true; //显示结果


                                    that.resolveFile();
                                } else {

                                    uploader.upload(file.id);
                                }


                            }
                        });
                    });
            });
            //文件上传过程中创建进度条实时显示  
            uploader.on('uploadProgress', function (file, percentage) {
                console.log(`percentage:${percentage}`);
                that.fileInfo.data[0].percent = (percentage * 100).toFixed(2);
                that.fileInfo.params.jindutiao = percentage;
                //根据fielId获得当前要上传的文件的进度  
                // var oldJinduValue = map[file.id];

                // if (percentage < oldJinduValue && oldJinduValue != 1) {
                //     $li.find('p.state').text('上传中' + Math.round(oldJinduValue * 100) + '%');
                //     $percent.css('width', oldJinduValue * 100 + '%');
                // } else {
                //     $li.find('p.state').text('上传中' + Math.round(percentage * 100) + '%');
                //     $percent.css('width', percentage * 100 + '%');
                // }
            });
            //上传成功后执行的方法  
            uploader.on('uploadSuccess', function (file) {


            });
            uploader.on("error", function (type) {
                console.log(type)
                if (type == "Q_TYPE_DENIED") {
                    that.$message.error("请上传txt,xls,xlxs,csv格式文件");
                } else if (type == "Q_EXCEED_SIZE_LIMIT") {
                    that.$message.error("文件大小不能超过50M");
                } else {
                    that.$message.error("上传出错！请检查后重新上传！错误代码");
                }
            });
            //上传出错后执行的方法  
            uploader.on('uploadError', function (file) {
                // errorUpload = true;
                // $btn.text('开始上传');
                this.$message.error("上传出错，请检查网络连接");
                this.pauseUploadFile();
            });

            //文件上传成功失败都会走这个方法  
            uploader.on('uploadComplete', function (file) {

            });

            uploader.on('all', function (type) {

                if (type === 'startUpload') {
                    that.fileInfo.state = 'uploading';
                } else if (type === 'stopUpload') {
                    that.fileInfo.state = 'paused';
                } else if (type === 'uploadFinished') {
                    that.fileInfo.state = 'done';
                }
            });

            that.uploader = uploader;
        },
        pauseUploadFile() {
            if (this.fileInfo.state == "uploading") {
                this.uploader.stop(true);
            }

        },
        startUploadFile() {
            let that = this;
            $.ajax({
                type: "POST",
                url: that.api.progressUrl, //先检查该文件是否上传过，如果上传过，上传进度是多少
                data: {
                    fileName: that.fileInfo.params.fileName, //文件名
                    flag: that.cerinfo.agent_id,
                    fileSize: that.fileInfo.byte,
                    fileMd5: that.fileInfo.params.fileMd5
                },
                cache: false,
                async: false, // 同步
                dataType: "json",
                success: function (data) {
                    if (data > 0 && data) {
                        that.fileInfo.params.jindutiao = data;
                        that.fileInfo.data[0].percent = data;

                    }
                    //执行上传
                    that.uploader.upload(that.fileInfo.id);
                }
            });
        },
        closeFileUpload() {
            let that = this;
            this.$confirm('此操作将取消该文件的上传, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type: "POST",
                    url: that.api.delUrl, //先检查该文件是否上传过，如果上传过，上传进度是多少
                    data: {
                        fileName: that.fileInfo.params.fileName, //文件名
                        flag: that.cerinfo.agent_id,
                        fileMd5: that.fileInfo.params.fileMd5,
                    },
                    cache: false,
                    async: false, // 同步
                    dataType: "json",
                    success: function (res) {
                        that.uploader.stop(true);
                        that.isUploading = false;
                        that.clearUploadFile();
                    }
                });
            }).catch(() => {

            });

        },
        delUploadFile() {
            let that = this;
            this.$confirm('此操作将取消该文件的上传, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type: "POST",
                    url: that.api.delUrl, //先检查该文件是否上传过，如果上传过，上传进度是多少
                    data: {
                        fileName: that.fileInfo.params.fileName, //文件名
                        flag: that.cerinfo.agent_id,
                        fileMd5: that.fileInfo.params.fileMd5
                    },
                    cache: false,
                    async: false, // 同步
                    dataType: "json",
                    success: function (res) {
                        if (res.isDeleted == 1) {

                            that.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            that.isUploading = false; //关闭弹窗
                            that.uploader.stop(true);
                            that.clearUploadFile();

                        } else {
                            that.$message.error('删除失败')
                        }
                    }
                });
            }).catch(() => {

            });


        },
        clearUploadFile() {
            this.fileInfo.url = "";
            this.isUploadSuccess = false;
            this.isFileResolve = false;
            this.uploader.removeFile(this.fileInfo.id, true);

            //清除解析号码缓存
            this.fileMobile.submit_total = "0";
            this.fileMobile.err_num = "0";
            this.fileMobile.err_num = "0";
        },
        beforeClearUploadFile() {
            this.$confirm('确定删除导入号码?', '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.clearUploadFile();
            }).catch(() => {

            });
        },
        resolveFile() {
            this.fileInfo.uploadTip = "正在拼命解析文件..."
            this.fileInfo.loadingFile = true;
            utils.post("/send/parsefile", { filePath: this.fileInfo.url }, { emulateJSON: true }).then(res => {
                this.isFileResolve = true;
                this.fileMobile.submitTotal = res.data.submitTotal;
                this.fileMobile.errNum = res.data.errNum;
                this.fileMobile.repeatNum = res.data.repeatNum;

                this.fileInfo.loadingFile = false;
                this.isUploading = false; //关闭弹窗
                this.isUploadSuccess = true; //显示结果
            }, res => {
                let msg = res.msg || "文件解析超时";
                this.$message.error(msg);
                this.fileInfo.loadingFile = false;
                this.isUploading = false; //关闭弹窗
                this.isUploadSuccess = true; //显示结果

            }).catch(res => {
                this.$message.error("文件解析失败");
                this.fileInfo.loadingFile = false;
                this.isUploading = false; //关闭弹窗
                this.isUploadSuccess = true; //显示结果

            })
        },
        clearMobile() {
            let mobile = this.params.mobile;
            let result = JSMS.getMobileInfo(mobile);
            this.mobile = result;
            this.params.mobile = result.validlist;
        },
        changeStartDay(val) {
            this.params.start_time_day = val || '';
        },
        getmobileList(val) {
            this.params.mobile = val;
            this.mobilecount = val.split(',').length;
        },

        selectTemplate() {
            let _params = {};
            if (!this.params.clientId) {
                this.$message.error('请选择子账号');
                return;
            }
            this.isShowSelect = true;
            this.clientId = this.params.clientId;
        },
        exportReport() {
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
            })
        },
        closeSelect() {
            this.isShowSelect = false;
        },
        closeDownload() {
            this.isShowDownlaod = false;
        },
        openDownload() {
            this.isShowDownlaod = true;
        },
        getTemplate(val) {
            if (val.smsType == '10') {
                this.ishy = true
                this.istype = false
                this.isyx = false
                this.params.smstype = '';
            } else if (val.smsType == '11') {
                this.isyx = true
                this.istype = false
                this.ishy = false
                this.params.smstype = '5';
            }
            this.sign = val.sign;
            this.params.content = val.content;
            this.isShowSelect = false;
        },
        getChargeNum(obj) {
            let params = obj || this.params;
            let mobileStr = params.mobile,
                content = params.content,
                sign = this.sign;
            let charge = 0,
                mobileArr = mobileStr.split(","),
                mobilecount = mobileArr.length;


            var mobileRes = JSMS.getMobileInfo(mobileStr);
            this.mobile = mobileRes;
            if (mobileArr[mobilecount - 1] == "") {
                this.mobilecount = mobilecount - 1;
            } else {
                this.mobilecount = mobilecount;
            }
            let letterLength = content.length + sign.length + 2;
            if (letterLength <= 70) {
                charge = 1;
            } else {
                charge = Math.ceil(letterLength / 67);
            }

            return parseInt(charge * mobilecount);
        },
        getUser() {
            let params = {};
            utils.post('/send/getclients').then(res => {
                let _options = [];
                for (var i = 0; i < res.data.length; i++) {
                    _options[i] = {};
                    _options[i].value = res.data[i].clientid;
                    _options[i].label = res.data[i].clientid + "-" + res.data[i].name;
                }
                this.options = _options
            }).catch(res => {

            })
        },
        close() {
            this.showMask = false
        },
        sending() {
            let _params = {},
                importFilePath;
            this.clearMobile();
            if (this.sign.length > 8 || this.sign.length < 2) {
                this.$message.error("签名长度为2-8之间");
                return;
            }
            if (this.params.content.length == 0 && this.importMode == 0) {
                this.$message.error("短信内容不能为空");
                return;
            }
            if (this.params.mobile.length == 0 && this.importMode == 0) {
                this.$message.error("号码池不能为空");
                return;
            }
            if (this.importMode == 0) {
                let mobileArr = this.params.mobile.split(",");
                for (let i = 0; i < mobileArr.length; i++) {
                    if (!/^(00\d{8,18})|(13\d{9})|(14[5|7|9]\d{8})|(15[0|1|2|3|5|6|7|8|9]\d{8})|(170[0|1|2|3|4|5|6|7|8|9]\d{7})|(17[1|5|6|7|8]\d{8})|(173\d{8})|(18\d{9})(?=,|$)$/.test(mobileArr[i])) {
                        this.$message.error("手机号码验证不正确");
                        return;
                    }
                }
            }
            //批量导入校验文件是否上传
            if (this.importMode == 1 && this.fileInfo.url == "") {
                this.$message.error("请先上传号码");
                return;
            }
            //批量导入校验文件有效号码个数
            if (this.importMode == 1 && this.fileMobile.submitTotal == 0) {
                this.$message.error("导入文件的有效号码个数为0");
                return;
            }
            _params.clientId = this.params.clientId;
            _params.content = "【" + this.sign + "】" + this.params.content;
            _params.smstype = this.params.smstype;
            if (this.importMode == 0) {
                //手动输入模式
                _params.mobile = this.params.mobile;
                importFilePath = '';
            } else {
                //批量导入发送
                _params.mobile = '';
                importFilePath = this.fileInfo.url;
            }
            let sendParams = {};
            sendParams = this.params;

            if (this.importMode == 1) {
                sendParams.fileType = this.fileInfo.ext;
            } else {
                sendParams.fileType = 0;
            }

            sendParams.importFilePath = importFilePath;
            sendParams.sign = this.sign;
            sendParams.chargeNum = this.charge;
            if(this.submit_flag){
                return;
            }
            if (this.timer) {
                this.$message("3秒内不可重复提交");
                return;
            }
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.submit_flag = true;
                utils.post("/send/sending", sendParams).then(res => {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                    if (this.importMode == 1) {
                        this.clearUploadFile();
                    }

                    this.submit_flag = false;
                    for (var k in this.params) {
                        this.params[k] = ''
                    }
                    this.sign = '';
                    this.$router.push("/customer/deliverlayout/deliver/smstask");
                }, res => {
                    this.submit_flag = false;
                    this.$message.error(res.msg);
                    clearInterval(this.timer);
                    this.timer = null;
                })
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000)
            }


        }
    },
    computed: {
        cer_info: function () {
            return this.$store.getters.cer_info;
        }
    },
    components: {
        'selectTemplate': (resolve) => {
            require(['@/components/SelectTemplate/SelectTemplate.vue'], resolve)
        },
        'DownloadTemp': (resolve) => {
            require(['@/components/DownloadTemp/DownloadTemp.vue'], resolve)
        }
    },
}
