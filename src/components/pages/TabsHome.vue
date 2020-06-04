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
      <div id="quickcharts" class="viewport-half">
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
      <div id="quicknews" class="viewport-half">
        <md-toolbar :md-elevation="1">
          <span class="md-title leftalign" style="flex: 1">QUICK NEWS</span>
          <div class="md-layout-item md-size-30 rightalign">
            <MdField>
              <MdSelect class="currselect" name="rssselect" id="rssselect" placeholder="Select RSS Feed to view" v-model="rsspath">
                <MdOption v-for="rss in rsslist" :key="rss.path" :value="rss.path">{{ rss.name }}</MdOption>
              </MdSelect>
            </MdField>
          </div>
        </md-toolbar>
        <div v-if="rsspath != ''">
          <VueRssFeed :feedUrl="rsspath" :name="name" :limit="limit"/>
        </div>
        <div v-if="rsspath != ''" class="flex-container"><MdDialogActions>
          <MdButton class="md-raised md-primary" @click="increaseLimit">More ...</MdButton>
        </MdDialogActions></div>
      </div>
    </div>
  </div>
</template>

<script>
import DialogSpotHist from '@/components/dialogs/DialogSpotHist'
import DialogGlobalFedFunds from '@/components/dialogs/DialogGlobalFedFunds'
import VueRssFeed from 'vue-rss-feed'
// Import data master at the beginning!
import data_rssmaster from '../../../static/data/data_rssmaster.json'
export default {
  name: 'TabsHome',
  components: {
    DialogSpotHist,
    DialogGlobalFedFunds,
    VueRssFeed,
  },
  data() {
    return {
      // JSON Data
      // jsondatamaster: data_master,
      showdialogusdcad: false,
      showdialogfedfunds: false,
      showdialognews: false,
      currchartlist: ['USDCAD Spot', 'Federal Funds'],
      charticonnames: ['USDCAD_spothist', 'global_fedfunds'],
      charttype: '',
      newstype: '',
      currpair: 'USDCAD',
      feedUrl: "http://blog-imfdirect.imf.org/feed/",
      name: '',
      limit: 3,
      rsslist: data_rssmaster.rsslist,
      rsspath: '',
    }
  },
  // mounted() {
  //   this.scrollEvent = window.addEventListener("scroll", () => {
  //     if (
  //       window.innerHeight + window.scrollY >=
  //       document.getElementById('quicknews').offsetHeight - 100
  //     ) {
  //       this.limit = this.limit + 3;
  //     }
  //   });
  // },
  watch: {
    rsspath: function(oldvalue, newvalue) {
      this.limit = 3;
    },
  },
  methods: {
    increaseLimit() {
      this.limit += 3;
    },
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
  flex-wrap: wrap;
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
.leftalign {
  text-align: left !important;
}
.rightalign {
  text-align: right !important;
}
.centeralign {
  text-align: center !important;
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