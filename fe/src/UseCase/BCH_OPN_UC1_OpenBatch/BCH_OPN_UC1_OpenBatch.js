import { ref } from "vue";
import { ElMessageBox } from 'element-plus'
import { options } from "@/mixins/alertOption";
import axios from 'axios'

const getDefaultState = () => {
  return {
    url: process.env.VUE_APP_FSM_URL_BCH_OPN_UC1_OpenBatch,
    MS12_ConfigurationObject: {
      screenTitle: 'Message',
      batchno: null,
      departmentNo: null,
      ipAddress: null,
      componentProps: {
        ReferenceNosLabel: {
          value: 'have been posted',
          isVisible: false,
        },
        TransactionNumbersLabel: {
          value: 'have been posted',
          isVisible: false,
        },

        VoucherNosLabel: {
          value: 'have been generated',
          isVisible: false,
        },

        InformationLabel: {
          value: ref(''),
          isVisible: true,
        },

        voucherInfoLabel: {
          value: 'Voucher number 7348347 has been Authorized',
          isVisible: false,
        },

        TransactionInfoLable: {
          value: 'Transaction No 738545 Verified',
          isVisible: false,
        },

        ReferenceNumberDropDown: {
          isDisabled: false,
          ReferenceNosValue: 'A1231',
          isVisible: false, // set true for Visible Component and set false for invisible Component
          ReferenceNosList: [
            { value: 'A1231', option: 'A1231' },
            { value: 'B1231', option: 'B1231' },
          ],
        },

        TransactionNumbersDropDown: {
          isDisabled: false,
          TransactionNumbersValue: '1231',
          isVisible: false, // set true for Visible Component and set false for invisible Component
          TransactionNumbersList: [
            {
              value: '1231',
              option: '1231',
            },
          ],
        },
        VoucherNumberDropDown: {
          isDisabled: false,
          VoucherNosValue: '1231',
          isVisible: false, // set true for Visible Component and set false for invisible Component
          VoucherNosList: [
            {
              value: '1231',
              option: '1231',
            },
            {
              value: 'ABCD',
              option: 'ABCD',
            },
          ],
        },
        OkButton: {
          isDisabled: false,
          isVisible: true, // set true for Visible Component and set false for invisible Component
        },
        BackButton: {
          isDisabled: false,
          isVisible: false, // set true for Visible Component and set false for invisible Component
        },
        /////////////// control hide/show of screen sections ////////////////
        section1: {
          isVisible: true, // set true for Visible Component and set false for invisible Component
        },
        section2: {
          isVisible: true, // set true for Visible Component and set false for invisible Component
        },
        section3: {
          isVisible: true, // set true for Visible Component and set false for invisible Component
        },
        ////////////  control hide/show of screen sections ////////////////
      },
    },

    MS8_configurationObject: {
      screenTitle: "Batch - open",
      batchNo: '',
      componentProps: {
        PasswordTextBox: {
          isDisabled: ref(false),
          isVisible: ref(true), // uncomment this line to hide this component
          passwordValue: ref(""),
        },
        UserNameTextBox: {
          isDisabled: ref(true),
          isVisible: ref(false), // uncomment this line to hide this component
        },
        AuthorizeButton: {
          isDisabled: ref(true),
          isVisible: ref(false), // uncomment this line to hide this component
        },
        OkButton: {
          isDisabled: ref(false),
          isVisible: ref(true), // uncomment this line to hide this component
        },
        BackButton: {
          isDisabled: ref(false),
          isVisible: ref(true), // uncomment this line to hide this component
        },
        /////////////// control hide/show of screen sections ////////////////
        section1: {
          isVisible: ref(true), // set true for Visible Component and set false for invisible Component
        },
        section2: {
          isVisible: ref(true), // set true for Visible Component and set false for invisible Component
        },
        section3: {
          isVisible: ref(true), // set true for Visible Component and set false for invisible Component
        },
        ////////////  control hide/show of screen sections ////////////////
      },
    },
  }
}
const state = getDefaultState();
var url = state.url
const getters = {
  gettersMegaSet12ConfigObj: (state) => state.MS12_ConfigurationObject,
  gettersMegaSet8ConfigObj: (state) => state.MS8_configurationObject,
}

