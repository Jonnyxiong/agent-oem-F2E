<template lang="pug">
    div.mask
        div.mask-ctx
            div.mask-header 重置
                span.fa.fa-close
            div.ctx
                .clearfix.item
                    .title.fl  短信类型：
                    .fl
                        el-select.fl.border.sel(
                            v-model="params.financial_type",
                            placeholder="请选择"
                        )
                            el-option(
                                v-for="item in financial",
                                :key="item.value",
                                :label="item.label",
                                :value="item.value"
                            )
                .clearfix.item
                    .title.fl 到期时间：
                    .fl
                        el-select.fl.border.sel(
                            v-model="params.financial_type",
                            placeholder="请选择"
                        )
                            el-option(
                                v-for="item in financial",
                                :key="item.value",
                                :label="item.label",
                                :value="item.value"
                            )
                .clearfix.item
                    .title.fl 充值金额：
                    .fl
                        input.input.input-md(type="text")
                a(href="javascript:;").btn.btn-green.btn-lg 立即充值
</template>
<script src="./Recharge.controller.js"></script>