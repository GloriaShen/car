<template>
	<div class="financial">
		<carTitle :configTitle="configTitle"></carTitle>
		<router-link class="title-link" to='/'>查看示例</router-link>
		<template v-if="supportsBank">
			<div class="section bdt">
				<div class="form-item">
					<label for="name">持卡人</label>
					<input type="text" v-model="account_name" name="name" placeholder="请输入持卡人姓名">
				</div>
				<div class="bdline"></div>
				<div class="form-item">
					<label for="bank">银行</label>
					<div class="ib">{{ bank }}</div>
					<select v-model='bank_type' @change='changeType' class='form-control'> 
						<option disabled value="">请选择</option> 
					    <option v-for="(item, index) in supportsBank" :value="index">{{item.bank_type}}</option> 
					</select>  
					<!-- <input type="text" name="bank" placeholder="请输入持卡银行"> -->
				</div>
				<div class="bdline"></div>
				<div class="form-item" >
					<label for="branch">开户支行</label>
					<input type="text" v-model="bank_branch_name" name="branch" placeholder="请输入开户支行名称" >
				</div>
				<div class="bdline"></div>
				<div class="form-item">
					<label for="creditnum">卡号</label>
					<input type="text"  v-model="account" name="creditnum" placeholder="请输入银行卡号">
				</div>
				
			</div>
			<div class="section-nbg">
				<p class="warning">*绑定银行卡的开户人，必须输入真实姓名</p>
				<div class="btn100 radius" @click="confirmBind">确认绑定</div>
			</div>
		</template>
	</div>
</template>
<script>
	import { mapActions } from 'vuex'
	import carTitle from '@/components/title'
	export default {
		data(){
			return {
				configTitle: { 
	                title: '添加银行卡',
	                fclick: false, 
	            },
	            supportsBank: null,
	            account_name: "",
				bank_type: null,
				bank_branch_name: "",
				account: '',

			}
		},
		computed: {
			bank: function(){
				return this.bank_type ? this.supportsBank[this.bank_type].bank_type : '请选择开户银行';
			},
		},
		created(){
			this.Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			});
			let self = this;
			this.pGet('shopApi/finance/bank/supports').then(res=>{
				this.Indicator.close();
				res.error_code || (self.supportsBank = res.data.list);
			});

		},
		methods: {
			changeType(ele){
				console.log(this.bank_type)
			},
			async confirmBind(){
				let self = this;
				let postData = {
					account_name: this.account_name,
					bank_id: self.supportsBank[this.bank_type].id,
					bank_branch_name: this.bank_branch_name,
					account: this.account
				}
				console.log(postData);
				let res = await(self.Post('shopApi/finance/bank/bind',postData));
				res.error_code || ( window.location.href = '#/financial/creditcard' );
			}
		},
		components: {
			carTitle,
		}
	}
</script>
<style lang="scss" scoped>
	@import '../../static/style/financial';
	.section{
		padding: .3rem .2rem .3rem;
	}
	.ib{
		display: inline-block;
	}
	.form-control{
		width: 2rem;
		opacity: 0;
		margin-left: -2rem;
	}
	.form-item{
		label{
			display: inline-block;
			width: 1.5rem;
		}
	}
	.warning{
		color: #ff3d3d;font-size: .2rem;
		background-color: #f8f8f8;
	}
</style>