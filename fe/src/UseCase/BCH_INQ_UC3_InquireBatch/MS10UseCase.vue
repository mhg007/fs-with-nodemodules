<template>
  <MegaSet10
    :configObj="configurationObject"
    @OkButton-onClick="okButtonClickHandler"
    @OtherNarrationButton-onClick="otherNarrationsButtonClickHandler"
    @BackButton-onClick="backButtonClickHandler"
    @ExitButton-onClick="exitButtonClickHandler"
  />
</template>
<script>
import { reactive, ref } from "vue";
// import MegaSet10 from "@teresol/mega-set10";
import MegaSet10 from "@teresol/mega-set10";
import { ElMessageBox } from "element-plus";
import { options } from "@/mixins/alertOption";
export default {
  components: {
    MegaSet10,
  },

  computed: {
    //------------------Getters Call-------------------
    configurationObject() {
      return reactive(
        this.$store.getters[
          "BCH_INQ_UC3_InquireBatch/gettersMegaSet10ConfigObj"
        ]
      );
    },
  },

  methods: {
    okButtonClickHandler() {
      this.$store
        .dispatch("BCH_INQ_UC3_InquireBatch/MS10_OkButtonEvent")
        .then((response) => {
          if (response)
            this.$router.push({ name: "BCH_INQ_UC3_InquireBatch_SuperSet42" });
        })
        .catch((err) => {
          let errTitle = "Error!";
          ElMessageBox.alert(err.message, errTitle, options);
        });
    },
    backButtonClickHandler() {
      this.$store
        .dispatch("BCH_INQ_UC3_InquireBatch/MS10_BackButtonEvent")
        .then((response) => {
          if (response)
            this.$router.push({ name: "BCH_INQ_UC3_InquireBatch_SuperSet42" });
        })
        .catch((err) => {
          let errTitle = "Error!";
          ElMessageBox.alert(err.message, errTitle, options);
        });
    },
    otherNarrationsButtonClickHandler() {
      this.$store
        .dispatch("BCH_INQ_UC3_InquireBatch/OtherNarrationsButtonEvent")
        .then((response) => {
          if (response)
            this.$router.push({ name: "BCH_INQ_UC3_InquireBatch_SuperSet11" });
        })
        .catch((err) => {
          let errTitle = "Error!";
          ElMessageBox.alert(err.message, errTitle, options);
        });
    },
    exitButtonClickHandler() {
      this.$store
        .dispatch("BCH_INQ_UC3_InquireBatch/MS10_ExitButtonEvent") // GO BACK TO MS34
        .then((response) => {
          if (response)
            this.$router.push({ name: "BCH_INQ_UC3_InquireBatch_SuperSet34" });
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