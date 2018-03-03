<template lang="pug">
div.page-recharge
    .mask
        div.mask-ctx.result
            div.mask-header 子账户回退
                span.fa.fa-close(v-on:click="close") 
            div.p-20
                div.clearfix.search-box
                    a(href="javascript:;", v-on:click="search(1)").btn.btn-md.btn-green.search-btn.fr.mr10 搜索
                    .clearfix.fl.mr20
                        span.fl 产品类型：
                        el-select.fl.border.sel(
                            v-model="params.product_type",
                            placeholder="请选择",
                        )
                            el-option(
                                v-for="item in product",
                                :key="item.value",
                                :label="item.label",
                                :value="item.value"
                            )
                    .clearfix.fl.mr20
                        span.fl 运营商：
                        el-select.fl.border.sel(
                            v-model="params.operator_code",
                            placeholder="请选择",
                        )
                            el-option(
                                v-for="item in operator",
                                :key="item.value"
                                :label="item.label",
                                :value="item.value"
                            )
                el-table(:data="data",ref='multipleTable' style="width:100%",v-loading="loading",@selection-change="handleSelectionChange")
                    el-table-column(type="selection",@selection-change="handleSelectionChange",width="35")
                    el-table-column(prop="product_type_str", label="产品类型", width="65")
                    el-table-column(prop="operator_code_str", label="运营商",width="50")
                    el-table-column(prop="area_code_str", label="区域", width="50")
                    el-table-column(prop="sms_unitprice", label="短信成本",width="120")
                    el-table-column(prop="due_time", label="到期时间",width="120")
                    el-table-column(prop="account_balance", label="剩余数量",width="78")
                    el-table-column(label="回退数量", width="180")
                        template(scope="scope")
                            el-input-number(v-model="scope.row.updateNum", @change="handleChange(scope.row)",:min="0", :max="9999999",size="small")
                div.tx-r.p20
                    a(href="javascript:;",v-on:click="produceRecharge").btn.btn-green.btn-md 立即回退
    div.mask(v-if="showMask")
        div.mask-ctx
            div.mask-header 回退确认
                span.fa.fa-close(v-on:click="close")
            div.ctx
                el-table(:data="rollbackList", style="width:100%")
                    el-table-column(prop="product_type_str", label="产品类型")
                    el-table-column(prop="operator_code_str", label="运营商")
                    el-table-column(prop="area_code_str", label="区域")
                    el-table-column(prop="sms_unitprice",label="短信成本")
                    el-table-column(prop="due_time", label="到期时间")
                    el-table-column(prop="updateNumStr", label="回退数量")        
                .mt20.clearfix
                    p.tx-c 请确认是否给
                        span.name {{clientInfo}}
                        | 回退以上短信？
                    .col-12.tx-c.mt20
                        a(href="javascript:;",style="width:180px;", v-on:click="commit").btn.btn-green.btn-md 确定              
</template>
<script src="./Fallback.controller.js"></script>
<style lang="scss" scoped>
@import '../../assets/styles/config.scss';
.name{
    color:$btn-green;
    font-size:24px;
    margin-left:5px;
}
.mask-ctx{
    background-color: #FFF;
    width:740px;
    position: absolute;
    top:50%;
    left:50%;
    transform : translatex(-50%) translateY(-50%);
    .ctx{
        padding:20px;
        max-height:700px;
        overflow:auto;
    }
}
</style>
