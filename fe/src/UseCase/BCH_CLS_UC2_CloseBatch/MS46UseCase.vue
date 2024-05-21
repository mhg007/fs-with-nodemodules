<template>
  <MegaSet46
    :configObj="configurationObject"
    @YesButton-onClick="yesButtonClickHandler"
    @NoButton-onClick="noButtonClickHandler"
  />
</template>
<script>
import { reactive, ref } from "vue";
import MegaSet46 from "@teresol/mega-set46";
import { ElMessageBox } from "element-plus";
import { options } from "@/mixins/alertOption";

export default {
  components: {
    MegaSet46,
  },

  computed: {
    //------------------Getters Call-------------------
    configurationObject() {
      return reactive(
        this.$store.getters["BCH_CLS_UC2_CloseBatch/gettersMegaSet46ConfigObj"]
      );
    },
  },

  methods: {
    yesButtonClickHandler() {
      this.$store
        .dispatch("BCH_CLS_UC2_CloseBatch/MS46_YesButtonEvent")
        .then((response) => {

          if (response)
            this.$router.push({ name: "BCH_CLS_UC2_CloseBatch_SuperSet12" });
        })
        .catch((err) => {
          let errTitle = "Error!";
          ElMessageBox.alert(err.message, errTitle, options);
        });
    },

    noButtonClickHandler() {
      this.$store
          .dispatch("BCH_CLS_UC2_CloseBatch/MS46_NoButtonEvent")
          .then((response) => {
            if(response)
              this.$router.push({name: 'BCH_CLS_UC2_CloseBatch_SuperSet44'})

      }).catch((err)=>{
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