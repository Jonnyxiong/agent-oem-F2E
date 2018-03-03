<template lang="pug">
.page-timingdeliver
    div.search-box.clearfix
        .clearfix.fl.mb10
            .clearfix.fl.item
                span.fl.title 发送账户：
                el-select.fl.border.sel(v-model="params.clientId",placeholder="请选择")
                    el-option(v-for="item in clients",:key="item.value",:label="item.label",:value="item.value")
            .clearfix.fl.item  
                span.fl.title 任务状态：
                el-select.fl.border.sel(v-model="params.status",placeholder="请选择")
                    el-option(v-for="item in status",:key="item.value",:label="item.label",:value="item.value")     
            .clearfix.fl.datepicker
                span.fl.title 时间范围：
                el-select.fl.border.sel(v-model="params.selectTimeFlag",placeholder="请选择")
                    el-option(v-for="item in property",:key="item.value",:label="item.label",:value="item.value")                 
                el-date-picker.input-datepicker.fl.ml10.border.time(v-model="startTime", :clearable="false",type="datetimerange",range-separator="~", placeholder="开始时间-结束时间", @change="changeStartDay")  
        .clearfix.fl.mb10 
            .clearfix.fl.item
                span.fl.title 任务ID：
                input.fl.input-md.input(
                        type="text",
                        v-model="params.taskId",
                        placeholder="任务ID"
                    )    
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
                a(href="javascript:;", v-on:click="getTimeDeliverList(1)").btn.btn-md.search-btn.ml20.btn-green 查询 
    div.p-20
        el-table(:data="timesender_list.data", style="width:100%", v-loading="loading")
            el-table-column(prop="rowNum", label="序号",width="40")
            el-table-column(prop="taskId", label="任务ID",min-width="120")
            el-table-column(prop="clientid", label="发送账号")
            el-table-column(prop="chargeNumTotal", label="总计费数")
            el-table-column(prop="submitTimeStr", label="创建时间",min-width="140")
            el-table-column(prop="setSendTimeStr", label="发送时间", min-width="140")
            el-table-column(prop="smstypeStr", label="短信类型")
            el-table-column(prop="sign", label="短信签名")
            el-table-column(prop="content", label="短信内容",min-width='450')
                template(scope="scope")
                    div(v-on:click="showCont(scope.row.content)").content.ellipsis {{scope.row.content}}
            el-table-column(prop="statusStr", label="任务状态",min-width='80')
            el-table-column(prop="creator", label="创建者",min-width='80')
            el-table-column(label="操作", fixed = "right",width="160")
                template(scope="scope")
                    a(href="javascript:;",v-on:click="getTaskMobile(scope.row.taskId, scope.row.submitTimeStr)",v-if="scope.row.getAllPhoneFlag == 1").link-green.ml10 查看号码
                    a(href="javascript:;",v-on:click="cancelSend(scope.row.taskId, scope.row.setSendTimeStr)", v-if="scope.row.cancelFlag == 1").link-green.ml10 取消发送
                    a(href="javascript:;",v-on:click="edit(scope.row.taskId)", v-if="scope.row.updateFlag == 1").link-green.ml10 重新编辑

        div.p20.tx-c(v-if="timesender_list.totalPage > 0")
            el-pagination( @current-change="handleCurrentChange", layout="prev, pager, next, jumper",:current-page="timesender_list.page",:total="timesender_list.totalRecord", :page-size="timesender_list.rows" ).grid-pagination     
    SearchPhone(v-on:goBack="closeSearchPhone",:mobile="taskMobile",v-if="showSearchPhone")
    CopySms(v-if="openContCopy", :cont="smscont", v-on:goBack="closeContCopy")
</template>
<script src="./TimingDeliver.controller.js"></script>
<style lang="scss">
@import '../../assets/styles/config.scss';

.page-timingdeliver{
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
        padding-bottom:0;
        .title{
            width:74px;
        }
        .btn{
            width:70px;
            padding:0;
        }
        .item{
            width:280px;
        }
        .input{
            width:140px;
        }
        .sel{
            width:140px;
        }
        .cont{
            width:200px;
        }
        .datepicker{
            width:580px;
        }
        .time{
            width:330px;
        }
    }
    .content{
        
    }
}

</style>
