<template>
  <div id="material">
    <div class="md-layout md-gutter md-alignment-top-center">
      <div class="md-layout-item md-size-30">
        <MdField>
          <MdSelect name="currpair" id="currpair" placeholder="Select Currency Pair" v-model="selectedValue" @change="alertPair()">
            <MdOption v-for="pair in pairs" :key="pair" :value="pair">{{ pair }}</MdOption>
          </MdSelect>
        </MdField>
        <MdButton class="md-raised md-primary" :click="alertPair()">Primary</MdButton>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MaterialTest',
  data() {
    return {
      pairs: ["USDCAD", "EURUSD", "GBPUSD"],
      selectedValue: '',
      selected: false,
    }
  },
  methods: {
    alertPair() {
      if (this.selectedValue != "") {
        alert(this.selectedValue);
      }
    },
  }
}
</script>

<style>

</style>