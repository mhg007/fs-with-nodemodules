<template>
  <MegaSet45
    :configObj="configurationObject"
    @OkButton-onClick="okButtonClickHandler"
  />
</template>
<script>
import { reactive, ref } from "vue";
import MegaSet45 from "@teresol/mega-set45";
import { ElMessageBox } from "element-plus";
import { options } from "@/mixins/alertOption";

export default {
  components: {
    MegaSet45,
  },

  computed: {
    //------------------Getters Call-------------------
    configurationObject() {
      return reactive(
        this.$store.getters[
          "BCH_INQ_UC3_InquireBatch/gettersMegaSet45ConfigObj"
        ]
      );
    },
  },
  methods: {
    okButtonClickHandler() {
      // this will go back to MS44
      this.$store
        .dispatch("BCH_INQ_UC3_InquireBatch/OkButtonEventHandle")
        .then((response) => {
          if (response)
            this.$router.push({ name: "BCH_INQ_UC3_InquireBatch_SuperSet44" });
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