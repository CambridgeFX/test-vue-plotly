<template>
  <div id="HomeTab">
    <div class="viewport">
      <md-toolbar :md-elevation="1">
        <span class="md-title">INTRO</span>
      </md-toolbar>
      <p class="introtext">Welcome to <b>Cambridge Global Payments Market Analysis Dashboard</b>. Please go to the following sections for more market information:</p>
      <md-list>
        <md-list-item>
          <span class="md-list-item-text">Currency - Current and historic charts and graphs concerning specified currency pair.</span>
        </md-list-item>
        <md-list-item>
          <span class="md-list-item-text">Macroeconomic - Current and historic charts and graphs concerning global market conditions.</span>
        </md-list-item>
        <md-list-item>
          <span class="md-list-item-text">Disclosures - Legal and compliance disclosures.</span>
        </md-list-item>
      </md-list>
    </div>
    <div class="flex-container">
      <div class="viewport-half">
        <md-toolbar :md-elevation="1">
          <span class="md-title">QUICK CHARTS</span>
        </md-toolbar>
        <MdDialog :md-active.sync="showdialogusdcad" :md-fullscreen="true">
          <DialogSpotHist :title="charttype" :selectedCurr="currpair" />
          <div class="flex-container"><MdDialogActions>
            <MdButton class="md-raised md-primary" @click="showdialogusdcad = false">Close</MdButton>
          </MdDialogActions></div>
        </MdDialog>
        <md-dialog :md-active.sync="showdialogfedfunds">
          <DialogGlobalFedFunds :title="charttype" />
          <div class="flex-container"><md-dialog-actions>
            <md-button class="md-raised md-primary" @click="showdialogfedfunds = false">Close</md-button>
          </md-dialog-actions></div>
        </md-dialog>
        <div>
          <!-- <hr class="section" /> -->
          <br />
          <div class="flex-container">
            <md-card md-with-hover v-for="(icon, index) in charticonnames" :key="icon">
              <md-ripple>
                <div @click="clickShowDialog(currchartlist[index])">
                  <MdCardHeader><a href="#" @click.prevent="clickShowDialog(currchartlist[index])">{{ currchartlist[index] }}</a><br /></MdCardHeader>
                  <MdCardMedia><img class="charticon" @click="clickShowDialog(currchartlist[index])" :src="'../../static/icons/' + icon + '.png'" /></MdCardMedia>
                </div>
              </md-ripple>
            </md-card>
          </div>
        </div>
      </div>
      <div class="viewport-half">
        <md-toolbar :md-elevation="1">
          <span class="md-title">QUICK NEWS</span>
        </md-toolbar>
        <md-dialog :md-active.sync="showdialognews">
          <md-dialog-title>Headline 1 by Karl Schamotta</md-dialog-title>
          <md-dialog-content>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst.</p>
          </md-dialog-content>
        </md-dialog>
        <md-list>
          <md-list-item>
            <div @click="clickShowNewsDialog(newslist[0])"><span class="md-list-item-text newsheader">Headline 1</span></div>
          </md-list-item>
          <md-list-item>
            <span class="md-list-item-text">Headline 2</span>
          </md-list-item>
          <md-list-item>
            <span class="md-list-item-text">Headline 3</span>
          </md-list-item>
        </md-list>
      </div>
    </div>
  </div>
</template>

<script>
import DialogSpotHist from '@/components/dialogs/DialogSpotHist'
import DialogGlobalFedFunds from '@/components/dialogs/DialogGlobalFedFunds'
export default {
  name: 'TabsHome',
  components: {
    DialogSpotHist,
    DialogGlobalFedFunds,
  },
  data() {
    return {
      // JSON Data
      // jsondatamaster: data_master,
      showdialogusdcad: false,
      showdialogfedfunds: false,
      showdialognews: false,
      currchartlist: ['USDCAD Spot', 'Federal Funds'],
      charticonnames: ['USDCAD_spothist', 'GLOBAL_fedfunds'],
      newslist: ['test'],
      charttype: '',
      newstype: '',
      currpair: 'USDCAD',
      // currpairlist: data_master.Pairs,
    }
  },
  methods: {
    clickShowDialog: function(mytitle) {
      this.charttype = mytitle;
      if (this.charttype == 'USDCAD Spot') {
        this.showdialogusdcad = true;
      } else if (this.charttype == 'Federal Funds') {
        this.showdialogfedfunds = true;
      }
      this.showDialog = true;
    },
    clickShowNewsDialog: function(mytitle) {
      this.newstype = mytitle;
      if (this.newstype == 'test') {
        this.showdialognews = true;
      }
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
  max-width: 150px;
  max-height: 100px;
  cursor: pointer;
}
.viewport {
  width: 100vw;
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  border: 1px solid rgba(#000, .12);
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
}
.viewport-half {
  width: 50vw;
  max-width: 50%;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  border: 1px solid rgba(#000, .12);
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
}
p.introtext {
  font-size: 16px;
  text-align: left !important;
  padding-left: 15px;
}
span.newsheader {
  color: #448aff;
  cursor: pointer;
}
span.newsheader:hover {
  text-decoration: underline;
}
</style>