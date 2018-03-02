<template>
	<div class="order pt">
		<div class="top-fixed">
			<orderTitle  :configTitle="configTitle"></orderTitle>
			<div class="back2home" @click="back2home">关闭</div>
		</div>
		<div class="block"></div>
		<div class="section">
			<mTitle :mtitle="titles.default"></mTitle>
			<ul class="average">
				<template v-for="(item, index) in statusData">
					<li class="item" :class="{active: current_status == index}"  @click="switchMyTab(index)" ><span>{{item.num}}</span>{{item.name}}</li>
				</template>
			</ul>
		</div>
		<div  class="section pb">
			<mTitle :mtitle="indexMtitle"></mTitle>
			<div v-if="noData" class="noData">没有数据</div>
			<clist v-else :list="clistData" :cnext="next" :clistConf="clistConf" ></clist>
		</div>
	</div>
</template>
<script>
	import { mapState, mapGetters, mapActions } from 'vuex'
	import orderTitle from '@/components/orderTitle'
	import mTitle from '@/components/mTitle'
	import clist from '@/components/list'

	export default {
		name: 'order',
		data(){
			return {
				configTitle: { 
	                title: '订单管理',
					subTitles: {
						title1: { name: '订单', path: '/order', active: 1 , link: 0},
						title2: { name: '订单统计',path: '', active: 0 , link: 0, icon: 1}
					},
					subNavs:{
						day: { id: 1, name: '日统计', to: '/order/echart', active: 0 },
						week: { id: 2, name: '周统计', to: '/order/echart', active: 0 },
						month: { id: 3, name: '月统计', to: '/order/echart', active: 0 },
					}
	            },
	            titles: {
					default: {
						title: '订单概览',
						subtitle: '查看所有订单',
						path:'/order/all',
						borderLeft: 'bl'
					},
				},
				cur_status: 'STANDBY',
			}
		},
		computed: {
			...mapGetters('order', [ 'statusData','current_status', 'clist' ]),
			indexMtitle: function(){
				return {
					title: this.statusData[this.current_status].name,
				}
			},
			clistData: function(){
				this.Indicator.close();
				return this.clist ? this.clist.list : null;
			},
			noData: function(){
				return !this.statusData[this.cur_status].num;
			},
			showList: function(){
				
				return this.clist && this.clist.list.length;
			}, 
			clistConf: function(){
				return {
					status: 1,
	            	to: '/order/detail',
	            	ifOrderNo: false,
	            	url: 'shopApi/order/index/' + this.cur_status,
				}
			},
			next: function(){
				return this.clist ? this.clist.next : 0;
			}
		},
		created(){
			this.cur_status = this.current_status;
			this.$store.dispatch('order/initStatus');
		},
		methods:{
			...mapActions('order', [ 'switchTab', ]),
			switchMyTab(index){
				this.cur_status = index;
				this.switchTab(index);
			},
			back2home(){
                hx.finishWebview && hx.finishWebview();
            },
		},
		components: {
			orderTitle, mTitle, clist
		}
	}
</script>