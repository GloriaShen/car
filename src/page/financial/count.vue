<template>
	<div class="financial">
		<div class="top-fixed">
			<carTitle :configTitle="configTitle"></carTitle>
			<!-- <router-link class="title-link" to="/financial/count/export">导出</router-link> -->
		</div>
		
		<div class="section bdt">
			<mTitle :mtitle="titles.default"></mTitle>
			<div class="order-table" id="mainCharts">
			</div>
		</div>
		<div class="section">
			<mTitle :mtitle="titles.countBrief"></mTitle>
			<div class="average">
				<template v-for="(item, index) in fund">
					<div class="item" ><span>{{item.val}}</span>{{item.name}}</div>
				</template>
			</div>
		</div>
		<div class="section">
			<mTitle :mtitle="titles.countAnaysis"></mTitle>
			<div v-if="tableData.title.length>1" class="table">
				<table>
					<table>
						<thead>
						<tr>
							<th v-for="item in tableData.title">{{ item }}</th>
						</tr>
						</thead>
						<tbody>
							<tr>
								<td v-for="item in tableData.money">{{ item }}</td>
							</tr>
							<tr>
								<td v-for="item in tableData.percent">{{ item}}</td>
							</tr>
						</tbody>
					</table>
				</table>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapActions } from 'vuex'
	import carTitle from '@/components/title'
	import mTitle from '@/components/mTitle'
	export default {
		data(){
			return {
				echarts: null,
				configTitle: { 
	                title: '财务统计',
	                fclick: true,
	            },
				titles: {
					default: {
						title: '下单统计',
						borderLeft: 'bl'
					},
					countBrief: {
						title: '统计概览',
						borderLeft: 'bl'
					},
					countAnaysis:{
						title: '分析统计',
						borderLeft: 'bl'
					}
				},
				fund: {
					sales_amount: { name: '当期销售总额', val: '' },
					rise_rate: { name: '同比上期涨幅', val: '' },
					period_profit: { name: '当期净利润', val: '' },
				},
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
	                        // rotate:45,//倾斜度 -90 至 90 默认为0  
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
						{ type: 'line',smooth: true, seriesLayoutBy: 'row' },
					]
				},
				tableData: {
					title:['项目'] ,
					money: ['销售额'],
					percent: ['销售占比']
				},
			}
		},
		created(){
			this.Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			});
			let self = this;
			this.pGet('shopApi/finance/stat').then(res=>{
				console.log('财务统计： ', res);
				this.Indicator.close();
				 res.error_code ||  self.countOrder(res.data);
			});
		},
		methods: {
			// ...mapActions(['init']),
			countOrder(countData){
				let self = this;
				// 折线图部分
				let temp = [], charts = countData.charts, types = charts.types;
				temp.push(['日期', ...charts.date]);
				for(let i in types){
					temp.push([types[i], ...charts['type-' + i]]);
				}
				console.log(temp);
				self.$nextTick(function(){
					this.countOption.dataset.source = temp;
					this.echarts || ( this.echarts = echarts.init(document.getElementById('mainCharts')) );
					if (this.countOption && typeof this.countOption === "object") {
					    this.echarts.setOption(this.countOption, true);
					}
				});
				// 统计概览部分
				for(let j in  countData.overview){
					this.fund[j].val = countData.overview[j];
				}
				// 分析统计部分
				for(let m in countData.tables){
					this.tableData.title.push(countData.tables[m].name);
					this.tableData.money.push(countData.tables[m].sales_amount);
					this.tableData.percent.push(countData.tables[m].percentage);
				}
			},
		},
		components: {
			carTitle, mTitle
		}
	}
</script>
<style lang="scss" scoped>
	@import '../../static/style/common';
	#mainCharts{
		width: 100%;height: 7.3rem;
		margin: 0 auto;
	}
	.table{
		padding-bottom: .3rem;
	}
	table{
		width: 100%;
		border-spacing: 0;
		border: 1px solid #e6e6e6;
		border-top: 0;
		text-align: center;
		tr{
			border-top:1px solid #e6e6e6;
			/*&:nth-child(1){
				td{
					border-top: 0;
				}
			}*/
		}
		tbody{
			td{
				border-top:1px solid #e6e6e6;
			}
		}
		th, td{
			height: .7rem;
			border-left: 1px solid #e6e6e6;
			&:nth-child(1){
				border-left: 0;
			}
		}
	}
	.table{

	}
</style>