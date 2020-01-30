<template>
  <div id="ChartPage">
    <h1>Monthly Market Update - January 2019</h1>
    <br />
    <div class="md-layout md-gutter md-alignment-top-center">
      <div class="md-layout-item md-size-20">
        <MdField>
          <MdSelect name="currpair" id="currpair" placeholder="Select Currency Pair" v-model="selectedCurr" @change="onCurrChange()">
            <MdOption v-for="curr in currpairlist" :key="curr" :value="curr">{{ curr }}</MdOption>
          </MdSelect>
        </MdField>
      </div>
    </div>
    <br /><br />
    <div v-if="loaded">
      <Plotly :data="cdataspot" :layout="layoutspot" :display-mode-bar="false"></Plotly>
      <br />
      <input type="radio" id="five" value="five" v-model="selectedHorizon" @change="onCurrChange()">
      <label for="five">5 Years</label>
      <input type="radio" id="twenty" value="twenty" v-model="selectedHorizon" @change="onCurrChange()">
      <label for="twenty">20 Years</label>
      <!-- <MdRadio v-model="selectedHorizon" :value="five">5 Years</MdRadio>
      <MdRadio v-model="selectedHorizon" :value="twenty">10 Years</MdRadio> -->
      <br /><br />
      <Plotly :data="cdataforward" :layout="layoutforward" :display-mode-bar="false"></Plotly>
      <br /><br />
      <div class="flex-container">
        <div><Plotly :data="cdataforwardcurve" :layout="layoutforwardcurve" :display-mode-bar="false"></Plotly></div>
        <div><Plotly :data="cdatavolatility" :layout="layoutvolatility" :display-mode-bar="false"></Plotly></div>
      </div>
      <br /><br />
      <Plotly :data="cdataspothistory" :layout="layoutspothistory" :display-mode-bar="false"></Plotly>
      <br /><br />
      <div class="flex-container">
        <div><Plotly :data="cdatadist3M" :layout="layoutdist3M" :display-mode-bar="false"></Plotly></div>
        <div><Plotly :data="cdatadist6M" :layout="layoutdist6M" :display-mode-bar="false"></Plotly></div>
        <div><Plotly :data="cdatadist12M" :layout="layoutdist12M" :display-mode-bar="false"></Plotly></div>
      </div>
      <br /><br />
      <Plotly :data="cdataforecast" :layout="layoutforecast" :display-mode-bar="false"></Plotly>
      <MdDialog :md-active.sync="openMethodology">
        <MdDialogTitle>Fan Chart Methodology</MdDialogTitle>
        <p>FAN CHART ANALYSIS PROVIDES A measure of the range of uncertainty SURROUNDING THE EXCHANGE RATE OUTLOOK. As MOVES become increasingly uncertain further into the future, ranges spread out.</p>
        <p><strong>RANGE CALCULATIONS</strong> ARE BASED ON 30 YEARS OF EXCHANGE RATE DATA AND ARE DESIGNED TO AGNOSTICALLY ILLUSTRATE THE LIKELIHOOD OF A SUSTAINED MOVE BEYOND GIVEN LEVELS. FOR EXAMPLE, UPPER AND LOWER LINES LABELED “9 OUT OF 10 TIMES” SUGGEST THAT EXCHANGE RATES ARE EXPECTED TO STAY WITHIN THIS RANGE IN 90% OF SIMILAR TIME PERIODS - WHILE IN 10% OF SIMILAR TIME PERIODS, EXCHANGE RATES MOVES EXCEED THESE LEVELS.</p>
        <p><strong>Please Note:</strong> RANGES depicted are generalized measures of probability based upon a parametric/ delta-normal analysis of a 30-year historical distribution of market movements and are used to estimate the exchange rate uncertainties associated with different currencies and time periods. calculations do not take all types of risks into account (e.g. liquidity risk, regulatory risk, sovereign risk, etc.). Both larger and smaller movements than those outlined are possible. In currency markets specifically, major political and economic events can trigger extreme moves.</p>
        <p><strong>CAMBRIDGE FORECAST:</strong> CAMBRIDGE’S EXCHANGE RATE PROJECTION.</p>
        <p><strong>CONSENSUS FORECAST:</strong> FORECAST RESULTS DERIVED FROM MONTHLY BLOOMBERG AND REUTERS POLLS.</p>
      </MdDialog>
      <MdButton class="md-raised md-primary" @click="openMethodology = true">Fan Chart Methodology</MdButton>
    </div>
  </div>
