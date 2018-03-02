<template>
	<div class="financial cxh">
		<div class="top-fixed">
			<carTitle :configTitle="configTitle"></carTitle>
			<div class="back2home" @click="back2home">关闭</div>
		</div>
		<div class="section bdt" v-if="fund.total.val!=''">
			<mTitle :mtitle="titles.fund"></mTitle>
			<div class="average" >
				<template v-for="(item, index) in fund">
					<div class="item" ><span>¥{{item.val}}</span>{{item.name}}</div>
				</template>
			</div>
		</div>
		<div class="section" v-if="orderList.length">
			<mTitle :mtitle="titles.order"></mTitle>
			<clist :list="orderList" :cnext="next" :clistConf="clistConf" ></clist>
		</div>
	</div>
</template>
<script>
	import carTitle from '@/components/title'
	import mTitle from '@/components/mTitle'
	import clist from '@/components/list'
	export default {
		data(){
			return {
				configTitle: { 
	                title: '日常处理',
	                fclick: true
	            },
				titles: {
					fund: {
						title: '今日资金',
						borderLeft: 'bl'
					},
					order: {
						title: '今日订单',
						borderLeft: 'bl'
					}
				},
				fund: {
					total: { name: '全部', val: '' },
					income: { name: '收入', val: '' },
					expend: { name: '支出', val: '' },
				},
				orderList: [
				
				],
				clistConf:{
	            	status: 1,
	            	to: '/order/detail',
	            	url: 'shopApi/finance/index'
	            },
	            next: 0,
			}
		},
		created(){
			this.Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			});
			let self = this;
			this.pGet('shopApi/finance/index').then(res=>{
				res.error_code || self.init(res.data);
			});
		},
		methods: {
			init(data){
				let overview = data.overview_financial;
				for(let i in overview){
					this.fund[i].val = overview[i];
				}
				this.orderList = [...data.list];
				this.Indicator.close();
			},
			back2home(){
                hx.finishWebview && hx.finishWebview();
            }
		},
		components:{
			carTitle, mTitle, clist
		}
	}
</script>