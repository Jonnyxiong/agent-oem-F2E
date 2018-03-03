<template lang="pug">
.page-autoTemplate
    div.head-tips.ml20.mr20.mt20 
        span.ml10 短信模板提前报备通过的话，可以极大减少审核和拦截问题，大大提高发送成功率！
    a(href="javascript:;", v-on:click="add").btn.btn-md.ml20.mt20.btn-green 添加模板
    a(href="javascript:;", v-on:click="upload").btn.btn-md.ml10.btn-green 批量导入
    div.head.ml20.mr20.mt20 
        span.ml10 模板列表
    div.search-box
        .clearfix
            .clearfix.fl.mt
                span.fl.title 子账户：
                el-select.fl.border.sel(v-model="params.clientId",placeholder="输入用户账号",filterable)
                    el-option(v-for="item in userAccounts",:key="item.value",:label="item.label",:value="item.value")
            .clearfix.fl.ml10
                span.fl.title &nbsp;模板属性：
                el-select.fl.border.sel(v-model="params.smsType",placeholder="请选择", )
                    el-option(v-for="item in property",:key="item.value",:label="item.label",:value="item.value")
            .clearfix.fl.grid-sel.ml10
                span.fl.title &nbsp;审核状态：
                el-select.fl.border.sel(v-model="params.state",placeholder="请选择",)
                    el-option(v-for="item in audit",:key="item.value",:label="item.label",:value="item.value")
            .clearfix.fl.ml10
                span.fl.title &nbsp;模板类型：
                el-select.fl.border.sel(v-model="params.templateType",placeholder="请选择")
                    el-option(v-for="item in type",:key="item.value",:label="item.label",:value="item.value")
            //- .clearfix.mb10
            //-     .clearfix.fl            
            //-         span.fl.title 模板ID：
            //-         input.input.input-md.fr.sel(type="text", placeholder="请输入模板ID" @keyup.enter="", v-model="params.templateId")
            //-     .clearfix.fl            
            //-         span.fl.title &nbsp;&nbsp;签名：
            //-         input.input.input-md.fr.sel(type="text", placeholder="签名" @keyup.enter="", v-model="params.sign")
            //-     .clearfix.fl.mt            
            //-         span.fl.title &nbsp;模板内容：
            //-         input.input.input-md.fr.sel(type="text", placeholder="内容" @keyup.enter="", v-model="params.content")
            .datepicker.clearfix
                span.fl.title.ml10 创建时间：
                el-date-picker.input-datepicker.fl.border(v-model="startTime", type="daterange", placeholder="开始时间-结束时间", @change="changeStartDay")                
                //- el-date-picker.input-datepicker.fl.border(v-model="startTime", type="daterange", placeholder="请选择开始时间", :picker-options="pickerOptions0", @change="changeStartDay")
                //- span.fl.p-5 至
                //- el-date-picker.input-datepicker.fl.border(v-model="endTime", type="date", placeholder="请选择结束时间", :picker-options="pickerOptions1", @change="changeEndDay")
                a(href="javascript:;", v-on:click="getIntelligentList(1)").btn.btn-md.search-btn.ml10.fr.btn-green 查询
                //- a(href="javascript:;", v-on:click="reload").btn.btn-md.fl.ml10.btn-green-block 重置   
    div.p-20
        el-table(:data="intelligent_list.entityList", style="width:100%", v-loading="loading")
            el-table-column(prop="orderNo", label="序号",width="30")
            el-table-column(prop="templateId", label="模板ID")
            el-table-column(prop="clientId", label="子账户")
            el-table-column(prop="smsType", label="模板属性")
                template(scope="scope")
                    span(v-if="scope.row.smsType == 10") 行业
                    span(v-if="scope.row.smsType == 11") 营销
            el-table-column(prop="templateType", label="模板类型")
                template(scope="scope")
                    span(v-if="scope.row.templateType == 0") 固定模板
                    span(v-if="scope.row.templateType == 1") 变量模板
            el-table-column(prop="content", label="模板内容",min-width="240")
            el-table-column(prop="sign", label="短信签名")
            el-table-column(prop="userName", label="创建者")
            el-table-column(prop="createTimeStr", label="创建时间", min-width="180")
            el-table-column(prop="state", label="审核状态")
                template(scope="scope")
                    span(v-if="scope.row.state == 0") 待审核
                    span(v-if="scope.row.state == 1") 审核通过
                    span(v-if="scope.row.state == 3") 审核不通过
            el-table-column(prop="remark", label="原因")
            el-table-column(label="操作", fixed = "right")
                template(scope="scope")
                    a(href="javascript:;", v-if="scope.row.isCreateor == 1",v-on:click="edit(scope.row.templateId,scope.row.state)").link-green.ml10 编辑
                    a(href="javascript:;", v-if="scope.row.isCreateor == 1",v-on:click="del(scope.row.templateId)").link-green.ml10 删除
        div.p20.tx-c(v-if="intelligent_list.totalCount > 0")
            el-pagination( @current-change="handleCurrentChange", layout="prev, pager, next, jumper",:current-page="intelligent_list.currentPage",:total="intelligent_list.totalCount", :page-size="intelligent_list.pageRowCount" ).grid-pagination     
                                                 
    autoTemplate(v-on:refresh="getIntelligentList", v-on:goBack="close",v-if="isShowAddTemplate",:id="templateId",:name="showAddTemplateTitle",:status="status")          
    importFile(v-on:refresh="getIntelligentList", v-on:goBack="closeImport",v-if="isShowImport") 
    el-dialog(title="提示",v-model="dialogVisible",size="tiny")
        span 确认删除模板{{templateId}}
        span(slot="footer",class="dialog-footer")
            el-button(@click="dialogVisible = false") 取 消
            el-button(type="success",@click="delTemplate") 确 定

</template>
<script src="./Intelligent.controller.js"></script>
<style lang="scss">
@import '../../assets/styles/config.scss';

.page-autoTemplate{
     .record-head{
            background-color: $green;
            display: block;
            width: 128px;
            height: 45px;
            line-height: 45px;
            text-align: center;
            color: #fff;
    }
    .sel{
        width:120px;
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
        .title{
            width:74px;
        }
        .btn{
            width:70px;
            padding:0;
        }
    }
}

</style>
