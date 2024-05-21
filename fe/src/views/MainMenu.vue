<template>
  <el-row>
    <el-col :lg="24" :md="24">
      <span class="mainHeading">ALHABIB BANKING SYSTEM</span>
    </el-col>
  </el-row>
  <br />
  <el-row>
    <el-col :lg="6" :md="6">
      <el-button id="teller" :disabled="this.modules.find((element) => element == 'TELLER') == 'TELLER'
        ? false
        : true
        " class="mainButton" @click="gotoTeller">Test Menu</el-button>
    </el-col>
    <el-col :lg="2" :md="2"></el-col>
  </el-row>
  <br />
  <BottomButtons/>
</template>
<script>
import BottomButtons from "../components/bottomBtn.vue";
import { options } from '../mixins/alertOption.js'
import { ElMessageBox } from 'element-plus';
import { formatDate } from '../utilities/dateUtil.js'
export default {
  components: {
    BottomButtons,
  },
  mounted() {
    if (this.getUsersAllowedAcivities == null) {
      this.$store.dispatch("getUsersAllowedAcivities")
        .then((response) => {
          console.log(response);
          if (response) {
            if (this.getUsersAllowedAcivities.invalidAttempts != "0") {
              ElMessageBox.alert(this.getUsersAllowedAcivities.invalidAttempts + ' invalid attempt(s) done on this user profile', 'Message', options).then(() => {
                if (this.getUsersAllowedAcivities.requiredCertificationObject.recertificationDaysRemaining < 11 && this.getUsersAllowedAcivities.requiredCertificationObject.userCertified == true && this.getUsersAllowedAcivities.requiredCertificationObject.hasOwnProperty('errorMessage')) {
                  ElMessageBox.alert(this.getUsersAllowedAcivities.requiredCertificationObject.errorMessage, 'Message', options).then(() => {
                    if (this.getUsersAllowedAcivities.hasOwnProperty('passwordExpiryDTO')) {
                      if (this.getUsersAllowedAcivities.passwordExpiryDTO.daysRemaining < 6) {
                        ElMessageBox.alert(this.getUsersAllowedAcivities.passwordExpiryDTO.errorMessage, 'Message', options).then(() => {
                          ElMessageBox.alert('Sign-on is Successful <br/> Last Sign-on date is ' + formatDate(this.getUsersAllowedAcivities.lastSignOnDate), 'Message', options).then(() => {
                            this.getActivites();
                          })
                        })
                      } else {
                        ElMessageBox.alert('Sign-on is Successful <br/> Last Sign-on date is ' + formatDate(this.getUsersAllowedAcivities.lastSignOnDate), 'Message', options).then(() => {
                          this.getActivites();
                        })
                      }
                    }
                    else {
                      ElMessageBox.alert('Sign-on is Successful <br/> Last Sign-on date is ' + formatDate(this.getUsersAllowedAcivities.lastSignOnDate), 'Message', options).then(() => {
                        this.getActivites();
                      })
                    }
                  })
                }
                else if (this.getUsersAllowedAcivities.hasOwnProperty('passwordExpiryDTO')) {
                  if (this.getUsersAllowedAcivities.passwordExpiryDTO.daysRemaining < 6) {
                    ElMessageBox.alert(this.getUsersAllowedAcivities.passwordExpiryDTO.errorMessage, 'Message', options).then(() => {
                      ElMessageBox.alert('Sign-on is Successful <br/> Last Sign-on date is ' + formatDate(this.getUsersAllowedAcivities.lastSignOnDate), 'Message', options).then(() => {
                        this.getActivites();
                      })
                    })
                  } else {
                    ElMessageBox.alert('Sign-on is Successful <br/> Last Sign-on date is ' + formatDate(this.getUsersAllowedAcivities.lastSignOnDate), 'Message', options).then(() => {
                      this.getActivites();
                    })
                  }
                }
                else {
                  ElMessageBox.alert('Sign-on is Successful <br/> Last Sign-on date is ' + formatDate(this.getUsersAllowedAcivities.lastSignOnDate), 'Message', options).then(() => {
                    this.getActivites();
                  })//
                }
              })
            }
            else if (this.getUsersAllowedAcivities.requiredCertificationObject.recertificationDaysRemaining < 11 && this.getUsersAllowedAcivities.requiredCertificationObject.userCertified == true && this.getUsersAllowedAcivities.requiredCertificationObject.hasOwnProperty('errorMessage')) {
              ElMessageBox.alert(this.getUsersAllowedAcivities.requiredCertificationObject.errorMessage, 'Message', options).then(() => {
                if (this.getUsersAllowedAcivities.hasOwnProperty('passwordExpiryDTO')) {
                  if (this.getUsersAllowedAcivities.passwordExpiryDTO.daysRemaining < 6) {
                    ElMessageBox.alert(this.getUsersAllowedAcivities.passwordExpiryDTO.errorMessage, 'Message', options).then(() => {
                      ElMessageBox.alert('Sign-on is Successful <br/> Last Sign-on date is ' + formatDate(this.getUsersAllowedAcivities.lastSignOnDate), 'Message', options).then(() => {
                        this.getActivites();
                      })
                    })
                  } else {
                    ElMessageBox.alert('Sign-on is Successful <br/> Last Sign-on date is ' + formatDate(this.getUsersAllowedAcivities.lastSignOnDate), 'Message', options).then(() => {
                      this.getActivites();
                    })
                  }
                }
                else {
                  ElMessageBox.alert('Sign-on is Successful <br/> Last Sign-on date is ' + formatDate(this.getUsersAllowedAcivities.lastSignOnDate), 'Message', options).then(() => {
                    this.getActivites();
                  })
                }
              })
            }
            else if (this.getUsersAllowedAcivities.hasOwnProperty('passwordExpiryDTO')) {
              if (this.getUsersAllowedAcivities.passwordExpiryDTO.daysRemaining < 6) {
                ElMessageBox.alert(this.getUsersAllowedAcivities.passwordExpiryDTO.errorMessage, 'Message', options).then(() => {
                  ElMessageBox.alert('Sign-on is Successful <br/> Last Sign-on date is ' + formatDate(this.getUsersAllowedAcivities.lastSignOnDate), 'Message', options).then(() => {
                    this.getActivites();
                  })
                })
              } else {
                ElMessageBox.alert('Sign-on is Successful <br/> Last Sign-on date is ' + formatDate(this.getUsersAllowedAcivities.lastSignOnDate), 'Message', options).then(() => {
                  this.getActivites();
                })
              }
            }
            else {
              ElMessageBox.alert('Sign-on is Successful <br/> Last Sign-on date is ' + formatDate(this.getUsersAllowedAcivities.lastSignOnDate), 'Message', options).then(() => {
                this.getActivites();
              })
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    else {
      this.getActivites();
    }
  },
  computed: {
    getUsersAllowedAcivities() {
      return this.$store.getters["getUsersAllowedAcivities"];
    },
  },
  methods: {
    async gotoTeller() {
      //  this.$store.dispatch("getuser")
      await this.$store.dispatch("saveRoute", this.routeTeller);
      this.$router.push("/Teller");
    },
    async gotoTransaction() {
      await this.$store.dispatch("saveRoute", this.routeTransaction);
      this.$router.push("/TransactionSecurity");
    },
    async gotoBackOffice() {
      await this.$store.dispatch("saveRoute", this.routeBackOffice);
      this.$router.push("/BackOffice");
    },
    getActivites() {
      this.getUsersAllowedAcivities.modules.forEach((element) => {
        this.modules.push(element.moduleCode);
      });
      this.$store.dispatch("sideBarActivities", this.modules)
    },
  },
  data() {
    return {
      date: new Date(),
      userRoles: {},
      modules: [],
      routeTeller: "Teller",
      routeTransaction: "TransactionSecurity",
      routeBackOffice: "BackOffice",
      activities: [],
      attempts: "3",
      // showMenuListHelp: false
    };
  },
};
</script>
<style scoped>
.row1mainButton {
  width: 100%;
  height: 90px;
  font-family: Arial;
  background-color: rgb(0, 155, 131);
  border: none;
  border-radius: 0%;
  color: black;
  font-weight: bold;
}

.row1mainButton:hover {
  background-color: rgb(0, 99, 99) !important;
  color: white !important;
}

.row1mainButton1.is-disabled {
  background-color: rgb(74, 138, 129);
  color: rgb(58, 58, 58);
}

.row1mainButton1:hover {
  background-color: rgb(0, 99, 99) !important;
  color: white !important;
}

.row1mainButton1 {
  width: 100%;
  height: 36px;
  font-family: Arial;
  margin: 0%;
  background-color: rgb(0, 155, 131);
  border: none;
  border-radius: 0%;
  color: black;
  font-weight: bold;
}

.mainButton.is-disabled {
  background-color: rgb(74, 138, 129);
  color: rgb(58, 58, 58);
}

.mainButton:hover {
  background-color: rgb(0, 99, 99) !important;
  color: white !important;
}

.mainButton {
  width: 100%;
  height: 90px;
  font-family: Arial;
  background-color: rgb(0, 155, 131);
  border: none;
  border-radius: 0%;
  color: black;
  font-weight: bold;
}

.mainHeading {
  font-family: Arial;
  font-size: 36px;
  font-weight: bold;
}

/* ----------------------------------------------- */
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