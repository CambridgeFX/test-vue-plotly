<template>
  <div>
    <MdDialogTitle>{{ title }}</MdDialogTitle>
    <MdDialogContent>
      <Plotly :data="cdataforward" :layout="layoutforward" :display-mode-bar="false"></Plotly>
    </MdDialogContent>
  </div>
</template>

<script>
import { Plotly } from 'vue-plotly'
import axios from 'axios'
// Import data master at the beginning!
import data_master from '../../../static/data/data_master.json'

export default {
  name: 'DialogForwardHist',
  props: {
    title: String,
    selectedCurr: String,
  },
  components: {
    Plotly,
  },
  data() {
    return {
      // JSON Data
      jsondatamaster: data_master,
      jsondataforward: null,
      // Chart data and layout objects
      cdataforward: [{
        x: [],
        y: [],
        type: 'scatter'
      }],
      layoutforward: {
        title: 'USDCAD Forward Point History'
      },
      // Other data
      loaded: false,
    }
  },
  mounted: function() {
    // Initial Setup
    this.onCurrChange();
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
      var fpathforwardhist = "";
      let self = this;

      this.loaded = false;

      if (selected == "Select here") {
        return;
      } else {
        fpathforwardhist = "../../../static/data/forward_" + selected.toLowerCase() + ".json";
      }

      const axiosspot = axios.get(fpathforwardhist);

      axios.all([axiosspot]).then(axios.spread((...responses) => {
        this.jsondataforward = responses[0].data;
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

      // Forward history
      x = [];
      y = [];
      for(var j in this.jsondataforward) {
        x.push(this.jsondataforward[j].date);
        y.push(this.jsondataforward[j].forward);
      }
      chartlbl = selected + ' Forward Point History'
      this.cdataforward = [{
        x: x,
        y: y,
        type: 'scatter',
        line: {
          color: 'rgb(62, 17, 81)'
        },
        hovertemplate: '%{y:.2f}<extra></extra>',
      }]
      this.layoutforward = {
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
          tickformat: '%B %d, %Y'
        },
        yaxis: {
          title: {
            text: 'Forward Rate',
            font: {
              family: 'Roboto',
              size: 16,
              color: '#350942'
            }
          },
          tickformat: '.0'
        },
        annotations: [{
          xref: 'paper',
          yref: 'paper',
          x: 1,
          xanchor: 'right',
          y: 1,
          yanchor: 'bottom',
          text: 'Source: Bloomberg, Cambridge Calculations, ' + this.jsondatamaster.PeriodYear,
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