<template>
  <MegaSet12
    :configObj="configurationObject"
    @OkButton-onClick="okButtonClickHandler"
  />
</template>
<script>
import MegaSet12 from "@teresol/mega-set12";
import { reactive } from "vue";
export default {
  components: {
    MegaSet12,
  },

  mounted() {
    document.getElementById("OkButton").focus();
  },
  computed: {
    //------------------Getters Call-------------------
    configurationObject() {
      return reactive(
        this.$store.getters["BCH_OPN_UC1_OpenBatch/gettersMegaSet12ConfigObj"]
      );
    },
  },

  methods: {
    okButtonClickHandler() {
      this.$store
        .dispatch("BCH_OPN_UC1_OpenBatch/MS12okButton")
        .then((response) => {
          if (response) {
            this.$router.go(-2);
          }
          let batchno = this.configurationObject.batchno;
          console.log("batch no MS12:", batchno);
          let depNo = this.configurationObject.departmentNo;
          let ip = this.configurationObject.ipAddress;
          this.$store.dispatch("saveBatchNo", batchno);
          this.$store.dispatch("saveIpAddress", ip);
          this.$store.dispatch("saveDepNo", depNo);
        });
    },
  },

  setup() {
    return reactive({});
  },
};
</script>
