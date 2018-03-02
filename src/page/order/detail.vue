<template>
	<div v-if="corderDetail" class="order pb cxh">
		<div class="top-fixed">
			<orderTitle v-if="configTitle"  :configTitle="configTitle"></orderTitle>
			<div v-if="cancelit" class="title-link" @click="cancelOrder">取消订单</div>
		</div>
		
		<div class="section bdt">
			<user :user="corderDetail.user"></user>
		</div>
		<primaryOrder v-if="primaryOrder" :primaryOrder="primaryOrder"></primaryOrder>
		<template  v-if="currentStatus == 'EVALUATED'">
			<div class="section">
				<invoice :invoiceData="corderDetail.invoice"></invoice>
			</div>
			<div class="section">
				<div class="lritem">
					<div>评价信息</div>
				</div>
				<comment :commentData="corderDetail.comments"></comment>
			</div>
		</template>
		<div v-if="currentStatus == 'PAYED'" class="btn100 fixed">确定已完成服务</div>
	</div> 
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import orderTitle from '@/components/titleQuery'
import user from '@/components/user'
import primaryOrder from '@/components/primaryOrder'
import invoice from '@/components/invoice'
import comment from '@/components/comment'
import { MessageBox } from 'mint-ui';

export default {
	data(){
		return {
			currentStatus:null,
			corderDetail: null,
			primaryOrder: null,
			configTitle: {
				titles: null
			},
		}
	},
	computed:{
		...mapGetters('order', [ 'allStatus' ]),
		cid: function(){
			return this.$route.query.id || 1;
		},
		cancelit: function(){
			return this.corderDetail && (this.corderDetail.order.status == 'STANDBY');
		},
	},
	created(){
		this.Indicator.open({
		  text: '加载中...',
		  spinnerType: 'fading-circle'
		});
		this.init();
	},
	methods: {
		setData(){
			// 设置当前的订单状态
			this.currentStatus = this.corderDetail.order.status == 'undefied'? 'STANDBY': this.corderDetail.order.status;
			// 根据当前的订单状态设置标题
			this.configTitle.titles = {
				title: this.allStatus[this.currentStatus].name,
				fclick: false
			}
			this.primaryOrder = {...this.corderDetail.order, service_list: this.corderDetail.service_list};
			this.Indicator.close();
		},
		init(){
			let self = this;
			self.Get('shopApi/order/' + self.cid).then(res=>{
				self.Indicator.close();
				if(!res.error_code){
					self.corderDetail = res.data;
					self.setData();
				}else{
					MessageBox.alert(res.message, '提示');
				}
			});
		},
		async cancelOrder(){
			let res = await(this.Post('shopApi/order/cancel/' + this.cid));
			if(!res.error_code){
				window.location.href = '#/order/all';
			}
		}
	},
	components: {
		orderTitle, user, primaryOrder, invoice, comment,
	},
}
</script>
<style lang="scss" scoped>
	@import '../../static/style/order';
	.section{
		padding: .2rem;
	}

	.pb{
		padding-bottom: .9rem;
	}
</style>