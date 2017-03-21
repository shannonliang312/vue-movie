import Vue from 'vue'
import Router from 'vue-router'

const HomeComponent = resolve => require(['@/components/home'], resolve);

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: HomeComponent }
  ]
})
