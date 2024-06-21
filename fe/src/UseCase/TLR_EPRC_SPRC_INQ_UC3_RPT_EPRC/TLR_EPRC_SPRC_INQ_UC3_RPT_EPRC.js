import { ref } from "vue";
import {
  FsmAjax,
  useUseCaseViewManager,
  defineUseCaseComponent,
  defineUseCaseLoader,
} from "@teresol-v2/usecase-hoc/utils";
import helper from "@teresol-v2/usecase-hoc/helper";
import MegaSet681 from "@teresol-v2/mega-set681";

// UseCase HOC Name
const hocName = "TLR_EPRC_SPRC_INQ_UC3_RPT_EPRC";
// FMS Transitions
FsmAjax.prototype.postOkBtn = function (data) {
  return this.post("OK_BTN", data);
};
FsmAjax.prototype.backBtn = function () {
  return this.post("BACK");
};
FsmAjax.prototype.exitBtn = function () {
  return this.post("EXIT");
};
FsmAjax.prototype.searchBtn = function (data) {
  return this.post("SEARCH", data);
};
FsmAjax.prototype.submitBtn = function (data) {
  return this.post("SUBMIT", data);
};

function convertedDate(val) {
  const [day, month, year] = val.split('/');
  const formattedDate = new Date(`${year}-${month}-${day}`);
  return formattedDate.toLocaleDateString('en-CA');
}

function convertedTime() {
  const now = new Date();
  const currentTime = now.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  return currentTime;
}

function dateFormatter(date) {

  const originalDate = date;
  let formattedDate;
  // Split the date string into year, month, and day
  const [year, month, day] = originalDate.split("-");

  // Rearrange the components in the desired format
  formattedDate = `${month}/${day}/${year}`;

  return formattedDate
}

function leapYearChecker(val) {
  const isLeapYear = false;

  if ((val % 4 === 0 && val % 100 !== 0) ||
    (val % 400 === 0)) {
    return isLeapYear = true;
  }
}

function validateCnic(val) {

  var regex = /^[0-9]+$/;

  if (regex.test(val)) {
    return true;
  }
  else {
    helper.alert("Please Enter Numbers Only");
    return false;
  }
}

function formatCnic(val) {
  // Remove existing dashes before formatting
  const stringWithoutDashes = val.replace(/-/g, '');


  // Check if the CNIC has the correct length (13 digits) after removing dashes
  if (stringWithoutDashes.length !== 13) {
    // Return an error message or handle invalid length here
    helper.alert("Invalid Identification Number length");
    // You can modify this message as needed
  }

  // Format the CNIC with dashes
  const formattedCnic = stringWithoutDashes.replace(/^(\d{5})(\d{7})(\d{1})$/, '$1-$2-$3');

  return formattedCnic;
}

function formatNtn(ntnVal, ntnType) {

  let formattedNtn = "";
  if (ntnType === "NTN") {
    // Remove existing dashes before formatting
    const stringWithoutDashes = ntnVal.replace(/-/g, '');

    // Check if the NTN has the correct length (8 digits) after removing dashes
    if (stringWithoutDashes.length !== 8) {
      // Return an error message or handle invalid length here
      helper.alert("Invalid Identification Number length");
      // You can modify this message as needed
    }

    // Format the NTN with dashes
    formattedNtn = stringWithoutDashes.replace(/(\d{7})(\d{1})/, '$1-$2');
  }

  if (ntnType === "NTN-AJK") {
    // Remove existing dashes before formatting
    const stringWithoutDashes = ntnVal.replace(/-/g, '');

    // Check if the NTN-AJK has the correct length (11 digits) after removing dashes
    if (stringWithoutDashes.length !== 11) {
      // Return an error message or handle invalid length here
      helper.alert("Invalid Identification Number length");
      // You can modify this message as needed
    }

    // Format the NTN-AJK with dashes
    formattedNtn = stringWithoutDashes.replace(/(\d{3})(\d{7})(\d{1})/, '$1-$2-$3');
  }


  return formattedNtn;
}

function removeHyphens(val) {
  // Replace hyphens from CNIC
  const formattedString = val.replace(/-/g, "");
  return formattedString;
}


