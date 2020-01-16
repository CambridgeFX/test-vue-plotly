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
      <input type="radio" id="five" value="five" v-model="selectedHorizon" @change="onCurrChange($event)">
      <label for="five">5 Years</label>
      <input type="radio" id="twenty" value="twenty" v-model="selectedHorizon" @change="onCurrChange($event)">
      <label for="twenty">20 Years</label>
    </div>
  </div>
</template>

<script>
import { Plotly } from 'vue-plotly'
import axios from 'axios'

export default {
  name: 'MyPlotlyAxios',
  components: {
    Plotly
  },
  data () {
    return {
      jsondataspot: null,
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
      currpairlist: ["USDCAD", "GBPCAD", "EURCAD"],
      selectedCurr: "Select here",
      selectedHorizon: "five",
    }
  },
  mounted: function() {
    // Initial Setup
    this.getJSONData()
  },
  methods: {
    onCurrChange(event) {
      // When select input changes, reload data and update charts
      var selected = this.selectedCurr;
      if (selected == "Select here") {
        this.loaded = false;
      } else {
        this.getJSONData();
      }
    },
    getJSONData() {
      // Use Axios to retrieve JSON contents
      var selected = this.selectedCurr;
      var horizon = this.selectedHorizon;
      var fpathspot = "";
      let self = this;

      this.loaded = false;

      if (selected == "Select here") {
        return;
      } else {
        if (horizon == "five") {
          fpathspot = "../../static/spot5yr_" + selected.toLowerCase() + ".json"
        } else {
          fpathspot = "../../static/spot20yr_" + selected.toLowerCase() + ".json"
        }
      }

      axios
        .get(fpathspot)
        .then(response => {
          self.jsondataspot = response.data;
          self.loadJSONData();
        })
        .catch(err => {
          console.log(err);
        });
      
      this.loaded = true;
    },
    loadJSONData() {
      // Commit retrieved data to charts
      var x = [];
      var y = [];
      var selected = this.selectedCurr;
      var horizon = this.selectedHorizon;
      var chartlbl = "";
      
      for(var i in this.jsondataspot) {
        x.push(this.jsondataspot[i].date);
        y.push(this.jsondataspot[i].spot);
      }
      if (horizon == "five") {
        chartlbl = selected + ' 5 Yr Spot';
      } else {
        chartlbl = selected + ' 20 Yr Spot';
      }
      this.cdata = [{
        x: x,
        y: y,
        type: 'scatter'
      }]
      this.layout = {
        title: chartlbl
      }
    }
  }
}
</script>

<style>

</style>
