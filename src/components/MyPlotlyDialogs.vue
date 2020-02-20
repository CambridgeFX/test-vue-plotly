<template>
  <div id="ChartPage">
    <h1>Monthly Market Update - {{ jsondatamaster.Period }}</h1>
    <br />
    <div class="md-layout md-gutter md-alignment-top-center">
      <div class="md-layout-item md-size-20">
        <MdField>
          <MdSelect name="currpair" id="currpair" placeholder="Select Currency Pair" v-model="currPair">
            <MdOption v-for="curr in currpairlist" :key="curr" :value="curr">{{ curr }}</MdOption>
          </MdSelect>
        </MdField>
      </div>
    </div>
    <hr />
    <MdDialog :md-active.sync="showdialogspothist">
      <DialogSpotHist :title="charttype" :selectedCurr="currPair" />
    </MdDialog>
    <MdDialog :md-active.sync="showdialogspotdist">
      <DialogSpotDist :title="charttype" :selectedCurr="currPair" />
    </MdDialog>
    <MdDialog :md-active.sync="showdialogforwardhist">
      <DialogForwardHist :title="charttype" :selectedCurr="currPair" />
    </MdDialog>
    <MdDialog :md-active.sync="showdialogforwardcurve">
      <DialogForwardCurve :title="charttype" :selectedCurr="currPair" />
    </MdDialog>
    <MdDialog :md-active.sync="showdialogvolatility">
      <DialogVolatility :title="charttype" :selectedCurr="currPair" />
    </MdDialog>
    <MdDialog :md-active.sync="showdialogspotmoves">
      <DialogSpotMoves :title="charttype" :selectedCurr="currPair" />
    </MdDialog>
    <MdDialog :md-active.sync="showdialogforecastfan">
      <DialogForecastFan :title="charttype" :selectedCurr="currPair" />
    </MdDialog>
    <MdButton class="md-primary md-raised" v-for="ch in currchartlist" :key="ch" @click="clickShowDialog(ch)">{{ ch }}</MdButton>
  </div>
</template>

<script>
import DialogSpotHist from '@/components/dialogs/DialogSpotHist'
import DialogSpotDist from '@/components/dialogs/DialogSpotDist'
import DialogForwardHist from '@/components/dialogs/DialogForwardHist'
import DialogForwardCurve from '@/components/dialogs/DialogForwardCurve'
import DialogVolatility from '@/components/dialogs/DialogVolatility'
import DialogSpotMoves from '@/components/dialogs/DialogSpotMoves'
import DialogForecastFan from '@/components/dialogs/DialogForecastFan'
// Import data master at the beginning!
import data_master from '../../static/data_master.json'

export default {
  name: 'MyPlotlyDialogs',
  components: {
    DialogSpotHist,
    DialogSpotDist,
    DialogForwardHist,
    DialogForwardCurve,
    DialogVolatility,
    DialogSpotMoves,
    DialogForecastFan,
  },
  data() {
    return {
      // JSON Data
      jsondatamaster: data_master,
      showdialogspothist: false,
      showdialogspotdist: false,
      showdialogforwardhist: false,
      showdialogforwardcurve: false,
      showdialogvolatility: false,
      showdialogspotmoves: false,
      showdialogforecastfan: false,
      currchartlist: ['Spot History', 'Spot Distribution', 'Forward History', 'Forward Curve', 'Volatility', 'Spot Rate Changes', 'Forecasts'],
      charttype: '',
      currPair: '',
      currpairlist: ["AUDUSD", "CADJPY", "EURCAD", "EURGBP", "EURMXN", "EURUSD", "GBPCAD", "USDCAD"],
    }
  },
  methods: {
    clickShowDialog: function(mytitle) {
      var pair = this.currPair;
      if (pair != '') {
        this.charttype = mytitle;
        if (this.charttype == 'Spot History') {
          this.showdialogspothist = true;
        } else if (this.charttype == 'Spot Distribution') {
          this.showdialogspotdist = true;
        } else if (this.charttype == 'Forward History') {
          this.showdialogforwardhist = true;
        } else if (this.charttype == 'Forward Curve') {
          this.showdialogforwardcurve = true;
        } else if (this.charttype == 'Volatility') {
          this.showdialogvolatility = true;
        } else if (this.charttype == 'Spot Rate Changes') {
          this.showdialogspotmoves = true;
        } else if (this.charttype == 'Forecasts') {
          this.showdialogforecastfan = true;
        }
        this.showDialog = true;
      }
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
.md-dialog {
  width: 90%;
  height: 90%;
  padding-top: 20px;
}
</style>