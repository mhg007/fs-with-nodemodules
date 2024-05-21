<template>
  <div class="common-layout" v-if="isAuthenticated">
    <lockScreenDialog />
    <el-container style="height: 100vh" v-if="!$route.meta.hideNavbar">
      <el-container>
        <el-header>
          <el-menu background-color="rgb(0, 155, 131)" text-color="black">
            <el-row class="headerRow" style="padding-left: 1%; align-items: center">
              <el-col :lg="16" :md="15">
                <br>
                <span class="Header globalFont">{{ $route.meta.title }}</span>
              </el-col>
              <el-col :lg="7" :md="8">
                <br>
                <span class="Header globalFont">{{ version }}</span>
              </el-col>
              <el-col :lg="1" :md="1">
                <br>
                <el-button @click="closeModule" :tabindex="-1" :disabled="false" class="closeBtn globalFont"
                  size="small">
                  <el-icon class="closeIcon">
                    <CloseBold />
                  </el-icon>
                </el-button>
              </el-col>
            </el-row>
          </el-menu>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer>
          <el-menu background-color="rgb(0, 155, 131)" text-color="black">
            <el-row style="align-items: center">
              <el-col :lg="6" :md="6">
                <div style="border: 1px inset">
                  <span class="Footer">{{ getDay }} - {{ getfooterDate }}</span>
                </div>
              </el-col>
              <el-col :lg="18" :md="18">
                <div style="border: 1px inset">
                  <span class="Footer">{{ getFooter.loginBranch }} -
                    {{ getFooter.loginUserId }}</span>
                </div>
              </el-col>
            </el-row>
          </el-menu>
        </el-footer>
      </el-container>
    </el-container>
    <div v-if="$route.meta.hideNavbar">
      <router-view></router-view>
    </div>
  </div>
  <div v-else>
    <h5>Loading...</h5>
  </div>
