<template>
  <div>
    <MdDialogTitle>{{ title }}</MdDialogTitle>
    <MdDialogContent>
      <Plotly :data="cdatavolatility" :layout="layoutvolatility" :display-mode-bar="false"></Plotly>
    </MdDialogContent>
  </div>
</template>

<script>
import { Plotly } from 'vue-plotly'
import axios from 'axios'
// Import data master at the beginning!
import data_master from '../../../static/data/data_master.json'

export default {
  name: 'DialogForwardVolatility',
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
      jsondatavolatility: null,
      // Chart data and layout objects
      cdatavolatility: [{
        x: [],
        y: [],
        type: 'bar'
      }],
      layoutvolatility: {
        title: 'USDCAD 12 Mo Implied Volatility History'
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
      var fpathvolatility = "";
      let self = this;

      this.loaded = false;

      if (selected == "Select here") {
        return;
      } else {
        fpathvolatility = "../../../static/data/volatility_" + selected.toLowerCase() + ".json";
      }

      const axiosspot = axios.get(fpathvolatility);

      axios.all([axiosspot]).then(axios.spread((...responses) => {
        this.jsondatavolatility = responses[0].data;
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

      // Implied Volatility
      x = [];
      y = [];
      for(var j in this.jsondatavolatility) {
        x.push(this.jsondatavolatility[j].date);
        y.push(this.jsondatavolatility[j].vol);
      }
      chartlbl = selected + ' 12 Mo Implied Volatility History'
      this.cdatavolatility = [{
        x: x,
        y: y,
        type: 'bar',
        marker: {
          color: 'rgb(62, 17, 81)'
        }
      }]
      this.layoutvolatility = {
        title: {
          text: chartlbl,
          font: {
            family: 'Roboto',
            size: 18,
            color: '#350942'
          }
        },
        annotations: [{
          xref: 'paper',
          yref: 'paper',
          x: 0,
          xanchor: 'left',
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