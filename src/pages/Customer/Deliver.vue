<template lang="pug">
    div.deliver
        div.test-body.ml10 
            span.bt-star *
            span &nbsp;子&nbsp;&nbsp;账&nbsp;&nbsp;号:&nbsp;&nbsp;
                el-select.border.sel.mb15(
                                v-model="params.clientId",
                                placeholder="可输入搜索",
                                filterable
                             )
                     el-option(
                         v-for="item in options",
                         :key="item.value"
                         :label="item.label",
                         :value="item.value"
                     )
            .clearfix.relative
                .fl
                    span.bt-star *            
                    span 号&nbsp;&nbsp;码&nbsp;&nbsp;池:&nbsp;&nbsp;
                .fl
                    div.mb10
                        el-radio-group(v-model="importMode")
                            el-radio(:label="1") 批量导入
                            el-radio(:label="0") 手动输入
                    div(v-show="importMode == 0")
                        div.clearfix
                            .fl
                                el-input.sms-textarea(
                                    type="textarea",
                                    :rows="10",
                                    placeholder="例如：18889462200,16656208020；以“,”号分隔",
                                    v-model="params.mobile")  
                            .fl.ml10(v-if="mobile.filterNum != 0")
                                a(href="javascript:;",v-on:click="clearMobile").btn.btn-md.btn-green 清除无效号码 
                        p.zhushi.mt10 支持批量输入和批量导入，批量输入以","号分隔，批量导入提供导入表模板下载。
                            span 共计号码
                            span.bt-green {{mobile.checkNum}}
                            span 个，格式有效号码：
                            span.bt-green {{mobile.validNum}}
                            | 个，格式无效号码：
                            span.bt-green.bt-red {{mobile.filterNum}}
                            | 个。
                    div(v-show="importMode == 1")
                        div.clearfix.fileResult(v-show="isUploadSuccess").mb20
                            a(href="javascript:;",v-on:click="downloadUploadFile").link-green.underline.fl.mr10 {{fileInfo.params.fileName}}
                            a(href="javascript:;",v-on:click="beforeClearUploadFile").btn.btn-md.btn-green-block.fl.mr10 删除
                            p.zhushi.fl(v-show="isFileResolve") 共计号码数：
                                span.bt-green {{fileMobile.submitTotal + fileMobile.repeatNum + fileMobile.errNum}}
                                | 个，格式有效号码：
                                span.bt-green {{fileMobile.submitTotal}} 
                                | 个，已过滤错误号码：
                                span.bt-green.bt-red {{fileMobile.errNum + fileMobile.repeatNum}} 
                                | 个
                        div.mb20.clearfix(v-show="!isUploadSuccess")
                            div#uploader-demo.fl
                                div#fileList.uploader-list
                                div#filePicker 批量导入手机号码  
                            div.fl(style="line-height:33px;font-size:12px").ml10.link-red 请优先选择txt或csv模板
                        div.mb20
                            a(href="javascript:;" v-on:click="openDownload").btn.btn-md.btn-green 下载批量导入模板 
            
            .clearfix.mt10
                span.fff **
                span 选择模板：
                a(href="javascript:;" v-on:click="selectTemplate").btn.btn-md.btn-green.search-btn 选择模板
            .clearfix.mt10
                span.bt-star *   
                span 短信类型：
                el-select.border.sel.mb15(
                                v-model="params.smstype",
                                placeholder="请选择",
                                v-if='istype'                                
                             )
                    el-option(
                        v-for="item in smstypes",
                        :key="item.value"
                        :label="item.label",
                        :value="item.value"
                    )
                el-select.border.sel.mb15(
                                v-model="params.smstype",
                                placeholder="请选择",
                                v-if='ishy'
                             )
                    el-option(
                        v-for="item in hysmstypes",
                        :key="item.value"
                        :label="item.label",
                        :value="item.value"
                    )
                el-select.border.sel.mb15(
                                v-model="params.smstype",
                                placeholder="请选择",
                                v-if='isyx'
                             )
                     el-option(
                         v-for="item in yxsmstypes",
                         :key="item.value"
                         :label="item.label",
                         :value="item.value"
                     )
            .clearfix.mt10
                .fl
                    span.bt-star *               
                    span 短信签名：
                .fl
                    el-input.border.sel(
                            v-model="sign",
                            placeholder="长度范围2-8个字符"
                        )  
                    span.zhushi.ml10 例如：【云之讯】
            .clearfix.mt10
                .fl
                    span.bt-star *            
                    span.relative 短信内容：
                .fl
                    el-input.sms-textarea(
                             type="textarea",
                             :rows="10",
                             placeholder="不得超过500个字符",
                             v-model="params.content")
                    //- div(style="font-size:12px;")
                    //-     span 短信拆分条数: 
                    //-         span.bt-green {{charge.smsNum}} 
                    //-         | 条
                    //- span.sign
                    //-     span 【
                    //-     span {{sign}}
                    //-     span 】
            //- 先隐藏在下个版本做 
            //- .clearfix.mt10
            //-     span.bt-star *            
            //-     span 发送时间：
            //-         el-radio(v-model="form.smsType" ,label="11") 立即发送
            //-         el-radio(v-model="form.smsType" ,label="10") 定时发送 
            //-             el-date-picker.border.ml10(v-if="form.smsType == 10",format="yyyy-MM-dd HH:mm",v-model="startTime", type="datetime", placeholder="请选择开始时间", align="right", @change="changeStartDay") 
            .clearfix          
                a(href="javascript:;" v-on:click="sending").btn.btn-lg.btn-green.search-btn.ml80.mt20 发送
                span.ml20 总计费条数：
                span.bt-green {{charge}}
                span 条
                p.zhushi.ml80.mt10 签名长度范围2-8个字符，模板内容字符范围5-500字符
        selectTemplate(v-on:refresh="getTemplate", v-on:goBack="closeSelect",v-if="isShowSelect",:clientId="clientId")      
        DownloadTemp(v-on:goBack="closeDownload",v-if="isShowDownlaod")
        div.mask(v-show="isUploading")
            div.mask-ctx.uploadProgress
                div.mask-header 上传附件
                    span.fa.fa-close(v-on:click="closeFileUpload")
                div.ctx(:element-loading-text="fileInfo.uploadTip",element-loading-spinner="el-icon-loading",element-loading-background="rgba(0, 0, 0, 0.8)",v-loading="fileInfo.loadingFile")
                    el-table(:data="fileInfo.data", style="width:100%")
                        el-table-column(prop="name", label="文件名称", width="200")
                            template(scope="scope")
                                div.ellipsis {{scope.row.name}}
                        el-table-column(prop="size", label="文件大小")
                        el-table-column(prop="percent", label="进度/状态",width="180")
                            template(scope="scope")
                                div.p-10
                                    .progress 
                                        span.percent {{scope.row.percent}} %
                                        .bar(v-bind:style="{width: scope.row.percent + '%' }")
                        el-table-column(label="操作")
                            template(scope="scope")
                                a(href="javascript:;",v-on:click="pauseUploadFile", v-if="fileInfo.state == 'uploading'") 暂停
                                a(href="javascript:;",v-on:click="startUploadFile", v-if="fileInfo.state == 'paused'") 继续
                                a(href="javascript:;",v-on:click="delUploadFile").ml20 取消
