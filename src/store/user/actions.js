import { Utils } from '../../model/util';

let utils = new Utils();

export const actions = {
    getUserInfo({ commit, state }) {
        utils.get('/admin/info').then(res => {
            commit('USER', { user: res.data })
            commit('LOAD_USER', { loading: false })
            localStorage.setItem("mobile", res.data.mobile);
        }, res => {
            commit('LOAD_USER', { loading: false })
        })
    },
    getBillData({ commit, state }) {
        utils.get("/finance/bill/data").then(res => {
            commit("BILL_DATA", { data: res.data });
            commit("LOAD_BILLDATA", { loading: false });
            localStorage.setItem("id", res.data.agent_id);
        }, res => {
            commit("LOAD_BILLDATA", { loading: false })
        })
    },
    getCerInfo({ commit, state }) {
        utils.get("/admin/cer/info").then(res => {
            commit("CER_INFO", { data: res.data });
            commit("LOAD_CER", { loading: false });
            commit("OAUTH_STATUS", { status: res.data.oauth_status })
            commit("CER_SUBMIT", { submit: res.data.submit })
        }, res => {
            commit("LOAD_CER", { loading: false });
        })
    },

    getCustomerCer({ commit, state }) {
        let client_id = state.client_id;
        utils.get("/client/cer/info", { clientId: client_id }).then(res => {
            commit('LOAD_CER', { loading: false });
            commit('CUSTOMER_CER', { data: res.data.cerInfo })
            commit('OAUTH_CLIENTID', { data: res.data.cerInfo.clientId })

        }, res => {
            commit('LOAD_CER', { loading: false });
        })
    }
}