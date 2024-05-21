<template>
  <MegaSet46
    :configObj="configurationObject"
    @YesButton-onClick="yesButtonClickHandler"
    @NoButton-onClick="noButtonClickHandler"
  />
</template>
<script>
import { reactive, ref } from 'vue';
import MegaSet46 from '@teresol/mega-set46';
import { ElMessageBox } from "element-plus";
import { options } from "@/mixins/alertOption";

export default {
  components: {
    MegaSet46,
  },

  computed: {
    //------------------Getters Call-------------------
    configurationObject() {
      return reactive(this.$store.getters['BCH_INQ_UC3_InquireBatch/gettersMegaSet46ConfigObj']);
    },
  },

  methods: {
    yesButtonClickHandler() {
      this.$store
        .dispatch('BCH_INQ_UC3_InquireBatch/goFromMs46ToMs12')
        .then((response) => {
          if (response) this.$router.push({ name: "MegaSet12_BCH_INQ_UC3_InquireBatch" });
        })
        .catch((error) => {
          console.error(error);
        });
    },

    noButtonClickHandler() {
      this.$store
        .dispatch('BCH_INQ_UC3_InquireBatch/goFromMs46ToMs44')
        .then((response) => {
          if (response) this.$router.push({ name: "MegaSet44_BCH_INQ_UC3_InquireBatch" });
        })
        .catch((err) => {
          let errTitle = "Error!";
          ElMessageBox.alert(err.message, errTitle, options);
        });
    },
  },

  setup() {
    return reactive({  });
  },
};
</script>