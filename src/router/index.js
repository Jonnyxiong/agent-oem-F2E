import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import { auth } from '../model/auth'


import Index from '@/pages/Index/Index'
import Remain from '@/pages/Index/Remain'
import Test from '@/pages/Content/Test'
import Intelligent from '@/pages/Template/Intelligent'
import General from '@/pages/Template/General'
import Layout from '@/pages/Layout/Layout'
import NotFound from '@/components/404/404'
import Login from '@/pages/User/Login'
import Register from '@/pages/User/Register'
import Forget from '@/pages/User/Forget'
import Purchase from '@/pages/Sms/Purchase'
import Buy from '@/pages/Sms/Buy'
import International from '@/pages/Sms/International'

import Open from '@/pages/Customer/Open'
import CustomerFinance from '@/pages/Customer/Finance'
import Manager from '@/pages/Customer/Manager'
import InfoLayout from '@/pages/Customer/InfoLayout'
import CustomerInfo from '@/pages/Customer/CustomerInfo'
import CustomerAuth from '@/pages/Customer/CustomerAuth'
import CustomerReAuth from '@/pages/Customer/CustomerReAuth'
import ReportLayout from '@/pages/Customer/ReportLayout'
import ReportPre from '@/pages/Customer/ReportPre'
import ReportPost from '@/pages/Customer/ReportPost'
import SendLayout from '@/pages/Customer/SendLayout'
import SendRecord from '@/pages/Customer/SendRecord'
import DeliverLayout from '@/pages/Customer/DeliverLayout'
import Deliver from '@/pages/Customer/Deliver'
import TimingDeliver from '@/pages/Customer/TimingDeliver'
import SmsTask from '@/pages/Customer/SmsTask'
import SelfSeviceLayout from '@/pages/Customer/SelfSeviceLayout'
import Timesend from '@/pages/Customer/Timesend'

import Reply from '@/pages/Reply/Reply'
import ReportDailyPre from '@/pages/Customer/ReportDailyPre'
import ReportDailyPost from '@/pages/Customer/ReportDailyPost'
import UserInfo from '@/pages/Account/UserInfo'
import Info from '@/pages/Account/Info'
import Base from '@/pages/Account/Base'
import Auth from '@/pages/Account/Auth'
import ReAuth from '@/pages/Account/ReAuth'
import TestReport from '@/pages/TestReport/TestReportLayout'
import SmsPurchaseLayout from '@/pages/Sms/SmsPurchaseLayout'

import Security from '@/pages/Account/Security'
import ChangePassword from '@/pages/Account/ChangePassword'
import Own from '@/pages/Finance/Own'
import PayOrder from '@/pages/Finance/PayOrder'
import Bill from '@/pages/Finance/Bill'
import Rebate from '@/pages/Finance/Rebate'
import Record from '@/pages/Finance/Record'
import InvoiceLayout from '@/pages/Finance/InvoiceLayout'
import AddInvoice from '@/pages/Finance/AddInvoice'
import InvoiceList from '@/pages/Finance/InvoiceList'

import View from '@/pages/Notice/View'
import Notice from '@/pages/Notice/Notice'

import Help from '@/pages/Help/Help'

