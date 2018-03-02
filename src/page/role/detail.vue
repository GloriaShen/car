<template>
	<div class="role" v-if="dpermissions">
		<carTitle :configTitle="configTitle"></carTitle>
		<div v-if="cid" class="title-link" @click="deleteIt">删除</div>
		<template v-if="show">
			<div class="section bdt">
				<ul class="list-required">
					<li>
						<i class="required">*</i><label :class="{ error: err_rolename }">角色名称</label>
						<input type="text" name="rolename" placeholder="请输入角色名称"  v-model="rolename" @focus="focus">
					</li>
					<li>
						<i class="required">*</i><label>选择权限</label>
						<div class="permission">
							<div class="item" v-for="(item, index) in dpermissions">
								<input type="checkbox" :id="'p'+item.id"  :value="item.name" v-model="item.checked"><i></i>
								<label :for="'p'+item.id">{{ item.name }}</label>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="section-nbg box100">
				<div class="btn100 radius" @click="save">{{ btnTxt }}</div>
			</div>
		</template>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import carTitle from '@/components/title'
	export default {
		data(){
			return {
				configTitle: { 
	                title: '新增角色',
	                fclick: false
	            },
	            rolename: '',
	            btnTxt: '',
	            show: false,
	            err_rolename: 0,
			}
		},
		computed: {
			...mapGetters('manage', {
				'dpermissions': 'permissions'
			}),
			cid: function(){
				let id = this.$route.query.id;
				this.btnTxt = id ?'保存修改':'完成';
				return id;
			},
		},
		created(){
			
			this.dpermissions || this.$store.dispatch('manage/initPermissions');
			// console.log('cid:', this.cid);
			if(this.cid == undefined){
				this.show = true;
			}else{
				this.Indicator.open({
				  text: '加载中...',
				  spinnerType: 'fading-circle'
				});
				this.init();
			}
		},
		methods: {
			getChecked(){
				let temp = this.dpermissions.filter(item => item.checked).map(item => item.id);
				return temp.join(',');
			},
			async init(){
				let self = this;
				self.configTitle.title = '角色详情';
				let res = await(this.Get('shopApi/employee/role/'+self.cid));
				// console.log('角色详情：', res);
				if(!res.error_code){
					this.Indicator.close();
					self.rolename = res.data.display_name;
				}
				
				if(self.dpermissions){
					Object.keys(res.data.perms).length && res.data.perms.map(perm => {
						self.dpermissions.map(item=>{
							( item.id == perm.id ) && ( item.checked = true );
						});
					});
				}
				this.show = true;
				this.Indicator.close();
			},
			focus(){
				this.error = 0;
			},
			async deleteIt(){
				this.Indicator.open({
				  text: '删除中...',
				  spinnerType: 'fading-circle'
				});
				let self = this;
				let res = await(this.Delete('/shopApi/employee/role/' + this.cid));
				if(!res.error_code){
					let config = {
						url: 'shopApi/employee/role/index',
						name: 'roleList'
					};
					this.$store.dispatch('manage/getData', config);
					setTimeout(function(){
						self.Indicator.close();
						window.location.href = '/role';
					},500);
				}
			},
			async save(){
				let permission = this.getChecked();
				this.rolename || (this.err_rolename = 1);

				if(this.rolename && permission){
					this.btnTxt = this.cid ?  '修改中···' : '正在添加···';
					let data = {
						name: this.rolename, 
						permissions: permission
					}
					let url = this.cid ? ('shopApi/employee/role/'+ this.cid) : 'shopApi/employee/role/create';
					let res = await(this.Post(url, data));
					if(!res.error_code){
						//成功之后跳转到角色列表
						let config = {
							url: 'shopApi/employee/role/index',
							name: 'roleList'
						};
						this.$store.dispatch('manage/getData', config);
						setTimeout(function(){
							window.location.href = '/role';
						}, 1000);
					}else{
						this.btnTxt = '修改失败，请重试';
						setTimeout(function(){
							window.location.reload();
						}, 1000);
					}
				}
			}
		},
		components:{
			carTitle,
		}
	}
</script>
<style lang="scss" scoped>
	@import '../../static/style/others';
	.permission{
		.item{
			margin:  .1rem 0 .1rem .15rem;
		}
	}
	
</style>