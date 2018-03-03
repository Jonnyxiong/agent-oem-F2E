import { Utils } from '../../model/util';

let utils = new Utils();

export const actions = {
    getIndexList({ commit, state }) {
        let params = {};
        params.currentPage = state.pageNo;
        params.pageRowCount = state.pageSize;

        utils.get('/index/clients', params).then(res => {
            commit('INDEX_LIST', { list: res.data })
            commit('LOAD_LIST', { loading: false })
        })
    },
    getIndexData({ commit, state }) {

        utils.get('/index/data').then(res => {
            commit('INDEX_DATA', { data: res.data })
            commit('CAN_CREATE', { data: res.data.canCreateTestAccount })
            commit('LOAD_INDEX', { loading: false })

        }, res => {
            commit('LOAD_INDEX', { loading: false })
        })
    },
    //智能模板
    getIntelligentList({ commit, state }) {
        let params = state.params;
        params.pageRowCount = state.pageSize;

        //这个接口没有code
        utils.post('/autoTemplate/list', params, { emulateJSON: true }).then(res => {
            commit('LOAD_LIST', { loading: false })
        }, res => {
            commit('LOAD_LIST', { loading: false })
            commit('INTELLIGENT_LIST', { list: res })
        })
    },
    //通用模板
    getGeneralList({ commit, state }) {
        let params = state.params;
        params.pageRowCount = state.pageSize;

        //这个接口没有code
        utils.post('/autoTemplate/commonlist', params, { emulateJSON: true }).then(res => {
            commit('LOAD_LIST', { loading: false })
        }, res => {
            commit('LOAD_LIST', { loading: false })
            commit('GENERAL_LIST', { list: res })
        })
    },
    getSmsList({ commit, state }) {
        let params = state.params;
        params.pageRowCount = state.pageSize;
        utils.post('/sms/products', params, { emulateJSON: true }).then(res => {
            let data = res.data;
            let list = data.entityList;
            for (let i = 0; i < list.length; i++) {
                list[i].purchaseNum = 0;
                list[i].price = 0;
            }
            data.entityList = list;
            commit('SMS_LIST', { list: data })
            commit('LOAD_LIST', { loading: false })
        }, res => {
            commit('LOAD_LIST', { loading: false })
        })
    },
    getInternationalList({ commit, state }) {
        let params = state.params;
        params.pageRowCount = state.pageSize;
        utils.get('/sms/gj/prices', params).then(res => {
            commit('INTERNATIONAL_LIST', { list: res.data })
            commit('LOAD_LIST', { loading: false })
        }, res => {
            commit('LOAD_LIST', { loading: false })
        })
    },
    getTimeDeliverList({ commit, state }) {
        let params = state.params;
        params.pageRowCount = state.pageSize;
        utils.post('/send/smsTimerSend/list', params, { emulateJSON: false }).then(res => {
            commit('TIMESENDER_LIST', { data: res.data })
            commit('LOAD_LIST', { loading: false })
        }, res => {
            commit('LOAD_LIST', { loading: false })
        })
    },
    getOwnOrderList({ commit, state }) {
        let params = state.params;
        params.pageRowCount = state.pageSize;
        utils.post('/finance/bill/self', params, { emulateJSON: true }).then(res => {
            commit('OWN_LIST', { list: res.data })
            commit('LOAD_LIST', { loading: false })
        }, res => {
            commit('LOAD_LIST', { loading: false })
        })
    },
    getNoticeList({ commit, state }) {
        let params = state.params;
        utils.post('/agent/noticePage', params, { emulateJSON: true }).then(res => {
            commit('LOAD_LIST', { loading: false })
        }, res => {
            commit('NOTICE_LIST', { list: res })
            commit('LOAD_LIST', { loading: false })
        })
    },
    getRebateList({ commit, state }) {
        let params = state.params;
        params.pageRowCount = state.pageSize;
        utils.get('/finance/bill/rebate', params, { emulateJSON: true }).then(res => {
            commit('REBATE_LIST', { list: res.data })
            commit('LOAD_LIST', { loading: false })
        }, res => {
            commit('LOAD_LIST', { loading: false })
        })
    },
    getBillList({ commit, state }) {
        let params = state.params;
        params.pageRowCount = state.pageSize;
        utils.post('/finance/bill/sms', params).then(res => {
            commit('BILL_LIST', { list: res.data })
            commit('LOAD_LIST', { loading: false })
        }, res => {
            commit('LOAD_LIST', { loading: false })
        })
    },
    getRecorList({ commit, state }) {
        let params = state.params;
        params.pageRowCount = state.pageSize;
        utils.post('/finance/bill/purchaseHistory', params, { emulateJSON: true }).then(res => {
            commit('RECORD_LIST', { list: res.data })
            commit('LOAD_LIST', { loading: false })
        }, res => {
            commit('LOAD_LIST', { loading: false })
        })
    },
    getManagerList({ commit, state }) {
        let params = state.params;
        params.pageRowCount = state.pageSize;
        utils.post('/client/accounts', params).then(res => {
            commit('MANAGER_LIST', { list: res.data })
            commit('LOAD_LIST', { loading: false })
        }, res => {
            commit('LOAD_LIST', { loading: false })
        })
    },
    getFinaceList({ commit, state }) {
        let params = state.params;
        params.pageRowCount = state.pageSize;
        utils.post('/recharge/rollback/getAccounts', params).then(res => {
            commit('FINACE_LIST', { list: res.data })
            commit('LOAD_LIST', { loading: false })
        }, res => {
            commit('LOAD_LIST', { loading: false })
        })
    },
    getSmsTaskList({ commit, state }) {
        let params = state.params;
        params.pageRowCount = state.pageSize;
        utils.post('/send/sendTask', params, { emulateJSON: true }).then(res => {

            commit('LOAD_LIST', { loading: false })
        }, res => {
            commit('SMSTASK_LIST', { list: res })
            commit('LOAD_LIST', { loading: false })
        })
    },
    getSendRecordList({ commit, state }) {
        let params = state.params;
        params.pageRowCount = state.pageSize;
        utils.post('/send/getrecords', params, { emulateJSON: true }).then(res => {
            commit('SEND_RECORD_LIST', { list: res.data })
            commit('LOAD_LIST', { loading: false })
        }, res => {
            commit('LOAD_LIST', { loading: false })
        })
    },
    getExpirationlList({ commit, state }) {
        let params = state.params;
        params.pageRowCount = state.pageSize;
        utils.get('/client/pools', params).then(res => {
            commit('EXPIRATION_LIST', { list: res.data })
            commit('LOAD_LIST', { loading: false })
        }, res => {
            commit('LOAD_LIST', { loading: false })
        })
    },
    getReportTotalListPre({ commit, state }) {
        let params = state.params;
        params.pageRowCount = state.pageSize;
        utils.post('/client/report/consume/pretotal', params).then(res => {
            commit('REPORT_TOTAL_LIST', { list: res.data })
            commit('LOAD_LIST', { loading: false })
        }, res => {
            commit('LOAD_LIST', { loading: false })
        })
    },
    getReportTotalListPost({ commit, state }) {
        let params = state.params;
        params.pageRowCount = state.pageSize;
        utils.post('/client/report/consume/suftotal', params).then(res => {
            commit('REPORT_TOTAL_LIST', { list: res.data })
            commit('LOAD_LIST', { loading: false })
        }, res => {
            commit('LOAD_LIST', { loading: false })
        })
    },
    getReportDailyListPre({ commit, state }) {
        let params = state.params;
        params.pageRowCount = state.pageSize;
        utils.get('/client/report/consume/preday', params).then(res => {
            commit('REPORT_DAILY_LIST', { list: res.data })
            commit('LOAD_LIST', { loading: false })
        }, res => {
            commit('LOAD_LIST', { loading: false })
        })
    },
    getReportDailyListPost({ commit, state }) {
        let params = state.params;
        params.pageRowCount = state.pageSize;
        utils.get('/client/report/consume/sufday', params).then(res => {
            commit('REPORT_DAILY_LIST', { list: res.data })
            commit('LOAD_LIST', { loading: false })
        }, res => {
            commit('LOAD_LIST', { loading: false })
        })
    },
    getRemainList({ commit, state }) {
        let params = state.params;
        params.pageRowCount = state.pageSize;
        utils.post('/agent/newpools', params, { emulateJSON: true }).then(res => {

            commit('REMAIN_LIST', { list: res.data })
            commit('LOAD_LIST', { loading: false })
        }, res => {
            commit('LOAD_LIST', { loading: false })
        })
    },
    getPayOrderList({ commit, state }) {
        let params = state.params;
        params.rows = state.pageSize;
        utils.post('/onlinePay/queryPayOrder', params, { emulateJSON: true }).then(res => {
            commit('PAYORDER_LIST', { data: res.data })
            commit('LOAD_LIST', { loading: false })
        }, res => {
            commit('LOAD_LIST', { loading: false })
        })
    },
    getInvoiceList({ commit, state }) {
        let params = state.params;
        params.rows = state.pageSize;
        utils.post('/invoice/invoiceList', params, { emulateJSON: true }).then(res => {
            commit('INVOICE_LIST', { data: res })
            commit('LOAD_LIST', { loading: false })
        }, res => {
            commit('INVOICE_LIST', { data: res })
            commit('LOAD_LIST', { loading: false })
        })
    }

}
