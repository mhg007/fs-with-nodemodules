<template>
  <MegaSet34
    :configObj="configurationObject"
    @onSubmit="onSubmit"
    @AccountNumberTextBox-onBlur="accountNoTextBoxBlurHandler"
    @CurrencyDropDown-onChange="currencyDropDownHandler"
    @DepartmentNumberDropDown-onChange="departmentNumberHandler"
    @ExitButton-onClick="exitButtonClickHandler"
    @SelectionCriteriaDropDown-onChange="selectionCriteriaOnChange"
    @SortingCriterionDropDown-onChange="sortingCriteriaOnChange"
    @SelectionConditionsRadioButton-onChange="amountRadioBtnHandler"
    @AmountTextBox-onBlur="amountValueHandler"
    @TransactionStatusDropDown-onChange="transactionStatuHandler"
  />
</template>
<script>
import MegaSet34 from "@teresol/mega-set34";
import { reactive, ref } from "vue";
import { ElMessageBox } from "element-plus";
import { options } from "@/mixins/alertOption";

export default {
  components: {
    MegaSet34,
  },

  data() {
    return {
      // @author      [akash.kumar - 16-06-2022]
      // @desc        [change the selectedSortingCriteria prop value as 1 (Reference No) default. Also create an new prop with name 'selectedSortingCriteriaTemp']
      selectedCriteriaObj: {
        selectedSortingCriteria: 1,
        accountNumber: "",
        currencyCode: "",
        deptNumber: "",
        amountOperand: "",
        amountValue: 0,
        transactionStatus: "",
        generalLedgerRunNumber: "",
        generalLedgerCheckDigit: "",
        accountIden: "",
        identifier: "",
        mainHead: "",
        subHead1: "",
        subHead2: "",
        accountType: "",
        customerNumber: "",
        runNumber: "",
        checkDigit: "",
      },
      selectedSortingCriteriaTemp: "",
    };
  },

  mounted() {
    //this.selectionCriteriaOnChange("ALL");
    let accountNumberTextBox = document.getElementById("AccountGLTextBox");
    if(accountNumberTextBox !== null && accountNumberTextBox !== undefined) {
      accountNumberTextBox.addEventListener("paste",function(){
        return false;
      });
    }
    
  },
  computed: {
    //------------------Getters Call-------------------
    configurationObject() {
      return reactive(
        this.$store.getters[
          "BCH_INQ_UC3_InquireBatch/gettersMegaSet34ConfigObj"
        ]
      );
    },
  },

  methods: {
    onSubmit(values) {
      if (values.AccountNumberTextBox !== undefined) {
        this.accountNoTextBoxBlurHandler(values.AccountNumberTextBox);
        this.$store.dispatch("BCH_INQ_UC3_InquireBatch/MS34_setAccountNumber", values.AccountNumberTextBox);
      }
      if (values.AmountTextBox !== undefined) {
        this.amountValueHandler(values.AmountTextBox);
        this.amountRadioBtnHandler(values.SelectionConditionsRadioButton);
        this.$store.dispatch("BCH_INQ_UC3_InquireBatch/MS34_setAmountTextBox", values.AmountTextBox);
        this.$store.dispatch("BCH_INQ_UC3_InquireBatch/MS34_setSelectionConditionsRadioButton", values.SelectionConditionsRadioButton);
      }
      if (values.CurrencyDropDown !== undefined) {
        this.currencyDropDownHandler(values.CurrencyDropDown);
        this.$store.dispatch("BCH_INQ_UC3_InquireBatch/MS34_setCurrencyDropDown", values.CurrencyDropDown);
      }
      if (values.DepartmentNumberDropDown !== undefined) {
        this.departmentNumberHandler(values.DepartmentNumberDropDown);
        this.$store.dispatch("BCH_INQ_UC3_InquireBatch/MS34_setDepartmentNumberDropDown", values.DepartmentNumberDropDown);
      }
      if (values.TransactionStatusDropDown !== undefined) {
        this.transactionStatuHandler(values.TransactionStatusDropDown);
        this.$store.dispatch("BCH_INQ_UC3_InquireBatch/MS34_setTransactionStatusDropDown", values.TransactionStatusDropDown);
      }
      if (values.SortingCriterionDropDown !== undefined) {
        this.sortingCriteriaOnChange(values.SortingCriterionDropDown);
        this.$store.dispatch("BCH_INQ_UC3_InquireBatch/MS34_setSortingCriterionDropDown", values.SortingCriterionDropDown);
      }
      
      this.$store
        .dispatch(
          "BCH_INQ_UC3_InquireBatch/MS34_OkButtonEvent",
          this.selectedCriteriaObj
        )
        .then((response) => {
          if (response)
            this.$router.push({ name: "BCH_INQ_UC3_InquireBatch_SuperSet42" });
        })
        .catch((err) => {
          new Swal("Error", err.message);
        });
    },
    selectionCriteriaOnChange(val) {
      this.$store.dispatch("BCH_INQ_UC3_InquireBatch/MS34_setSelectionCriteriaDropDown", val);

      // @author      [akash.kumar - 16-06-2022]
      // @desc        [assign the value to selectedSortingCriteriaTemp]
      this.selectedSortingCriteriaTemp =
        this.selectedCriteriaObj.selectedSortingCriteria;
      this.resetCriteriaObj();

      var showHideCompsObj = {
        accountNumberTextBoxVisible: false,
        currencyDropDownVisible: false,
        amountTextBoxVisible: false,
        amountRadioButtonsVisible: false,
        departmentNumberDropDownVisible: false,
        transactionStatusDropDowVisible: false,
        section1Visible: false,
        section2Visiblity: false,
      };

      if (val === "AC_NO") {
        showHideCompsObj.accountNumberTextBoxVisible = true;
        showHideCompsObj.currencyDropDownVisible = false;
        showHideCompsObj.amountTextBoxVisible = false;
        showHideCompsObj.amountRadioButtonsVisible = false;
        showHideCompsObj.departmentNumberDropDownVisible = false;
        showHideCompsObj.transactionStatusDropDowVisible = false;
        showHideCompsObj.section1Visible = true;
        showHideCompsObj.section2Visiblity = false;
      } else if (val === "CURR") {
        showHideCompsObj.accountNumberTextBoxVisible = false;
        showHideCompsObj.currencyDropDownVisible = true;
        showHideCompsObj.amountTextBoxVisible = false;
        showHideCompsObj.amountRadioButtonsVisible = false;
        showHideCompsObj.departmentNumberDropDownVisible = false;
        showHideCompsObj.transactionStatusDropDowVisible = false;
        showHideCompsObj.section1Visible = true;
        showHideCompsObj.section2Visiblity = false;
      } else if (val === "AMT") {
        showHideCompsObj.accountNumberTextBoxVisible = false;
        showHideCompsObj.currencyDropDownVisible = false;
        showHideCompsObj.amountTextBoxVisible = true;
        showHideCompsObj.amountRadioButtonsVisible = true;
        showHideCompsObj.departmentNumberDropDownVisible = false;
        showHideCompsObj.transactionStatusDropDowVisible = false;
        showHideCompsObj.section2Visiblity = true;
        showHideCompsObj.section1Visible = false;
      } else if (val === "DEPT_NO") {
        showHideCompsObj.accountNumberTextBoxVisible = false;
        showHideCompsObj.currencyDropDownVisible = false;
        showHideCompsObj.amountTextBoxVisible = false;
        showHideCompsObj.amountRadioButtonsVisible = false;
        showHideCompsObj.departmentNumberDropDownVisible = true;
        showHideCompsObj.transactionStatusDropDowVisible = false;
        showHideCompsObj.section1Visible = true;
        showHideCompsObj.section2Visiblity = false;
      } else if (val === "TRAN_STS") {
        showHideCompsObj.accountNumberTextBoxVisible = false;
        showHideCompsObj.currencyDropDownVisible = false;
        showHideCompsObj.amountTextBoxVisible = false;
        showHideCompsObj.amountRadioButtonsVisible = false;
        showHideCompsObj.departmentNumberDropDownVisible = false;
        showHideCompsObj.transactionStatusDropDowVisible = true;
        showHideCompsObj.section1Visible = true;
        showHideCompsObj.section2Visiblity = false;
      } else if (val === "ALL") {
        showHideCompsObj.accountNumberTextBoxVisible = false;
        showHideCompsObj.currencyDropDownVisible = false;
        showHideCompsObj.amountTextBoxVisible = false;
        showHideCompsObj.amountRadioButtonsVisible = false;
        showHideCompsObj.departmentNumberDropDownVisible = false;
        showHideCompsObj.transactionStatusDropDowVisible = true;
        showHideCompsObj.section1Visible = false;
        showHideCompsObj.section2Visiblity = false;
      }
      this.$store.dispatch(
        "BCH_INQ_UC3_InquireBatch/MS34_showHideComponentsOnSelectionCriteria",
        showHideCompsObj
      ).then(() => {
        let amountComponent = document.getElementById('TrAmountTextBox');
        if (amountComponent !== null && amountComponent !== undefined) {
          amountComponent.value = '';
        }
      });
    },

    sortingCriteriaOnChange(val) {
      this.selectedCriteriaObj.selectedSortingCriteria = val;
    },
    accountNoTextBoxBlurHandler(val) {
      if (this.isNumeric(val)) {
        this.selectedCriteriaObj.accountIden = "";
        this.selectedCriteriaObj.identifier = "C";
        this.selectedCriteriaObj.accountType = val.slice(0, 4);
        this.selectedCriteriaObj.customerNumber = val.slice(4, 10);
        this.selectedCriteriaObj.runNumber = val.slice(10, 12);
        this.selectedCriteriaObj.checkDigit = val.slice(12, 13);
      } else {
        this.selectedCriteriaObj.accountIden = "";
        this.selectedCriteriaObj.identifier = val.slice(0, 1);
        this.selectedCriteriaObj.mainHead = val.slice(1, 4);
        this.selectedCriteriaObj.subHead1 = val.slice(4, 6);
        this.selectedCriteriaObj.subHead2 = val.slice(6, 8);
        this.selectedCriteriaObj.generalLedgerRunNumber = val.slice(8, 12);
        this.selectedCriteriaObj.generalLedgerCheckDigit = val.slice(12, 13);
      }
      this.selectedCriteriaObj.accountNumber = val;
    },
    isNumeric(str) {
      return !isNaN(str);
    },
    currencyDropDownHandler(val) {
      this.selectedCriteriaObj.currencyCode = val;
    },
    departmentNumberHandler(val) {
      this.selectedCriteriaObj.deptNumber = val;
    },
    amountRadioBtnHandler(val) {
      if (val === "less_than") this.selectedCriteriaObj.amountOperand = "less";
      else if (val === "equal_to")
        this.selectedCriteriaObj.amountOperand = "equal";
      else if (val === "greater_than")
        this.selectedCriteriaObj.amountOperand = "greater";
    },
    amountValueHandler(val) {
      this.selectedCriteriaObj.amountValue = val;
    },
    transactionStatuHandler(val) {
      this.selectedCriteriaObj.transactionStatus = val;
    },
    resetCriteriaObj() {
      // @author      [akash.kumar - 16-06-2022]
      // @desc        [assign the value to selectedSortingCriteria from selectedSortingCriteriaTemp]
      this.selectedCriteriaObj = {
        selectedSortingCriteria: this.selectedSortingCriteriaTemp,
        accountNumber: "",
        currencyCode: "",
        deptNumber: "",
        amountOperand: "",
        amountValue: 0,
        transactionStatus: "",
        generalLedgerRunNumber: "",
        generalLedgerCheckDigit: "",
        accountIden: "",
        identifier: "",
        mainHead: "",
        subHead1: "",
        subHead2: "",
        accountType: "",
        customerNumber: "",
        runNumber: "",
        checkDigit: "",
      };
    },
    exitButtonClickHandler() {
      this.$store
        .dispatch("BCH_INQ_UC3_InquireBatch/MS34_ExitButtonEvent")
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