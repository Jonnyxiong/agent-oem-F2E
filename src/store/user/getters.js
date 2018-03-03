export const getters = {
    islogged: state => {
        return state.islogged
    },
    user: state => {
        return state.user
    },
    can_create: state => {
        return state.can_create
    },
    smsp_img_url: state => {
        return state.smsp_img_url
    },
    bill_data: state => {
        return state.bill_data
    },
    cer_info: state => {
        return state.cer_info
    },
    oauth_status: state => {
        return state.oauth_status
    },
    oauth_clientid: state => {
        return state.oauth_clientid
    },
    submit: state => {
        return state.submit
    },

    fallback_data: state => {
        return state.fallback_data
    },


    customer_data: state => {
        return state.customer_data
    },
    customer_cer: state => {
        return state.customer_cer
    },
    client_id: state => {
        return state.client_id
    },


    load_cer: state => {
        return state.load_cer
    },
    load_billdata: state => {
        return state.load_billdata
    },
    load_user: state => {
        return state.load_user
    }
}