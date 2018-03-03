<template lang="pug">
    div.page-sms-purchase
        div.clearfix.search-box
            .clearfix.fl.grid-sel
                span.fl 产品类型：
                el-select.fl.border.sel(
                    v-model="params.productType",
                    placeholder="请选择",
                    @change="getSmsList(1)"
                )
                    el-option(
                        v-for="item in product",
                        :key="item.value",
                        :label="item.label",
                        :value="item.value"
                    )
            .clearfix.fl.ml60
                span.fl 运营商：
                el-select.fl.border.sel(
                    v-model="params.operatorCode",
                    placeholder="请选择",
                    @change="getSmsList(1)"
                )
                    el-option(
                        v-for="item in operator",
                        :key="item.value"
                        :label="item.label",
                        :value="item.value"
                    )
            .table-search.clearfix
                input.input.input-md.input-box.mr10.ml60(type="text", placeholder="产品名称/产品代码", v-model="params.condition", @keyup.enter="getSmsList(1)" )            
                a(href="javascript:;", v-on:click="getSmsList(1)").btn.btn-md.btn-green.search-btn 查询
        .p20.grid-table
            el-table(:data="sms_list.entityList",ref="multipleTable", v-loading="loading",@selection-change="handleSelectionChange", :row-class-name="setRowClass",align='center')
                el-table-column(type="selection",@selection-change="handleSelectionChange")
                el-table-column(prop="productName", label="产品名称")
                el-table-column(prop="productCode", label="产品代码")
                el-table-column(prop="productTypeStr", label="产品类型")
                el-table-column(prop="operatorCodeStr", label="运营商")
                el-table-column(prop="areaCodeStr", label="区域")
                el-table-column(label="短信单价")
                    template(scope)
                        span(v-if="scope.row.productType == 2").p-5 请参考国际短信价格表
                        span(v-else) {{scope.row.unitPriceStr}} 元
                el-table-column(prop="discountPriceStr", label="折后价格")
                    template(scope)
                        span.p-5 {{scope.row.discountPriceStr}}
                el-table-column(prop="dueTimeStr", label="到期时间")
                el-table-column(label="数量",width="178")
                    template(scope="scope")
                        el-input-number(v-model="scope.row.purchaseNum", @change="handleChange(scope.row)",:min="0", :max="9999999",size="small")
                        span(v-if="scope.row.productType != 2").ml5 条
                        span(v-else).ml5 元
                el-table-column(prop="unit_price", label="金额")
                    template(scope)
                        div.tx-c.ml20 {{scope.row.price}}
        div.p-20.tx-c(v-if="sms_list.totalPage != 1")
            el-pagination( @current-change="jump", layout="prev, pager, next, jumper",:current-page="sms_list.currentPage",:total="sms_list.totalCount", :page-size="sms_list.pageRowCount" ).grid-pagination
        div.p20.clearfix
            a(href="javascript:;",v-on:click="confirm").btn.btn-green.btn-md.fr 提交订单
            div.fr(style="line-height:30px;").mr10
                span 合计（元）：
                span.total {{total}}
        div.mask(v-if="isShowDesc")
            div.mask-ctx
                div.mask-header 确认订单信息
                    span.fa.fa-close(v-on:click="close")
                div.ctx
                    el-table(:data="updateList", style="width:100%")
                        el-table-column(prop="productCode", label="产品代码")
                        el-table-column(prop="productName", label="产品名称")
                        el-table-column(prop="discountPriceStr", label="折后单价")
                        el-table-column(prop="purchaseNumStr", label="数量")
                        el-table-column(prop="price", label="金额")
                    .mt20.clearfix
                        p.tx-c 需消耗账户余额：
                            span.name {{total}}
                            | 元，是否确认购买？
                        .col-12.tx-c.mt20
                            a(href="javascript:;",style="width:180px;", v-on:click="commit").btn.btn-green.btn-md 确定  
</template>
<script src="./Purchase.controller.js"></script>    
<style lang="scss">
@import '../../assets/styles/config.scss';
.page-sms-purchase{
    .grid-table{
        padding-top: 0;
        .el-input-number {
            width: 142px !important;
        }
    }
    
    .buy{
        width:75px;
    }
    .total{
        color:$btn-green;
        font-size:18px;
        font-weight:800;
    }
    .discount-icon{
        // position: relative;
        &::after{
            content: '';
            background: url(../../assets/images/discount1.png); 
            background-position: -3px -3px;
            background-repeat: no-repeat;
            // background-size: 35px 35px;
            width: 35px;
            height: 35px;
            position: absolute;
            display: block;
            left:0;
            filter: blur(-100px);
        }
    }
}
</style>
<style lang="scss" scoped>
@import '../../assets/styles/config.scss';
.name{
    color:$btn-green;
    font-size:24px;
    margin-left:5px;
}
.mask-ctx{
    background-color: #FFF;
    width:580px;
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
