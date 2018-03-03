export const state = {
    pageNo: '', //指定跳转页数
    pageSize: '15',
    params: {},
    load_list: true,
    load_index: true,

    index_data: { agent_pool_due_time_data: {}, data: {}, sixMonths_client_num: [], agent_account_data: {} },
    index_list: { list: [] }, //首页列表
    remain_list: [], //主页用户剩余
    intelligent_list: [], //智能模板
    timesender_list: { data: [] },
    general_list: { entityList: [] }, //通用模板
    sms_list: { list: [] }, //短信购买列表
    international_list: {}, //国际短信列表
    own_list: {}, //我的账单
    rebate_list: { list: [] }, //返点账单
    bill_list: {},
    record_list: { list: [] }, //客户消耗记录   
    manager_list: { list: [] },
    finace_list: { list: [] },
    notice_list: {}, //公告列表
    expiration_list: {}, //客户过期短信列表
    report_total_list: {},
    report_daily_list: { list: [] },
    send_record_list: { list: [] },
    pay_order_list: { data: [] },
    invoice_list: { data: [] },
    smstask_list: { entityList: [] }
}
