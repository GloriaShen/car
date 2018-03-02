import * as api from '../../service/getData'
import * as types  from '../mutation-types'

const state = {
	/**
	 * version 2.0
	 */
	topTitle: {
		title: '订单管理',
		subTitles: {
			title1: { name: '订单', path: '/order', active: 1 },
			title2: { name: '订单统计',path: '', active: 0 }
		}
	},
	showSubNavs: false,
	subNavs: {
		day: { id: 1, name: '日统计', to: '/order/count/brief', active: 1 },
		week: { id: 2, name: '周统计', to: '/order/count/brief', active: 0 },
		month: { id: 3, name: '月统计', to: '/order/count/brief', active: 0 },
	},
	/**
	 * [statusData description] 订单状态 
	 * @type {Object}
	 * STANDBY 待服务  SERVICED待支付   PAYING待支付  PAID待评价   EVALUATED已完成
	 */
	statusData: {
		STANDBY: { id: 4, name: '待服务', num: '', to: 'ended', active: 0 },
		PAID: { id: 1, name: '待评价', num: '', to: 'paid', active: 0 },
		EVALUATED: { id: 3, name: '已完成', num: '', to: 'evaluated', active: 0 },	
	},
	allStatus: {
		PAID: { id: 1, name: '待评价', num: '', to: 'paid', active: 0 },
		SERVICED: { id: 2, name: '待支付', num: '', to: 'serviced', active: 0 },
		EVALUATED: { id: 3, name: '已完成', num: '', to: 'evaluated', active: 0 },

		STANDBY: { id: 4, name: '待服务', num: '', to: 'ended', active: 0 },
		PAYING: { id: 5, name: '待支付', num: '', to: 'paying', active: 0 },
	},
	// 当前的状态id
	current_status: 'STANDBY',
	// 列表数据
	clistData: null,
	// 需要分页的列表
	clist: null, 
	allList: null, //所有订单列表
	// 订单详情
	orderDetail: null,
	// 服务的列表
	servicesData: null,
}
const getters = {
	/**
	 * version 2.0
	 */
	 topTitle: state => state.topTitle,
	 showSubNavs: state => state.showSubNavs,
	 subNavs: state => state.subNavs,

	 statusData: state => state.statusData,
	 current_status: state => state.current_status,
	 allStatus: state => state.allStatus,

	 clistData: state=> state.clistData,
	 clist: state => state.clist, //下拉刷新列表
	 allList: state => state.allList,

	 orderDetail: state => state.orderDetail,
	 servicesData: state => state.servicesData,
}
const actions = {
	/**
	 * version 2.0
	 */
	showit({ commit }){
		commit(types.SHOW_SUBNAVS);
	},
	switchTab({ commit }, data){
		api.Get('shopApi/order/index/'+data).then(res=>{
			res.error_code || commit(types.SWITCH_TAB, res.data);
		});
	},
	initStatus({ commit, state}){
		api.pGet('shopApi/order/index/' + state.current_status).then(res=>{
			res.error_code || commit(types.INIT_STATUS, res.data);
		});
	},
	async getData({ commit }, data){
		let res = await(api.Get(data.url));
		if(!res.error_code){
			commit(types.DATA, { name: data.name, data: res.data })
		}
		console.log('获取订单服务器数据： ' + data.name, res);
	},
}
const mutations = {
	/**
	 * version 2.0
	 */
	// 控制子导航显示与否
	[types.SHOW_SUBNAVS](state){
		state.showSubNavs = !state.showSubNavs;
	},
	// 切换订单状态
	[types.SWITCH_TAB](state, data){
		state.current_status = data.current_status;

		state.clistData = null;
		state.clist = null;

		state.clistData = data.list;
		state.clist = data;
	},
	// 初始化订单状态相关数据
	[types.INIT_STATUS](state, data){
		if(data){
			for(let i in data.overview_count){
				state.statusData[i].num = data.overview_count[i];
			}
			state.current_status = data.current_status;
			state.clistData = data.list;
			state.clist = data;
		}
	},
	// 设置数据
	[types.DATA](state, data){
		state[data.name] = data.data;
		console.log('设置数据mutations '+data.name, data.data);
	},
}

export default {
	namespaced: true,
	state, getters, mutations, actions
}