const routes = [{
        path: '/login',
        component: Login
    }, {
        path: '/register',
        component: Register
    }, {
        path: '/forget',
        name: 'forget',
        component: Forget
    },
    {
        path: '/',
        component: Layout,
        meta: { auth: true },
        children: [{
                path: '',
                component: Index,
                name: 'index'
            }, {
                path: '/remain',
                component: Remain,
                name: 'remain'
            }, {
                path: 'content/test',
                component: Test,
                name: 'content_test',
            }, {
                path: 'template/intelligent',
                component: Intelligent,
                name: 'template_intelligent',
            }, {
                path: 'sms/purchase/:id',
                component: Buy,
                name: 'sms_purchase_buy',
            }, {
                path: 'customer/manager/:id',
                component: InfoLayout,
                name: 'customer_manager_temp',
                children: [{
                    path: "info",
                    component: CustomerInfo,
                    name: 'customer_manager_info',
                }, {
                    path: "auth",
                    component: CustomerAuth,
                    name: 'customer_manager_auth',
                }, {
                    path: "auth/re",
                    component: CustomerReAuth,
                    name: 'customer_manager_reauth',
                }]
            }, {
                path: 'customer/report',
                component: ReportLayout,
                name: 'customer_report',
                children: [{
                    path: "pre",
                    component: ReportPre,
                    name: 'sms_report_pre',
                }, {
                    path: "pre/post",
                    component: ReportPost,
                    name: 'sms_report_post',

                }]
            }, {
                path: 'customer/sendrecord',
                component: SendRecord,
                name: 'customer_send_record',
            }, {
                path: 'customer/finance',
                component: CustomerFinance,
                name: 'service_finance'
            }, {
                path: 'customer/selfsevicelayout',
                component: SelfSeviceLayout,
                name: 'service_selfsevicelayout',
                children: [{
                    path: 'manager/open',
                    component: Open,
                    name: 'service_open',
                }, {
                    path: "manager",
                    component: Manager,
                    name: 'service_manager',

                }]
            }, {
                path: 'customer/deliverlayout',
                component: DeliverLayout,
                name: 'sms_deliverLayout',
                children: [{
                    path: "deliver",
                    component: Deliver,
                    name: 'sms_deliver',
                }, {
                    path: "deliver/timingdeliver",
                    component: TimingDeliver,
                    name: 'sms_timingdeliver',

                }, {
                    path: "deliver/timesend/",
                    component: Timesend,
                    name: 'sms_timesend',
                }, {
                    path: "deliver/smstask",
                    component: SmsTask,
                    name: 'sms_smstask',
                }]
            }, {
                path: 'sms/smspurchaselayout',
                component: SmsPurchaseLayout,
                name: 'service_smspurchaselayout',
                children: [{
                    path: 'purchase/international',
                    component: International,
                    name: 'service_international'
                }, {
                    path: 'purchase',
                    component: Purchase,
                    name: 'service_purchase',
                }]
            }, {
                path: 'customer/sendlayout',
                component: SendLayout,
                name: 'sms_sendlayout',
                children: [{
                    path: "sendrecord",
                    component: SendRecord,
                    name: 'sms_sendrecord',
                }, {
                    path: "sendrecord/reply",
                    component: Reply,
                    name: 'sms_reply',
                }]
            }, {
                path: 'customer/report/daily_post',
                component: ReportDailyPre,
                name: 'sms_report_daily_pre',
            }, {
                path: 'customer/report/daily_post',
                component: ReportDailyPost,
                name: 'sms_report_daily_post',
            }, {
                path: 'account/userinfo',
                component: UserInfo,
                name: 'account_userinfo',
            },
            {
                path: 'account/info/',
                component: Info,
                name: 'account_info',
                children: [{
                    path: "base",
                    component: Base,
                    name: 'account_base',
                }, {
                    path: "base/auth",
                    component: Auth,
                    name: 'account_auth',

                }, {
                    path: "base/auth/re",
                    component: ReAuth,
                    name: 'account_reauth',
                }]
            },
            {
                path: 'account/security',
                component: Security,
                name: 'account_security',
            },
            {
                path: 'account/security/password',
                component: ChangePassword,
                name: 'account_password',
            },
            {
                path: 'finance/own',
                component: Own,
                name: 'finance_own',
            },
            {
                path: 'finance/payorder',
                component: PayOrder,
                name: 'finance_payOrder',
            },
            {
                path: 'finance/bill',
                component: Bill,
                name: 'finance_bill',
            },
            {
                path: 'finance/rebate',
                component: Rebate,
                name: 'finance_rebate',
            },
            {
                path: 'finance/record',
                component: Record,
                name: 'finance_record',
            },
            {
                path: 'finance/invoice/',
                component: InvoiceLayout,
                name: 'finance_invoice',
                children: [{
                    path: "add",
                    component: AddInvoice,
                    name: 'finance_invoice_add',
                }, {
                    path: "add/list",
                    component: InvoiceList,
                    name: 'finance_invoice_list',

                }]
            },
            {
                path: 'notice/notice',
                component: Notice,
                name: 'Notice_notice',
            },
            {
                path: 'notice/view',
                component: View,
                name: 'notice_view',
            },
            {
                path: 'TestReport/TestReportLayout',
                component: TestReport,
                name: 'sms_TestReportLayout',
                children: [{
                    path: "test",
                    component: Test,
                    name: 'sms_TestReportLayout_Test',
                }, {
                    path: "test/intelligent",
                    component: Intelligent,
                    name: 'sms_TestReportLayout_Intelligent',
                }, {
                    path: "test/general",
                    component: General,
                    name: 'sms_TestReportLayout_General',
                }]
            }, {
                path: '/help',
                component: Help,
                name: "help_help"
            }
        ]
    },
    {
        path: '*',
        component: NotFound
    }
]

// 兼容ie9  不使用history模式
const router = new Router({
    // mode: 'history',
    base: __dirname,
    routes
});

router.beforeEach((to, from, next) => {
    // 如果菜单需要授权
    if (to.matched.some(record => record.meta.auth)) {
        auth.requireAuth(to, from, next);
    } else {
        next();
    }
});

export default router;
