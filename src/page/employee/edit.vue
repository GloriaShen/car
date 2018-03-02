<template>
	<div class="employee cxh">
		<div class="top-fixed">
			<carTitle :configTitle="configTitle"></carTitle>
			<div v-if="cid" class="title-link" @click="deleteIt">删除</div>
		</div>
		<template v-if="employee">
			<div class="section bdt">
				<ul class="list-required">
					<li>
						<div class="lritem">
							<div><i class="required">*</i><label :class="{ error: error.avatar }">头像</label></div>
							<div class="r upload-box">
								<img v-if="employee.avatar" class="avatar" :src="employee.avatar">
								<div v-else class="upload"></div>
								<img v-if="imgloading" class="imgloading"  src="../../static/images/loading.gif" alt="loading">
								<input type="file" ref="avatar" name="avatar" @change="onFileChange" accept="image/jpeg,image/x-png,image/gif" >
							</div>
						</div>
					</li>
					<li>
						<i class="required">*</i><label :class="{ error: error.username }">姓名</label>
						<input @focus="focus('username')" @blur="blur('username')" type="text" name="username"  v-model="employee.username" placeholder="请输入姓名">
					</li>
					<li>
						<i class="required">*</i><label :class="{ error: error.phone }">手机</label>
						<input @focus="focus('phone')" @blur="blur('phone')" type="number" name="phone"  v-model="employee.phone" placeholder="请输入手机号">
					</li>
					<li>
						<label :class="{ error: error.job_number }">工号</label>
						<template v-if="cid">{{employee.job_number}}</template>
						<input @focus="focus('job_number')" @blur="blur('job_number')" v-else type="number" name="job_number"  v-model="employee.job_number" placeholder="请输入工号">
					</li>
					<li>
						<label :class="{ error: error.age }">年龄</label>
						<input @focus="focus('age')" @blur="blur('age')" type="number" name="age" min="16" max="60"   v-model="employee.age" placeholder="请输入年龄">
					</li>
					<li>
						<label :class="{ error: error.desc }">个人描述</label>
						<div class="textarea">
							<textarea @focus="focus('desc')" @blur="blur('desc')" v-model="employee.desc" placeholder="请输入个人描述">
								
							</textarea>
						</div>
					</li>
					<li>
						<i class="required">*</i><label :class="{ error: error.role_id }">角色</label>
						<div class="permission">
							<div class="item" v-for="(item, index) in currentRoles">
								<label :for="'p'+item.id">
									<input type="radio" name="role" :id="'p'+item.id"  :value="item.id" checked=''  v-model="picked"><i></i>
									{{ item.name }}
								</label>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="section-nbg box100" v-if="employee">
				<div class="btn100 radius" @click="save">{{ btnTxt }}</div>
			</div>
		</template>
	</div>
