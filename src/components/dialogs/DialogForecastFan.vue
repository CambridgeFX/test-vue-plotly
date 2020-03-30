<template>
  <div>
    <MdDialogTitle>{{ title }}</MdDialogTitle>
    <MdDialogContent>
      <Plotly :data="cdataforecast" :layout="layoutforecast" :display-mode-bar="false"></Plotly>
    </MdDialogContent>
  </div>
</template>

<script>
import { Plotly } from 'vue-plotly'
import axios from 'axios'
// Import data master at the beginning!
import data_master from '../../../static/data/data_master.json'

export default {
  name: 'DialogForecastFan',
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
      jsondataforecast: null,
      // Chart data and layout objects
      cdataforecast: [{
        x: [],
        y: [],
        type: 'scatter'
      }],
      layoutforecast: {
        title: 'USDCAD 12 Mo Outlook'
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
      var fpathforecast = "";
      let self = this;

      this.loaded = false;

      if (selected == "Select here") {
        return;
      } else {
        fpathforecast = "../../../static/data/forecast_" + selected.toLowerCase() + ".json";
      }

      const axiosspot = axios.get(fpathforecast);

      axios.all([axiosspot]).then(axios.spread((...responses) => {
        this.jsondataforecast = responses[0].data;
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

      // Forecast Fan Chart
      var first = true;
      for(var i in this.jsondataforecast) {
        x = [];
        y = [];
        var distname = this.jsondataforecast[i].dist
        if (distname == "BUDGET RATE" || distname == "THRESHOLD" || distname == "17 TIMES OUT OF 20") {
          // Hide these datapoints, do not process!
        } else {
          // Valid datapoints, process!
          for(var j in this.jsondataforecast[i]) {
            if (distname == "MAX" || distname == "MIN") {
              if(j != "dist") {
                x.push(this.addMonths(new Date(),parseInt(j)))
                y.push(this.jsondataforecast[i][j])
              }
            } else {
              if(j != "dist") {
                if (parseInt(j) != 13) {
                  x.push(this.addMonths(new Date(),parseInt(j)))
                  y.push(this.jsondataforecast[i][j])
                }
              }
            }
          }
          if (distname == "ACTUAL EXPIRATION") {
            var distdata = {
              name: distname,
              x: x,
              y: y,
              type: "scatter",
              mode: 'markers',
              marker: {
                color: 'rgb(243, 139, 0)',
                size: 6
              },
              hoverinfo: "all",
              showlegend: false,
            };
          } else if (distname == "MAX") {
            var distdata = {
              name: distname,
              x: x,
              y: y,
              type: "scatter",
              mode: 'lines',
              line: {
                color: 'rgb(62, 17, 81)',
              },
              hoverinfo: "all",
              showlegend: false,
            };
          } else if (distname == "MIN") {
            var distdata = {
              name: distname,
              x: x,
              y: y,
              type: "scatter",
              mode: 'lines',
              line: {
                color: 'rgb(62, 17, 81)',
              },
              opacity: 0.5,
              hoverinfo: "all",
              showlegend: false,
            };
          } else if (distname == "CAMBRIDGE FORECAST") {
            var distdata = {
              name: distname,
              x: x,
              y: y,
              type: "scatter",
              mode: 'lines',
              line: {
                color: 'rgb(62, 17, 81)',
                dash: "dot",
              },
              hoverinfo: "all",
            };
          } else if (distname == "CONSENSUS FORECAST") {
            var distdata = {
              name: distname,
              x: x,
              y: y,
              type: "scatter",
              mode: 'lines',
              line: {
                color: 'rgb(62, 17, 81)',
                dash: "dash",
              },
              hoverinfo: "all",
            };
          } else if (distname == "3 TIMES OUT OF 4") {
            var distdata = {
              name: distname,
              x: x,
              y: y,
              type: "scatter",
              mode: 'lines',
              line: {
                color: 'rgb(62, 17, 81)',
              },
              opacity: 0.7,
              hoverinfo: "all",
            };
          } else if (distname == "9 TIMES OUT OF 10") {
            var distdata = {
              name: distname,
              x: x,
              y: y,
              type: "scatter",
              mode: 'lines',
              line: {
                color: 'rgb(62, 17, 81)',
              },
              opacity: 0.5,
              hoverinfo: "all",
            };
          } else if (distname == "19 TIMES OUT OF 20") {
            var distdata = {
              name: distname,
              x: x,
              y: y,
              type: "scatter",
              mode: 'lines',
              line: {
                color: 'rgb(62, 17, 81)',
              },
              opacity: 0.3,
              hoverinfo: "all",
            };
          } else {
            var distdata = {
              name: distname,
              x: x,
              y: y,
              type: "scatter",
              mode: 'lines',
              line: {
                color: 'rgb(62, 17, 81)',
                size: 12
              },
              hoverinfo: "all"
            };
          }
          datacolcast.push(distdata);
        }
      };
      chartlbl = selected + ' 12 Mo Outlook';
      this.cdataforecast = datacolcast;
      this.layoutforecast = {
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
            text: 'Month',
            font: {
              family: 'Roboto',
              size: 16,
              color: '#350942'
            }
          },
          tickformat: '%B %Y',
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
        // xaxis: {
        //   autorange: true,
        //   showgrid: false,
        //   zeroline: true,
        //   showline: true,
        //   autotick: true,
        //   ticks: '',
        //   showticklabels: false
        // },
      }
    },
    addMonths(date, months) {
      // Utility function, offset month
      var d = date.getDate();
      date.setMonth(date.getMonth() + +months);
      if (date.getDate() != d) {
        date.setDate(0);
      }
      return date;
    },
    formatDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) 
        month = '0' + month;
      if (day.length < 2) 
        day = '0' + day;

      return [year, month, day].join('-');
    },
  }

}
</script>

<style>
.flex-container {
  display: flex;
  justify-content: center;
}

</style>