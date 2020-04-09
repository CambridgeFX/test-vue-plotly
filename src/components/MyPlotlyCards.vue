<template>
  <div id="ChartPage">
    <h1>Monthly Market Update</h1>
    <h3>Data last updated: {{ jsondatamaster.DateStamp }}</h3>
    <br />
    <div class="md-layout md-gutter md-alignment-top-center">
      <div class="md-layout-item md-size-20">
        <MdField>
          <MdSelect name="currpair" id="currpair" placeholder="Select Currency Pair" v-model="currpair">
            <MdOption v-for="curr in currpairlist" :key="curr" :value="curr">{{ curr }}</MdOption>
          </MdSelect>
        </MdField>
      </div>
    </div>
    <MdDialog :md-active.sync="showdialogspothist">
      <DialogSpotHist :title="charttype" :selectedCurr="currpair" />
      <div class="flex-container"><MdDialogActions>
        <MdButton class="md-raised md-primary" @click="showdialogspothist = false">Close</MdButton>
      </MdDialogActions></div>
    </MdDialog>
    <MdDialog :md-active.sync="showdialogspotdist">
      <DialogSpotDist :title="charttype" :selectedCurr="currpair" />
      <div class="flex-container"><MdDialogActions>
        <MdButton class="md-raised md-primary" @click="showdialogspotdist = false">Close</MdButton>
      </MdDialogActions></div>
    </MdDialog>
    <MdDialog :md-active.sync="showdialogforwardhist">
      <DialogForwardHist :title="charttype" :selectedCurr="currpair" />
      <div class="flex-container"><MdDialogActions>
        <MdButton class="md-raised md-primary" @click="showdialogforwardhist = false">Close</MdButton>
      </MdDialogActions></div>
    </MdDialog>
    <MdDialog :md-active.sync="showdialogforwardcurve">
      <DialogForwardCurve :title="charttype" :selectedCurr="currpair" />
      <div class="flex-container"><MdDialogActions>
        <MdButton class="md-raised md-primary" @click="showdialogforwardcurve = false">Close</MdButton>
      </MdDialogActions></div>
    </MdDialog>
    <MdDialog :md-active.sync="showdialogvolatility">
      <DialogVolatility :title="charttype" :selectedCurr="currpair" />
      <div class="flex-container"><MdDialogActions>
        <MdButton class="md-raised md-primary" @click="showdialogvolatility = false">Close</MdButton>
      </MdDialogActions></div>
    </MdDialog>
    <MdDialog :md-active.sync="showdialogspotmoves">
      <DialogSpotMoves :title="charttype" :selectedCurr="currpair" />
      <div class="flex-container"><MdDialogActions>
        <MdButton class="md-raised md-primary" @click="showdialogspotmoves = false">Close</MdButton>
      </MdDialogActions></div>
    </MdDialog>
    <MdDialog :md-active.sync="showdialogforecastfan">
      <DialogForecastFan :title="charttype" :selectedCurr="currpair" />
      <div class="flex-container"><MdDialogActions>
        <MdButton class="md-raised md-primary" @click="showdialogforecastfan = false">Close</MdButton>
      </MdDialogActions></div>
    </MdDialog>
    <div v-if="currpair != ''">
      <hr class="section" />
      <br />
      <div class="flex-container">
        <MdCard md-with-hover v-for="(icon, index) in charticonnames" :key="icon">
          <MdRipple>
            <div @click="clickShowDialog(currchartlist[index])">
              <MdCardHeader><a href="#" @click.prevent="clickShowDialog(currchartlist[index])">{{ currchartlist[index] }}</a><br /></MdCardHeader>
              <MdCardMedia><img class="charticon" @click="clickShowDialog(currchartlist[index])" :src="'../../static/icons/' + currpair + icon + '.png'" /></MdCardMedia>
            </div>
          </MdRipple>
        </MdCard>
      </div>
    </div>
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
import data_master from '../../static/data/data_master.json'

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
      charticonnames: ['_spothist', '_spotdist', '_forwardhist', '_forwardcurve', '_volatility', '_spotmoves', '_forecastfan'],
      charttype: '',
      currpair: '',
      currpairlist: data_master.Pairs,
    }
  },
  methods: {
    clickShowDialog: function(mytitle) {
      var pair = this.currpair;
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
h1, h3 {
  color: rgb(59, 9, 66);
}
hr.section {
  border-top: 1px solid;
  border-color: rgb(255, 129, 0);
}
.md-dialog {
  width: 100%;
  height: 90%;
  padding-top: 20px;
  max-height: 800px;
}
.dialogbutton {
  color: black;
}
.charticon {
  width: 200px;
  height: 150px;
  cursor: pointer;
}
</style>