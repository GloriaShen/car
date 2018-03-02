import * as api from '../../service/getData'
import * as types  from '../mutation-types'

const state = {
	showSubNavs: false,
	current: 'routine',
	titles: {
		title: '日常处理',
		fclick: false,
		icon: false
	},
	subNavs: {
		routine: { id: 1, name: '日常处理', to: 'routine', active: 1 },
		invoice: { id: 2, name: '发票管理', to: 'invoice', active: 0 },
		creditcard: { id: 3, name: '银行卡管理', to: 'creditcard', active: 0 },
		count: { id: 4, name: '财务统计', to: 'count', active: 0 },
	},
	cash: 0, //可提取的最大金额
	cashApplyConfig: null,
	creditList: null,
	invoiceIndex: null, //发票首页
	// invoiceLog: null, //发票记录
}
const getters = {
	titles: state => state.titles,
	showSubNavs: state => state.showSubNavs,
	subNavs: state => state.subNavs,
	cash: state => state.cash,
	cashApplyConfig: state => state.cashApplyConfig,
	creditList: state => state.creditList,
	invoiceIndex: state => state.invoiceIndex,
	// invoiceLog: state => state.invoiceLog,
}
const actions = {
	initTitle({ commit }, data){
		commit(types.INIT_TITLE, data);
	},
	showit({ commit }){
		commit(types.SHOW_SUBNAVS);
	},
	setCash({ commit }, data){
		commit(types.SET_CASH, data);
	},
	async getData({ commit }, data){
		let res = await(api.Get(data.url));
		if(!res.error_code){
			commit(types.DATA, { name: data.name, data: res.data })
		}
		console.log('获取服务器数据： ' + data.name, res);
	},
	async getCreditList({ commit }, url){
		let res = await(api.Get(url));
		let data = res.data.list, temp = null;
		if(data.length){
			for(let i in data){
				temp = data[i].account;
				data[i].account = temp.substr(temp.length-4);
				switch(data[i].bank_type){
					case '建设银行':
						data[i].abbr = 'js';
					break;
					case '工商银行':
						data[i].abbr = 'gs';
					break;
					case '农业银行':
						data[i].abbr = 'ny';
					break;
					case '招商银行':
						data[i].abbr = 'zs';
					break;
				}
			}
			console.log('获取银行卡列表服务器数据:', data);
			commit(types.DATA, { name: 'creditList', data: data });
		}
	},
}
const mutations = {
	// 初始化标题
	[types.INIT_TITLE](state, data){
		data && (state.titles = {...state.titles, ...data.title});
		
		state.subNavs[state.current] && (state.subNavs[state.current].active = 0);
		state.subNavs[data.current] && (state.subNavs[data.current].active = 1);

		state.current = data.current;
		state.showSubNavs = false;
	},
	// 控制子导航显示与否
	[types.SHOW_SUBNAVS](state){
		state.showSubNavs = !state.showSubNavs;
	},
	// 设置最大的提取现金金额
	[types.SET_CASH](state, data){
		state.cash = data;
	},
	[types.DATA](state, data){
		console.log('获取数据 '+ data.name, data.data);
		state[data.name] = data.data;
	},
}

export default {
	namespaced: true,
	state, getters, mutations, actions
}