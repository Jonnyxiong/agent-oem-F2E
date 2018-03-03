<template lang="pug">
.page-smsTask
    div.head-tips.ml20.mr20.mt10 
        span.ml10 当批量号码数量较大时，发送进度将可能缓慢，请耐心等待！
    div.search-box.clearfix
        .clearfix.fl.mb10
            .clearfix.fl.item.mt10
                span.fl.title 发送账户：
                el-select.fl.border.sel(v-model="params.clientId",placeholder="请选择")
                    el-option(v-for="item in clients",:key="item.value",:label="item.label",:value="item.value")
            .clearfix.fl.item.mt10
                span.fl.title 任务ID：
                input.fl.input-md.input(
                        type="text",
                        v-model="params.id",
                        placeholder="任务ID"
                    ) 
            .clearfix.fl.item.mt10
                span.fl.title 创建者：
                input.fl.input-md.input(
                        type="text",
                        v-model="params.creater",
                        placeholder="创建者"
                    )    
            .clearfix.fl.datepicker.mt10
                span.fl.title 创建时间：      
                el-date-picker.input-datepicker.fl.ml10.border.time(v-model="startTime", :clearable="false",type="datetimerange",range-separator="~", placeholder="开始时间-结束时间", @change="changeStartDay")  
        .clearfix.fl.mb10 
            .clearfix.fl.item
                span.fl.title 短信类型：
                el-select.fl.border.sel(v-model="params.smstype",placeholder="请选择")
                    el-option(v-for="item in smstype",:key="item.value",:label="item.label",:value="item.value")  
            .clearfix.fl.item
                span.fl.title 短信签名：
                input.fl.input.input-md(
                        type="text",
                        v-model="params.sign",
                        placeholder="短信签名"
                    )    
            .clearfix.fl
                span.fl.title 发送内容：
                input.fl.input.input-md.cont(
                        type="text",
                        v-model="params.content",
                        placeholder="发送内容"
                    )         
                a(href="javascript:;", v-on:click="getTimeDeliverList(1)").btn.btn-md.search-btn.ml10.btn-green 查询 
    div.p-20
        el-table(:data="smstask_list.data", style="width:100%")
            el-table-column(prop="rowNum", label="序号",width="40")
            el-table-column(prop="id", label="任务ID",min-width="120")
            el-table-column(prop="clientId", label="发送账户")
            el-table-column(prop="chargeNumTotal", label="总计费数")
            el-table-column(prop="createTimeStr", label="创建时间",min-width="140")
            el-table-column(prop="smstypeStr", label="短信类型")
            el-table-column(prop="sign", label="短信签名")
            el-table-column(prop="content", label="短信内容",min-width='450')
                template(scope="scope")
                    div(v-on:click="showCont(scope.row.content)").content.ellipsis {{scope.row.content}}
            el-table-column(prop="statusStr", label="任务进度",width='180')
                template(scope="scope")
                    div.p-10
                        div.progress.tx-c
                            span {{scope.row.taskSchedule}} %
                            .bar(v-bind:style="{width:scope.row.taskSchedule + '%'}") 
            el-table-column(prop="creator", label="创建者",min-width='80')
        div.p20.tx-c(v-if="smstask_list.totalPage > 1")
            el-pagination( @current-change="handleCurrentChange", layout="prev, pager, next, jumper",:current-page="smstask_list.page",:total="smstask_list.totalRecord", :page-size="smstask_list.rows" ).grid-pagination     
    SearchPhone(v-on:goBack="closeSearchPhone",:mobile="taskMobile",v-if="showSearchPhone")
    CopySms(v-if="openContCopy", :cont="smscont", v-on:goBack="closeContCopy")
</template>
<script src="./SmsTask.controller.js"></script>
<style lang="scss">
@import '../../assets/styles/config.scss';

.page-smsTask{
    .record-head{
            background-color: $green;
            display: block;
            width: 128px;
            height: 45px;
            line-height: 45px;
            text-align: center;
            color: #fff;
    }
    .head-tips{
        height: 35px;
        font-size: 14px;
        line-height: 35px;
        color: #639e7d;
        border: 1px solid #bae3cc;
        background-color: #f3fff8;
    }
    .head{
        height: 40px;
        font-size: 16px;
        line-height: 40px;
        color: #333333;
        border-bottom: 1px solid #e7e7e7;
        background-color: #f9f9f9;
    }
    .search-box{
        padding-top:0;
        padding-bottom:0;
        .title{
           width:74px;
           text-align: right;
        }
        .btn{
            width:70px;
            padding:0;
        }
        .item{
            width:220px;
        }
        .input{
            width:140px;
        }
        .sel{
            width:140px;
        }
        .cont{
            width:420px;
        }
        .datepicker{
            width:500px;
        }
        .time{
            width:330px;
        }
    }
    .content{
        
    }
    .progress{
        position: relative;
        height:20px;
        line-height: 20px;
        border-radius: 10px;
        border:1px solid $btn-green;
        overflow: hidden;
        span{
            color:#666;
            z-index:10;
            position: relative;
        }
        .bar{
            position: absolute;
            border-radius: 10px;
            top:0;
            left:0;
            width:0;
            height:100%;
            z-index:1;
            background-color:$btn-green;
        }
    }
}

</style>