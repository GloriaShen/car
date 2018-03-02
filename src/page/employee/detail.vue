<template>
	<div class="employee cxh">
		<div class="top-fixed">
			<carTitle :configTitle="configTitle"></carTitle>
			<router-link class="title-link" :to="{path: '/employee/edit', query: { id: cid  }}">编辑</router-link>
		</div>
		<div class="section bdt" v-if="employee">
			<ul class="list" >
				<li>
					<div class="lritem">
						<label>头像</label>
						<img class="avatar" :src="employee.avatar">
					</div>
				</li>
				<li>
					<label>姓名</label>{{ employee.username }}
				</li>
				<li>
					<label>手机</label>{{ employee.phone }}
				</li>
				<li>
					<label>工号</label>{{ employee.job_number }}
				</li>
				<li>
					<label>年龄</label><template v-if="employee.age">{{ employee.age }}</template><span v-else>未填写</span>
				</li>
				<li>
					<label>个人描述</label>
					<p>{{ employee.desc }}</p>
				</li>
				<li><label>角色</label>{{ employee.role }}</li>
				<!-- <li><label>权限</label>{{ employee.permission }}</li> -->
			</ul>
			<div v-if="tid"></div>
		</div>
	</div>
</template>
<script>
	import { mapGetters, mapActions } from 'vuex'
	import carTitle from '@/components/title'
	export default {
		data(){
			return {
				configTitle: { 
	                title: '员工详情',
	                fclick: false
	            },
	            
			}
		},
		computed: {
			...mapGetters('manage', [ 'employee', 'roles']),
			tid: function(){
				let tid = this.employee && this.employee.id;
				tid && this.Indicator.close();
				return tid;
			},
			cid: function(){
				return this.$route.query.id;
			}, 
		},
		created(){
			

			let self = this;
			if(!self.employee){
				this.Indicator.open({
				  text: '加载中...',
				  spinnerType: 'fading-circle'
				});
				self.$store.dispatch('manage/initEmployee', self.cid);
			}
			// 如果角色列表无数据，则初始化之。
			self.roles || self.$store.dispatch('manage/initRoles');
		},
		mounted(){
			console.log('employee: ',this.employee);
				this.employee && this.Indicator.close();
		},
		methods: {
		},
		components:{
			carTitle,
		}
	}
</script>
<style lang="scss" scoped>
	@import '../../static/style/b.config';
	.bdt{
	    border-top: 1px solid $bdColor;
	}
	.section{
		padding-top: 0;
	}
	.avatar{
		width: 1.2rem; height: 1.2rem;border-radius: 100%;
	}
	.lritem{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.list{
		li{
			@extend .bdt;
			padding: .25rem 0;
			&:nth-child(1){
				border-top: 0;
			}
		}
		label{
			margin-right: .35rem;
			color: $color3;
		}
	}
</style>