</template>
<script>
import { CloseBold } from "@element-plus/icons-vue";
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";
import { useStore } from "vuex";
import { getToken, useKeycloak } from "@teresol/vue-keycloak";
import { confirmOptions } from "../src/mixins/alertOption.js";
import { ElMessageBox } from "element-plus";
import lockScreenDialog from './components/lockScreenDialog.vue';
const { isAuthenticated } = useKeycloak();
function preventKeyStroke(e) {
  e = e || window.event;
  if (
    (e.keyCode >= 8 && e.keyCode <= 68) ||
    (e.keyCode >= 69 && e.keyCode <= 103) ||
    (e.keyCode >= 104 && e.keyCode <= 222)
  ) {
    // If tab key is pressed
    e.preventDefault(); // Stop event from its action
  }
}
export default {
  components: {
    CloseBold,
    lockScreenDialog,
  },
  created() {
    window.addEventListener("keyup", this.keyUpHandler);
    window.addEventListener("keydown", this.keyDownHandler);
    window.addEventListener("keydown", this.handleKeyPress);
  },
  mounted() {
    console.log("mounted");
    if (typeof window !== "undefined") {
      document.addEventListener("keydown", this.handleKeyPress);
    }
  },
  beforeUnmount() {
    console.log("unMounted");
    window.removeEventListener("keyup", this.keyUpHandler);
    window.removeEventListener("keydown", this.keyDownHandler);
    if (typeof window !== "undefined") {
      window.removeEventListener("keydown", this.handleKeyPress);
    }
  },
  computed: {
    getterRoute() {
      return reactive(this.$store.getters.getRoute);
    },
    getFooter() {
      return reactive(this.$store.getters.getHeaders);
    },
    getDay() {
      var date = this.$store.getters.getHeaders.loginBranchDate;
      let days = new Date(date).toLocaleString("en-us", { weekday: "long" });
      console.log("Day:", days);
      return days;
    },
    getfooterDate() {
      var date = this.$store.getters.getHeaders.loginBranchDate;
      let day = date.substring(8, 10);
      let month = date.substring(5, 7);
      let year = date.substring(0, 4);
      date = day + "/" + month + "/" + year;
      return date;
    },
  },
  setup() {
    /////////////////////////////////////////////////
    const store = useStore()
    const handleKeyPress = (evt) => {
      if (evt.key == "F4") {
        if (!store.getters.getDisableLockScreen) {
          if (store.getters.getHeaders.loginUserId != "") {
            store.dispatch('lockScreen', true)
          }
        }
      }
    }
    const UUID = ref()
    const generateRandomUUID = () => {
      UUID.value = crypto.randomUUID();
    }
    /////////////////////////////////////////////////
    ///////////////////Token//////////////////////
    axios.interceptors.request.use(async (config) => {
      generateRandomUUID()
      let token = await getToken();
      console.log("----------------TOKEN-----------------------");
      console.log("isToken:", !!token);
      console.log("--------------------------------------------");

      config.headers = {
        Authorization: `Bearer ${token}`,
        "X-LOGGING-ID": `${UUID.value}`
    };
    store.dispatch('disableLockScreen', true)
    document.body.classList.add("loading-indicator");
    if (config.hasOwnProperty("data")) {
      if (config.data != "undefined") {
        if (config.data.transition == "KILL") {
          document.body.classList.remove("loading-indicator");
        }
      }
    }
    if (config.url != process.env.VUE_APP_SERVICES_ALLOW_USER_ACTIVITIES) {
      let buttonsList = document.querySelectorAll("._custom_button");
      if (buttonsList) {
        for (let index = 0; index < buttonsList.length; index++) {
          console.log(buttonsList[index]);
          buttonsList[index].classList.add("disableUseCaseButton");
        }
      }
      document.addEventListener("keydown", preventKeyStroke);
      document.removeEventListener("keydown", handleKeyPress);
    }
    return config;
  });

  ////////////////////////////////////////
  axios.interceptors.response.use(
    async (response) => {
      document.body.classList.remove("loading-indicator");
      store.dispatch('disableLockScreen', false)
      if (
        response.config.url !=
        process.env.VUE_APP_SERVICES_ALLOW_USER_ACTIVITIES
      ) {
        let buttonsList = document.querySelectorAll("._custom_button");
        if (buttonsList) {
          for (let index = 0; index < buttonsList.length; index++) {
            console.log(buttonsList[index]);
            buttonsList[index].classList.remove("disableUseCaseButton");
          }
        }
        document.removeEventListener("keydown", preventKeyStroke);
        document.addEventListener("keydown", handleKeyPress);
      }
      return response;
    },
    function (error) {
      document.body.classList.remove("loading-indicator");
      store.dispatch('disableLockScreen', false)
      let buttonsList = document.querySelectorAll("._custom_button");
      if (buttonsList) {
        for (let index = 0; index < buttonsList.length; index++) {
          console.log(buttonsList[index]);
          buttonsList[index].classList.remove("disableUseCaseButton");
        }
      }
      document.removeEventListener("keydown", preventKeyStroke);
      document.addEventListener("keydown", handleKeyPress);
      if(error.message.includes('401')){
        error.message="You Are Not Authorize To Perform This Activity"
      }
      return Promise.reject(error);
    }
    );
    /////////////////////////////////////////
  //
  const version = process.env.VUE_APP_APPVERSION;
  return {
    version,
    isAuthenticated,
    handleKeyPress,
  };
},
methods: {
  simulate(element, eventName) {
    var eventMatchers = {
      HTMLEvents:
        /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
      MouseEvents: /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/,
    };
    var defaultOptions = {
      pointerX: 0,
      pointerY: 0,
      button: 0,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      bubbles: true,
      cancelable: true,
    };
    var options = this.extend(defaultOptions, arguments[2] || {});
    var oEvent,
      eventType = null;

    for (var name in eventMatchers) {
      if (eventMatchers[name].test(eventName)) {
        eventType = name;
        break;
      }
    }

    if (!eventType)
      throw new SyntaxError(
        "Only HTMLEvents and MouseEvents interfaces are supported"
      );

    if (document.createEvent) {
      oEvent = document.createEvent(eventType);
      if (eventType == "HTMLEvents") {
        oEvent.initEvent(eventName, options.bubbles, options.cancelable);
      } else {
        oEvent.initMouseEvent(
          eventName,
          options.bubbles,
          options.cancelable,
          document.defaultView,
          options.button,
          options.pointerX,
          options.pointerY,
          options.pointerX,
          options.pointerY,
          options.ctrlKey,
          options.altKey,
          options.shiftKey,
          options.metaKey,
          options.button,
          element
        );
      }
      element.dispatchEvent(oEvent);
    } else {
      options.clientX = options.pointerX;
      options.clientY = options.pointerY;
      var evt = document.createEventObject();
      oEvent = this.extend(evt, options);
      element.fireEvent("on" + eventName, oEvent);
    }
    return element;
  },
  extend(destination, source) {
    for (var property in source) destination[property] = source[property];
    return destination;
  },
  closeModule() {
    ElMessageBox.confirm(
      "Are You Sure, You Want To Exit!",
      "Message",
      confirmOptions
    ).then(() => {
      this.$store.dispatch("killTransition");
      this.$store.dispatch("OBS_UC4_CC_CCI/resetState");
      this.$store.dispatch("OBS_UC5_CC_CC_RC/resetState");
      this.$store.dispatch("OBS_UC6_2_CC_CC_I/resetState");
      this.$store.dispatch("OBS_UC9_CM_CC_RC/resetState");
      this.$store.dispatch("OBS_UC_CM_CC_I/resetState");
      this.$store.dispatch("OBS_LCA_UC14_RA_RR/resetState");
      this.$store.dispatch("OBS_LCA_UC14_RA_R/resetState");
      this.$store.dispatch("OBS_UC6_1_CC_CC_C/resetState");
      this.$store.dispatch("OBS_UC6_CC_CC_A/resetState");
      this.$store.dispatch("OBS_UC13_1_LCA_O_OA/resetState");
      this.$store.dispatch("OBS_UC7_CC_FT_FT/resetState");
      this.$store.dispatch("OBS_UC11_CM_FT_Chq/resetState");
      this.$store.dispatch("OBS_UC12_2_CM_FT_C_I/resetState");
      this.$store.dispatch("OBS_UC12_CM_FT_C_A/resetState");
      this.$store.dispatch("OBS_UC12_1_CM_FT_C_C/resetState");
      this.$store.dispatch("OBS_UC10_CM_CC_A/resetState");
      this.$store.dispatch("OBS_UC10_CM_CC_C/resetState");
      this.$store.dispatch("BCH_OPN_UC1_OpenBatch/resetState");
      this.$store.dispatch("OBS_OT_UC1_OC_L/resetState");
      this.$store.dispatch("OBS_UC8_2_CC_FT_I/resetState");
      this.$store.dispatch("OBS_LCA_UC14_RA_I/resetState");
      this.$store.dispatch("OBS_LCA_UC14_RA_A/resetState");
      this.$store.dispatch("OBS_LCA_UC14_RA_C/resetState");
      this.$store.dispatch("BCH_INQ_UC3_InquireBatch/resetState");
      this.$store.dispatch("OBS_OT_UC3_1_OC_I/resetState");
      this.$store.dispatch("TNS_FT_UC10_V_TL/resetState");
      this.$store.dispatch("TNS_FT_UC9_V_RN/resetState");
      this.$store.dispatch("OBS_LCA_UC13_1_OA_A/resetState");
      this.$store.dispatch("OBS_UC13_2_LCA_OA_C/resetState");
      this.$store.dispatch("BCH_CLS_UC2_CloseBatch/resetState");
      this.$store.dispatch("OBS_UC8_CC_FT_A/resetState");
      this.$store.dispatch("OBS_UC8_1_CC_FT_C/resetState");
      this.$store.dispatch("OBS_OT_UC2_OC_A/resetState");
      this.$store.dispatch("OBS_OT_UC3_OC_C/resetState");
      this.$store.dispatch("OBS_LCA_UC13_3_OA_I/resetState");
      this.$store.dispatch("OBS_CM_UC12_11_DW_RW_P/resetState");
      this.$store.dispatch("TLR_PC_UC1_CHQ/resetState");
      this.$store.dispatch("TLR_PC_UC8_TR_AD/resetState");
      this.$store.dispatch("TLR_PC_UC9_TR_CHG/resetState");
      this.$store.dispatch("TLR_PC_UC6_MOAC/resetState");
      this.$store.dispatch("TLR_PC_UC4_DV_CAC/resetState");
      this.$store.dispatch("TLR_PC_UC5_DV_GLAC/resetState");
      this.$store.dispatch("TLR_PC_UC7_DD/resetState");
      this.$store.dispatch("OBS_RP_UC15/resetState");
      this.$store.dispatch("TLR_PC_UC2_IBC/resetState");
      this.$store.dispatch("TLR_PC_UC3_LC/resetState");
      this.$store.dispatch("TLR_RD_UC17_LCD_Inq/resetState");
      this.$store.dispatch("TLR_RD_UC14_LCD_Cncl/resetState");
      this.$store.dispatch("TLR_RD_UC7_CV_Cac/resetState")
      this.$store.dispatch("TLR_RD_UC15_LCD_AU/resetState")
      this.$store.dispatch("TLR_OBC_IBC_UC1_OBC_LO_LO/resetState");
      this.$store.dispatch("TLR_OBC_IBC_UC2_OBC_LO_C/resetState");
      this.$store.dispatch("TLR_OBC_IBC_UC3_OBC_AT/resetState");
      this.$store.dispatch("TLR_OBC_IBC_UC16_OBC_IN/resetState");
      this.$store.dispatch("TLR_RD_UC12_LCD_A_D/resetState");
      this.$store.dispatch("TLR_OBC_IBC_UC6_OBC_R_R_OF/resetState");
      this.$store.dispatch("TLR_OBC_IBC_UC7_OBC_R_R_ON/resetState");
      this.$store.dispatch("TLR_OBC_IBC_UC3_OBC_AT/resetState");
      this.$store.dispatch("TNS_FT_UC4_1_A_VL_N/resetState");
      this.$store.dispatch("TLR_RD_UC8_CV_GLA/resetState");
      this.$store.dispatch("TLR_RD_UC10_TR_Add/resetState")
      this.$store.dispatch("TLR_RD_UC11_TR_Change/resetState");
      this.$store.dispatch("TNS_FT_UC4_2_A_VL_IB/resetState");
      this.$store.dispatch("TLR_TF_UC10_TK_O_PostFacto/resetState");
      this.$store.dispatch(
        "TLR_TF_UC12_TK_R_Verification_Offline/resetState"
      );
      this.$store.dispatch("TLR_TF_UC13_TF_TK_R_Authentication/resetState");
      this.$store.dispatch(
        "TLR_TF_UC15_TK_R_Rej_Offline_RejAuthenticate/resetState"
      );
      this.$store.dispatch("TLR_TF_UC17_TF_TK_Res_RespReverse/resetState");
      this.$store.dispatch("TLR_OBC_IBC_UC20_IBC_IAT/resetState");
      this.$store.dispatch("TLR_OBC_IBC_UC19_IBC_IN/resetState");
      this.$store.dispatch("TLR_IC_UC12_CPU_ACT_CBI_U/resetState");
      this.$store.dispatch("TLR_IC_UC13_CPU_ACT_CBI_D/resetState");
      this.$store.dispatch("TLR_IC_UC14_CPU_ACT_CBI_A/resetState");
      this.$store.dispatch("TLR_IC_UC15_CPU_ACT_CBI_CL/resetState");
      this.$store.dispatch("TLR_IC_UC17_CPU_ACT_I_BSI/resetState");
      this.$store.dispatch("TLR_IC_UC19_CPU_ACT_I_AII/resetState");
      this.$store.dispatch("TLR_RD_UC19_EP/resetState");
      this.$store.dispatch("TLR_IC_UC3_CPU_ACT_INST_ACT_UI/resetState");
      this.$store.dispatch("TLR_IC_UC6_CPU_ACT_INST_ACT_MBA/resetState")
      this.$store.dispatch("TLR_TF_UC39_TF_FrxRmt_Owd_Brn_Act_Request_Inquiry/resetState")
      this.$store.dispatch("TLR_BCL_UC1/resetState");
      this.$store.dispatch("TLR_TF_UC4_TF_CMU_SR_Print/resetState");
      this.$store.dispatch("F11_Instrument_Info/resetState");
      this.$store.dispatch("TLR_TF_UC36_TF_FrxRmt_Owd_Brn_Act_Cancel/resetState");
      this.$store.dispatch("TLR_TF_UC6_TF_FR_OW_CPU/resetState");
      this.$store.dispatch("TLR_TF_UC8_TF_FR_OW_CPU/resetState");
      this.$store.dispatch("TLR_TF_UC10_TF_FR_OW_CPU/resetState");
      this.$store.dispatch("TLR_BCH_UC1/resetState");
      this.$store.dispatch("TLR_RD_UC3_CMU_UBC_P/resetState");
      this.$store.dispatch("TLR_RD_UC6_CMU_UBC_Inq/resetState");
      this.$store.dispatch("TLR_RD_UC4_CMU_UBC_Auth/resetState");
      this.$store.dispatch("TLR_RD_UC5_CMU_UBC_Cncl/resetState");
      this.$store.dispatch("TLR_TF_UC6_CMU_UBC_Inquire/resetState");
      this.$store.dispatch("TLR_TF_UC4_CMU_UBC_Authorize/resetState");
      this.$store.dispatch("TLR_TF_UC5_CMU_UBC_Collection/resetState");
      this.$store.dispatch("TLR_TF_UC3_CMU_UBC_Payment/resetState");
      this.$store.dispatch("GIN_GIN_UC2_CP_CustAcBalance/resetState");
      this.$store.dispatch("TLR_TF_UC9_TK_O_Generate/resetState");
      this.$store.dispatch("TLR_TF_UC34_TF_FrxRmt_Owd_Brn_Act_Request/resetState");
      this.$store.dispatch("GIN_GIN_UC5_CP_GL_ExRates/resetState");
      this.$store.dispatch("GIN_GIN_UC6a_CP_GL_Instrument/resetState");
      this.$store.dispatch("GIN_GIN_UC3_CP_GL_Account/resetState");
      this.$store.dispatch("GIN_GIN_UC4_CP_GL_AcBalance/resetState");
      this.$store.dispatch("TLR_TF_UC80_IBDA_INQ/resetState");
      this.$store.dispatch("TLR_TF_UC79_IBDA_RESEND/resetState");
      this.$store.dispatch("GIN_GIN_UC7_CP_GL_WHT_Inquiry/resetState");
      this.$store.dispatch("TLR_TF_UC19_TF_FrxRmt_Inw_Authorize/resetState");
      this.$store.dispatch("TLR_UC20_TF_FrxRmt_Inw_Cancel/resetState");
      this.$store.dispatch("TLR_TF_UC75_IBCA_INQ/resetState");
      this.$store.dispatch("TLR_TF_UC1_TF_FR_OW_CPU_Act_Issue/resetState");
      this.$store.dispatch("TLR_TF_UC2_TF_FR_OW_CPU_Act_Modify/resetState");
      this.$store.dispatch("TLR_TF_UC5_TF_FR_OW_CPU_Act_Rev_to_Authorize/resetState");
      this.$store.dispatch("TLR_TF_UC7_TF_FR_OW_CPU_Act_Scan_Docs/resetState");
      this.$store.dispatch("TLR_TF_UC_67_SB/resetState");
      this.$store.dispatch("TLR_TF_UC40_TF_FrxRmt_Owd_Issue/resetState")
      this.$store.dispatch("TLR_TF_UC41_TF_FrxRmt_Owd_Authorize/resetState")
      this.$store.dispatch("TLR_TF_UC42_TF_FrxRmt_Owd_Cancel/resetState")
      this.$store.dispatch("TLR_TF_UC43_TF_FrxRmt_Owd_Stop/resetState")
      this.$store.dispatch("TLR_TF_UC44_TF_FrxRmt_Owd_Print_IBCA_Advice/resetState")
      this.$store.dispatch("TLR_TF_UC45_TF_FrxRmt_Owd_Inquire/resetState")
      this.$store.dispatch("TLR_TF_UC25_TF_FrxRmt_Inw_AdvInquiry/resetState")
      this.$store.dispatch("TLR_TF_UC35_TF_FrxRmt_Owd_Brn_Act_Authorize/resetState")
      this.$store.dispatch("TLR_TF_UC74_IBCA_RESEND/resetState");
      this.$store.dispatch("GIN_GIN_UC4_CP_GL_AcBalance/resetState");
      this.$store.dispatch("TLR_TF_UC16_TF_TK_Res_MO_Transaction/resetState")
      this.$store.dispatch("TLR_TF_UC1_TF_CMU_SR_Collection/resetState")
      this.$store.dispatch("TLR_TF_UC2_TF_CMU_SR_Authorize/resetState")
      this.$store.dispatch("TLR_TF_UC2_TF_Inter_Branch_Transfer_Fund/resetState")
      this.$store.dispatch("TLR_TF_UC3_TF_CMU_SR_Canc_Before_Auth/resetState")
      this.$store.dispatch("TLR_TF_UC73_IBCA_AUTH/resetState");
      this.$store.dispatch("TLR_TF_UC78_IBDA_AUTH/resetState");
      this.$store.dispatch("TLR_TF_UC37_TF_FrxRmt_Owd_Brn_Act_scanD/resetState");
      this.$store.dispatch("TLR_TF_UC1_TF_TransferFunds/resetState");
      this.$store.dispatch("TLR_REP_REP_UC23_FRR/resetState");
      this.$store.dispatch("TLR_REP_REP_UC24_OFBCR_OFBCR/resetState");
      this.$store.dispatch("Init_TLR_REP_CFTTR_UC1/resetState");
      this.$store.dispatch("TLR_REP_REP_UC3_WHTRC/resetState");
      this.$store.dispatch("TLR_OBC_IBC_UC17_IBC_IR_IR/resetState");
      this.$store.dispatch("TLR_TF_UC71_IBCA_SB/resetState");
      this.$store.dispatch("TLR_TF_UC69_VS_PAYMENT/resetState");
      this.$store.dispatch("TLR_IC_UC2_CPU_ACT_INST_ACT_SCAN_INST_PN_SCN/resetState");
      this.$router.push("/" + this.getterRoute);
    });
  },
  keyUpHandler(e) {
    // debugger
    if (e.keyCode == 9) {
      if (document.activeElement.id.includes("Table")) {
        var el =
          document.activeElement.children[0].children[2].children[0]
            .children[0].children[0].children[0].children[1].children[0];
        var loop =
          document.activeElement.children[0].children[2].children[0]
            .children[0].children[0].children[0].children[1];
        loop.children[0].tabIndex = 0;
        this.simulate(el, "click");
        el.focus();
      }
    }
    if (e.keyCode == 38) {
      var el = document.activeElement;
      //console.log(el.tagName)
      if (el.tagName == "TR") {
        el.tabIndex = "-1";
        if (el.previousSibling) {
          el.previousSibling.tabIndex = "0";
          //console.log("up key:",el)
          this.simulate(el.previousSibling, "click");
          el.previousSibling.focus();
        }
      }
    }
    if (e.keyCode == 40) {
      var el = document.activeElement;
      //console.log(el.tagName)
      if (el.tagName == "TR") {
        el.tabIndex = "-1";
        if (el.nextSibling) {
          el.nextSibling.tabIndex = "0";
          //console.log("down key",el)
          this.simulate(el.nextSibling, "click");
          el.nextSibling.focus();
        }
      }
    }
  },
  keyDownHandler(e) {
    const keyEvent = new KeyboardEvent("keydown", { key: "Enter" });

    if (e.keyCode == 16) {
      //console.log("active element:",document.activeElement)
      var el = document.activeElement;
      if (el.id.includes("DropDown")) {
        el.dispatchEvent(keyEvent);
        e.preventDefault();
      }
    }
  },
},
};
</script>