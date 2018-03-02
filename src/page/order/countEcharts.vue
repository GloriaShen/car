<template>
	<div class="count pt">
		<div class="top-fixed">
			<orderTitle  :configTitle="configTitle"></orderTitle>
		</div>
		<div class="block"></div>
		<template v-if="showContent">
			<div class="order-section">
				<mTitle :mtitle="titles.default"></mTitle>
				<div class="order-table" id="mainCharts"></div>
			</div>
			<div class="order-section">
				<div class="mtitle" :class="titles.brief.borderLeft">
					<router-link class="title" :to="{ path: '/order/count/brief', query: {type:1} }">{{titles.brief.title}}</router-link>
					<!-- <div class="st noarrow">
						<span class="start-time">2017.12.12</span> -
						<span class="end-time">2017.12.13</span>
					</div> -->
				</div>
				<div class="average">
					<template v-for="(item, index) in briefData">
						<router-link class="item"  :to="{ path: '/order/count/brief', query: {type: index, days: day} }"><span>{{item.num}}</span>{{item.name}}</router-link>
					</template>
				</div>
			</div>
		</template>
	</div>
</template>
<script>
	import { mapGetters, mapActions } from 'vuex'
	import orderTitle from '@/components/orderTitle'
	import mTitle from '@/components/mTitle'
	import { countOrder } from '@/service/getData'
	export default {
		data(){
			return {
				showContent: false,
				echarts: null,
				days: {
					'day': 1, 'week': 7, 'month': 30
				},
				configTitle: { 
	                title: '订单管理',
					subTitles: {
						title1: { name: '订单', path: '/order', active: 0 , link: 1},
						title2: { name: '订单统计',path: '', active: 1 , link: 0, icon: 1}
					},
					subNavs:{
						day: { id: 1, name: '日统计', to: '/order/echart', active: 0 },
						week: { id: 2, name: '周统计', to: '/order/echart', active: 0 },
						month: { id: 3, name: '月统计', to: '/order/echart', active: 0 },
					}
	            },
	            titles: {
					default: {
						title: '下单统计',
						borderLeft: 'bl'
					},
					brief: {
						title: '统计概览',
						borderLeft: 'bl'
					}
				},
				type: 0,
				countOption: {
					legend: {
						 bottom: 15,
						 itemGap: 30
					},
					grid:{
						top:0,bottom:20
					},
					tooltip: {},
					dataset: {
						source: []
					},
					xAxis: { 
						name: '时间',
						nameTextStyle:{
							width: '.1rem'
						},
						type: 'category' ,
						//设置字体倾斜  
	                    axisLabel:{  
	                        // interval:1,  
	                        rotate:45,//倾斜度 -90 至 90 默认为0  
	                        margin:10,   
	                    },
					},
					yAxis: {
						name: '数量',
					},
					grid:{
						width: '79%',
						height: '60%',
					},
					series: [
						{ type: 'line',smooth: true, seriesLayoutBy: 'row' },
						{ type: 'line',smooth: true, seriesLayoutBy: 'row' },
						{ type: 'line',smooth: true, seriesLayoutBy: 'row' },
					]
				}

			}
		},
		computed: {
			...mapGetters('order',{
				briefData: 'statusData'
			}),
			day: function(){
				return this.days[this.type];
			}
		},
		components:{
			orderTitle, mTitle,
		},
		created(){
			this.Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			});

            let temp = this.$route.path.split('/');
			this.type = temp[temp.length-1];
			this.showit({from: 99, to: this.type});
			this.init();
		},
		methods: {
			...mapActions([  'showit', 'refreshSubNavs' ]),
			// 图表数据处理
			countOrder(){
				let self = this;
				countOrder(this.type, function(res){
					self.showContent = true;
					self.Indicator.close();
					let temp = [], data = res.data;
					temp[0] = ['product', ...data.charts.date];
					for(var i in data.overview_count){
						let typei = i.toLocaleLowerCase(), typeStr = null;
						typeStr = self.briefData[i].name;
						temp.push([typeStr, ...data.charts[typei]]);
						self.briefData[i].num = data.overview_count[i];
					}
					self.$nextTick(function(){
						this.countOption.dataset.source = temp;
						this.echarts || ( this.echarts = echarts.init(document.getElementById('mainCharts')) );
						if (this.countOption && typeof this.countOption === "object") {
						    this.echarts.setOption(this.countOption, true);
						}
					});
				});
			},
			init(){
				this.configTitle.subTitles.title2.name = this.configTitle.subNavs[this.type].name;
				this.countOrder();
			}
		},
		watch: {
			'$route' (to, from) {
				let temp = to.path.split('/');
				this.type = to.params.type;
				this.refreshSubNavs(temp[temp.length-1]);
				this.countOrder();
			}
		},
	}
</script>
<style lang="scss">
	@import '../../static/style/order';
	#mainCharts{
		width: 100%;height: 7.3rem;
		margin: 0 auto;
	}
</style>