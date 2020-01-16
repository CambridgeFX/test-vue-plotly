<template>
  <div id="parser">
    <div class="productsItemContainer" v-for="spot in jsondata" :key="spot">
      <div class="productsItem">
        {{ spot.date }} :: {{ spot.spot}}
      </div>
    </div>
  </div>
</template>

<script>
import json from '../../static/spot5yr_usdcad.json'

export default {
  name: 'JSONParser',
  data() {
    return {
      jsondata: json
    }
  }
}
</script>

<style>

</style>