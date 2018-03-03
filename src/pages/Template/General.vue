<template lang="pug">
.page-autoTemplate
    div.head-tips.ml20.mr20.mt20 
        span.ml10 通用模板直接使用可快速通过，如果存在签名违规则会拦截！
    div.head.ml20.mr20.mt20 
        span.ml10 模板列表
    div.search-box.clearfix
        span.fl.title 模板属性：
        el-select.fl.border.sel(v-model="params.smsType",placeholder="请选择", )
            el-option(v-for="item in property",:key="item.value",:label="item.label",:value="item.value")
        span.fl.title.ml10 模板类型：
        el-select.fl.border.sel(v-model="params.templateType",placeholder="请选择")
            el-option(v-for="item in type",:key="item.value",:label="item.label",:value="item.value")
        span.fl.title.ml10 模板内容：
        input.input.input-md.fl.content(type="text", placeholder="内容" @keyup.enter="getIntelligentList(1)", v-model="params.content")
        a(href="javascript:;",v-on:click="getIntelligentList(1)").btn.btn-green.btn-md.ml10 查询
    div.p-20
        el-table(:data="general_list.entityList", style="width:100%", v-loading="loading")
            el-table-column(prop="orderNo", label="序号",width="55")
            el-table-column(prop="smsType", label="模板属性",width="100")
                template(scope="scope")
                    span(v-if="scope.row.smsType == 10") 行业
                    span(v-if="scope.row.smsType == 11") 会员营销
            el-table-column(prop="templateType", label="模板类型",width="100")
                template(scope="scope")
                    span(v-if="scope.row.templateType == 0") 固定模板
                    span(v-if="scope.row.templateType == 1") 变量模板
            el-table-column(prop="content", label="模板内容")
        div.p20.tx-c(v-if="general_list.totalCount > 0")
            el-pagination( @current-change="handleCurrentChange", layout="prev, pager, next, jumper",:current-page="general_list.currentPage",:total="general_list.totalCount", :page-size="general_list.pageRowCount" ).grid-pagination     
</template>
<script src="./General.controller.js"></script>
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
        .content{
            width:400px;
        }
    }
}

</style>
