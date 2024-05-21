<template>
  <MegaSet44
    :configObj="configurationObject"
    @OkButton-onClick="okButtonClickHandler"
    @TransactionDetailsButton-onClick="transactionDetailsButtonClickHandler"
    @BackButton-onClick="backButtonClickHandler"
  />
</template>
<script>
import MegaSet44 from "@teresol/mega-set44";
import { reactive, ref } from "vue";
import { ElMessageBox } from "element-plus";
import { options } from "@/mixins/alertOption";

export default {
  components: {
    MegaSet44,
  },

  computed: {
    //------------------Getters Call-------------------
    configurationObject() {
      return reactive(
        this.$store.getters["BCH_CLS_UC2_CloseBatch/gettersMegaSet44ConfigObj"]
      );
    },
  },

  methods: {
    okButtonClickHandler() {
      this.$store
        .dispatch("BCH_CLS_UC2_CloseBatch/MS44_OkButtonEvent")
        .then((response) => {
          if (response) {
            this.$router.push({ name: "BCH_CLS_UC2_CloseBatch_SuperSet46" });
          }
        });
    },
    transactionDetailsButtonClickHandler() {
      this.$store
        .dispatch("BCH_CLS_UC2_CloseBatch/TransactionDetailsButtonEvent")
        .then((response) => {
          if (response)
            this.$router.push({ name: "BCH_CLS_UC2_CloseBatch_SuperSet34" });
        })
        .catch((err) => {
          let errTitle = "Error!";
          ElMessageBox.alert(err.message, errTitle, options);
        });
    },
    backButtonClickHandler() {
      this.$store
        .dispatch("BCH_CLS_UC2_CloseBatch/MS44_BackButtonEvent")
        .then((response) => {
          if (response)
            this.$router.push({ name: "BCH_CLS_UC2_CloseBatch_SuperSet8" });
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