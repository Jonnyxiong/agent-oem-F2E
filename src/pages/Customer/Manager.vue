<template lang="pug">
    div.page-customer-manager(v-if="!isrecharge && !isfallback")
        a(href="javascript:;", v-on:click="exportReport").btn.btn-md.btn-green.ml20.mt20 下载报表
        div.head.ml20.mr20.mt20 
            span.ml10 子账户列表    
        //- h1.page-title.p-20.border-b 客户关系管理
            span (总客户数
                i {{clientStat.total_client_num}} 
                | 人，当月新增客户
                i {{clientStat.thisMonth_client_num}}
                | 人)
        div.clearfix.search-box
            .datepicker.fl.clearfix
                span.fl 时间：
                el-date-picker.fl.border(v-model="startTime", placeholder="请选择开始日期", :picker-options="pickerOptions0",@change="changeStartDay" )
                span.fl.p-5 至
                el-date-picker.fl.border(v-model="endTime", type="date", placeholder="请选择结束日期", :picker-options="pickerOptions1", @change="changeEndDay")
            .table-search.clearfix
                input.input.input-md.input-box.ml40(type="text", placeholder="子账户ID/子账户名称", v-model="params.customerInfo", v-on:keyup.enter="getManagerList(1)")
                a(href="javascript:;", v-on:click="getManagerList(1)").btn.btn-md.btn-green.search-btn.ml20 查询                
        div.p-20
            el-table(:data="manager_list.list", style="width:100%", v-loading="loading")
                el-table-column(prop="rownum", label="序号", width="55")
                el-table-column(prop="client_id", label="子账户ID", min-width="65")
                el-table-column(prop="client_name", label="子账户名称", min-width="160")
                el-table-column(prop="status_str", label="账号状态")
                    template(scope="scope")
                        span(v-bind:class="[scope.row.status == 5 ? 'link-red' : '' ]") {{scope.row.status_str}}
                el-table-column(prop="agent_owned", label="使用对象")  
                    template(scope="scope")
                        span(v-if="scope.row.agent_owned == 1") 自己使用      
                        span(v-if="scope.row.agent_owned == 0") 下级客户                                                        
                el-table-column(prop="oauth_status_str", label="认证状态")
                    template(scope="scope")
                        span(v-bind:class="[scope.row.oauth_status == 2 ? 'link-red' : '']") {{scope.row.oauth_status_str}}
                el-table-column(prop="email", label="提醒邮箱", min-width="140")
                el-table-column(prop="mobile", label="提醒手机")  
                el-table-column(prop="createtime", label="开户时间")                
                el-table-column( label="操作", fixed = "right", width="250")
                    template(scope="scope")
                        router-link(:to="{name : 'customer_manager_info', params : {id : scope.row.client_id}, query : {status : scope.row.oauth_status, type : scope.row.client_type} }").href-green 查看
                        a(href="javascript:;", v-if="scope.row.status == 1" v-on:click="frozen(scope.row.client_name, scope.row.client_id, '5')").href-green.ml10 冻结
                        a(href="javascript:;", v-else-if="scope.row.status == 5", v-on:click="frozen(scope.row.client_name, scope.row.client_id, '1')").href-green.ml10 解冻
                        a(href="javascript:;", v-else ).href-green.ml10.href-disable 冻结
                        a(href="javascript:;", v-on:click="getInterface(scope.row.client_id, scope.row.mobile)").href-green.ml10 接口管理
                        a(href="javascript:;", v-on:click="modifyPwd(scope.row.client_id, scope.row.mobile)").href-green.ml10 修改密码
                        el-tooltip.item(effect="dark",content="上传资质",placement="top", v-if="scope.row.agent_owned != 1 && scope.row.oauth_status != 3")
                            router-link(:to="{name : 'customer_manager_auth', params :{id : scope.row.client_id}, query : {status : scope.row.oauth_status, type : scope.row.client_type}}").href-green.ml10.href-opera 上传
                        a( v-else style="opacity:0;").href-opera.ml10 占位
                        //- el-tooltip.item(effect="dark",content="登录客户端",placement="top",v-if="scope.row.agent_owned == 1")
                            //- a(:href="scope.row.oemUrl",  target="_blank").href-green.ml10.href-opera 登录
        div.p20.tx-c(v-if="manager_list.totalPage != 1")
            el-pagination( @current-change="handleCurrentChange", layout="prev, pager, next, jumper",:current-page="manager_list.currentPage",:total="manager_list.totalCount", :page-size="manager_list.pageRowCount" ).grid-pagination
        Frozen(v-if="isfrozen", :name="client_name", :id="client_id", :type="type", v-on:close="closeFrozen", v-on:refresh="getManagerList")
        Remark(@close="closeRemark", v-if="isremark", :id="client_id", :remarks="remarks" v-on:refresh="getManagerList")
        ModifyPwd(@close="closeModifyPwd" v-if=" ismodifyPwd", :id="client_id", :mobile="mobile",v-on:goBack="closeModifyPwd" )
        GetInterface(@close="closeGetInterface", v-if="isgetInterface", :id="client_id", :mobile="mobile",v-on:goBack="closeGetInterface" )
    //- Recharge(@close="closeRecharge" v-else-if="isrecharge", :id="client_id", :name="client_name", v-on:refresh="getManagerList",v-on:goBack="closeRecharge" )
    //- Fallback(@close="closeFallback", v-else-if="isfallback", :id="client_id", :name="client_name", v-on:refresh="getManagerList",v-on:goBack="closeFallback" )
</template>
<script src="./Manager.controller.js"></script>
<style lang="scss">
@import '../../assets/styles/config.scss';
.page-customer-manager{
    .head{
        height: 40px;
        font-size: 16px;
        line-height: 40px;
        color: #333333;
        border-bottom: 1px solid #e7e7e7;
        background-color: #f9f9f9;
    }
    h1{
        span{
            font-size:12px;
            i{
                font-style:normal;
                color:$btn-green;
                font-size:20px;
            }
        }
    }
    .search-box{
        span{
            line-height: 30px;
        }
        .search-btn{
            width:80px;
            margin-left:10px;
            padding:0;
        }
       .input-box{
           width:250px;
       }
    }
    .href-opera{
        display: inline-block;
      //  width:60px;
    }
    
}
</style>

