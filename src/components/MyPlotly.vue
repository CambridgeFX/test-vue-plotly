<template>
  <div id="ChartPage">
    <div id="ControlPanel">
      Select Currency Pair: <select required id="dropDown" v-model="selectedCurr" @change="onCurrChange($event)">
      <option disabled>Select here</option>
      <option v-for="curr in currpairlist" :key="curr">{{ curr }}</option>
    </select>
    </div>
    <div v-if="loaded">
      <Plotly :data="cdata" :layout="layout" :display-mode-bar="false"></Plotly>
    </div>
  </div>
</template>

<script>
import { Plotly } from 'vue-plotly'
import json_5yrspot_usdcad from '../../static/spot5yr_usdcad.json'
import json_5yrspot_gbpcad from '../../static/spot5yr_gbpcad.json'

export default {
  name: 'MyPlotly',
  components: {
    Plotly
  },
  data () {
    return {
      jsondata: null,
      arr_x: [],
      arr_y: [],
      cdata: [{
        x: [],
        y: [],
        type: 'scatter'
      }],
      layout: {
        title: 'USDCAD 5 Yr Spot'
      },
      loaded: false,
      currpairlist: ["USDCAD", "GBPCAD"],
      selectedCurr: "Select here",
    }
  },
  mounted: function() {
    this.loadJSONData()
  },
  computed: {
    XAxis() {
      var x = [];
      for(var i in this.jsondata) {
        x.push(this.jsondata[i].date);
      }
      return x;
    },
    YAxis() {
      var y = [];
      for(var i in this.jsondata) {
        y.push(this.jsondata[i].spot);
      }
      return y;
    }
  },
  methods: {
    onCurrChange(event) {
      var selected = this.selectedCurr;
      if (selected == "Select here") {
        this.loaded = false;
      } else {
        this.loadJSONData();
      }
    },
    loadJSONData() {
      var x = [];
      var y = [];
      var selected = this.selectedCurr;

      this.loaded = false;

      if (selected == "Select here") {
        return;
      } else {
        if (selected == "USDCAD") {
          this.jsondata = json_5yrspot_usdcad;
        } else {
          this.jsondata = json_5yrspot_gbpcad;
        }
      }

      for(var i in this.jsondata) {
        x.push(this.jsondata[i].date);
        y.push(this.jsondata[i].spot);
      }
      this.cdata = [{
        x: x,
        y: y,
        type: 'scatter'
      }]
      this.layout = {
        title: selected + ' 5 Yr Spot'
      }

      this.loaded = true;
    }
  }
}
</script>

<style>

</style>
