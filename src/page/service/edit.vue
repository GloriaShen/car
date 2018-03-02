<template>
	<div class="service cxh" v-if="detail">
		<div class="top-fixed">
			<carTitle :configTitle="configTitle"></carTitle>
			<div v-if="cid" class="title-link" @click="deleteIt">删除</div>
		</div>
		<div class="section bdt">
			<ul class="list-required">
				<li>
					<i class="required">*</i><label :class="{ error: err.name }">服务名称:</label><input @focus="focus('name')" type="text" name="name" v-model="detail.name" placeholder="请输入服务名称">
				</li>
				<li>
					<label>一级服务:</label>
					<div class="ib">
						<div class="permission">
							<div class="item" v-for="(item, index) in subNavs">
								<input type="radio" name="ss" :id="'p'+index"  :value="index" v-model="picked"><i></i>
								<label :for="'p'+index">{{ item.name }}</label>
							</div>
						</div>
					</div>
				</li>
				<li>
					<label >二级服务:</label>
					<div class="ib">
						<div class="permission permission2">
							<div class="item" v-for="(item, index) in secondCategory">
								<input type="radio" name="second" :id="'p'+index"  :value="index" v-model="picked2"><i></i>
								<label :for="'p'+index">{{ item }}</label>
							</div>
							<div class="item"></div>
						</div>
					</div>
				</li>
				<li>
					<label :class="{ error: err.price }">价格:</label><span class="h"><input @focus="focus('price')" type="number" min="1" name="price" v-model="detail.price" class="h" placeholder="请输入价格"></span>
				</li>
				<li>
					<label>上架时间:</label>
					<div class="date-box">
						<span>{{ cdatetime.on }}</span>
						<input type="datetime-local" name="datetime.on" value="2012-12-12 12:12:12" v-model="datetime.on">
					</div>
				</li>
				<li>
					<label>下架时间:</label>
					<div class="date-box">
						<span>{{ cdatetime.off }}</span>
						<input type="datetime-local" name="datetime.off" value="" v-model="datetime.off">
					</div>
				</li>
				<li>
					<label :class="{ error: err.desc }">服务简介:</label>
					<div class="textarea">
						<textarea @focus="focus('desc')" v-model="detail.desc" placeholder="请输入服务简介">
							
						</textarea>
					</div>
				</li>
				<li>
					<label :class="{ error: err.img }">门店主图:</label>
					<div class="upload-box">
						<img v-if="detail.img" class="main-pic" :src="detail.img">
						<div v-else class="upload"></div>
						<img v-if="imgloading" class="imgloading"  src="../../static/images/loading.gif" alt="loading">
						<input type="file" ref="mainPic" name="mainPic" @change="onFileChange" accept="image/jpeg,image/x-png,image/gif" >
					</div>

				</li>
			</ul>
		</div>
		<div class="section-nbg box100">
			<div class="btn100 radius" @click="save">完成</div>
		</div>
	</div>

