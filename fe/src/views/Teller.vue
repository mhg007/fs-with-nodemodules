<template>
  <div id="main-container" @click="mainClick">
    <div id="absolute">
      <ul class="nav hidden" id="random-menu" style="position: absolute">
        <li tabindex="-1" class="hidepoint">
          <ul class="menu-list" v-if="true">
            <li
              tabindex="-1"
              :class="[
                { hidepoint: true },
                {
                  disabled: false,
                  /*this.userActivities.find(
                      (element) => element == 'CRCARDI'
                    ) === 'CRCARDI'
                      ? false
                      : true,*/
                },
              ]"
            >
              <a>Hot Inquiry Menu - F12</a>
            </li>
            <li
              tabindex="-1"
              :class="[
                { hidepoint: true },
                {
                  disabled: false,
                  /*this.userActivities.find(
                      (element) => element == 'CRCARDI'
                    ) === 'CRCARDI'
                      ? false
                      : true,*/
                },
              ]"
            >
              <a @click="screenLock">System Lock Screen - F4</a>
            </li>
            <li
              tabindex="-1"
              :class="[
                { hidepoint: true },
                {
                  disabled:
                    this.userActivities.find(
                      (element) => element == 'CRCARDI'
                    ) === 'CRCARDI'
                      ? false
                      : true,
                },
              ]"
            >
              <a id="CRCARDI">financial calculator - F8 </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <el-row>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="23" :md="23">
        <span class="mainHeading">ALHABIB BANKING SYSTEM</span>
      </el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="23" :md="23">
        <span class="subHeading">Test Menu Screen</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :lg="10" :md="10"></el-col>
      <el-col :lg="6" :md="6">
        <ul class="nav" id="nav-credit-cards">
          <li tabindex="-1" class="hidepoint">
            <el-button
              id="credit-cards"
              :disabled="!this.getUsersAllAcivities.get('Credit Card')"
              class="moduleBtn"
              @click="STP_RTPS_UTIL_UC1_STC_MOD"
              >Modify</el-button
            >
          </li>
        </ul>
      </el-col>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="6" :md="6">
        <ul class="nav" id="nav-EPRC">
          <li tabindex="-1" class="hidepoint">
            <el-button
              id="EPRC"
              class="moduleBtn"
              :disabled="
                !this.getUsersAllAcivities.get('Credit Card')
              "
              @click="showMenuListEPRC = !showMenuListEPRC"
              >EPRC/SPRC Enquiry</el-button
            >
            <ul
              id="eprc-container"
              class="menu-list"
              v-if="this.showMenuListEPRC"
            >
              <li
                tabindex="-1"
                :class="[
                  { hidepoint: true },
                  {
                    disabled:
                      this.userActivities.find(
                        (element) => element == 'CRCARDI'
                      ) === 'CRCARDI'
                        ? false
                        : true,
                  },
                ]"
              >
                <a id="EPRCINQR">Search ePRC</a>
              </li>
              <li
                tabindex="-1"
                :class="[
                  { hidepoint: true },
                  {
                    disabled:
                      this.userActivities.find(
                        (element) => element == 'CRCARDI'
                      ) === 'CRCARDI'
                        ? false
                        : true,
                  },
                ]"
              >
                <a id="SPRCINQR">Search SPRC</a>
              </li>
              <li
                tabindex="-1"
                :class="[
                  { hidepoint: true },
                  {
                    disabled:
                      this.userActivities.find(
                        (element) => element == 'LADVORG'
                      ) === 'LADVORG'
                        ? false
                        : true,
                  },
                ]"
              >
                <a id="EPRCRPOT">Reports</a>
                <ul>
                  <li>
                    <a
                      id="EPRCRPOT"
                      :disabled="
                        !this.getUsersAllAcivities.get('EPRC')
                      "
                      @click="TLR_EPRC_SPRC_INQ_UC3_RPT_EPRC"
                      >ePRC</a
                    >
                  </li>
                  <li>
                    <a
                      id="SPRCRPOT"
                      :disabled="
                        this.getUsersAllAcivities.get('EPRC')
                      "
                      >SPRC</a
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </el-col>
      <el-col :lg="1" :md="1"></el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :lg="10" :md="10"></el-col>
      <el-col :lg="6" :md="6">
        <ul class="nav" id="nav-pay-cash">
          <li tabindex="-1" class="hidepoint">
            <el-button
              id="pay-cash"
              :class="['moduleBtn']"
              :disabled="!this.getUsersAllAcivities.get('Pay Cash')"
              @click="useCase3Clicked"
              >Use Case 3</el-button
            >
          </li>
        </ul>
      </el-col>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="6" :md="6">
        <ul class="nav" id="nav-inward-clearing">
          <li tabindex="-1" class="hidepoint">
            <el-button
              class="moduleBtn"
              id="inward-clearing"
              :disabled="!this.getUsersAllAcivities.get('Inward Clearing')"
              @click="useCase4Clicked"
              >Use Case 4</el-button
            >
          </li>
        </ul>
      </el-col>
      <el-col :lg="1" :md="1"></el-col>
    </el-row>
    <br />
    <br /><br /><br />
    <BottomButtons
      :activities="userActivities"
      :batch="showMenuListBatch"
      @batchMenuButton-onClick="batchMenuHandler"
    />
  </div>