const getActions = (axios) => {
  return {
    resetState({ commit }) {
      commit("RESET_STATE")
    },
    async MS8_init({ commit, rootGetters }) {
      const header = rootGetters.getHeaders;
      const payloadset = {
        transition: "INIT",
        // "key": key,
        data: { header }
      }

      try {
        let response = await axios.post(url, payloadset)
        if (response.status !== 200) {
          commit('RESET_STATE');
          throw new Error("FSM Initialization Error");
        }
        else {
          if (response.data.mBoolean === true) {
            commit("MS12PSD", {})
            throw new Error(response.data.errorMessage)
          }
          else {
            commit("MS12PSD", response.data.MegaSet8)
            return true;
          }
        }
      }
      catch (err) {
        ElMessageBox.alert(err.message, 'Message', options);
      }
    },

    async MS8OkButtonEvent({ commit, state, rootGetters }, enteredPassword) {

      const headers = rootGetters.getHeaders;
      const usersAllowedAcivities = rootGetters.getUsersAllowedAcivities;
      const isSubBranch = (usersAllowedAcivities.subBranchCode > 0) ? "Y" : "N";
      const payloadData = {
        ValidateBatchOpen_DTO: {
          branchCode: headers.loginBranch,
          userID: headers.loginUserId,
          batchNumber: "",
          password: enteredPassword,
          batchStatus: "",
          opt_batchNumber: "",
          opt_subBranchCode: usersAllowedAcivities.subBranchCode,
          opt_departmentNumber: "",
          opt_batchDate: headers.loginBranchDate,
          opt_identifier: isSubBranch,
          res_response: "userIpAddress,sequenceNumber,batchNumber,batchStatus,subBranchCode",
          opt_batchStatus: "",
          errorMessage: ""
        }
      }

      const payloadset = {
        "transition": "OK",
        // "key": key,
        "data": {
          payloadData
        }
      }

      try {
        let response = await axios.post(url, payloadset, { headers });

        if (response.status !== 200) {
          throw new Error("FSM Initialization Error!!!");
        } else {
          if (response.data.mBoolean === true) {
            let errorMessage = "";
            if (response.data.errorMessage.startsWith("ERROR")) {
              errorMessage = "Invalid Password";
            } else {
              errorMessage = response.data.errorMessage;
            }
            commit("setPasswordMegaSet8_MT", '');
            throw new Error(errorMessage);
          } else {
            if (response.data.MegaSet12.batchStatus == "O") {
              commit("MS12PSD", response.data.MegaSet12)
              commit("SaveDepIP", response.data)
              commit("setPasswordMegaSet8_MT", '');
              return response.data.MegaSet12;
            }

            return null;
          }
        }
      } catch (error) {
        ElMessageBox.alert(error.message, 'Message', options);
      }
    },

    async BackButtonEvent({ commit }) {
      const payloadset = {
        "transition": "BACK",
        // "key": key,
        "data": {}
      }

      let response = await axios.post(url, payloadset);

      try {
        if (response.status !== 200) {
          throw new Error("FSM Initialization Error");
        } else {
          return true;
        }
      }
      catch (error) {
        ElMessageBox.alert(error.message, 'Message', options);
      }
    },

    MS8PasswordTextBox({ commit }, val) {
      commit("setPasswordMegaSet8_MT", val);
    },


    async MS12okButton() {
      const payloadSet = {
        "transition": "OK",
        // "key": key,
        "data": {},
      };

      let response = await axios.post(url, payloadSet);

      try {
        if (response.status !== 200) {
          throw new Error("FSM Initialization Error");
        }
        else {
          return true;
        }
      } catch (error) {
        ElMessageBox.alert(error.message, 'Message', options);
      }
    },
  }
}

// const actions = {
//   resetState({ commit }) {
//     commit("RESET_STATE")
//   },
//   async MS8_init({ commit, rootGetters }) {
//     const header = rootGetters.getHeaders;
//     const payloadset = {
//       transition: "INIT",
//       // "key": key,
//       data: { header }
//     }

