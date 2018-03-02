 <template>
    <div>
        <div class="header">
            <h6 class="title" >{{titles.title}}</h6>
            <div class="back" @click="back"></div>
            <div v-if="titles.subTitles" class="sub-navs">
                <template v-for="(item, index) in titles.subTitles">
                    <router-link v-if="item.link" class="nav" :class="{active: item.active}" :to="{ path: item.path }" >{{ item.name }}</router-link>
                    <div v-else class="nav" :class="{active: item.active}" @click="showit({from: item.path, to: path})" >{{ item.name }}<i v-if="item.icon == 1" class="triangle"></i></div>
                </template>
            </div>
        </div>
        <template v-if="showSubNavs">
            <div class="average-navs">
                <router-link class="nav" v-for="(item, index) in subNavs" :key="index" :class="{active: item.active}" :to= "{path: item.to + '/'+index}" >{{item.name}}</router-link>

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
                path: ''
            }
        },
        props: ['configTitle'],
        computed: {
            ...mapGetters([ 'titles', 'showSubNavs', 'subNavs' ]),
        },
        created(){
            this.path = this.$route.path;
            let temp = this.$route.path.split('/');
            this.initTitle({
                titles: {
                    title: this.configTitle.title,
                    subTitles: this.configTitle.subTitles
                },
                subNavs: this.configTitle.subNavs,
                current: temp[temp.length-1]
            });
        },
        methods: {
            ...mapActions(['initTitle', 'showit' ]),
            back(){
                this.$router.go(-1);
            }
        },
    }
</script>

