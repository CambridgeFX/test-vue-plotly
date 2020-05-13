<template>
  <div id="GlobalsTab">
    <div class="viewport">
      <md-toolbar :md-elevation="1">
        <span class="md-title">INTRO</span>
      </md-toolbar>
      <p class="introtext">This page contains a series of charts containing global macroeconomics gathered from various sources. Please click on the chart icon to expand the view.</p>
    </div>
    
    <md-dialog :md-active.sync="showdialogfedfunds">
      <DialogGlobalFedFunds :title="charttype" />
      <div class="flex-container"><md-dialog-actions>
        <md-button class="md-raised md-primary" @click="showdialogfedfunds = false">Close</md-button>
      </md-dialog-actions></div>
    </md-dialog>
    <md-dialog :md-active.sync="showdialogempl">
      <DialogGlobalEmpl :title="charttype" />
      <div class="flex-container"><md-dialog-actions>
        <md-button class="md-raised md-primary" @click="showdialogempl = false">Close</md-button>
      </md-dialog-actions></div>
    </md-dialog>
    <md-dialog :md-active.sync="showdialogemplchange">
      <DialogGlobalEmplChange :title="charttype" />
      <div class="flex-container"><md-dialog-actions>
        <md-button class="md-raised md-primary" @click="showdialogemplchange = false">Close</md-button>
      </md-dialog-actions></div>
    </md-dialog>
    <md-dialog :md-active.sync="showdialogunemplrates">
      <DialogGlobalUnemplRate :title="charttype" />
      <div class="flex-container"><md-dialog-actions>
        <md-button class="md-raised md-primary" @click="showdialogunemplrates = false">Close</md-button>
      </md-dialog-actions></div>
    </md-dialog>
    <md-dialog :md-active.sync="showdialogunemplrateschange">
      <DialogGlobalUnemplRateChange :title="charttype" />
      <div class="flex-container"><md-dialog-actions>
        <md-button class="md-raised md-primary" @click="showdialogunemplrateschange = false">Close</md-button>
      </md-dialog-actions></div>
    </md-dialog>
    <md-dialog :md-active.sync="showdialogwti">
      <DialogGlobalWTI :title="charttype" />
      <div class="flex-container"><md-dialog-actions>
        <md-button class="md-raised md-primary" @click="showdialogwti = false">Close</md-button>
      </md-dialog-actions></div>
    </md-dialog>
    <md-dialog :md-active.sync="showdialogcpi">
      <DialogGlobalCPI :title="charttype" />
      <div class="flex-container"><md-dialog-actions>
        <md-button class="md-raised md-primary" @click="showdialogcpi = false">Close</md-button>
      </md-dialog-actions></div>
    </md-dialog>

    <div class="viewport">
      <md-toolbar :md-elevation="1">
        <span class="md-title">EMPLOYMENT CHARTS</span>
      </md-toolbar>
      <div>
        <!-- <hr class="section" /> -->
        <br />
        <div class="flex-container">
          <md-card md-with-hover v-for="(icon, index) in empliconnames" :key="icon">
            <md-ripple>
              <div @click="clickShowDialog(emplchartlist[index])">
                <MdCardHeader><a href="#" @click.prevent="clickShowDialog(emplchartlist[index])">{{ emplchartlist[index] }}</a><br /></MdCardHeader>
                <MdCardMedia><img class="charticon" @click="clickShowDialog(emplchartlist[index])" :src="'../../static/icons/' + icon + '.png'" /></MdCardMedia>
              </div>
            </md-ripple>
          </md-card>
        </div>
        <br />
      </div>
    </div>

    <div class="viewport">
      <md-toolbar :md-elevation="1">
        <span class="md-title">OTHER CHARTS</span>
      </md-toolbar>
      <div>
        <!-- <hr class="section" /> -->
        <br />
        <div class="flex-container">
          <md-card md-with-hover v-for="(icon, index) in curriconnames" :key="icon">
            <md-ripple>
              <div @click="clickShowDialog(currchartlist[index])">
                <MdCardHeader><a href="#" @click.prevent="clickShowDialog(currchartlist[index])">{{ currchartlist[index] }}</a><br /></MdCardHeader>
                <MdCardMedia><img class="charticon" @click="clickShowDialog(currchartlist[index])" :src="'../../static/icons/' + icon + '.png'" /></MdCardMedia>
              </div>
            </md-ripple>
          </md-card>
        </div>
        <br />
      </div>
    </div>

  </div>
</template>

<script>
import DialogGlobalFedFunds from '@/components/dialogs/DialogGlobalFedFunds'
import DialogGlobalEmpl from '@/components/dialogs/DialogGlobalEmpl'
import DialogGlobalEmplChange from '@/components/dialogs/DialogGlobalEmplChange'
import DialogGlobalUnemplRate from '@/components/dialogs/DialogGlobalUnemplRate'
import DialogGlobalUnemplRateChange from '@/components/dialogs/DialogGlobalUnemplRateChange'
import DialogGlobalWTI from '@/components/dialogs/DialogGlobalWTI'
import DialogGlobalCPI from '@/components/dialogs/DialogGlobalCPI'
export default {
  name: 'TabsGlobals',
  components: {
    DialogGlobalFedFunds,
    DialogGlobalEmpl,
    DialogGlobalEmplChange,
    DialogGlobalUnemplRate,
    DialogGlobalUnemplRateChange,
    DialogGlobalWTI,
    DialogGlobalCPI,
  },
  data() {
    return {
      // JSON Data
      // jsondatamaster: data_master,
      showdialogfedfunds: false,
      showdialogempl: false,
      showdialogemplchange: false,
      showdialogunemplrates: false,
      showdialogunemplrateschange: false,
      showdialogwti: false,
      showdialogcpi: false,
      emplchartlist: ['Employment', 'Employment Change', 'Unemployment', 'Unemployment Change'],
      empliconnames: ['global_empl', 'global_emplchange', 'global_unemplrate', 'global_unemplratechange'],
      currchartlist: ['Federal Funds', 'WTI', 'CPI'],
      curriconnames: ['global_fedfunds', 'global_WTI', 'global_CPI'],
      charttype: '',
      currpair: '',
      // currpairlist: data_master.Pairs,
    }
  },
  methods: {
    clickShowDialog: function(mytitle) {
      this.charttype = mytitle;
      if (this.charttype == 'Federal Funds') {
        this.showdialogfedfunds = true;
      } else if (this.charttype == 'Employment') {
        this.showdialogempl = true;
      } else if (this.charttype == 'Employment Change') {
        this.showdialogemplchange = true;
      } else if (this.charttype == 'Unemployment') {
        this.showdialogunemplrates = true;
      } else if (this.charttype == 'Unemployment Change') {
        this.showdialogunemplrateschange = true;
      } else if (this.charttype == 'WTI') {
        this.showdialogwti = true;
      } else if (this.charttype == 'CPI') {
        this.showdialogcpi = true;
      } 
      this.showDialog = true;
    }
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
  width: 100vw;
  height: 95vh;
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
</style>