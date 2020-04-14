<template>
  <div id="TabsPage">
    <h1>Monthly Market Update</h1>
    <h3>Data last updated: {{ jsondatamaster.DateStamp }}</h3>
    <br />
    <md-tabs router-link>
      <md-tab id="tab-home" md-label="Dashboard" to="/tabs/home" class="md-raised md-primary" exact>Home tab</md-tab>
      <md-tab id="tab-pairs" md-label="Currency Charts" to="/tabs/pairs" class="md-raised md-primary">Pairs tab</md-tab>
      <md-tab id="tab-globals" md-label="Global Charts" to="/tabs/globals" class="md-raised md-primary">Globals tab</md-tab>
    </md-tabs>
  </div>
</template>

<script>
// Import data master at the beginning!
import data_master from '../../static/data/data_master.json'

export default {
  name: 'MyPlotlyCardsTabs',
  components: {
    
  },
  data() {
    return {
      // JSON Data
      jsondatamaster: data_master,
    }
  },
  methods: {
    
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