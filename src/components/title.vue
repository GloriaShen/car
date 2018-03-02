 <template>
   <div>
       <div class="header">
            <h6 v-if="titles.fclick" class="title" @click="showit">{{titles.title}}<i></i></h6>
            <h6 v-else class="title" >{{titles.title}}</h6>
            <div class="back" @click="back"></div>
        </div>
        <template v-if="showSubNavs">
            <div class="average-navs">
                <router-link class="nav" v-for="(item, index) in subNavs" :key="index" :class="{active: item.active}" :to="{ path: '/financial/' + index}">{{item.name}}</router-link>
            </div>
            <div class="mask" @click="showit"></div>
        </template>
   </div>
</template>
<script>
    import { mapState, mapGetters, mapActions } from 'vuex'
    export default {
        props: ['configTitle'],
        computed: {
            ...mapGetters('financial',[ 'showSubNavs', 'subNavs', 'titles' ])
        },
        created(){
            this.initTitle({
                title: this.configTitle,
                current: this.$route.path.split('/')[2]
            });
        },
        methods: {
            ...mapActions('financial', [ 'initTitle', 'showit' ]),
            back(){
                this.$router.go(-1);
            }
        }
    }
</script>

