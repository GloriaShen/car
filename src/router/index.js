import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
// 车友圈详情页及举报
import CheYouHui from '../page/cheYouHui/index';
// 商户端
// 订单 order
import order from '../page/order/index';
import allorder from '../page/order/all';
import detailOrder from '../page/order/detail';
import orderServiceList from '../page/order/service-list';
import countEcharts from '../page/order/countEcharts';
import countBrief from '../page/order/countBrief';

// 财务管理
import fRoutine from '../page/financial/routine';

import fInvoice from '../page/financial/invoice';
import fInvoiceDetail from '../page/financial/invoiceDetail';
import fInvoiceRecord from '../page/financial/invoiceRecord';

import fCreditCard from '../page/financial/creditCard';
import fCreditCardDetail from '../page/financial/creditCardDetail';
import fCreditCardAdd from '../page/financial/creditCardAdd';

import fCash from '../page/financial/cashManage';
import fCashApply from '../page/financial/cashApply';
import fCashApplyConfirm from '../page/financial/cashApplyConfirm';
import fCashRecord from '../page/financial/cashRecord';

import fCount from '../page/financial/count';
import fCountExport from '../page/financial/countExport';

// 员工管理
import employee from '../page/employee/index';
import editEmployee from '../page/employee/edit';
import detailEmployee from '../page/employee/detail';

// 角色管理
import role from '../page/role/index';
import detailRole from '../page/role/detail';

// 设置
import set from '../page/set/index';
import setShop from '../page/set/shop';
import modifyPsd from '../page/set/modifyPsd';
// 品牌管理
import brand from '../page/brand/index';
import brandList from '../page/brand/list';

// 服务管理
import service from '../page/service/index';
import detailService from '../page/service/detail';
import editService from '../page/service/edit';

// 商家详情分享页
import shopShare from '../page/shop/share';
// 咨讯详情
import newsDetail from '../page/news/detail';
//临时页面
import temp from '../components/temp';

Vue.use(Router)

const router = new Router({
    mode: 'history',
  routes: [
    { path: '/', component: temp },

    { path: '/brand', component: brand },
    { path: '/brand/list', component: brandList },

    { path: '/service', component: service },
    { path: '/service/detail', component: detailService },
    { path: '/service/edit', component: editService },


    { path: '/news/detail/:id', component: newsDetail },
    { path: '/shop/detail/share', component: shopShare },

    { path: '/cheyouhui/:id', component: CheYouHui },

    { path: '/order', name: 'order', component: order },
    { path: '/order/', name: 'order', component: order },
    { path: '/order/all', name: 'allorder', component: allorder },
    { path: '/order/detail', name:'detailOrder', component: detailOrder },
    { path: '/order/service-list', name:'orderServiceList', component: orderServiceList },
    { path: '/order/echart/:type', component: countEcharts },
    { path: '/order/count/brief', component: countBrief },

   

    { path: '/financial/routine', component: fRoutine },
    { path: '/financial/invoice', component: fInvoice },
    { path: '/financial/invoice/detail', component: fInvoiceDetail },
    { path: '/financial/invoice/record', component: fInvoiceRecord },

    { path: '/financial/creditcard', component: fCreditCard },
    { path: '/financial/creditcard/detail', component: fCreditCardDetail },
    { path: '/financial/creditcard/add', component: fCreditCardAdd },

    { path: '/financial/cash', component: fCash },
    { path: '/financial/cash/apply', component: fCashApply },
    { path: '/financial/cash/applyconfirm', component: fCashApplyConfirm },
    { path: '/financial/cash/record', component: fCashRecord },

    { path: '/financial/count', component: fCount },
    { path: '/financial/count/export', component: fCountExport },

    { path: '/employee', component: employee },
    { path: '/employee/edit', component: editEmployee },
    { path: '/employee/detail', component: detailEmployee },

    { path: '/role', component: role },
    { path: '/role/detail', component:  detailRole},

    { path: '/set', component: set },
    { path: '/set/shop', component: setShop },
    { path: '/set/modifyPsd', component: modifyPsd },

  ]
});

// 页面刷新时，重新赋值token
/*if (window.localStorage.getItem('userInfo')) {
    console.log('页面刷新时，重新赋值token')
    hx.getUserInfo(function(res){
        localStorage.setItem('userInfo', JSON.stringify(res.data));
    });
}*/

router.beforeEach((to, from, next) => {
   let userInfo = localStorage.getItem('userInfo');
   if(userInfo){
        next();
   }else{
        hx.getUserInfo && hx.getUserInfo(function(res){
            res.data.from = 'router';
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            next();
        });
   }
   
});

export default router;

