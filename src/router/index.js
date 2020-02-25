import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MyPlotly from '@/components/MyPlotly'
import JSONParser from '@/components/JSONParser'
import MyPlotlyAxios from '@/components/MyPlotlyAxios'
import MyPlotlyMultiple from '@/components/MyPlotlyMultiple'
import MaterialTest from '@/components/MaterialTest'
import MyPlotlyMaterial from '@/components/MyPlotlyMaterial'
import MyPlotlyDialogs from '@/components/MyPlotlyDialogs'
import MyPlotlyDialogCanvas from '@/components/MyPlotlyDialogCanvas'
import Disclosures from '@/components/Disclosures'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MyPlotlyDialogs',
      component: MyPlotlyDialogs
    },
    {
      path: '/mini',
      name: 'MyPlotlyDialogCanvas',
      component: MyPlotlyDialogCanvas
    },
    {
      path: '/disclosures/',
      name: 'Disclosures',
      component: Disclosures
    }
  ]
})
