<template lang="pug">
    div
        div.clearfix.search-box
            a(href="javascript:;", v-on:click="getInternationalList('1')" ).btn.btn-green.btn-md.fr 搜索
            input.input.input-md.fr(type="text",placeholder="英文/中文/国际代码", v-model="condition", v-on:keyup.enter="getInternationalList('1')" )
        .p-20
            el-table(:data="international_list.list", style="width:100%", v-loading="loading")
                el-table-column(prop="rownum", label="序号", width="55")
                el-table-column(prop="intername", label="国际名称", width="260")
                el-table-column(prop="areaname", label="中文名称", width="110")
                el-table-column(prop="prefix", label="国际代码", width="175")
                el-table-column(prop="intercode", label="国际简码", width="190")
                el-table-column(prop="fee", label="国际价格(元)")
        div.p20.tx-c(v-if="international_list.totalPage != 1")
            el-pagination( @current-change="handleCurrentChange", layout="prev, pager, next, jumper",:current-page="international_list.currentPage",:total="international_list.totalCount", :page-size="international_list.pageRowCount" ).grid-pagination
</template> 
<script src="./International.controller.js"></script>
<style scoped lang="scss">
input{
    width:230px;
    margin-right:10px;
    display: inline-block;
}
.btn{
    display: inline-block;
    width:77px;
}
</style>

