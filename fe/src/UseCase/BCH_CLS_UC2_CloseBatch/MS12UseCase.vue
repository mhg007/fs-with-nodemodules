<template>
  <MegaSet12
    :configObj="configurationObject"
    @OkButton-onClick="okButtonClickHandler"
  />
</template>
<script>
import MegaSet12 from "@teresol/mega-set12";
import { reactive, ref } from "vue";
import { ElMessageBox } from "element-plus";
import { options } from "@/mixins/alertOption";
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
        this.$store.getters["BCH_CLS_UC2_CloseBatch/gettersMegaSet12ConfigObj"]
      );
    },

    getFooter() {
      return reactive(this.$store.getters.getHeaders);
    },
  },

  methods: {
    okButtonClickHandler() {
      this.$store
        .dispatch("BCH_CLS_UC2_CloseBatch/okMegaSet12")
        .then((response) => {
          if (response) {
            this.getFooter.loginUserBatch = null
            this.$store.dispatch("BCH_CLS_UC2_CloseBatch/resetStore");
            this.$router.push({name: 'Teller'});
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
