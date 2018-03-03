import * as types from '../types';

export const mutations = {
    [types.PARAMS](state, { params }) {
        state.params = params;
    },
    [types.PAGE_NO](state, { pageNo }) {
        state.pageNo = pageNo;
    },
    [types.PAGE_SIZE](state, { pageSize }) {
        state.pageSize = pageSize;
    },
    [types.LOAD_LIST](state, { loading }) {
        state.load_list = loading;
    },
    [types.LOAD_INDEX](state, { loading }) {
        state.load_index = loading;
    },

    [types.INDEX_LIST](state, { list }) {
        state.index_list = list;
    },
    [types.INDEX_DATA](state, { data }) {
        state.index_data = data;
    },
    [types.REMAIN_LIST](state, { list }) {
        state.remain_list = list;
    },
    [types.INTELLIGENT_LIST](state, { list }) {
        state.intelligent_list = list;
    },
    [types.TIMESENDER_LIST](state, { data }) {
        state.timesender_list = data;
    },
    [types.SMS_LIST](state, { list }) {
        state.sms_list = list;
    },
    [types.NOTICE_LIST](state, { list }) {
        state.notice_list = list;
    },
    [types.INTERNATIONAL_LIST](state, { list }) {
        state.international_list = list;
    },
    [types.GENERAL_LIST](state, { list }) {
        state.general_list = list;
    },
    [types.OWN_LIST](state, { list }) {
        state.own_list = list;
    },
    [types.REBATE_LIST](state, { list }) {
        state.rebate_list = list;
    },
    [types.BILL_LIST](state, { list }) {
        state.bill_list = list;
    },
    [types.RECORD_LIST](state, { list }) {
        state.record_list = list;
    },
    [types.MANAGER_LIST](state, { list }) {
        state.manager_list = list;
    },
    [types.FINACE_LIST](state, { list }) {
        state.finace_list = list;
    },
    [types.EXPIRATION_LIST](state, { list }) {
        state.expiration_list = list;
    },
    [types.REPORT_TOTAL_LIST](state, { list }) {
        state.report_total_list = list;
    },
    [types.REPORT_DAILY_LIST](state, { list }) {
        state.report_daily_list = list;
    },
    [types.SEND_RECORD_LIST](state, { list }) {
        state.send_record_list = list;
    },
    [types.PAYORDER_LIST](state, { data }) {
        state.pay_order_list = data;
    },
    [types.INVOICE_LIST](state, { data }) {
        state.invoice_list = data;

    },
    [types.SMSTASK_LIST](state, { list }) {
        state.smstask_list = list;
    }
}
