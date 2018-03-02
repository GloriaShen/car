 <template>
   <div>
       <div class="header">
            <h6 v-if="titles.fclick" class="title" @click="showit">{{titles.title}}<i></i></h6>
            <h6 v-else class="title" >{{titles.title}}</h6>
            <div class="back" @click="back"></div>
        </div>
        <template v-if="showSubNavs">
            <div class="average-navs">
                <router-link class="nav" v-for="(item, index) in subNavs" :key="index" :class="{active: item.active}" :to="{ path: configTitle.to , query: { type: index, days: item.to }}">{{item.name}}</router-link>
            </div>
            <div class="mask" @click="showit"></div>
        </template>
   </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'
    export default {
        data(){
            return {
                showSubNavs: false
            }
        },
        props: ['configTitle'],
        computed: {
            titles: function(){
                return this.configTitle.titles;
            },
            subNavs: function(){
                return this.configTitle.subNavs;
            },
            currentType: function(){
                return this.$route.query.type ? this.$route.query.type.toLocaleUpperCase() : 1;
            }
        },
        created(){
            
            // console.log('titleQuery configTitle: ', this.configTitle);
            this.init();
        },
        methods: {
            init(){
                // console.log('titleQuery currentType:',this.currentType);
                if(this.subNavs){
                    this.titles.title = this.subNavs[this.currentType].name;
                    this.subNavs[this.currentType].active = 1;
                }
            },
            showit(){
                this.showSubNavs = !this.showSubNavs;
            },
            updatePage(param){
                this.showit();
                this.titles.title = this.subNavs[this.currentType].name;
                this.subNavs[param.from].active = 0;
                this.subNavs[param.to].active = 1;
                this.showSubNavs = false;
            },
            back(){
                this.$router.go(-1);
            },
        },
        watch: {
            '$route' (to, from) {
                this.updatePage({
                    from: from.query.type.toLocaleUpperCase(),
                    to: to.query.type.toLocaleUpperCase()
                });
            }
        }
    }
</script>

