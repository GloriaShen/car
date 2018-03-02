<template>
    <div class="loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore :top-method="loadTop"   :bottom-method="loadBottom"  :bottom-all-loaded="allLoaded" :autoFill='autoFill' ref="loadmore">
		<ul class="clist">
			<li v-for="(item, index) in clist">
				<div v-if="clistConf.status==1" class="l">
					<router-link v-if="item.status!='undefied'" class="title ver-middle" :to="{ path: clistConf.to, query: { id: item.id  }}">
						<clistItem :clistConf="clistConf" :item="item"></clistItem>
					</router-link>
					<div  v-else class="ver-middle">
						<clistItem :clistConf="clistConf" :item="item"></clistItem>
					</div>
				</div>
				<div v-else class="l ver-middle">
					<clistItem :clistConf="clistConf" :item="item"></clistItem>
				</div>
				<div class="r">
					<span class="shine" v-if="item.price">¥{{item.price}}</span>
					<span class="shine" v-if="item.cash">¥{{item.cash}}</span>
					<span class="time">{{item.create_datetime}}</span>
				</div>
			</li>
			<li v-show="allLoaded">
				<span >没有更多数据了</span>
			</li>
		</ul>
      </mt-loadmore>
    </div>
</template>

<style lang="scss" scoped>
@import '../static/style/clist';
.loadmore-wrapper {
    overflow: scroll
}
</style>

<script>
import clistItem from '@/components/clistItem'
  export default {
    data() {
      return {
        clist: [],
        next: 0,
        currentPage: 1,
        allLoaded: false,
        wrapperHeight: 0,
        autoFill: false,
      };
    },
	props: ['list', 'cnext', 'clistConf'],

	watch: {
		'list' : function(n){
			this.clist = [...n];
		}
	},

	created() {
		console.log(' list.vue  this.list: ', this.list);
      	this.clist = [...this.list];
      	this.next = this.cnext;
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
    methods: {
		loadBottom() {
			let self = this;
			console.log('self.next:', self.next);
			if(!self.next){
				this.allLoaded = true;
				this.$refs.loadmore.onBottomLoaded();
			}else{
				self.currentPage++;
				this.pGet(this.clistConf.url + '?page=' + self.currentPage).then(res=>{
					self.clist = [...self.clist, ...res.data.list];
					self.next = res.data.next;
					self.allLoaded = self.next ? false : true;
					this.$refs.loadmore.onBottomLoaded();
				});
			}
		},
		loadTop() {
			let self = this;
			self.allLoaded = false;
			self.currentPage = 1;
			self.pGet(this.clistConf.url).then(res=>{
				self.clist = [...res.data.list];
				self.next = res.data.next;
				self.next || (self.allLoaded = true);
				this.$refs.loadmore.onTopLoaded();
			});
		},
    
	},
	components: {
		clistItem, 
	}
    
  };
</script>