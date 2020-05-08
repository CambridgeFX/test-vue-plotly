<template>
  <div>
    <MdDialogTitle>{{ title }}</MdDialogTitle>
    <MdDialogContent>
      <Plotly :data="cdatalglobalcpi" :layout="layoutglobalcpi" :display-mode-bar="false"></Plotly>
    </MdDialogContent>
  </div>
</template>

<script>
import { Plotly } from 'vue-plotly'
import axios from 'axios'
// Import data master at the beginning!
import data_master from '../../../static/data/data_master.json'

export default {
  name: 'DialogGlobalCPI',
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
      jsondataglobalcpi: null,
      // Chart data and layout objects
      cdatalglobalcpi: [{
        x: [],
        y: [],
        type: 'scatter'
      }],
      layoutglobalcpi: {
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
      var fpathglobalcpi = "";
      let self = this;

      this.loaded = false;

      fpathglobalcpi = "../../static/data/global_CPI.json";

      const axiosglobalcpi = axios.get(fpathglobalcpi);
      
      axios.all([axiosglobalcpi]).then(axios.spread((...responses) => {
        this.jsondataglobalcpi = responses[0].data;
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
      for(var i in this.jsondataglobalcpi) {
        x.push(this.jsondataglobalcpi[i].date);
        y.push(this.jsondataglobalcpi[i].value);
      }
      chartlbl = 'CPI for All Urban Consumers'
      this.cdatalglobalcpi = [{
        x: x,
        y: y,
        type: 'scatter',
        line: {
          color: 'rgb(62, 17, 81)'
        },
      }]
      this.layoutglobalcpi = {
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
            text: 'CPI',
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
          text: 'Bureau of Labor Statistics Data, Cambridge Calculations, ' + this.jsondatamaster.PeriodYear,
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