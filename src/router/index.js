import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MyPlotly from '@/components/MyPlotly'
import JSONParser from '@/components/JSONParser'
import MyPlotlyAxios from '@/components/MyPlotlyAxios'
import MyPlotlyMultiple from '@/components/MyPlotlyMultiple'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MyPlotlyMultiple',
      component: MyPlotlyMultiple
    }
  ]
})
