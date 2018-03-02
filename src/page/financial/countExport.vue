<template>
	<div class="financial">
		<carTitle :configTitle="configTitle"></carTitle>
		<div class="section bdt">
			<mTitle :mtitle="titles.default"></mTitle>
			<ul class="water-list">
				<li v-for="(item, index) in fixedDate" class="witem" :class="{active: item.active}" @click="chooseDate(index)">{{ item.name }}</li>
			</ul>
			<div class="lritem">
				<div class="witem" :class="{active: setDateBySelf}" @click="chooseDate()">自定义</div>
				<div class="choose-time">
					<i class="date"></i>
					<span class="start-time">2017-2-12</span>
					-----
					<span class="end-time">2017-12-12</span>
				</div>
			</div>
		</div>
		<div class="section title-nbdb">
			<mTitle :mtitle="titles.exportEmail"></mTitle>
			<div class="lritem export-email">
				<input class="radius" type="text" name="email" v-model="email" placeholder="请输入你的邮箱">
			    <input class="btn100 radius" type="button" value="导出">
			</div>
		</div>
		<div class="section title-nbdb">
			<mTitle :mtitle="titles.exportMobile"></mTitle>
			<div class="btn100 radius">导出</div>
		</div>
	</div>
</template>
<script>
	import carTitle from '@/components/title'
	import mTitle from '@/components/mTitle'
	export default {
		data(){
			return {
				configTitle: { 
	                title: '导出数据',
	                fclick: false
	            },
				titles: {
					default: {
						title: '选择导出数据日期',
						borderLeft: 'bl'
					},
					exportEmail: {
						title: '导出到邮箱',
						borderLeft: 'bl'
					},
					exportMobile:{
						title: '导出到手机',
						borderLeft: 'bl'
					}
				},
				fixedDate: {
					d1: { name: '最近一周', active: 1 },
					d2: { name: '最近一月', active: 0 },
					d3: { name: '最近三月', active: 0 },
					d4: { name: '最近一年', active: 0 },
				},
				setDateBySelf: false,
				currentDate: 'd1',
				email: '',
				mobile: ''
			}
		},
		created(){
			
		},
		methods: {
			chooseDate(index){
				console.log('index:', index);
				if(index){
					// 选取固定日期
					this.setDateBySelf && (this.setDateBySelf = false);
					this.fixedDate[this.currentDate].active = 0;
					this.currentDate = index;
					this.fixedDate[this.currentDate].active = 1;
				}else{
					// 自定义
					this.fixedDate[this.currentDate].active = 0;
					this.setDateBySelf = true;
				}
			}
		},
		components: {
			carTitle, mTitle
		},
		watch: {
			email: function(){
				console.log('emial: ', this.email)
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '../../static/style/common';
	.water-list{
		display: flex;justify-content: space-between;
		padding: .3rem 0;
	}
	.witem{
		display: inline-block;
		height: .72rem; line-height: .72rem;
		padding: 0 .22rem;
		color: $mbg;
		border-radius: .1rem;
		background: #cbcbcb;
		&.active{
			background: $color;

		}
	}
	.lritem{
		padding-bottom: .35rem;
	}
	.export-email{
		.radius{
			margin-top: 0;
		}
		input[type="text"]{
			display: inline-block;
			height: .88rem;  width: 4.5rem;
			padding: .2rem;
			border: 1px solid $bdColor;
			box-sizing: border-box;
		}
		.btn100{
			width: 2.15rem;
			height: .88rem;line-height: .88rem;
			background: $color;
		}
	}
	.date{
		display: inline-block;
		width: .5rem;height: 100%;
		vertical-align: middle;
		background: url('../../static/images/b/date.png') right center no-repeat;
		background-size: .24rem;
	}
	.choose-time{
		height: .72rem;
		box-sizing: border-box;
		border: 1px solid $bdColor;
		border-radius: .1rem;
		padding: 0 .6rem 0 .3rem;
		span{
			display: inline-block;
			line-height: .7rem;
		}
	}
	.title-nbdb{
		.mtitle{
			border-bottom: 0;
		}
		.radius{
			margin-top: 0;
		}
	}
</style>