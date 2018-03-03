<template lang="pug">
    div.deliver
        div.test-body.ml10 
            span.bt-star *
            span &nbsp;子&nbsp;&nbsp;账&nbsp;&nbsp;号:&nbsp;&nbsp;
                el-select.border.sel.mb15(
                                v-model="params.clientid",
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
                div.fl
                    span.bt-star *            
                    span 号&nbsp;&nbsp;码&nbsp;&nbsp;池:&nbsp;&nbsp;
                .fl
                    el-input.sms-textarea(
                                type="textarea",
                                :rows="10",
                                placeholder="例如：18889462200,16656208020；以“,”号分隔",
                                v-model="params.mobile") 
                .fl.ml10
                    div
                        a(href="javascript:;" v-on:click="upload").btn.btn-md.btn-green.bk 批量导入手机号码  
                    div.mt10.mb10
                        a(href="javascript:;" v-on:click="exportReport").btn.btn-md.btn-green-block.bk 下载批量导入模板  
                    div(v-show="mobile.filterNum != 0")
                        a(href="javascript:;" v-on:click="clearMobile").btn.btn-md.btn-green.bk 清除无效格式号码  
            p.ml80.zhushi.mt10 支持批量输入和批量导入，批量输入以","号分隔，批量导入提供导入表模板下载。共计号码
                span.bt-green {{mobile.checkNum}}
                | 个，格式有效号码：
                span.bt-green {{mobile.validNum}}
                | 个，格式无效号码：
                span.bt-green.bt-red {{mobile.filterNum}}
                | 个。
            .clearfix.mt10
                span.fff **
                span 选择模板：
                a(href="javascript:;" v-on:click="selectTemplate").btn.btn-lg.btn-green.search-btn 报备模板
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
                    div(style="font-size:12px;")
                        span 短信拆分条数: 
                            span.bt-green {{charge.smsNum}} 
                            | 条
                    //- span.sign
                    //-     span 【
                    //-     span {{sign}}
                    //-     span 】
            .clearfix.mt10
                span.bt-star *            
                span 发送时间：
                    el-radio(v-model="timeSend" ,label="1") 定时发送 
                    el-date-picker.border.ml10(v-show="timeSend == 1",format="yyyy-MM-dd HH:mm:ss",v-model="sendtime.time",:editable="false", type="datetime", placeholder="请选择开始时间", align="right", @change="changeSendTime", :picker-options="pickerOptions") 
            .clearfix          
                a(href="javascript:;" v-on:click="sending").btn.btn-lg.btn-green.search-btn.ml80.mt20 发送
                span.ml20 总计费条数：
                span.bt-green {{charge.chargeNum}}
                span 条
                p.zhushi.ml80.mt10 签名长度范围2-8个字符，模板内容字符范围5-500字符
            selectTemplate(v-on:refresh="getTemplate", v-on:goBack="closeSelect",v-if="isShowSelect",:clientId="params.clientid")      
            importFile(v-on:refresh="getmobileList",v-on:goBack="closeImport",v-if="isShowImport") 
</template>
<script src="./Timesend.controller.js"></script>
<style lang="scss">
@import '../../assets/styles/config.scss';
.deliver{
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
    }
    .sign{
        position: absolute;
        left: 82px;
        top: 8px;
    }
    
}
</style>

