<template lang="pug">
    div.page-Reply
        div.head-tips.ml20.mr20.mt20 
            span.ml10 只显示近三个月内记录
        a(href="javascript:;", v-on:click="exportReport").btn.btn-md.btn-green.ml20.mt20 下载报表   
        div.head.ml20.mr20.mt20 
            span.ml10 回复列表     
        div.clearfix.search-box
                div.sand-box.fl
                    span.fl  
                        //- span.bt-star *
                        | &nbsp;&nbsp;&nbsp;子账户：
                    el-select.fl.border.sel(
                        v-model="params.clientid",
                        placeholder="输入搜索",
                        filterable
                    )
                        el-option(
                            v-for="item in options",
                            :key="item.value",
                            :label="item.label",
                            :value="item.value"
                        )
                    div.clearfix                  
                        span.fl.ml30 回复时间：
                        el-date-picker.input-datepicker.fl.border(v-model="startTime",:editable='editable', type="datetime", placeholder="请选择开始时间", align="right", :picker-options="pickerOptions0", @change="changeStartDay")
                        span.fl.p-5 至
                        el-date-picker.input-datepicker.fl.border(v-model="endTime",:editable='editable',type="datetime", placeholder="结束日期", :picker-options="pickerOptions1", @change="changeEndDay")
                .clearfix.fl.seach-box2
                    el-input.fl.border.sel.sendCont.ml15(
                        v-model="params.phone",
                        placeholder="手机号码"
                    )
                    el-input.fl.border.sel.sendCt.ml30(
                        v-model="params.searchContent",
                        placeholder="发送内容"                        
                    )       
                    a(href="javascript:;", v-on:click="getmologs(1)").btn.btn-md.btn-green.search-btn.fl.ml10 查询
        .p-20
            el-table(:data="list", style="width:100%")
                el-table-column(prop="rowNum", label="序号", width="50")
                el-table-column(prop="phone", label="手机号")
                el-table-column(prop="content", label="回复内容")
                el-table-column(prop="receivedateStr", label="回复时间")
        .p20.tx-c(v-if="totalCount > 1")
            el-pagination( @current-change="handleCurrentChange", layout="prev, pager, next, jumper",:current-page="currentPage",:total="totalCount", :page-size="pageRowCount" ).grid-pagination                                                         
</template>
<script src="./Reply.controller.js"></script>
<style lang="scss">
@import '../../assets/styles/config.scss';
.page-Reply{
    .head{
        height: 40px;
        font-size: 16px;
        line-height: 40px;
        color: #333333;
        border-bottom: 1px solid #e7e7e7;
        background-color: #f9f9f9;
    }
    .search-box {
        .sand-box{
            min-width: 800px;
        }
    }
    .input-datepicker{
        width:200px !important;
    }
    .head-tips{
        height: 35px;
        font-size: 14px;
        line-height: 35px;
        color: #639e7d;
        border: 1px solid #bae3cc;
        background-color: #f3fff8;
    }
    .sendStatus{
        width: 160px !important;        
    }
    .sendCont{
        width: 248px !important;
    }
    .sendCt{
        width: 427px !important;        
    }
    .seach-box2{
        margin-top:10px;
        min-width: 800px;
    }
    @media screen and (min-width:1858px){
        .seach-box2{
            margin-top:0px;
        }
    }
}

</style>
