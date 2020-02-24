<template>
  <div>
    <MdDialogTitle>{{ title }}</MdDialogTitle>
    <MdDialogContent>
      <Plotly :data="cdataspotmoves" :layout="layoutspotmoves" :display-mode-bar="false"></Plotly>
    </MdDialogContent>
  </div>
</template>

<script>
import { Plotly } from 'vue-plotly'
import axios from 'axios'
// Import data master at the beginning!
import data_master from '../../../static/data_master.json'

export default {
  name: 'DialogSpotMoves',
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
      jsondataspotmoves: null,
      // Chart data and layout objects
      cdataspotmoves: [],
      layoutspotmoves: {
        title: 'USDCAD 1 Yr Spot Return History'
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
      var fpathspotmoves = "";
      let self = this;

      this.loaded = false;

      if (selected == "Select here") {
        return;
      } else {
        fpathspotmoves = "../../static/spothist_" + selected.toLowerCase() + ".json";
      }

      const axiosspot = axios.get(fpathspotmoves);

      axios.all([axiosspot]).then(axios.spread((...responses) => {
        this.jsondataspotmoves = responses[0].data;
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

      // Spot Return History
      var first = true;
      for(var i in this.jsondataspotmoves) {
        x = [];
        y = [];
        var histname = this.jsondataspotmoves[i].sequence
        for(var j in this.jsondataspotmoves[i]) {
          if(j != "sequence") {
            x.push(j)
            y.push(this.jsondataspotmoves[i][j])
          }
        }
        if (first == true) {
          var histdata = {
            name: histname,
            //x: x,
            y: y,
            type: "scatter",
            mode: 'lines',
            marker: {
              color: 'rgb(62, 17, 81)',
              size: 12
            },
            hovertemplate: '%{y}',
          };
          first = false;
        } else {
          var histdata = {
            name: histname,
            //x: x,
            y: y,
            type: "scatter",
            mode: 'lines',
            marker: {
              color: 'rgb(111, 111, 111)'
            },
            showlegend: false,
            hovertemplate: '%{y}',
            opacity: 0.3,
          };
        }
        datacolhist.push(histdata);
      };
      chartlbl = selected + ' 1 Yr Spot Return History';
      this.cdataspotmoves = datacolhist;
      this.layoutspotmoves = {
        height: 550,
        title: {
          text: chartlbl,
          font: {
            family: 'Roboto',
            size: 18,
            color: '#350942'
          }
        },
        xaxis: {
          autorange: true,
          showgrid: false,
          zeroline: true,
          showline: true,
          autotick: true,
          ticks: '',
          showticklabels: false
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