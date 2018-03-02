<template>
	<div class="count cxh">
		<div class="top-fixed">
			<orderTitle :configTitle="configTitle"></orderTitle>
		</div>
		<template v-if="clistData">
			<div class="lritem cb-lritem" v-if="timeSpan">
				<div>
					<span class="start-time">{{ timeSpan.begin_datetime }}</span> -
					<span class="end-time">{{ timeSpan.end_datetime }}</span>
				</div>
				<div>共{{ timeSpan.totals }}条</div>
			</div>
			<div class="order-section" >
				<clist v-if="timeSpan.totals" :list="clistData" :cnext="next" :clistConf="clistConf"></clist>
				<div v-else class="noData">没有数据</div>
			</div>
		</template>
	</div>
</template>
<script>
	import {  mapActions } from 'vuex'
	import orderTitle from '@/components/titleQuery'
	import clist from '@/components/list'

	export default {
		data(){
			return {
				showNavs: false,
				clistData: null,
				timeSpan: null,
	            next: 0,
			}
		},
		computed: {
			configTitle: function(){
				let days = this.$route.query.days;
				return { 
	                titles: {
	                	title: '已完成',
	                	fclick: true
	                },
	                path: '/order/count/brief',
	                subNavs: {
						STANDBY: { id: 1, name: '待服务', to: days, active: 0 },
						PAID: { id: 2, name: '待评价', to: days, active: 0 },
						EVALUATED: { id: 3, name: '已完成', to: days, active: 0 },
	                }
	            };
			},
			clistConf: function(){
				return {
					status: 1,
	            	tips: 1,
	            	to: '/order/detail',
	            	url: 'shopApi/order/all/' + this.type + '?days=' + this.$route.query.days
				}
			},
		},
		components: {
			orderTitle, clist,
		},
		created(){
			this.Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			});
			this.type = this.$route.query.type;
			this.init();
		},
		methods: {
			...mapActions('order', ['switchTab']),
			...mapActions(['showit']),
			init(param){
				// console.log('请求过滤数据:', this.type);
				this.getList(this.type);
			},
			async getList(){
				let res = await(this.Get('shopApi/order/all/' + this.type + '?days=' + this.$route.query.days ));
				if(!res.error_code && res.data){
					this.clistData = res.data.list;
					this.timeSpan = res.data.timespan;
					this.next = res.data.next;
					this.Indicator.close();
				}
			}
		},
		watch: {
			'$route' (to, from) {
				this.type = to.query.type.toLocaleUpperCase();
                this.getList();
            }
		}
	}
</script>
<style lang="scss" scoped>
	.cb-lritem{
		line-height: .7rem;
		padding: 0 .2rem;
		span{
			display: inline-block;
		}
	}
	.count-navs{
		top: .85rem;
	}
	.mask{
		top: 2.1rem;
	}
</style>