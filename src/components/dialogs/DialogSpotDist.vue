<template>
  <div>
    <MdDialogTitle>{{ title }}</MdDialogTitle>
    <MdDialogContent>
      <div class="flex-container-fixed">
        <div><Plotly :data="cdatadist3M" :layout="layoutdist3M" :display-mode-bar="false"></Plotly></div>
        <div><Plotly :data="cdatadist6M" :layout="layoutdist6M" :display-mode-bar="false"></Plotly></div>
        <div><Plotly :data="cdatadist12M" :layout="layoutdist12M" :display-mode-bar="false"></Plotly></div>
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
      jsondatadistcalc: null,
      // Chart data and layout objects
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
      var fpathdistcalc = "";
      let self = this;

      this.loaded = false;

      if (selected == "Select here") {
        return;
      } else {
        fpathdistcalc = "../../../static/data/distcalc_" + selected.toLowerCase() + ".json";
      }

      const axiosspot = axios.get(fpathdistcalc);

      axios.all([axiosspot]).then(axios.spread((...responses) => {
        this.jsondatadistcalc = responses[0].data;
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
              title: {
                text: chartlbl,
                font: {
                  family: 'Roboto',
                  size: 18,
                  color: '#350942'
                }
              },
              width: 400,
            }
          } else if (distname.substring(0,3) == "6M ") {
            chartlbl = selected + ' 6 Mo Distribution';
            this.cdatadist6M = datacoldist;
            this.layoutdist6M = {
              title: {
                text: chartlbl,
                font: {
                  family: 'Roboto',
                  size: 18,
                  color: '#350942'
                }
              },
              width: 400,
            }
          } else {
            chartlbl = selected + ' 12 Mo Distribution';
            this.cdatadist12M = datacoldist;
            this.layoutdist12M = {
              title: {
                text: chartlbl,
                font: {
                  family: 'Roboto',
                  size: 18,
                  color: '#350942'
                }
              },
              width: 400,
            }
          }
        }
      };
    }
  }

}
</script>

<style>
.flex-container-fixed {
  display: flex;
  justify-content: center;
}

</style>