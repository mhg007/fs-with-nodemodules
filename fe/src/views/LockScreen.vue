<template>
  <Form as="el-form">
    <el-row>
      <el-col :lg="2" :md="2"></el-col>
      <el-col :lg="20" :md="20">
        <h1 class="mainHeading">ALHABIB BANKING SYSTEM</h1>
      </el-col>
      <el-col :lg="2" :md="2"></el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :lg="3" :md="3"></el-col>
      <el-col :lg="9" :md="9">
        <img src="../assets/bahl-logo.png" class="logomain" alt="" />
      </el-col>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="8" :md="8" class="adjustLogin">
        <fieldset>
          <legend>UNLOCK</legend>
          <el-row :gutter="10">
            <el-col :lg="1" :md="1"></el-col>
            <el-col :lg="5" :md="5">
              <el-form-item :style="'font-weight:bold !important; color:black!important; font-size:var(--font-size);--font-size:14px;!important;font-family:Arial!important'
                ">User ID</el-form-item>
            </el-col>
            <el-col :lg="17" :md="17">
              <el-input disabled maxlength="10" v-model="userid"></el-input>
            </el-col>
            <el-col :lg="1" :md="1"></el-col>
          </el-row>
          <br>
          <el-row :gutter="10">
            <el-col :lg="1" :md="1"></el-col>
            <el-col :lg="5" :md="5">
              <el-form-item :style="'font-weight:bold !important; color:black!important; font-size:var(--font-size);--font-size:14px;!important;font-family:Arial!important'
                ">Password</el-form-item>
            </el-col>
            <el-col :lg="17" :md="17">
              <el-input id="lock" ref="lock" @focus="this.resetPassword()" @keyup="checkPassword" maxlength="10" autofocus type="password"
                v-model="password"></el-input>
            </el-col>
            <el-col :lg="1" :md="1"></el-col>
          </el-row>
          <br>
        </fieldset>
        <br />
      </el-col>
      <el-col :lg="3" :md="3"></el-col>
    </el-row>
  </Form>
</template>
<script>
import { ref } from "vue";
import { Form, useForm } from "vee-validate";
import store from '../store/modules/mainMenu.js'
import { ElMessageBox } from 'element-plus'
import { options } from '../mixins/alertOption.js'
let isPasswordComplete =  false
export default {
  components: {
    Form
  },
  setup() {
    useForm();
    const userid = ref(store.state.header.loginUserId);
    const password = ref('')
    return {
      userid,
      password,
      url: "../assets/bahl-logo.png",
    };
  },
  methods: {
    checkPassword(val) {
      if (val.target.value !== undefined && val.target.value !== '') {
        val.target.value = val.target.value.trim();

        if (!isPasswordComplete && val.target.value.length === 10) {
          isPasswordComplete = true;

          this.$store.dispatch('unLockScreen', val.target.value)
            .then(async (response) => {
              if (response === true) {
                this.$store.dispatch('lockScreen', false);
                val.target.value = '';
                this.$store.dispatch('savePassword', val.target.value);
                val.preventDefault();
                val.stopPropagation();
              } else {
                this.resetPassword()
                this.$store.dispatch('savePassword', val.target.value);
                await ElMessageBox.alert(response, 'Message', options);
                val.target.value = '';
                this.$refs.lock.focus();
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
    },
    resetPassword() {
      isPasswordComplete = false;
    }
  }
};
</script>
<style scoped>
.mainHeading {
  font-family: Arial;
  font-size: 36px;
}

.logomain {
  width: 90%;
}

.adjustLogin {
  padding-top: 15%;
}

fieldset {
  border-color: black;
}

legend {
  font-family: Arial;
  font-size: 22px;
  font-weight: bold;
}
</style>