</template>
<script>
	
	import { mapGetters,mapActions } from 'vuex'
	import carTitle from '@/components/title'
	import {uploadImg} from '../../service/getData'
	import { RULES } from '../../static/js/rules'
	// 需要验证的项
	let verifyNames = {
		avatar: 'isNotEmpty',
    	username: 'isNotEmpty',
    	phone: 'isMobile',
    	job_number: 'isNotEmpty',
    	age: 'isNotEmpty',
    	desc: 'isNotEmpty',
    	role_id: 'isNotEmpty'
	}
	export default {
		data(){
			return {
				configTitle: { 
	                title: '新增员工',
	                fclick: false
	            },
	            file: null,
	            employeeEmpty: {
	            	avatar: '',
					username: '',
					phone: '',
					job_number: '',
					age: '',
					desc: '',
					role_id: '',
					role_name: '',
					permission_ids: '',
	            },
	            employee: null,
	            imgloading: false,
	            error: {
	            	avatar: 0,
	            	username: 0,
	            	phone: 0,
	            	job_number: 0,
	            	age: 0,
	            	desc: 0,
	            	role_id: 0,
	            },
	            picked: '',
	            btnTxt: '完成',
			}
		},
		computed: {
			...mapGetters('manage', [ 'roles',]),
			...mapGetters('manage', {
				demployee: 'employee'
			}),
			currentRoles: function(){
				let self = this;
				if(this.roles){
					if(this.demployee){
						// 如果是员工编辑，则默认选中
						this.roles.map(item=>{
							(item.name == self.demployee.role) && ( this.picked = item.id );
						});
					}
					console.log('this.roles;', this.roles);
					return this.roles;
				}
			},
			cid: function(){
				return this.$route.query.id;
			},
		},
		created(){
			let self = this;
			console.log('self.employee: ',self.employee);
			;
			// 如果角色列表无数据，则初始化之。
			self.currentRoles || self.$store.dispatch('manage/initRoles');
			
			console.log('this.employee:', this.employee);

			if(self.cid){
	            this.configTitle.title = '员工编辑';
	            // 如果无用户数据，初始化之。
				if(self.demployee){
					self.employee = self.demployee;
				}else{
					self.getEmployee()
				}
				console.log('edit employee: ', this.employee);
			}else{
				this.employee = this.employeeEmpty;
				console.log('新增员工！～～～');
			}
			
		},
		methods: {
			onFileChange(e) {
				let self = this;
		        let files = e.target.files || e.dataTransfer.files,
		        	fileSize = files[0].size / 1024;
		        if (!files.length)  return;
		        console.log('fileeeeee:', files[0]);
		        if(fileSize > 2048){
		        	alert('请不要上传大于2M的照片');
		        }else{
		        	self.imgloading = true;
		        	let data = {
						file: files[0],
						width: 100,
						height: 100,
						callback: function(res){
							console.log('图片上传结果：', res);
							self.imgloading = false;
							self.employee.avatar = res.path;
							self.error.avatar = 0;
						}
					}
			        uploadImg(data);
		        }
		    },
			async deleteIt(){
				this.Indicator.open({
				  text: '删除中...',
				  spinnerType: 'fading-circle'
				});
				let self = this;
				let res = await(this.Delete('/shopApi/employee/' + this.cid));
				console.log('delete res: ', res);
				if(!res.error_code){
					self.Indicator.close();
					window.location.href = '/employee';
				}
			},
			async getEmployee(){
				this.Indicator.open({
				  text: '加载中...',
				  spinnerType: 'fading-circle'
				});
				let self = this;
				let res = await(this.Get('shopApi/employee/' + self.cid));
				if(!res.error_code){
					this.Indicator.close();
					self.employee = res.data;
				}else{
					console.log('获取用户数据:', res);
				}
				self.$store.dispatch('manage/initEmployee', self.cid);
			},
			focus(name){
				this.error[name] = 0;
			},
			blur(name){
				let result = RULES[verifyNames[name]](this.employee[name]);
				result || (this.error[name] = 1);
			},
			// 验证
			verify(){
				let result = true, verifyData = null, cre = null;
				for(let i in verifyNames){
					verifyData = this.employee[i];
					cre = RULES[verifyNames[i]](verifyData);
					result = result && cre;
					cre || (this.error[i] = 1);
					console.log( i + ' result: ', result);
				}
				return result;
			},
			// 获取角色id
			getRoleId(){
				let self = this;
				let temp = this.currentRoles.filter(item => item.id == self.picked).map(item => item.id);
				return temp[temp.length-1];
			},
			async save(){
				let self = this;
				this.employee.role_id = ''+this.getRoleId();
				let data = this.employee;
				delete data.role_name;
				delete data.permission_ids;
				console.log('提交的数据：', data);

				let verifyResult = this.verify();
				console.log('verifyResult:', verifyResult);
				if(verifyResult){
					this.Indicator.open({
					  text: '提交中...',
					  spinnerType: 'fading-circle'
					});
					this.btnTxt = '提交中···';
					// 验证通过提交用户数据
					let res = await(this.Post('/shopApi/employee' + (this.cid ? '/'+this.cid : ''), data));
					console.log('res: ', res);
					if(!res.error_code){
						//成功之后跳转到角色列表
						let config = {
							url: 'shopApi/employee/list',
							name: 'employeeList'
						};
						this.$store.dispatch('manage/getData', config);
						setTimeout(function(){
							self.Indicator.close();
							window.location.href = '#/employee';
						}, 1000);
					}else{
						console.log('提交失败:', res);
						this.btnTxt = '完成';
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
	.lritem{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.upload-box{
		width: 1.2rem;
	}
	.avatar, .upload{
		width: 1.2rem; height: 1.2rem;border-radius: 100%;
	}
	.upload{
		background-size: .5rem;
	}
	.permission{
		.item{
			width: 50%;
			padding-left: .2rem;
			margin:  .1rem 0;
		}
	}
</style>