</template>

<script>
import { Plotly } from 'vue-plotly'
import axios from 'axios'
import { MdField, MdSelect, MdOption } from 'vue-material/dist/components/MdField'

export default {
  name: 'MyPlotlyMultiple',
  components: {
    Plotly
  },
  data () {
    return {
      // JSON Data
      jsondataspot: null,
      jsondataspothist: null,
      jsondataforward: null,
      jsondataforwardcurve: null,
      jsondatavolatility: null,
      jsondatadistcalc: null,
      jsondataforecast: null,
      // Chart data and layout objects
      cdataspot: [{
        x: [],
        y: [],
        type: 'scatter'
      }],
      layoutspot: {
        title: 'USDCAD 5 Yr Spot'
      },
      cdataspothistory: [],
      layoutspothistory: {
        title: 'USDCAD 1 Yr Spot Return History'
      },
      cdataforward: [{
        x: [],
        y: [],
        type: 'scatter'
      }],
      layoutforward: {
        title: 'USDCAD Forward Point History'
      },
      cdataforwardcurve: [{
        x: [],
        y: [],
        type: 'bar'
      }],
      layoutforwardcurve: {
        title: 'USDCAD Forward Curve'
      },
      cdatavolatility: [{
        x: [],
        y: [],
        type: 'bar'
      }],
      layoutvolatility: {
        title: 'USDCAD 12 Mo Implied Volatility History'
      },
      cdatadist3M: [{
        x: [],
        y: [],
        type: 'bar'
      }],
      layoutdist3M: {
        title: 'USDCAD 3 Mo Distribution'
      },
      cdatadist6M: [{
        x: [],
        y: [],
        type: 'bar'
      }],
      layoutdist6M: {
        title: 'USDCAD 6 Mo Distribution'
      },
      cdatadist12M: [{
        x: [],
        y: [],
        type: 'bar'
      }],
      layoutdist12M: {
        title: 'USDCAD 12 Mo Distribution'
      },
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
      currpairlist: ["AUDUSD", "CADJPY", "EURCAD", "EURGBP", "EURMXN", "EURUSD", "GBPCAD", "USDCAD"],
      selectedCurr: "",
      selectedHorizon: "five",
      openMethodology: false,
    }
  },
  watch: {
    selectedCurr: function (val) {
      if (val == "Select here" || val == "") {
        this.loaded = false;
      } else {
        this.getJSONData();
      }
    }
  },
  mounted: function() {
    // Initial Setup
    // alert("Mounted");
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
      var fpathspothist = "";
      var fpathforwardhist = "";
      var fpathforwardcurve = "";
      var fpathvolatility = "";
      var fpathdistcalc = "";
      var fpathforecast = "";
      let self = this;

      this.loaded = false;

      if (selected == "Select here") {
        return;
      } else {
        if (horizon == "five") {
          fpathspot = "../../static/spot5yr_" + selected.toLowerCase() + ".json";
        } else {
          fpathspot = "../../static/spot20yr_" + selected.toLowerCase() + ".json";
        }
        fpathspothist = "../../static/spothist_" + selected.toLowerCase() + ".json";
        fpathforwardhist = "../../static/forward_" + selected.toLowerCase() + ".json";
        fpathforwardcurve = "../../static/forwardcurve_" + selected.toLowerCase() + ".json";
        fpathvolatility = "../../static/volatility_" + selected.toLowerCase() + ".json";
        fpathdistcalc = "../../static/distcalc_" + selected.toLowerCase() + ".json";
        fpathforecast = "../../static/forecast_" + selected.toLowerCase() + ".json";
      }

      const axiosspot = axios.get(fpathspot);
      const axiosspothist = axios.get(fpathspothist);
      const axiosforward = axios.get(fpathforwardhist);
      const axiosforwardcurve = axios.get(fpathforwardcurve);
      const axiosvolatility = axios.get(fpathvolatility);
      const axiosdistcalc = axios.get(fpathdistcalc);
      const axiosforecast = axios.get(fpathforecast);

      axios.all([axiosspot, axiosforward, axiosforwardcurve, axiosspothist, axiosvolatility, axiosdistcalc, axiosforecast]).then(axios.spread((...responses) => {
        this.jsondataspot = responses[0].data;
        this.jsondataforward = responses[1].data;
        this.jsondataforwardcurve = responses[2].data;
        this.jsondataspothist = responses[3].data;
        this.jsondatavolatility = responses[4].data;
        this.jsondatadistcalc = responses[5].data;
        this.jsondataforecast = responses[6].data;
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
        }
      }]
      this.layoutspot = {
        title: chartlbl
      }

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
        }
      }]
      this.layoutforward = {
        title: chartlbl
      }

      // Forward curve
      x = [];
      y = [];
      for(var j in this.jsondataforwardcurve) {
        x.push(this.jsondataforwardcurve[j].month);
        y.push(this.jsondataforwardcurve[j].forward);
      }
      chartlbl = selected + ' Forward Curve'
      this.cdataforwardcurve = [{
        x: x,
        y: y,
        type: 'bar',
        marker: {
          color: 'rgb(62, 17, 81)'
        }
      }]
      this.layoutforwardcurve = {
        title: chartlbl
      }

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
        title: chartlbl
      }

      // Spot Return History
      var first = true;
      for(var i in this.jsondataspothist) {
        x = [];
        y = [];
        var histname = this.jsondataspothist[i].sequence
        for(var j in this.jsondataspothist[i]) {
          if(j != "sequence") {
            x.push(j)
            y.push(this.jsondataspothist[i][j])
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
            hoverinfo: "y"
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
            hoverinfo: "none",
            opacity: 0.3,
          };
        }
        datacolhist.push(histdata);
      };
      chartlbl = selected + ' 1 Yr Spot Return History';
      this.cdataspothistory = datacolhist;
      this.layoutspothistory = {
        title: chartlbl,
        xaxis: {
          autorange: true,
          showgrid: false,
          zeroline: true,
          showline: true,
          autotick: true,
          ticks: '',
          showticklabels: false
        },
      }

      // Distribution Calculation
      var first = true;
      var second = false;
      for(var i in this.jsondatadistcalc) {
        x = [];
        y = [];
        var distname = this.jsondatadistcalc[i].dist
        for(var j in this.jsondatadistcalc[i]) {
          if(j != "sequence") {
            y.push(j)
            x.push(this.jsondatadistcalc[i][j])
          }
        }
        if (first == true) {
          // Actual first
          datacoldist = [];
          var distdata = {
            name: distname,
            x: x,
            //y: y,
            type: "bar",
            marker: {
              color: 'rgb(62, 17, 81)',
              size: 12
            },
            showlegend: false,
            hoverinfo: "x"
          };
          first = false;
          second = true;
        } else {
          // Standard next
          var distdata = {
            name: distname,
            x: x,
            //y: y,
            type: "scatter",
            mode: 'lines',
            marker: {
              color: 'rgb(111, 111, 111)'
            },
            showlegend: false,
            hoverinfo: "x",
            opacity: 0.7,
          };
          first = true;
          second = false;
        }
        datacoldist.push(distdata);

        if (first == true) {
          if (distname.substring(0,3) == "3M ") {
            chartlbl = selected + ' 3 Mo Distribution';
            this.cdatadist3M = datacoldist;
            this.layoutdist3M = {
              title: chartlbl,
              width: 400,
            }
          } else if (distname.substring(0,3) == "6M ") {
            chartlbl = selected + ' 6 Mo Distribution';
            this.cdatadist6M = datacoldist;
            this.layoutdist6M = {
              title: chartlbl,
              width: 400,
            }
          } else {
            chartlbl = selected + ' 12 Mo Distribution';
            this.cdatadist12M = datacoldist;
            this.layoutdist12M = {
              title: chartlbl,
              width: 400,
            }
          }
        }
      };
      
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
              if(j != "dist" && j != "0") {
                x.push(parseInt(j))
                y.push(this.jsondataforecast[i][j])
              }
            } else {
              if(j != "dist") {
                x.push(parseInt(j))
                y.push(this.jsondataforecast[i][j])
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
        title: chartlbl,
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
