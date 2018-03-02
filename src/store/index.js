import Vue from 'vue'
import Vuex from 'vuex'
import * as types  from './mutation-types'
import * as api from '../service/getData'

import order from './modules/order'
import financial from './modules/financial'
import manage from './modules/manage'

Vue.use(Vuex)

const state = {
	showSubNavs: false,
	titles: {},
	subNavs: {},
	current: '',
}
const getters = {
	showSubNavs: state => state.showSubNavs,
	titles: state => state.titles,
	subNavs: state => state.subNavs,
}
const actions = {
	initTitle({ commit }, data){
		commit(types.INIT_TITLE, data);
	},
	showit({ commit }, data){
		commit(types.SHOW_SUBNAVS, data);
	},
	refreshSubNavs({ commit }, data){
		commit(types.REFRESH_SUBNAVS, data);
	},
	async init({ commit }, data){
		let res = await(api.Get(data.url));
		if(!res.error_code){
			data.callback && typeof(data.callback)=='function' && data.callback(res.data);
		}else{
			console.log('初始化失败：', res);
		}
	},
}
const mutations = {	
	// 初始化标题
	[types.INIT_TITLE](state, data){
		data && ( state.titles = data.titles );
		state.current = data.current;
		let temp = state.current;
		state.current = data.current;
		if(data.subNavs){
			// 如果存在三级导航，则更新三级导航数据
			state.subNavs = data.subNavs;
			if(state.current){
				// 如果三级导航发生变更，则更改其选中状态
				state.subNavs[temp] && (state.subNavs[temp].active = 0);
				state.subNavs[state.current] && (state.subNavs[state.current].active = 1);
			}

		}
		state.showSubNavs = false;
	},
	// 控制子导航显示与否
	[types.SHOW_SUBNAVS](state, data){
		if(data.from == data.to){
			state.showSubNavs && (state.showSubNavs = false);
		}else{
			state.showSubNavs = !state.showSubNavs;
		}
	},
	// 日月周切换时，刷新日月周导航栏
	[types.REFRESH_SUBNAVS](state, data){
		console.log('REFRESH_SUBNAVS: '+data+ ' ; =========  current: '+ state.current);
		// 不显示subnavs
		state.showSubNavs && (state.showSubNavs = false);
		// 控制日月周的当前选中状态，以及二级导航的选中文字内容
		let temp = state.current;
		state.current = data;
		state.subNavs[temp].active = 0;
		state.subNavs[state.current].active = 1;
		state.titles.subTitles.title2.name = state.subNavs[data].name;
	},
}


const store = new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
	modules: {
		order,
		financial,
		manage
	}
});

export default store