</template>
<script src="./Deliver.controller.js"></script>
<style lang="scss">
@import '../../assets/styles/config.scss';
.deliver{
    .webuploader-pick{
        padding:8px 12px;
    }
    .test-body{
        padding-left: 25px;
        padding-top: 25px;
        font-size: 15px;
        .sel{
            width: 398px;
        }
        .clearfix{
            .sms-textarea{
                width: 670px;
                vertical-align:top;
            }
            .ml67{
                margin-left: 67px;
            }
        }
                
    }
    .download{
        position: absolute;        
        top: 60px;
        left: 765px;
    }
    .fileResult{
        line-height: 30px;  
        .del{
            width:100px;
        }
    }
    .bt-green{
        color:#00c358;
        font-size: 18px;
        font-weight: 700;
    }
    .bt-red{
        color:#ef0000;
    }
    .zhushi{
        font-size:12px;
        color: #999999;
        font-size:12px;
    }
    .sign{
        position: absolute;
        left: 82px;
        top: 8px;
    }
    .uploadProgress{
        width:680px;
        .ctx{
            padding:20px;
            .progress{
                position: relative;
                text-align: center;
                line-height: 20px;
                height:20px;
                overflow: hidden;
                border-radius: 10px;
                border:1px solid $border-color;
                .percent{
                    position: relative;
                    z-index:10;
                    color:#666;
                }
            }
            .bar{
                z-index:1;
                position: absolute;
                left:0;
                top:0;
                width:0%;
                height: 100%;
                transition: all .3s linear;
                border-radius: 10px;
                background-color: $btn-green;
            }
        }
       
    }
}
</style>

