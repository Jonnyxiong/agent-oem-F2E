<template lang="pug">
.page-customerFinance.p10
    .grid-list-head 
        .grid-tab.active 充值回退
    div.mt20
        a(href="javascript:;", v-on:click="exportReport").btn.btn-lg.btn-green.search-btn 下载报表
    div.mt20
        .grid-table-head 子账户列表
    div.clearfix.search-box
        input.input.input-md.input-box(type="text", placeholder="子账户ID/子账户名称", v-model="params.customerInfo", v-on:keyup.enter="getManagerList(1)")
        a(href="javascript:;", v-on:click="getFinaceList(1)").btn.btn-md.btn-green.search-btn.ml20 查询    
    div
        el-table(:data="finace_list.list", style="width:100%", v-loading="loading")
            el-table-column(prop="rownum", label="序号", min-width="55")
            el-table-column(prop="client_id", label="子账户ID", min-width="65")
            el-table-column(prop="client_name", label="子账户名称", min-width="60")
            el-table-column(prop="status_str", label="账户状态")
                template(scope="scope")
                    span(v-bind:class="[scope.row.status == 5 ? 'link-red' : '' ]") {{scope.row.status_str}}         
            el-table-column(label="行业短信", min-width="140")
                template(scope="scope")
                    a(href="javascript:;",v-on:click="getExpiration(scope.row.client_id, 0)").bk.href-green.link-green
                        | 剩余：{{scope.row.hy_remain_num}}
                    span.link-red.remainTip(v-if="scope.row.hyAlarm == 1") 余额不足
            el-table-column(label="验证码短信", min-width="140")
                template(scope="scope")
                    a(href="javascript:;",v-on:click="getExpiration(scope.row.client_id, 3)").bk.href-green.link-green
                        | 剩余：{{scope.row.co_remain_num}}
                    span.link-red.remainTip(v-if="scope.row.yzmAlarm == 1") 余额不足
            el-table-column(label="通知短信", min-width="140")
                template(scope="scope")
                    a(href="javascript:;",v-on:click="getExpiration(scope.row.client_id, 4)").bk.href-green.link-green
                        | 剩余：{{scope.row.no_remain_num}}
                    span.link-red.remainTip(v-if="scope.row.tzAlarm == 1") 余额不足
            el-table-column(prop="date", label="会员营销短信", min-width="140")
                template(scope="scope")
                    a(href="javascript:;",v-on:click="getExpiration(scope.row.client_id, 1)").bk.href-green.link-green
                        | 剩余：{{scope.row.yx_remain_num}}
                    span.link-red.remainTip(v-if="scope.row.yxAlarm == 1") 余额不足
            el-table-column(prop="date", label="国际短信", min-width="140")
                template(scope="scope")
                    a(href="javascript:;",v-on:click="getExpiration(scope.row.client_id, 2)").bk.href-green.link-green
                        | 剩余：{{scope.row.gj_remain_num}}
                    span.link-red.remainTip(v-if="scope.row.gjAlarm == 1") 余额不足
            el-table-column(label="备注", min-width="160")
                template(scope="scope")
                    a(href="javascript:;", v-on:click="remark(scope.row.client_id, scope.row.remarks)").href-green {{scope.row.remarks}}
            el-table-column( label="操作",min-width="200")
                template(scope="scope")
                    a(href="javascript:;", v-on:click="recharge(scope.row.client_id, scope.row.client_name)").href-green.ml10 充值
                    a(href="javascript:;", v-on:click="fallback(scope.row.client_id, scope.row.client_name)").href-green.ml10 回退
                    a(href="javascript:;", v-on:click="remind(scope.row.client_id, scope.row.client_name)").href-green.ml10 提醒设置
        div.p20.tx-c(v-if="finace_list.totalPage != 1")
            el-pagination( @current-change="handleCurrentChange", layout="prev, pager, next, jumper",:current-page="finace_list.currentPage",:total="finace_list.totalCount", :page-size="finace_list.pageRowCount" ).grid-pagination
        RemindSetting(:name="client_name", :id="client_id", v-on:close="closeSetting",v-if="showSetting")
        Recharge(@close="closeRecharge", v-if="showRecharge", :id="client_id", :name="client_name", v-on:refresh="getFinaceList",v-on:goBack="closeRecharge" )
        Fallback(@close="closeFallback", v-if="showFallback", :id="client_id", :name="client_name", v-on:refresh="getFinaceList",v-on:goBack="closeFallback" )
        Expiration(@close="closeExpiration", v-if="showExpiration", :id="client_id", :type="sms_type", v-on:refresh="getFinaceList",v-on:goBack="closeExpiration" )
</template>
<script src="./Finance.controller.js"></script>
<style lang="scss">
.page-customerFinance{
    .search-box{
        padding:10px 0;
        .input-box{
            width:250px;
        }
    }
    .remainTip{
        font-size:12px;
    }
}
</style>