</template>
<script>
	import { mapGetters } from 'vuex'
	import carTitle from '@/components/title'
	import {uploadImg} from '../../service/getData'
	import { RULES } from '../../static/js/rules'
	import { MessageBox } from 'mint-ui';

	let verifyNames = {
		name: {rule: 'isNotEmpty', name: '姓名'},
		price: {rule: 'isNotEmpty', name: '价格'},
		desc: {rule: 'isNotEmpty', name: '描述'},
		img: {rule: 'isNotEmpty', name: '图片'},
		category_id: {rule: 'isNotEmpty', name: '二级服务'},
	}
	export default {
		data(){
			return {
				configTitle: { 
	                title: '新增服务',
	                fclick: false
	            },
	            detailEmpty: {
	            	name: '',
	            	category_id: '',
	            	price: '',
	            	sell_begin_datetime: '',
	            	sell_end_datetime: '',
	            	desc: '',
	            	img: ''
	            },
	            detail: null,
	            imgloading: false,
	            picked: '',
	            picked2: '',
	            datetime: {
	            	on: '2012-12-12 12:12:12',
	            	off: '2012-12-12 12:12:12'
	            },
	            err: {
	            	name: 0, price: 0, desc: 0, img: 0,
	            },
	            serviceDetail: null,
	            first: true,
			}
		},
		computed: {
			...mapGetters('manage', ['categories']),
			subNavs: function(){
				if(this.categories){
					// 初始化 默认选中的一级服务类别
					this.picked = this.detail ? this.detail.category_fid : this.$route.query.type;
					this.detail && this.Indicator.close();
					return this.categories;
				}
			},
			secondCategory: function(){
				if(this.categories){
					if(this.first){
						// 初次进入页面 初始化选中项
						this.picked2 = this.detail && this.detail.category_id;
						this.first = false;
						this.picked = this.detail.category_fid || this.$route.query.type;
					}else{
						this.picked2 = '';
					}
					return this.categories[this.picked].sub;
				}
			},
			cid: function(){
				return this.$route.query.id;
			},
			cdatetime: function(){
				let cdt = {on:'',off:''}
				for(let i in this.datetime){
					let temp = this.datetime[i];
					if(temp.match('T')){
						let arr = temp.replace(/T/, ' ').split(':');
						(arr.length > 2 ) &&  arr.pop(0) ;
						cdt[i] = arr.join(':');
					}
				}
				return cdt;
			}
		},
		created(){
			
			// 获取一级服务列表
			if(!this.categories){
				this.$store.dispatch('manage/getData', {
					url: 'shopApi/shop/categoryAndSub',
					name: 'categories'
				});
			}
			if(this.cid){
				this.Indicator.open({
				  text: '加载中...',
				  spinnerType: 'fading-circle'
				});
				this.configTitle.title = '编辑服务';
				// 获取详情页的数据
				this.pGet('shopApi/shop/services/' + this.cid).then(res=>{
					this.Indicator.close();
					this.detail = res.data;
					this.cdatetime.on = this.detail.sell_begin_datetime;
					this.cdatetime.off = this.detail.sell_end_datetime;
				});
			}else{
				this.detail = this.detailEmpty;
				// 新建服务时，默认上架下架时间
				self.cid || this.defaultDate();
			}
		},
		methods: {
			onFileChange(e) {
				let self = this;
		        let files = e.target.files || e.dataTransfer.files,
		        	fileSize = files[0].size / 1024;
		        if (!files.length)  return;
		        if(fileSize > 2048){
		        	alert('请不要上传大于2M的照片');
		        }else{
		        	self.imgloading = true;
		        	let data = {
						file: files[0],
						width: 100,
						height: 100,
						callback: function(res){
							self.imgloading = false;
							self.detail.img = res.path;
							self.err.img = 0;
						}
					}
			        uploadImg(data);
		        }
		    },
			async deleteIt(){
				let res = await(this.Delete('shopApi/shop/services/' + this.cid));
				res.error_code || (window.location.href = '/service?type='+ (this.picked || this.serviceDetail.category_id));
			},
			defaultDate(){
				let date = new Date();
				let temp = {};
				temp.year = date.getFullYear();

				function addZero(num, index = 10){
					return num < index ? '0' + num : num;
				}

				temp.month = addZero(date.getMonth() + 1);
  				temp.day = addZero(date.getDate());
  				temp.hour = addZero(date.getHours());
  				temp.minutes = addZero(date.getMinutes());

  				temp.on = temp.year + '-' + temp.month + '-' + temp.day + ' ' + temp.hour + ':' + temp.minutes;
  				temp.off = temp.year + 1 + '-' + temp.month + '-' + temp.day + ' ' + temp.hour + ':' + temp.minutes;

  				this.cdatetime.on = temp.on;
				this.cdatetime.off = temp.off;
  				
			},
			focus(name){
				this.err[name] = 0;
			},
			// 验证
			verify(){
				let result = true, verifyData = null, cre = null;
				for(let i in verifyNames){
					verifyData = this.detail[i];
					console.log(i + ':', verifyData);
					cre = RULES[verifyNames[i].rule](verifyData);
					cre || MessageBox.alert('请确保 <i class="warning">'+ verifyNames[i].name +'</i> 不为空，再尝试提交!', '提示');
					result = result && cre;
					cre || (this.err[i] = 1);
				}
				return result;
			},
			async save(){
				this.detail.category_id = this.picked2;
				if(this.verify()){
					let data = {
						name: this.detail.name,
						category_fid: this.picked,
						category_id: this.picked2,
						price: this.detail.price,
						sell_begin_datetime: this.cdatetime.on,
						sell_end_datetime: this.cdatetime.off,
						desc: this.detail.desc,
						img: this.detail.img,
					}
					let url = this.cid ? ('shopApi/shop/services/'+ this.cid) : 'shopApi/shop/services/create';
					let res = await(this.Post(url, data));
					res.error_code || (window.location.href = '#/service?type=' + (this.picked || this.serviceDetail.category_id));
				}
				
			},

		},
		components:{
			carTitle, 
		},
	}
</script>
<style lang="scss">
	@import '../../static/style/others';
	.main-pic{
		width: 2.7rem;height: 1.8rem;
		margin-top: .1rem;
	}
	.ib{
		display: inline-block;
	}
	.upload-box{
		width: 2.7rem;
	}
	.date-box{
		position: relative;
		display: inline-block;
		span{
			display: block;color: $mcolor;
			width: 4.2rem;
		}
		input{
			position: absolute;left: 0;top: 0;
			opacity: 0;
		}
	}
	.warning{
		color: $color2;
	}
	.permission2{
		width: 5.3rem;
		justify-content: flex-start;
		.item{
			width: 50%;
		}
	}
</style>