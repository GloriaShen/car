<template>
	<div class="role">
		<carTitle :configTitle="configTitle"></carTitle>
		<router-link class="title-link" to="/role/detail">新增</router-link>
		<div class="section bdt" >
			<clist v-if="clistData" :data="clistData"  :clistConf="clistConf"></clist>
			<div v-if="noData" class="noData">没有数据</div>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import carTitle from '@/components/title'
	import clist from '@/components/peopleList' 
	export default {
		data(){
			return {
				configTitle: { 
	                title: '角色管理',
	                fclick: false
	            },
	            clistConf:{
	            	status: 1,
	            	to: '/role/detail',
	            	url: 'shopApi/employee/role/index',
	            	name: 'role'
	            },
			}
		},
		computed:{
			...mapGetters('manage', ['roleList']),
			clistData: function(){
				if(this.roleList){
					this.Indicator.close();
					return this.roleList;
				}
				return null;
			},
			noData: function(){
				return this.roleList ? !this.roleList.length : false;
			}
		},
		created(){
			this.Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			});
			let config = {
				url: 'shopApi/employee/role/index',
				name: 'roleList'
			};
			this.$store.dispatch('manage/getData', config);
			// 初始化权限和角色列表
			this.$store.dispatch('manage/initPermissions', 1);
		},
		components:{
			carTitle, clist
		}
	}
</script>
<style lang="scss">
	@import '../../static/style/others';
</style>