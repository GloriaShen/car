<template>
	<div class="set">
		<carTitle :configTitle="configTitle"></carTitle>
		<div class="section">
			<ul class="list-required">
				<li>
					<verify ref="editUser"></verify>
				</li>
				<li>
					<i class="required">*</i><label>新密码</label>
					<input type="text" name="newpsd" value="" v-model="newpsd">
				</li>
				<li>
					<i class="required">*</i><label>确认密码</label>
					<input type="text" name="confirmpsd" value="" v-model="confirmpsd">
				</li>
			</ul>
		</div>
		<div class="section-nbg box100">
			<div class="btn100 radius" @click="save">确认</div>
		</div>
	</div>
</template>
<script>
	import { mapActions } from 'vuex'
	import carTitle from '@/components/title'
	import verify from '@/components/verify'
	export default {
		data(){
			return {
				configTitle: { 
	                title: '修改密码',
	                fclick: false
	            },
	            newpsd:'',
	            confirmpsd: '',
		
			}
		},
		
		created(){
			let self = this;
			let config = {
				url: 'shopApi/finance/index',
				callback: function(data){
					
				}
			}
			self.init(config);

			
		},
		methods: {
			...mapActions(['']),
			init(){

			},
			save(){
				let verifyCode = this.$refs.editUser.getCode();
				let data = {
					verifyCode: verifyCode,
					newpsd: this.newpsd,
					confirmpsd: this.confirmpsd
				}
				console.log('修改密码：',data);
			}
			
		},
		components:{
			carTitle, verify,
		}
	}
</script>
<style lang="scss">
	@import '../../static/style/common';
	@import '../../static/style/others';
</style>