<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
import 'eventsource-polyfill';
import "@/assets/styles/reset.css";
export default {
    name: 'app',
}
</script>
<style lang="scss">
@import "./assets/styles/base.scss";
.el-loading-spinner .path {
    stroke: $btn-green !important;
}
.el-checkbox__input.is-checked .el-checkbox__inner,.el-radio__input.is-checked .el-radio__inner {
    background-color: $btn-green !important;
    border-color: $btn-green !important;
}
.el-checkbox__input:hover .el-checkbox__inner,.el-radio__input:hover .el-radio__inner {
    border-color: $btn-green !important;
}
//修改分页
.el-pager .active {
    background-color: rgba(255, 255, 255, 0) !important;
    color: $base;
    border-color: #d1dbe5 !important;
    color: $btn-green !important;
    border-top: 0 none;
    border-bottom: 0 none;
    border-right: 1px solid #d1dbe5;
}

.el-pagination__editor:focus {
    border-color: $btn-green !important;
}
.el-select-dropdown__item.selected {
    background-color: $btn-green !important;
    color: #FFF !important;
}
.el-input-number {
        width: 130px !important;
        .el-input-number__decrease {
            left: 1px !important;
            border-left: 0 none !important;
            border-right: 1px solid $border-color;
            background-color: #FFF;
            color: $base !important;
        }
        .el-input-number__increase {
            background-color: #FFF;
            border-left: 1px solid $border-color !important;
            right: 1px !important;
            color: $base !important;
        }
        .el-input {
            border: 1px solid $border-color !important;
            .el-input__inner {
                height: 30px !important;
                padding-left: 35px !important;
                padding-right: 35px !important;
                text-align: center;
            }
        }
    }
    .el-input-number__decrease.is-disabled,
    .el-input-number__increase.is-disabled {
        color: $font-light !important;
    }
</style>


