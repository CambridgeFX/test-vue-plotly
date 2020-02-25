<template>
  <div>
    <MdDialogTitle>{{ title }}</MdDialogTitle>
    <MdDialogContent>
      <Plotly :data="cdataspot" :layout="layoutspot" :display-mode-bar="false"></Plotly>
      <br />
      <div class="flex-container">
        <MdRadio v-model="selectedHorizon" value="five" class="md-primary" @change="onCurrChange()">5 Years</MdRadio>
        <MdRadio v-model="selectedHorizon" value="twenty" class="md-primary" @change="onCurrChange()">20 Years</MdRadio>
      </div>
    </MdDialogContent>
  </div>
</template>

<script>
import { Plotly } from 'vue-plotly'
import axios from 'axios'
// Import data master at the beginning!
import data_master from '../../../static/data/data_master.json'

export default {
  name: 'DialogSpotHist',
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
      jsondataspot: null,
      // Chart data and layout objects
      cdataspot: [{
        x: [],
        y: [],
        type: 'scatter'
      }],
      layoutspot: {
        title: 'USDCAD 5 Yr Spot'
      },
      // Other data
      loaded: false,
      selectedHorizon: "five",
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
      var fpathspot = "";
      let self = this;

      this.loaded = false;

      if (selected == "Select here") {
        return;
      } else {
        if (horizon == "five") {
          fpathspot = "../../../static/data/spot5yr_" + selected.toLowerCase() + ".json";
        } else {
          fpathspot = "../../../static/data/spot20yr_" + selected.toLowerCase() + ".json";
        }
      }

      const axiosspot = axios.get(fpathspot);

      axios.all([axiosspot]).then(axios.spread((...responses) => {
        this.jsondataspot = responses[0].data;
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

      // Spot rates
      x = [];
      y = [];
      for(var i in this.jsondataspot) {
        x.push(this.jsondataspot[i].date);
        y.push(this.jsondataspot[i].spot);
      }
      if (horizon == "five") {
        chartlbl = selected + ' 5 Yr Spot'
      } else {
        chartlbl = selected + ' 20 Yr Spot'
      }
      this.cdataspot = [{
        x: x,
        y: y,
        type: 'scatter',
        line: {
          color: 'rgb(62, 17, 81)'
        },
        hovertemplate: '1 ' + selected.substring(0,3) + ' = %{y} '+ selected.substring(3) + '<extra></extra>',
      }]
      this.layoutspot = {
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
            text: 'Spot Rate',
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
          text: 'Source: Bloomberg, Federal Reserves, Cambridge Calculations, ' + this.jsondatamaster.PeriodYear,
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