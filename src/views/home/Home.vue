<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control v-show="isTabFixed" class="fixed" @itemClick="tabClick"
                 :titles="['流行', '新款', '精选']"
                 ref="tabControl2"
                
                 
                 ></tab-control>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            @pullingUp="loadMore"
            :data="showGoodsList"
            :pull-up-load="true"
            :probe-type="3">
      <div>
        <home-swiper :banners="banners"
                     ref="hSwiper"
                     @swipperImgLoad="swipperImgLoad"
                     :class="{fixed:isTabFixed }"
                     ></home-swiper>
        <feature-view :features="recommends"></feature-view>
        <recommend-view></recommend-view>
        <tab-control @itemClick="tabClick"
                     :titles="['流行', '新款', '精选']"
                     ref="tabControl"></tab-control>
        <goods-list :goods-list="showGoodsList"></goods-list>
      </div>
      
    </scroll>
   
    <back-top @backTop="backTop" class="back-top" v-show="showBackTop">
      <img src="~assets/img/common/top.png" alt="">
    </back-top>

    

  </div>
</template>

<script>



  import NavBar from 'common/navbar/NavBar'
  import Scroll from 'common/scroll/Scroll'

  import TabControl from 'content/tabControl/TabControl'
  import BackTop from 'content/backTop/BackTop'

  import HomeSwiper from './childComps/HomeSwiper'
  import FeatureView from './childComps/FeatureView'
  import RecommendView from './childComps/RecommendView'
  import GoodsList from './childComps/GoodsList'

  import {getHomeMultidata, getHomeData, RECOMMEND, BANNER} from "network/home";
  import {NEW, POP, SELL, BACKTOP_DISTANCE} from "@/common/const";










  export default {
		name: "Home",
    components: {
		  NavBar,
      Scroll,
      TabControl,
      BackTop,
      HomeSwiper,
      FeatureView,
      RecommendView,
      GoodsList,
    },
    data() {
		  return {
		    banners: [],
        recommends: [],
        // 请求的数据格式
        goodsList: {
          'pop': {page: 1, list: []},
          'new': {page: 3, list: []},
          'sell': {page: 5, list: []}
        },
        currentType: POP,
        isTabFixed: false,
        tabOffsetTop: 0,
        showBackTop: false
      }
    },
    computed: {
		  showGoodsList() {
		    return this.banners;
      }
    },
    created() {
      console.log('创建Home');
      // 1.请求多个数据
      this.getMultiData()

      // 2.请求商品数据,将三个数据全部请求下来
      this.getHomeProducts()
      this.getHomeProducts()
      this.getHomeProducts()
    },

  //保持原有状态;这里的startTimer存在三层嵌套;
    activated: function () {
      this.$refs.hSwiper.startTimer()
    },
    deactivated: function () {
      this.$refs.hSwiper.stopTimer()
    },
    updated() {
      // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      // console.log(this.tabOffsetTop);
    },


    methods: {
      // 实现吸顶效果;
      swipperImgLoad(){
         console.log(this.$refs.tabControl.$el.offsetTop+"没有使用这种吸顶");
        
      },
		  tabClick(index) {
		    switch (index) {
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
         
          
        }
        this.$refs.tabControl.currentIndex=index;
        this.$refs.tabControl2.currentIndex=index;

      },
      contentScroll(position) {
		    // 1.决定tabFixed是否显示
        this.isTabFixed =( position.y < -this.tabOffsetTop)

        // 2.决定backTop是否显示
        this.showBackTop = position.y < -BACKTOP_DISTANCE
      },
      loadMore() {
		    this.getHomeProducts(this.currentType)
      },
      // 回到顶部,在300毫秒之类;
      backTop() {
        this.$refs.scroll.scrollTo(0, 0, 300)
      },



      /**
       * 网络请求相关方法
       */
      getMultiData() {
        getHomeMultidata().then(res => {
          // console.log(res.data);
          
          this.banners = res.data.list
          this.recommends = res.data.list
          // 下次更新DOM时,获取新的tabOffsetTop值(不保险,可以在updated钩子中获取)
          this.$nextTick(() => {
            this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
          })
        })
      },


      getHomeProducts(type) {
        getHomeData(type).then(res => {
          const goodsList = res.data.list;
          // console.log(goodList);
          
          this.goodsList[type].list.push(...goodsList)

          // 将请求的数据加一,达到刷新的过程
          this.goodsList[type].page += 1
          //函数的封装在scroll
          this.$refs.scroll.finishPullUp()
        })
      }
    }
	}
</script>

<style scoped>
  #home {
    /*position: relative;*/
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;

/* 定位 */
    /* position: absolute;
    top: 0;
   
    left: 0;
    right: 0; */
  }

  .content {
    /* 利用定位来达到内容全部塞满/也可以使用calc()计算属性来达到相同的效果 */
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .fixed {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  }

  .back-top {
    position: fixed;
    right: 10px;
    bottom: 60px;
  }
</style>