// UseCase HOC Setup
function hocSetup(props, { attrs, slots, emit, expose }) {
  const header = FsmAjax.header;
  // UseCase Config
  const hocConfig = {
    fsmUrl: props.fsmUrl,
    batchRequired: false,
    activityCode: "EPRCRPOT",
    subActivityCode: "",
  };
  // FSM AJAX helper
  const fsm = new FsmAjax(hocConfig);


  const identityDocTypeEnum = {
    ARC: '1',
    CNIC: '2',
    NICOP: '3',
    PASSPORT: '4',
    POR: '5',
    POC: '6',
    NTN: '7',
    'NTN-AJK': '8',
  };


  const channelEnum = {
    Branch: '1',
    Internet: '2',
    Scheduler: '3',
  };

  const modeTransactionEnum = {
    'Account Transfer': '1',
    'Cash Over Counter Transaction': '2',
  };

  const ms681 = {

    todayDate: ref(''),


    inputLength: ref(0),

    AccountNumber: ref(""),
    IBANNumberValue: ref(""),
    ePRCNumberValue: ref(""),
    ModeofTransList: ref([]),
    TransradioGroup: ref(""),
    AccountRadioGroup: ref(""),
    modeDefaultValue: ref("Select"),
    AccountRadioDefaultValue: ref(""),
    TransactionRadioDefaultValue: ref("Account"),
    IdentificationDocTypeDefaultValue: ref("Select"),
    IdentificationDocNoDefaultValue: ref(""),
    fromDate: ref(""),
    toDate: ref(""),
    eprcTableIsVisible: ref(false),
    sprcTableIsVisible: ref(false),
    downloadBtnIsVisible: ref(false),
    exitBtnIsVisible: ref(false),
    AccountNumberIsVisible: ref(true),
    IBANNumberIsVisible: ref(false),
    IBANNumberTextBoxIsDisable: ref(true),
    ePRCNumberIsVisible: ref(false),
    fromDateIsVisible: ref(true),
    toDateIsVisible: ref(true),
    reportsPaginationIsVisible: ref(false),
    accountRadioBtnIsVisible: ref(false),
    accountNumberTextBoxIsDisable: ref(false),
    transactionRadioBtnIsVisible: ref(true),
    identificationDocTypeIsVisible: ref(false),
    identificationDocNumberIsVisible: ref(false),
    identificationDocNumberIsDisable: ref(true),
    channelDropDownIsVisible: ref(true),
    channelList: ref([]),
    channelDefaultValue: ref("Select"),
    branchCodeIsVisible: ref(true),
    branchCodeValue: ref(""),


    identificationEnum: ref(""),
    identityDocTypeList: ref([]),
    transModeEnumVal: ref(""),
    wlAccountNo: ref(""),
    requestTypeId: ref(""),
    idDocumentType: ref(""),
    dpChannel: ref(""),
    createdDate: ref(""),
    createdBy: ref(""),
    ipAddress: ref(""),

    tableDataDictionary: ref({}),

    totalPages: ref(1),
    currentPage: ref(1),
    currPage: ref(1),
    selectedPage: ref(1),

    tableData: ref(''),


    clearState() {
      console.debug("When clear state function is calling to clear fields")

      if (ms681.requestTypeId.value === 1) {
        console.debug("When Account Transfer Is Selected Enable Account Number Fields");
        ms681.channelDropDownIsVisible.value = true;
        ms681.branchCodeIsVisible.value = true;
        ms681.transactionRadioBtnIsVisible.value = true;
        ms681.AccountNumberIsVisible.value = true;
        ms681.accountRadioBtnIsVisible.value = false;
        ms681.fromDateIsVisible.value = true;
        ms681.toDateIsVisible.value = true;

        ms681.identificationDocNumberIsVisible.value = false;
        ms681.identificationDocTypeIsVisible.value = false;
        ms681.identificationDocNumberIsDisable.value = true;
      }

      if (ms681.requestTypeId.value === 2) {
        console.debug("When Cash Over Counnter Is Selected Enable COC Fields");
        ms681.channelDropDownIsVisible.value = true;
        ms681.identificationDocTypeIsVisible.value = true;
        ms681.identificationDocNumberIsVisible.value = true;
        ms681.identificationDocNumberIsDisable.value = true;
        ms681.fromDateIsVisible.value = true;
        ms681.toDateIsVisible.value = true;

        ms681.branchCodeIsVisible.value = false;
        ms681.transactionRadioBtnIsVisible.value = false;
        ms681.AccountNumberIsVisible.value = false;
        ms681.accountRadioBtnIsVisible.value = false;


      }

      if (ms681.TransactionRadioDefaultValue.value === "Account") {
        console.debug("when account radio button selected which is account and clear button pressed")
        ms681.AccountNumberIsVisible.value = true;
        ms681.accountNumberTextBoxIsDisable.value = false;
        ms681.IBANNumberIsVisible.value = false;
        ms681.IBANNumberTextBoxIsDisable.value = true;
      }

      if (ms681.TransactionRadioDefaultValue.value === "iban") {
        console.debug("when account radio button selected which is iban and clear button pressed")
        ms681.AccountNumberIsVisible.value = false;
        ms681.accountNumberTextBoxIsDisable.value = false;
        ms681.IBANNumberIsVisible.value = true;
        ms681.IBANNumberTextBoxIsDisable.value = false;
      }


      ms681.ePRCNumberIsVisible.value = false;
      ms681.reportsPaginationIsVisible.value = false;


      ms681.AccountNumber.value = "";
      ms681.AccountRadioDefaultValue.value = " ";
      ms681.modeDefaultValue.value = "Select";
      ms681.IdentificationDocTypeDefaultValue.value = "Select";
      ms681.sprcTableIsVisible.value = false;
      ms681.tableData.value = [];
      ms681.fromDate.value = "",
        ms681.toDate.value = "",
        ms681.IBANNumberValue.value = "",
        ms681.downloadBtnIsVisible.value = false;
      ms681.exitBtnIsVisible.value = false;
      ms681.ePRCNumberValue.value = "";
      ms681.IdentificationDocNoDefaultValue.value = "";
      ms681.reportsPaginationIsVisible.value = false;
      ms681.channelDefaultValue.value = "Select";
      ms681.branchCodeValue.value = "";
      ms681.dpChannel.value = "";

      // megaset681Config.value.componentProps.TransactionRadioButton.radioGroup[0].tabIndex = 0;

    },

    changeState() {
      ms681.reportsPaginationIsVisible.value = true;
      ms681.sprcTableIsVisible.value = true;
      ms681.exitBtnIsVisible.value = true;
    },

    setTodayDate() {
      const today = new Date();
      const todayYear = today.getFullYear();
      const todayMonth = String(today.getMonth() + 1).padStart(2, '0');
      const todayDay = String(today.getDate()).padStart(2, '0');
      ms681.todayDate.value = `${todayDay}/${todayMonth}/${todayYear}`;

      ms681.fromDate.value = ms681.todayDate.value;
      ms681.toDate.value = ms681.todayDate.value;
    },

    setAccountRadioGroup(value) {
      ms681.AccountRadioGroup.value = value ?? "";
    },

    setAccountNumber(value) {
      ms681.AccountNumber.value = value ?? "";
      console.debug("ms681.AccountNumber: ", ms681.AccountNumber.value);
    },

    setIBANNumber(value) {
      ms681.IBANNumberValue.value = value ?? "";
      console.debug("ms681.IBANNumberValue: ", ms681.IBANNumberValue.value);
    },

    setbranchCode(value) {
      ms681.branchCodeValue.value = helper.padLeadingZeros(value, 4)
      console.debug("ms681.branchCodeValue: ", ms681.branchCodeValue.value);
    },

    setFromDate(value) {
      ms681.fromDate.value = value ?? "";
      console.debug("ms681.fromDate: ", ms681.fromDate.value);
    },

    setToDate(value) {
      ms681.toDate.value = value ?? "";
      console.debug("ms681.toDate: ", ms681.toDate.value);
    },

    setIdentificationDocNumber(value) {

      console.debug("When Set Identification Document Number Function Is Called")

      ms681.IdentificationDocNoDefaultValue.value = value ?? "";
      if (ms681.IdentificationDocTypeDefaultValue.value === "ARC") {
        ms681.identificationEnum.value = identityDocTypeEnum.ARC;
      }
      if (ms681.IdentificationDocTypeDefaultValue.value === "CNIC") {
        if (validateCnic(value) === false) {
          console.debug("When cnic contains non numeric character")
          ms681.IdentificationDocNoDefaultValue.value = ""
          return;
        }
        ms681.identificationEnum.value = identityDocTypeEnum.CNIC;
        ms681.IdentificationDocNoDefaultValue.value = formatCnic(ms681.IdentificationDocNoDefaultValue.value);
      }
      if (ms681.IdentificationDocTypeDefaultValue.value === "NICOP") {
        ms681.identificationEnum.value = identityDocTypeEnum.NICOP;
        ms681.IdentificationDocNoDefaultValue.value = formatCnic(ms681.IdentificationDocNoDefaultValue.value);

      }
      if (ms681.IdentificationDocTypeDefaultValue.value === "PASSPORT") {
        ms681.identificationEnum.value = identityDocTypeEnum.PASSPORT;
      }
      if (ms681.IdentificationDocTypeDefaultValue.value === "POR") {
        ms681.identificationEnum.value = identityDocTypeEnum.POR;
      }
      if (ms681.IdentificationDocTypeDefaultValue.value === "POC") {
        ms681.identificationEnum.value = identityDocTypeEnum.POC;
      }
      if (ms681.IdentificationDocTypeDefaultValue.value === "NTN") {
        ms681.identificationEnum.value = identityDocTypeEnum.NTN;
        ms681.IdentificationDocNoDefaultValue.value = formatNtn(ms681.IdentificationDocNoDefaultValue.value, ms681.IdentificationDocTypeDefaultValue.value);
      }
      if (ms681.IdentificationDocTypeDefaultValue.value === "NTN-AJK") {
        ms681.identificationEnum.value = identityDocTypeEnum["NTN-AJK"];
        ms681.IdentificationDocNoDefaultValue.value = formatNtn(ms681.IdentificationDocNoDefaultValue.value, ms681.IdentificationDocTypeDefaultValue.value);
      }
    },

    setidentificationDocType(listOfStatus) {
      console.debug("LIST of STATUS : ", listOfStatus)

      const arr = [];

      if (listOfStatus && listOfStatus.length > 0) {
        arr.push(
          ...listOfStatus.map((identityType) => ({
            Option: identityType.identificationTypeId,
            value: identityType.identificationTypeName,
          }))
        );
      }
      ms681.identityDocTypeList.value = arr;
    },

    setModeOfTranList(receiveTranModeList) {

      const arr = [];
      if (receiveTranModeList && receiveTranModeList.length > 0) {
        arr.push(
          ...receiveTranModeList.map((tranMode) => ({
            Option: tranMode.requestTypeName,
            value: tranMode.requestTypeDescription,
          }))
        );
      }
      ms681.ModeofTransList.value = arr;
    },

    setChannelList(receiveChannelList) {

      const arr = [];
      if (receiveChannelList && receiveChannelList.length > 0) {
        arr.push(
          ...receiveChannelList.map((channel) => ({
            Option: channel.channelName,
            value: channel.channelDescription,
          }))
        );
      }
      ms681.channelList.value = arr;
    },

    setTableData(tableData) {

      ms681.tableDataDictionary = {};

      if (Object.keys(tableData).length > 10) {

        ms681.totalPages.value = Math.ceil(Object.keys(tableData).length / 10);
        console.debug("Total Pages: ", ms681.totalPages);

        // ------------- DICTIONARY -------------------- //

        let keyIndex = 1;

        tableData.forEach((record) => {
          const key = `key${keyIndex}`;

          if (!ms681.tableDataDictionary[key]) {
            ms681.tableDataDictionary[key] = [];
          }

          ms681.tableDataDictionary[key].push(record);
          console.debug(ms681.tableDataDictionary[key].length);
          // Check if 5 records have been added, then move to the next key
          if (ms681.tableDataDictionary[key].length >= 10) {
            keyIndex += 1;
          }

        });

        console.debug("DICTIONARY: ", ms681.tableDataDictionary);
        const dataWithIds = ms681.tableDataDictionary['key1'].map((item, index) => ({
          id: index + 1,
          ...item,
        }));
        // ------------- DICTIONARY -------------------- //
        ms681.setDataWidthValues(dataWithIds);
      }
      else {
        const dataWithIds = tableData.map((item, index) => ({
          id: index + 1,
          ...item,
        }));

        ms681.setDataWidthValues(dataWithIds);

      }
      console.debug("Model: ", ms681.tableData.value);
    },

    setDataWidthValues(dataWithIds) {
      dataWithIds.forEach((item) => {
        // RequestedAt Field Formatting
        item.requestedAt = item.requestedAt;
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
        item.requestedAt = dateFormatter(formattedDate);

        // Issued On Date Field Formatting
        item.transactionRealizationDate = dateFormatter(item.transactionRealizationDate);

        // Download Date Field Formatting
        item.firstRequestDate = dateFormatter(item.firstRequestDate);

      });

      ms681.tableData.value = dataWithIds;
    },

    setPaginatedComponentValue(val) {
      ms681.tableDataDictionary = {};
      ms681.currentPage.value = val;
      ms681.currPage.value = val;
      ms681.selectedPage.value = val;
      ms681.totalPages.value = val;
    },

    setCurrPageValue(val) {
      ms681.currentPage.value = val;
      ms681.currPage.value = val;
      ms681.selectedPage.value = val;
    },

    setPagination(val) {
      if (val.totalRecord === 0) {
        ms681.totalPages = 1
        console.debug("TOTAL PAGES ", ms681.totalPages);
      }
      else {
        ms681.totalPages = Math.ceil(val.totalRecord / val.responsePageSize)
        console.debug("TOTAL PAGES IN ELSE CONDITIONS ", ms681.totalPages);
      }
    }

  }

  function changeOnRequestTypeId(...params) {
    ms681.channelDropDownIsVisible.value = params[0];
    ms681.identificationDocNumberIsVisible.value = params[1];
    ms681.identificationDocTypeIsVisible.value = params[2];
    ms681.identificationDocNumberIsDisable.value = params[3];

    ms681.fromDateIsVisible.value = params[4];
    ms681.toDateIsVisible.value = params[5];

    ms681.branchCodeIsVisible.value = params[6];
    ms681.transactionRadioBtnIsVisible.value = params[7];
    ms681.AccountNumberIsVisible.value = params[8];
    ms681.accountRadioBtnIsVisible.value = params[9];
  }

  function changeOnTransactionRadioDefaultValues(...params) {
    ms681.AccountNumberIsVisible.value = params[0];
    ms681.accountNumberTextBoxIsDisable.value = params[1];
    ms681.IBANNumberIsVisible.value = params[2];
    ms681.IBANNumberTextBoxIsDisable.value = params[3];
  }

  function transactionRadioButtonOnChange(...params) {
    ms681.AccountNumber.value = params[0];
    ms681.IBANNumberValue.value = params[1];
    ms681.AccountNumberIsVisible.value = params[2];
    ms681.accountNumberTextBoxIsDisable.value = params[3];
    ms681.IBANNumberIsVisible.value = params[4];
    ms681.IBANNumberTextBoxIsDisable.value = params[5];
    ms681.sprcTableIsVisible.value = params[6];
    ms681.reportsPaginationIsVisible.value = params[7];
    ms681.downloadBtnIsVisible.value = params[8];
    ms681.exitBtnIsVisible.value = params[9];

    megaset681Config.value.componentProps.TransactionRadioButton.radioGroup[0].tabIndex = params[10];
    megaset681Config.value.componentProps.TransactionRadioButton.radioGroup[1].tabIndex = params[11];

  }

  function modeofTransDropDownonChange(...params) {
    ms681.requestTypeId.value = params[0];
    ms681.idDocumentType.value = params[1];
    ms681.transactionRadioBtnIsVisible.value = params[2];
    ms681.branchCodeIsVisible.value = params[3];
    ms681.AccountNumberIsVisible.value = params[4];
    ms681.IBANNumberIsVisible.value = params[5];
    ms681.identificationDocTypeIsVisible.value = params[6];
    ms681.identificationDocNumberIsVisible.value = params[7];
    ms681.TransactionRadioDefaultValue.value = params[8];
    ms681.setTodayDate();
  }

  /// MegaSet661 - Config ///
  const megaset681Config = ref({
    selectedRow: "",

    screenTitle: 'Teller - ePRC Report',
    componentProps: {
      ModeofTransDropDown: {
        isDisabled: ref(false),
        isVisible: ref(true),
        inputColor: ref("black"),
        labelColor: ref("black"),
        spanInputs: ref(6),
        spanLabels: ref(5),
        ModeofTransList: ms681.ModeofTransList,
        defaultValue: ms681.modeDefaultValue,
      },
      TransactionRadioButton: {
        spanLabels: ref(5),
        isDisabled: ref(false),
        isVisible: ms681.transactionRadioBtnIsVisible,
        radioButtonValues: ms681.TransactionRadioDefaultValue,
        radioGroup: [{
          tabIndex: 0,
          label: "Account",
          value: "Account",
        }, {
          tabIndex: -1,
          label: "IBAN",
          value: "iban",
          leftMargin: 5
        },],
      },
      channelDropDown: {
        isVisible: ms681.channelDropDownIsVisible,
        isDisabled: ref(false),
        inputColor: ref("black"),
        labelColor: ref("black"),
        spanInputs: ref(6),
        spanLabels: ref(5),
        channelList: ms681.channelList,
        defaultValue: ms681.channelDefaultValue,

      },
      identificationDocType: {
        isDisabled: ref(false),
        isVisible: ms681.identificationDocTypeIsVisible,
        inputColor: ref("black"),
        labelColor: ref("black"),
        spanInputs: ref(6),
        spanLabels: ref(5),
        identifiedDocTypeVal: ms681.identityDocTypeList,
        defaultValue: ms681.IdentificationDocTypeDefaultValue,
      },
      branchCodeTextBox: {
        isVisible: ms681.branchCodeIsVisible,
        isDisabled: ref(false),
        inputColor: ref("black"),
        labelColor: ref("black"),
        spanInputs: ref(6),
        spanLabels: ref(5),
        branchCodeVal: ms681.branchCodeValue,
      },
      identificationDocNumberTextBox: {
        isVisible: ms681.identificationDocNumberIsVisible,
        isDisabled: ms681.identificationDocNumberIsDisable,
        inputColor: ref("black"),
        labelColor: ref("black"),
        spanInputs: ref(6),
        spanLabels: ref(5),
        inputLength: ms681.inputLength,
        identityDocNumberVal: ms681.IdentificationDocNoDefaultValue,
      },
      accountNumberTextBox: {
        label: "Account Number",
        isVisible: ms681.AccountNumberIsVisible,
        isDisabled: ms681.accountNumberTextBoxIsDisable,
        inputColor: ref("black"),
        labelColor: ref("black"),
        mandatory: ref(true),
        spanInputs: ref(6),
        spanLabels: ref(5),
        AccountNumber: ms681.AccountNumber,
        placeholder: "BBBB-AAAA-CCCCCC-RR-N",
      },
      ibanNumberTextBox: {
        label: "IBAN",
        isVisible: ms681.IBANNumberIsVisible,
        isDisabled: ms681.IBANNumberTextBoxIsDisable,
        inputColor: ref("black"),
        labelColor: ref("black"),
        spanInputs: ref(6),
        spanLabels: ref(5),
        IBANNumberValue: ms681.IBANNumberValue,
        placeholder: "PK00BAHL-0000-0000-0000-0000",
      },
      IBANTextBox: {
        label: "IBAN",
        isVisible: ms681.IBANNumberIsVisible,
        isDisabled: ms681.IBANNumberTextBoxIsDisable,
        inputColor: ref("black"),
        labelColor: ref("black"),
        spanInputs: ref(6),
        spanLabels: ref(5),
        IBANNumberValue: ms681.IBANNumberValue,
      },
      sprcNumberTextBox: {
        isVisible: ref(false),
        isDisabled: ref(false),
        inputColor: ref("black"),
        labelColor: ref("black"),
        mandatory: ref(true),
        sprcNumberVal: ref(""),
      },
      AccountRadioButton: {
        isDisabled: ref(false),
        isVisible: ms681.accountRadioBtnIsVisible,
        radioButtonValues: ms681.AccountRadioDefaultValue,
        radioGroup: [{
          label: "Request Date",
          value: "RequestDate",
        }, {
          label: "ePRC Number",
          value: "ePRCNumber",
        },],
      },
      sprcRadioButton: {
        isDisabled: ref(false),
        isVisible: ref(false),
        radioGroup: [{
          label: "Fiscal Year  ",
          value: "FiscalYear",
        }, {
          label: "SPRC Number",
          value: "SPRCNumber",
        },],
      },
      eprcRadioButton: {
        isDisabled: ref(false),
        isVisible: ms681.accountRadioBtnIsVisible,
        radioButtonValues: ms681.AccountRadioDefaultValue,
        radioGroup: [{
          label: "Request Date",
          value: "RequestDate",
        }, {
          label: "ePRC Number",
          value: "ePRCNumber",
        },],

      },
      fiscalYearDropDown: {
        isDisabled: ref(false),
        isVisible: ref(false),
        inputColor: ref("black"),
        labelColor: ref("black"),
        inputLength: ref(14),
        ficalYearList: ref([
          {
            Option: "testing",
            value: "testing",
          },
          {
            Option: "testing",
            value: "testing",
          },
        ]),
      },
      FromDatePicker: {
        isDisabled: false,
        isVisible: ms681.fromDateIsVisible,
        fromDate: ms681.fromDate,
        spanInputs: ref(8),
        spanLabels: ref(9),
        isDateDisabled: true,
      },
      ToDatePicker: {
        isDisabled: false,
        isVisible: ms681.toDateIsVisible,
        toDate: ms681.toDate,
        spanInputs: ref(8),
        spanLabels: ref(4),
        isDateDisabled: true,
      },
      eprcNumberTextBox: {
        isVisible: ms681.ePRCNumberIsVisible,
        isDisabled: ref(false),
        inputColor: ref("black"),
        labelColor: ref("black"),
        spanInputs: ref(6),
        spanLabels: ref(5),
        ePRCNumberValue: ms681.ePRCNumberValue,

      },
      SearchButton: {
        isDisabled: ref(false),
        isVisible: ref(true),
      },
      ClearButton: {
        isDisabled: ref(false),
        isVisible: ref(true),
      },
      BackButton: {
        isDisabled: ref(false),
        isVisible: ref(true),
      },
      DownloadButton: {
        isDisabled: ref(false),
        isVisible: ms681.downloadBtnIsVisible,
      },
      ExitButton: {
        isDisabled: ref(false),
        isVisible: ms681.exitBtnIsVisible,
      },
      ePRCTable: {
        isDisabled: ref(false),
        tabIndex: -1,
        showGridlines: true,
        isVisible: ms681.eprcTableIsVisible,
        tableColumns: [
          {
            prop: 'NameofRemitter',
            label: 'Name of Remitter',
            align: 'center',
            columnsWidth: '100%',
          },
          {
            prop: 'IBANAccountNumberofRemitter',
            label: 'IBAN/Account Number of Remitter',
            align: 'center',
            columnsWidth: '150%'
          },
          {
            prop: 'RemitterCountry',
            label: 'Remitter Country',
            align: 'center',
            columnsWidth: '150%'
          },
          {
            prop: 'PRCNo',
            label: 'PRC No.',
            align: 'center',
            columnsWidth: '150%'
          },
          {
            prop: 'DateofPRC',
            label: 'Date of PRC',
            align: 'center',
            columnsWidth: '150%'
          },
          {
            prop: 'AmountofRemittanceinPKR',
            label: 'Amount of Remittance in (PKR)',
            align: 'center',
            columnsWidth: '500%'
          },

        ],
        tableData: ms681.tableData,
      },
      sPRCTable: {
        isDisabled: ref(false),
        tabIndex: -1,
        showGridlines: true,
        tableHeight: ref("400px"),
        isVisible: ms681.sprcTableIsVisible,
        tableColumns: [
          {
            prop: 'prcNumber',
            label: 'PRC No',
            align: 'center',
            columnsWidth: '15'
          },
          {
            prop: 'createdBy',
            label: 'Issued By',
            align: 'center',
            columnsWidth: '10'
          },
          {
            prop: 'transactionRealizationDate',
            label: 'Issued On',
            align: 'center',
            columnsWidth: '10'
          },
          {
            prop: 'requestedAt',
            label: 'Requested At',
            align: 'center',
            columnsWidth: '10'
          },
          {
            prop: 'ipAddress',
            label: 'Requested IP',
            align: 'center',
            columnsWidth: '10'
          },
          {
            prop: 'firstRequestDate',
            label: 'Download Date',
            align: 'center',
            columnsWidth: '10'
          },
          {
            prop: 'notificationTypeName',
            label: 'Notification Type',
            align: 'center',
            columnsWidth: '10'
          },
          {
            prop: 'channelName',
            label: 'Channel',
            align: 'center',
            columnsWidth: '10'
          },

        ],
        tableData: ms681.tableData,
      },
      reportsPagination: {
        isVisible: ms681.reportsPaginationIsVisible,
        totalPages: ms681.totalPages,
        currentPage: ms681.currentPage,
        currPage: ms681.currPage,
        selectedPage: ms681.selectedPage,
        spanPreviousButton: 4,
        spanNextButton: 4,
        spanPagingDropDown: 3,
        spanPageNumberLabel: 3,
        spanPageLabel: 3,
      },
    }

  });

  /// MegaSet661 - Handlers ///
  const megaset681Handlers = {

    async "ExitButton-onClick"() {
      console.debug("Exit Button ");
      try {
        const res = await fsm.post("EXIT");
        console.debug("res", res);
        close(false);
      } catch (error) {
        helper.alert(error);
      }
    },

    "IbanBahlAlphaNumeric24-onBlur": ms681.setIBANNumber,
    "branchCodeTextBox-onBlur": ms681.setbranchCode,
    "ToDatePicker-onChange": ms681.setToDate,
    "FromDatePicker-onChange": ms681.setFromDate,
    "accountNumberTextBox-onBlur": ms681.setAccountNumber,
    "identificationDocNumberTextBox-onBlur": ms681.setIdentificationDocNumber,

    "TransactionRadioButton-onChange": (val) => {
      ms681.TransactionRadioDefaultValue.value = val;
      console.debug("ms681.TransactionRadioDefaultValue: ", ms681.TransactionRadioDefaultValue);

      if (ms681.TransactionRadioDefaultValue.value === "Account") {
        console.debug("INSIDE ACCOUNT SELECTEION")
        transactionRadioButtonOnChange("", "", true, false, false, true, false, false, false, false, 0, -1)
      }
      else if (ms681.TransactionRadioDefaultValue.value === "iban") {
        console.debug("INSIDE IBAN SELECTEION")
        transactionRadioButtonOnChange("", "", false, true, true, false, false, false, false, false, -1, 0)
      }
    },
    "ModeofTransDropDown-onChange": (val) => {
      ms681.modeDefaultValue.value = val; console.debug("ms681.modeDefaultValue: ", ms681.modeDefaultValue);

      console.debug("INSIDE MODE OF TRANS DROP DOWN selection")
      if (ms681.modeDefaultValue.value === "Cash Over Counter Transaction") {
        console.debug("when mode of transaction selected value is Cash Over Counter Transaction")
        modeofTransDropDownonChange(2, ms681.IdentificationDocTypeDefaultValue.value, false, false, false, false, true, true, ' ');
      }

      if (ms681.modeDefaultValue.value === "Account Transfer") {

        console.debug("when mode of transaction selected value is Account Transfer")
        ms681.clearState();
        modeofTransDropDownonChange(1, 0, true, true, true, false, false, false, " ");

        ms681.TransactionRadioDefaultValue.value = 'Account';

        megaset681Config.value.componentProps.TransactionRadioButton.radioGroup[0].tabIndex = 0;
        megaset681Config.value.componentProps.TransactionRadioButton.radioGroup[1].tabIndex = -1;
      }
    },

    "channelDropDown-onChange": (val) => {

      console.debug("Inside channel drop down selection")

      ms681.channelDefaultValue.value = val;

      ms681.dpChannel.value = ms681.channelDefaultValue.value;

      ms681.sprcTableIsVisible.value = false;
      ms681.reportsPaginationIsVisible.value = false;
      ms681.downloadBtnIsVisible.value = false;
      ms681.exitBtnIsVisible.value = false;



      if (ms681.channelDefaultValue.value === "Branch") {
        console.debug("when channel drop down selection value is Branch")
        ms681.dpChannel.value = channelEnum.Branch;
      }
      if (ms681.channelDefaultValue.value === "Internet") {
        console.debug("when channel drop down selection value is Internet")
        ms681.dpChannel.value = channelEnum.Internet;
      }
      if (ms681.channelDefaultValue.value === "Scheduler") {
        console.debug("when channel drop down selection value is Scheduler")
        ms681.dpChannel.value = channelEnum.Scheduler;
      }

    },
    "identificationDocType-onChange": (val) => {

      console.debug("ms681.IdentificationDocTypeDefaultValue: ", ms681.IdentificationDocTypeDefaultValue);
      ms681.IdentificationDocTypeDefaultValue.value = val;

      ms681.sprcTableIsVisible.value = false;
      ms681.reportsPaginationIsVisible.value = false;
      ms681.downloadBtnIsVisible.value = false;
      ms681.exitBtnIsVisible.value = false;

      ms681.IdentificationDocNoDefaultValue.value = "";
      ms681.identificationDocNumberIsDisable.value = false;


      if (ms681.IdentificationDocTypeDefaultValue.value === "ARC" ||
        ms681.IdentificationDocTypeDefaultValue.value === "POR" ||
        ms681.IdentificationDocTypeDefaultValue.value === "POC") {
        ms681.inputLength.value = 20;
      }

      if (ms681.IdentificationDocTypeDefaultValue.value === "CNIC" ||
        ms681.IdentificationDocTypeDefaultValue.value === "NICOP") {
        ms681.inputLength.value = 13;
      }

      if (ms681.IdentificationDocTypeDefaultValue.value === "PASSPORT") {
        ms681.inputLength.value = 13;
      }

      if (ms681.IdentificationDocTypeDefaultValue.value === "NTN-AJK") {
        ms681.inputLength.value = 11
      }
      if (ms681.IdentificationDocTypeDefaultValue.value === "NTN") {
        ms681.inputLength.value = 8;
      }
    },

    /**
     * Set tableData from tableDataDictionary on Pagination changing event
    */
    async "onPagination-currentPage"(val) {
      try {
        console.debug("pagination value: ", val, "\n Table Data by Key", ms681.tableDataDictionary[`key${val}`]);

        const dataWithIds = ms681.tableDataDictionary[`key${val}`].map((item, index) => ({
          id: index + 1,
          ...item,
        }));

        ms681.setDataWidthValues(dataWithIds);

      } catch (error) {
        console.debug("Error in Pagination Catch Block: ", error);
        helper.alert(error, 'Error');
      }
    },

    async "ClearButton-onClick"() {
      console.debug("Clear Button Click ")
      try {
        ms681.clearState();
      } catch (error) {
        helper.alert(error)
      }
    },

    async "BackButton-onClick"() {
      console.debug("Back Button Click")
      try {
        const res = await fsm.post("BACK");
        console.debug("res", res);
        close(false);
      } catch (error) {
        helper.alert(error)
      }
    },

    async "SearchButton-onClick"() {
      console.debug("Check Validation on Mandatory Fields")

      ms681.setPaginatedComponentValue(1);

      if (ms681.requestTypeId.value === "") {
        console.debug("inside when mode of transaction field is not selected");
        helper.alert("Please Select Mode of Transaction");
        return;
      }

      if (ms681.modeDefaultValue.value === "Account Transfer" &&
        ((ms681.TransactionRadioDefaultValue.value === "Account" && ms681.AccountNumber.value == "") ||
          (ms681.TransactionRadioDefaultValue.value === "iban" && ms681.IBANNumberValue.value == ""))) {
        console.debug("inside Account Transfer Transaction");
        helper.alert("Please Enter Account/IBAN Number");
        return;
      }
      else {

        console.debug("RequestDate Check")
        console.debug("when mode of transaction by default value : ", ms681.modeDefaultValue.value);

        if (ms681.requestTypeId.value === 2) {

          if (ms681.IdentificationDocTypeDefaultValue.value === "") {
            console.debug("when identitfication document type is not selected ");
            helper.alert("Document Type is mandatory");
            return;
          }

          if (ms681.IdentificationDocNoDefaultValue.value === "") {
            console.debug("when identitfication document number is not entered ");
            helper.alert("Document Number is mandatory");
            return;
          }
        }

        console.debug("When All Mandatory Fields are seleteced --- Change State")
        if ((ms681.fromDate.value === null) && (ms681.toDate.value === null)) {
          console.debug("when from Date and to Date is null");
          helper.alert("Please Select Date Ranges")
          return;
        }

        if (ms681.fromDate.value === null) {
          console.debug("when from Date is null");
          helper.alert("Please Select From Date ")
          return;
        }

        if (ms681.toDate.value === null) {
          console.debug("when to Date is null");
          helper.alert("Please Select To Date ")
          return;
        }

        if (((ms681.fromDate.value != "") && (ms681.toDate.value != ""))) {
          console.debug("Changing State")

          console.debug("INSIDE IF OF DATE CHECKER")
          const startDate = convertedDate(ms681.fromDate.value);
          const endDate = convertedDate(ms681.toDate.value);

          console.debug("START DATE : ", startDate);
          console.debug("END DATE : ", endDate);


          if (startDate > endDate) {
            helper.alert("From Date cannot be greater than To Date")
            return;
          }
          else if (endDate < startDate) {
            helper.alert("End date cannot be less than start date")
            return;
          }

          const numberOfDaysInYear = 90;

          if (leapYearChecker(startDate) === true ||
            leapYearChecker(endDate) === true) {
            numberOfDaysInYear++;
          }

          console.debug("numberOfDaysInYear : ", numberOfDaysInYear);


          const timeDifference1 = new Date(endDate).getTime() - new Date(startDate).getTime();
          const daysDifference = timeDifference1 / (1000 * 60 * 60 * 24);

          console.debug("timeDifference1 : ", timeDifference1);
          console.debug("daysDifference : ", daysDifference);

          if (daysDifference >= numberOfDaysInYear) {
            helper.alert("The Difference Between Date From and Date To Should be less than 3 months");
            return;
          }

          if (ms681.AccountNumber.value != "") {

            if (ms681.AccountNumber.value.length == 17 || ms681.AccountNumber.value.length == 21) {
              console.debug("WHEN ACCOUNT NUMBER IS GIVEN: ", ms681.AccountNumber);
              ms681.wlAccountNo.value = ms681.AccountNumber.value;
            }
            else {
              helper.alert("Please Enter Valid Account Number")
              return;
            }
          }

          if (ms681.IBANNumberValue.value != "") {
            // ms681.IBANNumberValue.value = ms681.IBANNumberValue.value;
            if (ms681.IBANNumberValue.value.length == 28) {
              console.debug("WHEN IBAN NUMBER IS GIVEN: ", ms681.IBANNumberValue);
              ms681.wlAccountNo.value = ms681.IBANNumberValue.value.substring(8, 24);
              console.debug("WHEN WL Account IS GIVEN: ", ms681.wlAccountNo);
            }
            else {
              helper.alert("Please Enter Valid IBAN Number")
              return;
            }

          }

          const request = {
            certificateTypeId: 2,
            requestTypeId: ms681.requestTypeId.value,
            accountNumber: removeHyphens(ms681.AccountNumber.value),
            iban: removeHyphens(ms681.IBANNumberValue.value),
            idDocumentType: ms681.identificationEnum.value ? ms681.identificationEnum.value : 0,
            idDocumentNumber: ms681.IdentificationDocNoDefaultValue.value,
            email: "",
            mobileNumber: "",
            prcNumber: ms681.ePRCNumberValue.value,
            requestDateFrom: convertedDate(ms681.fromDate.value),
            requestDateTo: convertedDate(ms681.toDate.value),
            channelId: ms681.dpChannel.value ? ms681.dpChannel.value : 0,
            ipAddress: ms681.ipAddress.value,
            isActive: 1,
            createdBy: ms681.createdBy.value,
            createdDate: ms681.createdDate.value,
            createdTime: convertedTime(),
            sprcNo: "",
            fiscalYear: "",
            wlAccountNo: removeHyphens(ms681.wlAccountNo.value),
            idenityNumberType: ms681.IdentificationDocTypeDefaultValue.value,
            targetBranchCode: ms681.branchCodeValue.value ? ms681.branchCodeValue.value : 0,
          };

          console.debug("Searching Request Payload from Front-end : \n", request);

          try {
            let res = {};
            res = await fsm.post('SEARCH', { request });
            console.debug("responswe from FSm", res);
            console.debug("receivePostRequest: ", res.receivePostRequest);
            if (res.receivePostRequest.mBoolean == false) {
              helper.alert("EPRC 201: No Record found against the provided search parameters", 'Error');
            }
            else if (res) {
              console.debug("Result Data : ", res);
              let filteredData = '';
              if (ms681.requestTypeId.value === 1) {
                filteredData = res.records.filter(x => x.applicationSource.trim() !== "COC");
              }

              if (ms681.requestTypeId.value === 2) {
                filteredData = res.records.filter(x => x.applicationSource.trim() == "COC");
              }

              if (filteredData.length > 0) {
                ms681.setTableData(filteredData);
                ms681.changeState();
              }
              else {
                helper.alert("EPRC 201: No Record found against the provided search parameters", 'Error');
              }
            }

          } catch (error) {
            const errorMessage = error;
            console.debug("Error in onSubmit Catch Block: ", errorMessage);
            helper.alert("EPRC 201: No Record found against the provided search parameters", 'Error');
            ms681.sprcTableIsVisible.value = false;
            ms681.downloadBtnIsVisible.value = false;
            ms681.exitBtnIsVisible.value = false;
            ms681.reportsPaginationIsVisible.value = false;
          }

        }
        else {
          if ((ms681.fromDate.value === "") && (ms681.toDate.value === "")) {
            helper.alert("Please select Date Ranges");
            return;
          }
          if (ms681.fromDate.value === "" && ms681.toDate.value != "") {
            helper.alert("Please select From Date");
            return;
          }
          if (ms681.toDate.value === "" && ms681.fromDate.value != "") {
            helper.alert("Please select To Date");
            return;
          }

          else {
            helper.alert("Input All Mandatory Fields Which Are Marked With *");
            return;
          }
        }
      }


    },
  };
  // UseCase Views
  const views = [
    {
      name: "MegaSet681",
      title: megaset681Config.value.screenTitle,
      component: MegaSet681,
      props: { configObj: megaset681Config },
      handlers: megaset681Handlers,
    },
  ];
  // UseCase View Manager
  const { activateView, close, render, activeView, $refs } =
    useUseCaseViewManager(
      hocConfig,
      views,
      onInitialized,
      onError,
      "MegaSet681"
    );
  // On UseCase Initialized
  function onInitialized(MegaSet681) {

    ms681.createdDate.value = header.loginBranchDate;
    ms681.createdBy.value = header.loginUserId;
    ms681.ipAddress.value = header.loginUserIp;

    ms681.setModeOfTranList(MegaSet681.receiveTranModeList);
    ms681.setChannelList(MegaSet681.receiveChannelList);
    ms681.setidentificationDocType(MegaSet681.listOfStatus);
    ms681.setTodayDate();
    activateView("MegaSet681");
  }
  // On UseCase (Initialize / Dispose) Error
  function onError(error, source) {
    helper.alert(error, `${source} - Error`);
  }
  // Return render function
  return render;
}
// Define UseCase HOC
const TLR_EPRC_SPRC_INQ_UC3_RPT_EPRC = defineUseCaseComponent(hocName, hocSetup);
// Define UseCase HOC - Loader
const UseCaseLoader = defineUseCaseLoader(hocName, hocSetup);
export default UseCaseLoader
