<template>
  <div>
    <MdDialogTitle>{{ title }}</MdDialogTitle>
    <MdDialogContent>
      <Plotly :data="cdatalglobalemplchange" :layout="layoutglobalemplchange" :display-mode-bar="false"></Plotly>
    </MdDialogContent>
  </div>
</template>

<script>
import { Plotly } from 'vue-plotly'
import axios from 'axios'
// Import data master at the beginning!
import data_master from '../../../static/data/data_master.json'

export default {
  name: 'DialogGlobalEmplChange',
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
      jsondataglobalemplchange: null,
      // Chart data and layout objects
      cdatalglobalemplchange: [{
        x: [],
        y: [],
        type: 'bar'
      }],
      layoutglobalemplchange: {
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
      var fpathglobalemplchange = "";
      let self = this;

      this.loaded = false;

      fpathglobalemplchange = "../../static/data/global_employmentchange.json";

      const axiosglobalemplchange = axios.get(fpathglobalemplchange);
      
      axios.all([axiosglobalemplchange]).then(axios.spread((...responses) => {
        this.jsondataglobalemplchange = responses[0].data;
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
      for(var i in this.jsondataglobalemplchange) {
        x.push(this.jsondataglobalemplchange[i].date);
        y.push(this.jsondataglobalemplchange[i].value);
      }
      chartlbl = 'Canada Employment Changes'
      this.cdatalglobalemplchange = [{
        x: x,
        y: y,
        type: 'bar',
        marker: {
          color: 'rgb(62, 17, 81)'
        },
      }]
      this.layoutglobalemplchange = {
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
            text: 'Employment Changes (thousands)',
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