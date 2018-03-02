import * as api from '../../service/getData'
import * as types  from '../mutation-types'

const state = {
	mockPermissions: {
        "1": "订单管理",
        "2": "财务管理",
        "3": "员工管理",
        "4": "服务管理"
    },
    mockRoles: [
    	{id: 1, display_name: "角色1"},
    	{id: 2, display_name: "角色2"},
    	{id: 3, display_name: "角色3"},
    	{id: 4, display_name: "角色4"},
    ],
    permissions: null, //权限
    roles: null, //角色
    employee: null ,//员工详情
    roleList: null, // 角色列表
    employeeList: null, //员工列表
    serviceList: null,  //服务列表
    serviceDetail: null, //服务详情
    serviceSubnavs: null, //服务二级导航
    myBrands: null,// 我擅长的品牌
    brands: null, //品牌列表
    categories: null, //类别
}
const getters = {
	permissions: state => state.permissions,
	roles: state => state.roles,
	rolesObj: state => {
		let temp = {};
		state.roles && state.roles.map(item=>{
			temp[item.id] = item;
		});
		return temp;
	},
	permissionsObj: state => {
		let temp = {};
		state.permissions && state.permissions.map(item=>{
			temp[item.id] = item;
		});
		return temp;
	},
	employee: state => state.employee,
	employeeList: state => state.employeeList,
	roleList: state => state.roleList,
	serviceList: state => state.serviceList,
	serviceDetail: state => state.serviceDetail,
	serviceSubnavs: state => state.serviceSubnavs,
	myBrands: state => state.myBrands,
	brands: state => state.brands,
	categories: state => state.categories,
}
const actions = {
	async initPermissions({ commit }, clear){
		let res = await(api.Get('/shopApi/employee/permissions'));
		// console.log('请求服务器的权限列表: ',res);
		let temp = [], cdata = null;
		cdata = res.error_code ? state.mockPermissions : res.data;
		for(let i in cdata){
			temp.push({ id: i, name: cdata[i], checked: false });
		}
		commit(types.PERMISSIONS, { permissions: temp, clear: clear || 0 });
	},
	async initRoles({ commit }, clear){
		let res = await(api.Get('/shopApi/employee/role/index'));
		// console.log('请求服务器的角色列表: ',res);
		let temp = [], cdata = null;
		cdata = res.error_code ? state.mockRoles : res.data.list;
		cdata.map(item => {
			temp.push({ id: item.id, name: item.display_name, checked: false });
		});
		commit(types.ROLES, { roles: temp, clear: clear || 0 });
	},
	async initEmployee({ commit }, cid){
		let res = await(api.Get('shopApi/employee/' + cid));
		if(!res.error_code){
			commit(types.EMPLOYEE, res.data);
		}else{
			console.log('获取员工详情失败：', res);
		}
	},
	async getData({ commit }, data){
		let res = await(api.Get(data.url));
		if(!res.error_code){
			commit(types.DATA, { name: data.name, data: res.data, type: data.type })
		}
		console.log('获取管理类服务器数据： ' + data.name, res);
	},

}
const mutations = {
	[types.PERMISSIONS](state, data){
		state.permissions = data.permissions;
		data.clear && ( state.employee = null );
		// console.log('permissions temp:',data.permissions);
	},
	[types.ROLES](state, data){
		state.roles = data.roles;
		data.clear && ( state.employee = null );
		console.log('roles temp:', data.roles);
	},
	[types.EMPLOYEE](state, data){
		state.employee = data;
		console.log('employee temp:', data);
	},
	[types.DATA](state, data){
		console.log('mutations data:', data);
		if(data.type == 'serviceIndex'){
			let subs = {}, categoryList = data.data.category_list, cid = data.data.current_category;
			for(let i in categoryList){
				subs[i] = { name: categoryList[i], to: i, active: 0 }
			}
			// console.log('cid:', cid);
			subs[cid].active = 1;
			state.serviceSubnavs = subs;
			state.serviceList = data.data;
			state.serviceDetail = null;
			console.log('manage subNavs: ', state.serviceSubnavs);
			// console.log('manage serviceList: ', state.serviceList);
		}else{
			state[data.name] = data.data;
		}
		console.log('当前数据'+data.name, data.data);
	}
}

export default{
	namespaced: true,
	state, getters, mutations, actions
}