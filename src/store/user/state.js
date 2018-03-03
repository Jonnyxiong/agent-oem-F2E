export const state = {
    islogged: false,
    can_create: false,
    user: {},
    smsp_img_url: '',
    bill_data: {
        current_credit: 0,
        balance: 0
    },
    cer_info: {},
    oauth_status: '',
    submit: '', //代理商是否提交过资质认证
    client_id: '',
    oauth_clientid: '', //客户认证id

    fallback_data: {}, //回退列表

    customer_data: {}, //客户信息
    customer_cer: {}, //客户认证信息

    load_billdata: false,
    load_user: false,
    load_cer: false,
}
