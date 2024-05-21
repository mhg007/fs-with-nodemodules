<template>
  <MegaSet8 :configObj="configurationObject" @PasswordTextBox-onBlur="passwordTextBoxBlurHandler" @onSubmit="onSubmit"
    @BackButton-onClick="backButtonClickHandler" />
</template>
<script>
import MegaSet8 from "@teresol/mega-set8";
import { reactive, defineAsyncComponent } from "vue";
// const MegaSet8 = defineAsyncComponent(() =>
//   import('@teresol/mega-set8')
// )
export default {
  components: {
    MegaSet8,
  },

  mounted() {
    this.$nextTick(() => {
      // // const temp = document.forms;
      // console.log("document.getElementById: ", document.getElementById("PasswordTextBox"))
      // // console.log("document.forms.item ", temp.length);

      // let passwordTextBoxElem = document.getElementById("PasswordTextBox");
      // passwordTextBoxElem.focus();

      // console.log("MegaSet8 : ", document.forms);
      let frmElem = document.forms[0];
      let pswElem = frmElem.elements[1];
      pswElem.focus();
    });
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
        this.$store.getters["BCH_OPN_UC1_OpenBatch/gettersMegaSet8ConfigObj"]
      );
    },
  },

  methods: {
    onSubmit(value) {
      this.$store.dispatch("BCH_OPN_UC1_OpenBatch/MS8PasswordTextBox", value.PasswordTextBox);

      this.$store
        .dispatch("BCH_OPN_UC1_OpenBatch/MS8OkButtonEvent", value.PasswordTextBox)
        .then((response) => {
          if (response) {
            this.$router.push({ name: "BCH_OPN_UC1_OpenBatch_SuperSet12" });
          } else {
            document.getElementById('PasswordTextBox').value = '';
          }
        });
    },
    passwordTextBoxBlurHandler(val) {
      //this.$store.dispatch("BCH_OPN_UC1_OpenBatch/MS8PasswordTextBox", val);
    },
    backButtonClickHandler() {
      this.$store
        .dispatch("BCH_OPN_UC1_OpenBatch/BackButtonEvent")
        .then((response) => {
          if (response) this.$router.push({ name: "Teller" });
        });
    },
  },
  setup() {
    return reactive({});
  },
};
</script>
