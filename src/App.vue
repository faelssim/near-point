<template>
  <div id="app" class="flex-column container">
    <div class="header">
        <div class="flex-row header-tab">
            <div
                v-for="tab of tabs.data"
                :key="tab.value"
                :class="{'header-tab-active': tab.value === tabs.active}"
                @click="handleChangeTab(tab)"
            >
                <b>{{ tab.label }}</b>
            </div>
        </div>
        <div class="header-search">
            <div class="flex-row ie-box header-search-input">
                <div class="flex-row ie-box header-search-type" @click="searchTypes.visible = !searchTypes.visible">
                    <span>{{ currentSearchType }}</span>
                </div>
            </div>
            <ul v-show="searchTypes.visible" class="header-search-dropdown">
                <li v-for="item of searchTypes.data" :key="item.value" class="ie-box flex-row" @click="handleChangeSearchType(item)">
                    <span>{{ item.label }}</span>
                    <i v-if="item.value === searchTypes.active"></i>
                </li>
            </ul>
        </div>
    </div>
    <div class="main">
        <List
            :direction="netPoints.direction"
            :data="netPoints.data"
        />
    </div>
  </div>
</template>

<script>
import List from './components/List.vue'
export default {
  name: 'App',
  components: { List },
  data() {
      return {
          tabs: {
              data: [
                  { label: '列表', value: 1},
                  { label: '地图', value: 2}
              ],
              active: 1
          },
          searchTypes: {
              data: [
                  { label: '全部', value: 0 },
                  { label: 'EMS网点', value: 1 },
                  { label: '邮政网点', value: 2 },
                  { label: '快递柜', value: 3 },
                  { label: '合作网点', value: 4 }
              ],
              active: 0,
              visible: false
          },
          // 网点信息
          netPoints: {
              data: [], // 所有网点数据
              direction: 'vertical', //列表方向
          }
      }
  },
  computed: {
      currentSearchType() {
          return this.searchTypes.data.find(item => item.value === this.searchTypes.active).label
      }
  },
  methods: {
      handleChangeTab({ value }) {
          this.tabs.active = value
      },
      handleChangeSearchType({ value }) {
          this.searchTypes.active = value
          this.searchTypes.visible = false
      }
  }
}
</script>

<style lang="less" scoped>
.container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f2f2f2;
  height: 100vh;
  justify-content: flex-start;
  .header{
      width: 100%;
      background: #fff;
      flex: 0 0 auto;
      .header-tab{
          justify-content: space-around;
          >div{
              padding: 1rem;
              font-size: 1.5rem;
              border-bottom: 0.2rem solid transparent;
          }
          .header-tab-active{
              color: orangered;
              border-color: orangered;
          }
      }
      .header-search{
          position: relative;
          padding: 1rem 0;
          .header-search-input{
              width: 90%;
              height: 3rem;
              background: #f7f6f6;
              border-radius: 3rem;
              margin: 0 auto;
              justify-content: flex-start;
              .header-search-type{
                  display: inline-flex;
                  font-size: 1.2rem;
                  padding: 0 1.2rem;
                  border-right: 0.1rem solid #e5e5e5;              
              }
          }
          .header-search-dropdown{
              width: 100%;
              height: auto;
              background: #fff;
              box-shadow: 0 500rem 0 500rem rgba(0,0,0,0.5);
              border-top: 0.1rem solid #f1f1f1;
              position: absolute;
              top: 100%;
              li{
                  padding: 1rem 0;
                  justify-content: space-between;
                  width: 90%;
                  margin: 0 auto;
                  border-bottom: 0.1rem solid #f1f1f1;
                  i{
                      display: inline-block;
                      width: 0.5rem;
                      height: 0.5rem;
                      border-radius: 50%;
                      background: orangered;
                  }
              }
          }
      }
  }
  .main{
      width: 100%;
      flex: 1 0 auto;
      overflow: hidden auto;
  }
}
</style>
