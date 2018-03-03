import * as types from '../types';

export const mutations = {
    [types.ISLOGGED](state, { login }) {
        state.islogged = login;
    },
    [types.CAN_CREATE](state, { data }) {
        state.can_create = data;
    },
    [types.USER](state, { user }) {
        state.user = user;
    },
    [types.SMSP_IMG_URL](state, { url }) {
        state.smsp_img_url = url;
    },
    [types.BILL_DATA](state, { data }) {
        state.bill_data = data;
    },
    [types.CER_INFO](state, { data }) {
        state.cer_info = data;
    },
    [types.CER_SUBMIT](state, { submit }) {
        state.submit = submit;
    },
    [types.OAUTH_STATUS](state, { status }) {
        state.oauth_status = status;
    },
    [types.FALLBACK_DATA](state, { data }) {
        state.fallback_data = data;
    },

    [types.CUSTOMER_DATA](state, { data }) {
        state.customer_data = data;
    },
    [types.CUSTOMER_CER](state, { data }) {
        state.customer_cer = data;
    },
    [types.CLIENT_ID](state, { id }) {
        state.client_id = id;
    },
    [types.OAUTH_CLIENTID](state, { id }) {
        state.oauth_clientid = id;
    },


    [types.LOAD_USER](state, { loading }) {
        state.load_user = loading;
    },
    [types.LOAD_BILLDATA](state, { loading }) {
        state.load_billdata = loading;
    },
    [types.LOAD_CER](state, { loading }) {
        state.load_cer = loading;
    },
}