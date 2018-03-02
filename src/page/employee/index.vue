<template>
	<div class="employee">
		<carTitle :configTitle="configTitle"></carTitle>
		<div class="back2home" @click="back2home">关闭</div>
		<router-link class="title-link" to="/employee/edit">新增</router-link>
		<div class="section" >
			<clist v-if="clistData" :data="clistData"  :clistConf="clistConf"></clist>
		</div>
	</div>
</template>
<script>
	import carTitle from '@/components/title'
	import clist from '@/components/peopleList' 

	export default {
		data(){
			return {
				configTitle: { 
	                title: '员工管理',
	                fclick: false
	            },
	            clistConf:{
	            	status: 1,
	            	to: '/employee/detail',
	            	url: 'shopApi/employee/list',
	            	name: 'employee'
	            },
	            clistData: null,
			}
		},
		created(){
			this.Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			});
			let self = this;
			self.Get('shopApi/employee/list').then(res=>{
				self.Indicator.close();
				self.clistData = res.data;
			});
			// 初始化权角色列表
			this.$store.dispatch('manage/initRoles', 1);
		},
		methods:{
			back2home(){
                console.log('back2home!!!');
                hx.finishWebview && hx.finishWebview();
            }
		},
		components:{
			carTitle, clist
		}
	}
</script>
<style lang="scss">
	@import '../../static/style/others';
</style>