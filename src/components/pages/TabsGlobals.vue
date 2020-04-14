<template>
  <div id="GlobalsTab">
    <h3>Global charts here</h3>
  </div>
</template>

<script>
export default {
  name: 'TabsGlobals',
  components: {
    
  },
  data() {
    return {
      // JSON Data
      // jsondatamaster: data_master,
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
      // currpairlist: data_master.Pairs,
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