<template>
  <div id="ChartPage">
    <h1>Monthly Market Update - {{ jsondatamaster.Period }}</h1>
    <br />
    <hr />
    <MdDialog :md-active.sync="showDialog">
      <MyPlotlyCardSpot :title="currPair" />
      <!-- <MdDialogTitle>USDCAD</MdDialogTitle> -->
    </MdDialog>
    <MdButton class="md-primary md-raised" v-for="ch in currchartlist" :key="ch" @click="clickShowDialog(ch)">{{ ch }}</MdButton>
  </div>
</template>

<script>
import MyPlotlyCardSpot from '@/components/MyPlotlyCardSpot'
// Import data master at the beginning!
import data_master from '../../static/data_master.json'

export default {
  name: 'MyPlotlyCard',
  components: {
    MyPlotlyCardSpot,
  },
  data() {
    return {
      // JSON Data
      jsondatamaster: data_master,
      showDialog: false,
      currchartlist: ['Spot History', 'Spot Distribution', 'Forward History', 'Forward Curve', 'Volatility', 'Forward Moves', 'Forecasts'],
      currPair: 'USDCAD',
    }
  },
  methods: {
    clickShowDialog: function(mytitle) {
      this.currPair = mytitle;
      this.showDialog = true;
    },
  },
}
</script>

<style>
.flex-container {
  display: flex;
  justify-content: center;
}
.paradialog {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: left;
}
h1 {
  color: rgb(59, 9, 66);
}
</style>