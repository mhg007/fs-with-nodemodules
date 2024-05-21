<template>
  <MegaSet42
    :configObj="configurationObject"
    @TransactionListTable-onCurrentRow="transactionListTableCurrentRowHandler"
    @DetailsButton-onClick="detailsButtonClickHandler"
    @ExitButton-onClick="exitButtonClickHandler"
  />
</template>
<script>
import MegaSet42 from "@teresol/mega-set42";
import { reactive, ref } from "vue";
import { ElMessageBox } from "element-plus";
import { options } from "@/mixins/alertOption";

export default {
  components: {
    MegaSet42,
  },

  computed: {
    //------------------Getters Call-------------------
    configurationObject() {
      return reactive(
        this.$store.getters[
          "BCH_INQ_UC3_InquireBatch/gettersMegaSet42ConfigObj"
        ]
      );
    },
  },

  methods: {
    transactionListTableCurrentRowHandler(selectedRow) {
      this.selectedRow = selectedRow;
    },

    detailsButtonClickHandler() {
      if (this.selectedRow !== undefined && this.selectedRow !== "") {
        this.$store
          .dispatch(
            "BCH_INQ_UC3_InquireBatch/DetailsButtonEvent",
            this.selectedRow
          )
          .then((response) => {
            if (response)
              this.$router.push({
                name: "BCH_INQ_UC3_InquireBatch_SuperSet10",
              });
          })
          .catch((error) => {
            console.error(error.message);
          });
      } else {
        let alertMsgTitle = "Information";
        let alertMsgText = "Transaction not selected, select a transaction"; //"Please select record";
        ElMessageBox.alert(alertMsgText, alertMsgTitle, options);
      }
    },

    exitButtonClickHandler() {
      this.$store
        .dispatch("BCH_INQ_UC3_InquireBatch/MS42_ExitButtonEvent")
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
    return reactive({
      selectedRow: "",
    });
  },
};
</script>