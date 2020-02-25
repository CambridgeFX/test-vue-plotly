<template>
  <div id="ChartPage">
    <h1>Monthly Market Update - January 2020</h1>
    <div ref="chartspot" v-if="loaded">
      <Plotly :data="cdataspot" :layout="layoutspot" :display-mode-bar="false"></Plotly>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <button @click="saveChart">Save</button>
  </div>
</template>

<script>
import { Plotly } from 'vue-plotly'
import html2canvas from 'html2canvas'
import axios from 'axios'

export default {
  name: 'MyPlotlyDialogCanvas',
  components: {
    Plotly
  },
  data () {
    return {
      jsondata: null,
      cdataspot: [{
        x: [],
        y: [],
        type: 'scatter'
      }],
      layoutspot: {
        title: 'USDCAD 5 Yr Spot'
      },
      loaded: false,
    }
  },
  mounted: function() {
    // Initial Setup
    this.getJSONData();
  },
  methods: {
    saveChart() {
      let vc = this
      html2canvas(vc.$refs.chartspot).then(canvas => {
        this.saveAs(canvas.toDataURL(), 'spot.png');
      }).catch((error) => {
        console.log("Error", error);
      });
    },
    saveAs(uri, filename) {
      var link = document.createElement('a');
      if (typeof link.download === 'string') {
          link.href = uri;
          link.download = filename;

          //Firefox requires the link to be in the body
          document.body.appendChild(link);
          //simulate click
          link.click();
          //remove the link when done
          document.body.removeChild(link);
      } else {
          window.open(uri);
      }
    },
    getJSONData() {
      var fpathspot = "";
      
      fpathspot = "../../static/spot5yr_usdcad.json";
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
      var x = [];
      var y = [];
      var chartlbl = '';
      
      x = [];
      y = [];
      for(var i in this.jsondataspot) {
        x.push(this.jsondataspot[i].date);
        y.push(this.jsondataspot[i].spot);
      }
      chartlbl = 'USDCAD 5 Yr Spot';
      this.cdataspot = [{
        x: x,
        y: y,
        type: 'scatter',
        line: {
          color: 'rgb(62, 17, 81)'
        },
        hovertemplate: '1 USD = %{y} CAD <extra></extra>',
      }]
      this.layoutspot = {
        autosize: false,
        // title: {
        //   text: chartlbl,
        //   font: {
        //     family: 'Roboto',
        //     size: 18,
        //     color: '#350942'
        //   }
        // },
        // xaxis: {
        //   title: {
        //     text: 'Date',
        //     font: {
        //       family: 'Roboto',
        //       size: 16,
        //       color: '#350942'
        //     }
        //   },
        //   tickformat: '%B %d, %Y'
        // },
        // yaxis: {
        //   title: {
        //     text: 'Spot Rate',
        //     font: {
        //       family: 'Roboto',
        //       size: 16,
        //       color: '#350942'
        //     }
        //   },
        //   tickformat: '.2f'
        // },
        // annotations: [{
        //   xref: 'paper',
        //   yref: 'paper',
        //   x: 1,
        //   xanchor: 'right',
        //   y: 1,
        //   yanchor: 'bottom',
        //   text: 'Source: Bloomberg, Federal Reserves, Cambridge Calculations, 2020',
        //   showarrow: false
        // }]
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
h1 {
  color: rgb(59, 9, 66);
}
</style>