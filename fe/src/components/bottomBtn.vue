<script>
import { useKeycloak } from "@teresol/vue-keycloak";
import Swal from "sweetalert2";
import { confirmOptions, options } from '../mixins/alertOption.js'
import { ElMessageBox } from 'element-plus';
import { reactive, ref, toRef } from "@vue/reactivity";
import CompareList from "../utilities/userActivitiesMapper.js"
import axios from "axios";

import UseCaseLoader from "../UseCase/BCH_OPN_UC1_OpenBatch/UseCaseLoader";

export default {
  props: ["batch", "reports", "activities", "help"],
  setup(props) {
    if (window.mainElectronApp) {
      window.mainElectronApp.getVersion()
      window.mainElectronApp.receive('gettingVersion', (event, arg) => {
        teresolBrowerVersion.value = arg
        return teresolBrowerVersion.value
      })
    }
    const teresolBrowerVersion = ref('')
    const centerDialogVisible = ref(false);
    const showMenuListBatch = toRef(props, 'batch')
    return {
      teresolBrowerVersion,
      centerDialogVisible,
      showMenuListBatch,
      //showMenuListBatch:  toRef(props,'batch'),
      batchInquireList: "batchInquire",
      ///EndActivityCodes///
    };
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
    getFooter() {
      return reactive(this.$store.getters.getHeaders);
    },
    getfooterDate() {
      var date = this.$store.getters.getHeaders.loginBranchDate;
      let day = date.substring(8, 10);
      let month = date.substring(5, 7);
      let year = date.substring(0, 4);
      date = day + "/" + month + "/" + year;
      return date;
    },
    getBatchStatus() {
      return reactive(this.$store.getters.getUsersAllowedAcivities)
    },
    getUsersAllAcivities() {
      return reactive(this.$store.getters.getUsersAllowedAllAcivities ? this.$store.getters.getUsersAllowedAllAcivities : CompareList([]));
    }
  },
  methods: {
    commitBatchOpen() {
      UseCaseLoader(this, axios);
    },
    async commitBatchClose() {
      this.$store.dispatch("fsmURL", this.$store.state.BCH_CLS_UC2_CloseBatch.url);
      let batchNumber = this.getFooter.loginUserBatch;
      if (batchNumber !== undefined && batchNumber !== null && batchNumber.toString().trim().length > 0) {
        this.$store.dispatch("BCH_CLS_UC2_CloseBatch/resetState");
        let result = await this.$store.dispatch("BCH_CLS_UC2_CloseBatch/initializeFsm");

        if (result) {
          this.$router.push({ name: "BCH_CLS_UC2_CloseBatch_SuperSet8" });
        } else {
          new Swal("Information", "FSM Initialization Error");
        }
      } else {
        new Swal("Error", "Batch not open. Please open batch");
      }
    },
    async signOff() {
      ElMessageBox.confirm("Are You Sure, You Want To Sign Off!", "Message", confirmOptions)
        .then(() => {
          localStorage.clear();
          useKeycloak().keycloak.logout();
        });
    },
    goToMain() {
      this.getFooter.loginUserBatch = null
      this.$store.dispatch("saveRoute", '');
      this.$router.push("/");
      localStorage.clear();
    },
    init_TLR_CP_UC1_CHGPWD() {
      this.$store.dispatch(
        "fsmURL",
        this.$store.state.TLR_CP_UC1_CHGPWD.url
      );
      this.$store.dispatch("TLR_CP_UC1_CHGPWD/init_TLR_CP_UC1_CHGPWD")
        .then((response) => {
          if (response) {
            this.$router.push('/TLR_CP_UC1_CHGPWD_MegaSet183');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    onAboutClick() {
      ElMessageBox.alert(`
      <strong>ALHABIB Banking System</strong> <br>
      Ver: ${process.env.VUE_APP_APPVERSION} <br> 
      Browser Version: ${this.teresolBrowerVersion} <br> 
      Date: ${this.getfooterDate} <br> 
      Copyright &copy ${this.currentYear} Bank AL Habib`,
        "About ALHABIB", options)
    },

    ///EndMethods///
  },
};
</script>

<template>
  <el-row>
    <el-col :lg="2" :md="2">
    </el-col>
    <el-col :lg="1" :md="1"></el-col>
    <el-col :lg="3" :md="3">
    </el-col>
    <el-col :lg="1" :md="1"></el-col>
    <el-col :lg="2" :md="2">
      <ul class="upNav" id="nav-reports-btn">
        <li tabindex="-1" class="hidepoint">
        </li>
      </ul>
    </el-col>
    <el-col :lg="1" :md="1"></el-col>
    <el-col :lg="2" :md="2">
      <ul class="upNav" id="nav-batch-btn">
        <li tabindex="-1" class="hidepoint">
          <el-button v-if="!($route.meta.hideBaseBtn || $route.meta.hideBackOfficeBaseBtn)" class="bottomButton"
            id="batch-btn" @click="$emit('batchMenuButton-onClick')"
            :disabled="false">Batch</el-button>
          <ul id="batch-btn-container" class="menu-list" v-if="this.showMenuListBatch">
            <li tabindex="-1" class="hidepoint">
              <a id="batch-open" @click="commitBatchOpen()">Open</a>
            </li>
            <li tabindex="-1" class="hidepoint">
              <a id="batch-close" @click="commitBatchClose()">Close</a>
            </li>
            <li tabindex="-1" class="hidepoint">
              <a id="batch-inquiry" @click="commitBatchInquire()">Inquire</a>
            </li>
          </ul>
        </li>
      </ul>
    </el-col>
    <el-col :lg="3" :md="3"></el-col>
    <el-col :lg="3" :md="3"><el-button v-if="!$route.meta.hideBaseBtn" class="bottomButton" id="main-menu"
        @click="goToMain">Main Menu</el-button></el-col>
    <el-col :lg="1" :md="1"></el-col>
    <el-col :lg="2" :md="2">
      <ul class="upNav" id="nav-help-btn">
      </ul>
    </el-col>
    <el-col :lg="1" :md="1"></el-col>
    <el-col :lg="2" :md="2"><el-button id="sign-off" class="bottomButton" @click="signOff">Sign Off</el-button>
    </el-col>
  </el-row>
</template>
<style scoped>
.disabled {
  cursor: not-allowed;
  background-color: rgb(74, 138, 129) !important;
  color: rgb(58, 58, 58) !important;
}

.disabled a:hover {
  pointer-events: none;
}

.disabled a {
  pointer-events: none;
  cursor: not-allowed;
  color: rgb(58, 58, 58) !important;
}

.bottomButton:hover {
  background-color: rgb(0, 99, 99) !important;
  color: white !important;
}

.bottomButton.is-disabled {
  background-color: rgb(74, 138, 129);
  color: rgb(58, 58, 58);
}

.bottomButton {
  width: 100%;
  height: 45px;
  font-family: Arial;
  background-color: rgb(0, 155, 131);
  border: none;
  border-radius: 0%;
  color: black;
  font-weight: bold;
}

/* For 1024 pixels Resolution */
@media only screen and (max-width: 1024px) {
  .bottomButton {

    height: 35px;
    font-size: 11px;
  }

}
</style>
