<template>
  <MegaSet44
    :configObj="configurationObject"
    @CCYDetailsButton-onClick="ccyDetailsButtonClickHandler"
    @TransactionDetailsButton-onClick="transactionDetailsButtonClickHandler"
    @BackButton-onClick="backButtonClickHandler"
  />
</template>
<script>
import MegaSet44 from "@teresol/mega-set44";
import { reactive } from "vue"; //import { reactive, ref } from "vue";
import { ElMessageBox } from "element-plus";
import { options } from "@/mixins/alertOption";

export default {
  components: {
    MegaSet44,
  },

  computed: {
    //------------------Getters Call-------------------
    configurationObject() {
      return this.$store.getters[
        "BCH_INQ_UC3_InquireBatch/gettersMegaSet44ConfigObj"
      ];
    },
  },
  methods: {
    ccyDetailsButtonClickHandler() {
      this.$store
        .dispatch("BCH_INQ_UC3_InquireBatch/CCYDetailsButtonEvent")
        .then((response) => {
          if (response)
            this.$router.push({ name: "BCH_INQ_UC3_InquireBatch_SuperSet45" });
        })
        .catch((err) => {
          let errTitle = "Error!";
          ElMessageBox.alert(err.message, errTitle, options);
        });
    },

    transactionDetailsButtonClickHandler() {
      this.$store
        .dispatch("BCH_INQ_UC3_InquireBatch/TransactionDetailsButtonEvent")
        .then((response) => {
          if (response)
            this.$router.push({ name: "BCH_INQ_UC3_InquireBatch_SuperSet34" });
        })
        .catch((err) => {
          let errTitle = "Error!";
          ElMessageBox.alert(err.message, errTitle, options);
        });
    },

    backButtonClickHandler() {
      this.$store
        .dispatch("BCH_INQ_UC3_InquireBatch/MS44_BackButton")
        .then((response) => {
          if (response) {
            this.$router.push({ name: "Teller" });
            this.$store.dispatch("BCH_INQ_UC3_InquireBatch/resetStore");
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
