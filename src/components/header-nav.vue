<template>
  <div class="header-nav">
    <div class="logo-block">
        <img src="@/assets/logo2.png" alt="logo" class="logo-po">
        <div>
          <span class="title-logo">Система</span>
          <span class="title-logo">Эффективного</span>
          <span class="title-logo">Производства</span>
        </div>
    </div> 
    <div class="clock" >
        <DatePicker 
          v-model="date"  
          is-dark 
          color='gray'
          > 
          <template v-slot="{  inputEvents }">
            <span class="data" v-on="inputEvents">{{ clocks }}</span>
          </template>
        </DatePicker>
    </div>
    <div class="profile" >
      <div @click="$router.push('/')">
        <unicon name="user" fill="white" />
        <p style='padding-right: 15px;padding-left: 10px;'>
          <span class="initial">
            {{ getAuth ? getAuth.login : '' }}
          </span>
          <span class="role"> 
            {{ 
            getAuth && getAuth.role ? 
              getAuth.role.description : ''
            }}
          </span>
        </p>
      </div>
        <a @click='exit'>
            <unicon name="power" fill="white" />
        </a>
    </div>
    <router-link to="/settings">
      <span class="setting-po">
        <unicon name="setting" fill="white" />
      </span>
    </router-link>
  </div>
</template>
<script>
import { dataFormat, timeFormat } from '@/js/';
import { mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    let date = new Date();
    return {
      clocks: "",
      idInterval: Number,
      date
    }
  },
  computed: mapGetters(['getAuth']),
  created() {
    this.clocks = this.getClock()
    
    this.idInterval = setInterval(() => {
      this.clocks = this.getClock()
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.idInterval)
  },
  methods: {
    ...mapMutations(['unAuth']),
    getClock() {
      let strDat = dataFormat() + ' ' + timeFormat()
      
      return strDat
    },
    exit() {
      this.$emit('exit')
    }
  }, 
  async mounted() {
  }
}
</script>

<style>
.header-nav {
  background-color: #262626;
  color: #ececec;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  height: 40px;
  padding: 5px;
  align-items: 10px;
  user-select: none;
  position: fixed;
  top: 0px;
  z-index: 4;
}
.rout-nav {
  overflow: hidden;
}
.logo-block {
  display: flex;
  margin-left: 30px;
}
.logo-block>div {
  display: flex;
  flex-wrap: wrap;
  font-size: 10px;
  flex-direction: column;
}
.logo-block>div>span {
  margin-left: 5px;
  padding: 0px;
}
.clock {
  display: flex;
  align-items: center;
  margin-left: 500px;
}
.clock>.data {
  text-align: center;
}
.setting-po {
  margin-right: 50px;
  cursor: pointer;
}
.initial {
  font-size: 14px;
  font-weight: bold;
}
.role {
  font-size: 12px;
}
.profile p {
  display: flex;
  flex-direction: column;
  margin: 0px;
  margin-left: 5px;
  margin-right: 5px;
}
.profile {
  width: 250px;
  display: flex;
  margin-left: 500px;
  cursor: pointer;
  margin-right: 50px;
}
.profile>div {
  display: flex;

}
.profile>div:hover {
  background: #4d4d4d;
}
.profile a:hover {
  background: #4d4d4d;
  padding-left: 3px;
  padding-right:3px;
}
</style>