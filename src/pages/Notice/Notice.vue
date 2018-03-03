<template lang="pug">
    div.page-notice
        .p-20.mt10
            .clearfix.grid-list-head
                .active.grid-tab.fl 公告列表
        .clearfix.search-box
            input.input.input-md.input-box(type="text", placeholder="请输入消息内容", v-model="condition", v-on:keyup.enter="getNoticeList(1)")
            a(href="javascript:;", v-on:click="getNoticeList(1)").btn.btn-md.btn-green.search-btn.ml10 查询             
        .p-20
            el-table(:data="notice_list.data", style="width:100%", v-bind:show-header="false", v-loading="loading",@row-click="openDetails")
                el-table-column(prop="noticeName", label="标题",min-width=20)
                el-table-column(prop="noticeContent",label="内容",min-width=60)
                    template(scope="scope")
                        span(v-html='scope.row.noticeContent')
                el-table-column(prop="releaseTime", label="时间",min-width=20,align='right')
        div.p20.tx-c(v-if="notice_list.totalPage != 1")
            el-pagination( @current-change="handleCurrentChange", layout="prev, pager, next, jumper",:current-page="notice_list.currentPage",:total="notice_list.totalRecord", :page-size="notice_list.pageRowCount" ).grid-pagination
</template>
<script src="./Notice.controller.js"></script>
<style lang="scss">
@import '../../assets/styles/config.scss';
.page-notice{
    .msgContent{
        width: 250px;
    }
    .grid-tab{
        width:100px;
    }
    .input-box{
        width:250px;
    }
    .search-btn{
        width:80px;
    }
    .el-table{
        &:hover{
            cursor: pointer;
        }
        tr{
            &:hover{
                font-size: 16px;
                color: #000;
                font-weight: 700;
            }
            td{
                >div {
                    padding-left: 10px !important;
                    text-align: left !important;
                }
            }
            td.is-right{
                >div {
                    padding-right: 10px !important;
                    text-align: right !important;
                }
            }
        }
        
    }
}
</style>