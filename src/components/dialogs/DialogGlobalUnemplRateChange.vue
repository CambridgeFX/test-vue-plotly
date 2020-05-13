<template>
  <div>
    <MdDialogTitle>{{ title }}</MdDialogTitle>
    <MdDialogContent>
      <Plotly :data="cdatalglobalunemplratechange" :layout="layoutglobalunemplratechange" :display-mode-bar="false"></Plotly>
    </MdDialogContent>
  </div>
</template>

<script>
import { Plotly } from 'vue-plotly'
import axios from 'axios'
// Import data master at the beginning!
import data_master from '../../../static/data/data_master.json'

export default {
  name: 'DialogGlobalUnemplRateChange',
  props: {
    title: String,
  },
  components: {
    Plotly,
  },
  data() {
    return {
      // JSON Data
      jsondatamaster: data_master,
      jsondataglobalunemplratechange: null,
      // Chart data and layout objects
      cdatalglobalunemplratechange: [{
        x: [],
        y: [],
        type: 'bar'
      }],
      layoutglobalunemplratechange: {
        title: 'USDCAD Forward Point History'
      },
      // Other data
      loaded: false,
    }
  },
  mounted: function() {
    // Initial Setup
    this.getJSONData();
  },
  methods: {
    onCurrChange() {
      // When select input changes, reload data and update charts
      var selected = this.selectedCurr;
      if (selected == "Select here" || selected == "") {
        this.loaded = false;
      } else {
        this.getJSONData();
      }
    },
    getJSONData() {
      // Use Axios to retrieve JSON contents
      var selected = this.selectedCurr;
      var horizon = this.selectedHorizon;
      var fpathglobalunemplratechange = "";
      let self = this;

      this.loaded = false;

      fpathglobalunemplratechange = "../../static/data/global_unemploymentratechange.json";

      const axiosglobalunemplratechange = axios.get(fpathglobalunemplratechange);
      
      axios.all([axiosglobalunemplratechange]).then(axios.spread((...responses) => {
        this.jsondataglobalunemplratechange = responses[0].data;
        this.loadJSONData();
      })).catch(errors => {
        console.log(errors);
      })

      this.loaded = true;
    },
    loadJSONData() {
      // Commit retrieved data to charts
      var x = [];
      var y = [];
      var datacolhist = [];
      var datacoldist = [];
      var datacolcast = [];
      var selected = this.selectedCurr;
      var horizon = this.selectedHorizon;
      var chartlbl = "";

      // Fed fund rates
      x = [];
      y = [];
      for(var i in this.jsondataglobalunemplratechange) {
        x.push(this.jsondataglobalunemplratechange[i].date);
        y.push(this.jsondataglobalunemplratechange[i].value);
      }
      chartlbl = 'Canada Unemployment Rate Changes'
      this.cdatalglobalunemplratechange = [{
        x: x,
        y: y,
        type: 'bar',
        marker: {
          color: 'rgb(62, 17, 81)'
        },
      }]
      this.layoutglobalunemplratechange = {
        title: {
          text: chartlbl,
          font: {
            family: 'Roboto',
            size: 18,
            color: '#350942'
          }
        },
        xaxis: {
          title: {
            text: 'Date',
            font: {
              family: 'Roboto',
              size: 16,
              color: '#350942'
            }
          },
          tickformat: '%B %Y'
        },
        yaxis: {
          title: {
            text: 'Unemployment Rate Changes %',
            font: {
              family: 'Roboto',
              size: 16,
              color: '#350942'
            }
          },
          tickformat: '.2f'
        },
        annotations: [{
          xref: 'paper',
          yref: 'paper',
          x: 1,
          xanchor: 'right',
          y: 1,
          yanchor: 'bottom',
          text: 'Statistics Canada Data, Cambridge Calculations, ' + this.jsondatamaster.PeriodYear,
          showarrow: false
        }]
      }
    }
  }

}
</script>

<style>
.flex-container {
  display: flex;
  justify-content: center;
}

</style>