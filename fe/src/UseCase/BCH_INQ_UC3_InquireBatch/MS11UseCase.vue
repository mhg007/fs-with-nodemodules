<template>
  <MegaSet11
    :configObj="configurationObject"
    @BackButton-onClick="backButtonHandler"
  />
</template>
<script>
import MegaSet11 from "@teresol/mega-set11";
import { reactive, ref } from "vue";
import { ElMessageBox } from "element-plus";
import { options } from "@/mixins/alertOption";
export default {
  components: {
    MegaSet11,
  },

  computed: {
    //------------------Getters Call-------------------
    configurationObject() {
      return reactive(this.$store.getters['BCH_INQ_UC3_InquireBatch/gettersMegaSet11ConfigObj']);
    },
  },

  methods: {
    backButtonHandler() {
      this.$store.dispatch("BCH_INQ_UC3_InquireBatch/backButtonEvent")
        .then((response) => {
          if (response)
            this.$router.push({name: "BCH_INQ_UC3_InquireBatch_SuperSet10"})
        }).catch((err) => {
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