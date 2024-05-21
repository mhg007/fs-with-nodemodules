<template>
  <MegaSet8
    :configObj="configurationObject"
    @PasswordTextBox-onBlur="passwordTextBoxBlurHandler"
    @onSubmit="onSubmit"
    @BackButton-onClick="backButtonClickHandler"
  />
</template>
<script>
import MegaSet8 from "@teresol/mega-set8";
import { reactive, ref } from "vue";
import { ElMessageBox } from "element-plus";
import { options } from "@/mixins/alertOption";
export default {
  components: {
    MegaSet8,
  },

  mounted() {
    let frmElem = document.forms[0];
    let pswElem = frmElem.elements[1];
    pswElem.focus();
    // console.log("Password Box : ",pswElem);
    // let passwordTextBoxElem = document.getElementById("PasswordTextBox");
    // passwordTextBoxElem.setAttribute("autocomplete","off");
    // passwordTextBoxElem.setAttribute("readonly","readonly");
    // passwordTextBoxElem.addEventListener("focus",function(){
    //   this.removeAttribute("readonly");
    // })
    // passwordTextBoxElem.focus();
  },

  computed: {
    //------------------Getters Call-------------------
    configurationObject() {
      return reactive(
        this.$store.getters["BCH_CLS_UC2_CloseBatch/gettersMegaSet8ConfigObj"]
      );
    },
  },
  methods: {
    passwordTextBoxBlurHandler(password) {
      this.$store.dispatch("BCH_CLS_UC2_CloseBatch/MS8PasswordTextBox", password);
    },
    onSubmit(values) {
      this.$store
        .dispatch("BCH_CLS_UC2_CloseBatch/OkButtonEvent", values)
        .then((response) => {
          if (response) {
            this.$router.push({ name: 'BCH_CLS_UC2_CloseBatch_SuperSet44' });
          } else {
            document.getElementById('PasswordTextBox').value = '';
          }
        })
        .catch((err) => {
          let errTitle = "Error!";
          ElMessageBox.alert(err.message, errTitle, options);
        });
    },
    backButtonClickHandler() {
      this.$store
        .dispatch("BCH_CLS_UC2_CloseBatch/MS8_BackButton")
        .then((response) => {
          if (response){ this.$router.push({ name: 'Teller' });
          this.$store.dispatch("BCH_CLS_UC2_CloseBatch/resetStore");
          }
        })
        .catch((err) => {
          let errTitle = "Error!";
          ElMessageBox.alert(err.message, errTitle, options);
        });
    },
  },
  setup() {
    return reactive({});
  },
};
</script>