</template>
<script>
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import BottomButtons from "../components/bottomBtn.vue";
// import { UseCaseLoader as TLR_EPRC_SPRC_INQ_UC3_RPT_EPRCLoader } from "../UseCase/TLR_EPRC_SPRC_INQ_UC3_RPT_EPRC/TLR_EPRC_SPRC_INQ_UC3_RPT_EPRC.js";
import TLR_EPRC_SPRC_INQ_UC3_RPT_EPRCLoader from "../UseCase/TLR_EPRC_SPRC_INQ_UC3_RPT_EPRC/TLR_EPRC_SPRC_INQ_UC3_RPT_EPRC.js";

export default {
  components: {
    BottomButtons,
  },
  setup() {
    const store = useStore();

    return reactive({
      userRoles: store.getters["getUsersAllowedAcivities"],
      userActivities: [],
      userAcitvities2: [],
      str: "2020-01-21",
      splitedStr: "",
      showMenuListBatch: ref(false),
      showMenuListEPRC: ref(false),
      ///EndActivityCodes///
    });
  },
  created() {
    window.addEventListener("keyup", this.handler);
    window.addEventListener("keydown", this.keyDownHandler);
    window.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      const ele = document.getElementById("main-container");
      const menu = document.getElementById("random-menu");
      const rect = ele.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Set the position for menu
      //alert(x,y)
      menu.style.top = `${e.clientY}px`;
      menu.style.left = `${e.clientX}px`;

      // Show the menu
      this.$nextTick(() => {
        menu.classList.remove("hidden");
      });
      //e.preventDefault();
    });
  },
  beforeUnmount() {
    window.removeEventListener("keyup", this.handler);
    window.removeEventListener("keydown", this.keyDownHandler);
  },
  mounted() {
    //This method was added to handle the activities incorrectly allowed by user activity service - 06/Sep/2022
    console.log("USER ROLES ACTIVITIES", this.getUserRoles);
    console.log("USER ROLES ACTIVITIES", this.getUserRoles.allActivities);

    console.log("getUsersAllAcivities", this.getUsersAllAcivities);

    this.getUserRoles.allActivities.forEach((activityCodes) => {
      this.userActivities.push(activityCodes);
      // }
    });
    console.log("userActivities", this.userActivities);
  },
  computed: {
    getUserRoles() {
      return reactive(this.$store.getters["getUsersAllowedAcivities"]);
    },
    getUsersAllAcivities() {
      return reactive(this.$store.getters["getUsersAllowedAllAcivities"]);
    },
  },
  methods: {
    STP_RTPS_UTIL_UC1_STC_MOD() {
      STP_RTPS_UTIL_UC1_STC_MODLoader()
      console.log("STP_RTPS_UTIL_UC1_STC_MOD");
    },

    TLR_EPRC_SPRC_INQ_UC3_RPT_EPRC() {
      // debugger
      TLR_EPRC_SPRC_INQ_UC3_RPT_EPRCLoader(
        this,
        process.env.VUE_APP_FSM_URL_TLR_EPRC_SPRC_INQ_UC3_RPT_EPRC
      );
      // console.log("STP_RTPS_UTIL_UC1_STC_MOD");
    },

    useCase3Clicked() {
      console.log("useCase3Clicked");
    },

    useCase4Clicked() {
      console.log("useCase4Clicked");
    },

    batchMenuHandler() {
      console.log(this.showMenuListBatch);
      this.showMenuListBatch = !this.showMenuListBatch;
    },

    closeAllMenus() {
      this.showMenuListBatch = false;
    },
    screenLock() {
      this.$store.dispatch("lockScreen", true);
    },
    ///EndMethods///
  },
};
</script>
<style scoped>
.hidden {
  display: none;
}

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
</style>