//     try {
//       let response = await axios.post(url, payloadset)
//       if (response.status !== 200) {
//         commit('RESET_STATE');
//         throw new Error("FSM Initialization Error");
//       }
//       else {
//         if (response.data.mBoolean === true) {
//           commit("MS12PSD", {})
//           throw new Error(response.data.errorMessage)
//         }
//         else {
//           commit("MS12PSD", response.data.MegaSet8)
//           return true;
//         }
//       }
//     }
//     catch (err) {
//       ElMessageBox.alert(err.message, 'Message', options);
//     }
//   },

//   async MS8OkButtonEvent({ commit, state, rootGetters }, enteredPassword) {

//     const headers = rootGetters.getHeaders;
//     const usersAllowedAcivities = rootGetters.getUsersAllowedAcivities;
//     const isSubBranch = (usersAllowedAcivities.subBranchCode > 0)?"Y":"N";
//     const payloadData = {
//       ValidateBatchOpen_DTO: {
//         branchCode: headers.loginBranch,
//         userID: headers.loginUserId,
//         batchNumber: "",
//         password: enteredPassword,
//         batchStatus: "",
//         opt_batchNumber: "",
//         opt_subBranchCode: usersAllowedAcivities.subBranchCode,
//         opt_departmentNumber: "",
//         opt_batchDate: headers.loginBranchDate,
//         opt_identifier: isSubBranch,
//         res_response: "userIpAddress,sequenceNumber,batchNumber,batchStatus,subBranchCode",
//         opt_batchStatus: "",
//         errorMessage: ""
//       }
//     }

//     const payloadset = {
//       "transition": "OK",
//       // "key": key,
//       "data": {
//         payloadData
//       }
//     }

//     try {
//       let response = await axios.post(url, payloadset, { headers });

//       if (response.status !== 200) {
//         throw new Error("FSM Initialization Error!!!");
//       } else {
//         if (response.data.mBoolean === true) {
//           let errorMessage = "";
//           if(response.data.errorMessage.startsWith("ERROR")) {
//             errorMessage = "Invalid Password";
//           } else {
//             errorMessage = response.data.errorMessage;
//           }
//           commit("setPasswordMegaSet8_MT", '');
//           throw new Error(errorMessage);
//         } else {
//           if (response.data.MegaSet12.batchStatus == "O") {
//             commit("MS12PSD", response.data.MegaSet12)
//             commit("SaveDepIP", response.data)
//             commit("setPasswordMegaSet8_MT", '');
//             return response.data.MegaSet12;
//           }

//           return null;
//         }
//       }
//     } catch (error) {
//       ElMessageBox.alert(error.message, 'Message', options);
//     }
//   },

//   async BackButtonEvent({ commit }) {
//     const payloadset = {
//       "transition": "BACK",
//       // "key": key,
//       "data": {}
//     }

//     let response = await axios.post(url, payloadset);

//     try {
//       if (response.status !== 200) {
//         throw new Error("FSM Initialization Error");
//       } else {
//         return true;
//       }
//     }
//     catch (error) {
//       ElMessageBox.alert(error.message, 'Message', options);
//     }
//   },

//   MS8PasswordTextBox({ commit }, val) {
//     commit("setPasswordMegaSet8_MT", val);
//   },


//   async MS12okButton() {
//     const payloadSet = {
//       "transition": "OK",
//       // "key": key,
//       "data": {},
//     };

//     let response = await axios.post(url, payloadSet);

//     try {
//       if (response.status !== 200) {
//         throw new Error("FSM Initialization Error");
//       }
//       else {
//         return true;
//       }
//     } catch (error) {
//       ElMessageBox.alert(error.message, 'Message', options);
//     }
//   },
// }

const mutations = {
  SaveDepIP(state, val) {
    state.MS12_ConfigurationObject.departmentNo = val.departmentNumber;
    state.MS12_ConfigurationObject.ipAddress = val.ipAddress
  },

  MS12PSD(state, pasd) {
    if (pasd !== null && pasd !== undefined) {
      state.MS12_ConfigurationObject.batchno = pasd.batchNumber;
      state.MS12_ConfigurationObject.componentProps.InformationLabel.value = pasd.errorMessage;
    }
  },

  setPasswordMegaSet8_MT(state, password) {
    state.MS8_configurationObject.componentProps.PasswordTextBox.passwordValue = password;
  },

  RESET_STATE(state) {
    Object.assign(state, getDefaultState())
  },

}
export default {
  state,
  getters,
  getActions,
  mutations
}