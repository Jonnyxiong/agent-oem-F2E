<template lang="pug">
div.mask
    div.mask-ctx
        div.mask-header 模板类型
            span.fa.fa-close(v-on:click="goBack")
        .ctx
            .clearfix.grid-list-head
                a(href="javascript:;", v-bind:class="{active:!isShowGeneral }", v-on:click="switchAuto").grid-tab.fl 智能模板
                a(href="javascript:;", v-bind:class="{active:isShowGeneral }", v-on:click="switchGeneral").grid-tab.fl 通用模板
            div(v-show="!isShowGeneral")
                .search-box.clearfix
                    span.fl.title 模板类型：
                    el-select.border.smsTypeOption.sel.fl(v-model='autoParams.templateType')
                        el-option(v-for="item in typeOption",:key="item.value",:label="item.label",:value="item.value")
                    span.fl.title.ml10 模板内容：
                    input.input.input-md.content.fl(v-model="autoParams.applicationScenarios",placeholder="模板ID/签名/内容",type="text"  )
                    a(href="javascript:;", v-on:click="getAutoTempList(1)").btn.btn-md.search-btn.ml10.fl.btn-green 查询
                el-table(:data="aotoTemplist.data", style="width:100%")
                    el-table-column(prop="templateId", label="模板ID")
                    el-table-column(prop="sign", label="短信签名")
                    el-table-column(prop="smsType", label="模板属性")
                        template(scope="scope")
                            span(v-if="scope.row.smsType == 10") 行业
                            span(v-if="scope.row.smsType == 11") 会员营销
                    el-table-column(prop="templateType", label="模板类型")
                        template(scope="scope")
                            span(v-if="scope.row.templateType == 0") 固定模板
                            span(v-if="scope.row.templateType == 1") 变量模板
                    el-table-column(prop="content", label="模板内容",width='240')
                    el-table-column( label="操作")
                        template(scope="scope")
                            a(href="javascript:;",v-on:click="importContent(scope.row.smsType,scope.row.sign,scope.row.content)").link-green.ml10 导入     
                div.tx-c.mt10(v-if="aotoTemplist.totalPage > 1")
                    el-pagination( @current-change="autoTempPageChange", layout="prev, pager, next, jumper",:current-page="aotoTemplist.page",:total="aotoTemplist.totalRecord", :page-size="aotoTemplist.rows" ).grid-pagination
            div(v-show="isShowGeneral")
                .search-box.clearfix
                    span.fl.title 模板属性：
                    el-select.border.smsTypeOption.fl.sel(v-model='generalParams.smsType')
                        el-option(v-for="item in temolateAttribute",:key="item.value",:label="item.label",:value="item.value")
                    span.fl.title.ml10 模板内容：
                    input.input.input-md.content.fl(v-model="generalParams.content",placeholder="模板内容",type="text"  )
                    a(href="javascript:;", v-on:click="getGeneralTempList(1)").btn.btn-md.search-btn.ml10.fl.btn-green 查询
                el-table(:data="generalTempList.data", style="width:660px")
                    el-table-column(prop="smsType", label="模板属性",width="100")
                        template(scope="scope")
                            span(v-if="scope.row.smsType == 10") 行业
                            span(v-if="scope.row.smsType == 11") 会员营销
                    el-table-column(prop="templateType", label="模板类型",width="100")
                        template(scope="scope")
                            span(v-if="scope.row.templateType == 0") 固定模板
                            span(v-if="scope.row.templateType == 1") 变量模板
                    el-table-column(prop="content", label="模板内容")
                    el-table-column( label="操作",width="100")
                        template(scope="scope")
                            a(href="javascript:;",v-on:click="importContent(scope.row.smsType,'',scope.row.content)").link-green.ml10 导入     
                div.tx-c.mt10(v-if="generalTempList.totalPage > 1")
                    el-pagination( @current-change="generalTempPageChange", layout="prev, pager, next, jumper",:current-page="generalTempList.page",:total="generalTempList.totalRecord", :page-size="generalTempList.rows" ).grid-pagination                             
</template>
<script src="./SelectTemplate.controller.js"></script>
<style lang="scss" scoped>

.mask{
    // z-index: 9999;
    .mask-ctx{
        width:700px;
        height: 540px;
        overflow: auto;
        .title{
            height: 32px;
            line-height: 32px;
        }
        .ctx{
            padding:10px 20px;
        }
        .search-box{
            padding-left:0;
            padding-right:0;
            .content{
                width:240px;
            }
            .sel{
                width:100px;
            }
        }
    }
}
</style>