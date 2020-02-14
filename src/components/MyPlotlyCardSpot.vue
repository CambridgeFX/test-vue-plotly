<template>
  <MdDialogTitle>{{ title }}</MdDialogTitle>
</template>

<script>
import { Plotly } from 'vue-plotly'
import axios from 'axios'
// Import data master at the beginning!
import data_master from '../../static/data_master.json'

export default {
  name: 'MyPlotlyCardSpot',
  props: {
    title: String,
  },
}
</script>

<style>

</style>