*
* @version 0.0.1
*/
<template>
  <Form as="el-form" @submit="onSubmit">
    <el-row>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="23" :md="23">
        <AgentNameTextBox
          @GenericTextBox-onBlur="
            (val) => {
              $emit('AgentNameTextBox-onBlur', val);
            }
          "
          v-bind="{ ...AgentNameTextBox, ...configObject.AgentNameTextBox }"
          :values="configObject.AgentNameTextBox.AgentName"
          ref="RefAgentNameTextBox"
          name="AgentNameTextBox"
          v-if="configObject.AgentNameTextBox.isVisible"
        />
      </el-col>
    </el-row>

    <el-row>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="23" :md="23">
        <AgentTypeDropDown
          @GenericDropDown-onChange="
            (val) => {
              $emit('AgentTypeDropDown-onChange', val);
            }
          "
          v-bind="{ ...AgentTypeDropDown, ...configObject.AgentTypeDropDown }"
          :values="configObject.AgentTypeDropDown.AgentTypeDropDownList"
          ref="RefAgentTypeDropDown"
          name="AgentTypeDropDown"
          v-if="configObject.AgentNameTextBox.isVisible"
        />
      </el-col>
    </el-row>
    
    <el-row>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="23" :md="23">
        <ModeofTransDropDown @GenericDropDown-onChange="(val) => {
      $emit('ModeofTransDropDown-onChange', val);
    }
    " v-bind="{
    ...ModeofTransDropDown,
    ...configObject.ModeofTransDropDown,
  }" :values="configObject.ModeofTransDropDown.ModeofTransList" name="ModeofTransDropDown"
          ref="RefModeofTransDropDown" v-if="configObject.ModeofTransDropDown.isVisible" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="23" :md="23">
        <channelDropDown @GenericDropDown-onChange="(val) => {
      $emit('channelDropDown-onChange', val);
    }
    " v-bind="{ ...channelDropDown, ...configObject.channelDropDown }"
          :values="configObject.channelDropDown.channelList" name="channelDropDown" ref="RefchannelDropDown"
          v-if="configObject.channelDropDown.isVisible" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="23" :md="23">
        <branchCodeTextBox @BranchCodeNumeric4-onBlur="(val) => {
      $emit('branchCodeTextBox-onBlur', val);
    }
    " v-bind="{ ...branchCodeTextBox, ...configObject.branchCodeTextBox }"
          :values="configObject.branchCodeTextBox.branchCodeVal" ref="RefbranchCodeTextBox" name="branchCodeTextBox"
          v-if="configObject.branchCodeTextBox.isVisible" />
      </el-col>
    </el-row>

    <el-row>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="23" :md="23">
        <TransactionRadioButton @GenericRadioButton-onChange="(val) => {
      $emit('TransactionRadioButton-onChange', val);
    }
    " :values="configObject.TransactionRadioButton.radioButtonValues" name="TransactionRadioButton"
          ref="RefTransactionRadioButton" v-bind="{
    ...TransactionRadioButton,
    ...configObject.TransactionRadioButton,
  }" v-if="configObject.TransactionRadioButton.isVisible" />
      </el-col>
    </el-row>

    <el-row>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="23" :md="23">
        <identificationDocType @GenericDropDown-onChange="(val) => {
      $emit('identificationDocType-onChange', val);
    }
    " v-bind="{
    ...identificationDocType,
    ...configObject.identificationDocType,
  }" :values="configObject.identificationDocType.identifiedDocTypeVal" name="identificationDocType"
          ref="RefidentificationDocType" v-if="configObject.identificationDocType.isVisible" />
      </el-col>
    </el-row>

    <el-row>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="23" :md="23">
        <identificationDocNumberTextBox @GenericTextBox-onBlur="(val) => {
      $emit('identificationDocNumberTextBox-onBlur', val);
    }
    " v-bind="{
    ...identificationDocNumberTextBox,
    ...configObject.identificationDocNumberTextBox,
  }" :values="configObject.identificationDocNumberTextBox.identityDocNumberVal
    " ref="RefidentificationDocNumberTextBox" name="identificationDocNumberTextBox"
          v-if="configObject.identificationDocNumberTextBox.isVisible" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="23" :md="23">
        <accountNumberTextBox @AccountNumberNumericDashes21-onBlur="(val) => {
      $emit('accountNumberTextBox-onBlur', val);
    }
    " v-bind="{
    ...accountNumberTextBox,
    ...configObject.accountNumberTextBox,
  }" :values="configObject.accountNumberTextBox.AccountNumber" ref="RefaccountNumberTextBox"
          name="accountNumberTextBox" v-if="configObject.accountNumberTextBox.isVisible" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="23" :md="23">
        <ibanNumberTextBox @IbanBahlAlphaNumeric24-onBlur="(val) => {
      $emit('IbanBahlAlphaNumeric24-onBlur', val);
    }
    " v-bind="{ ...ibanNumberTextBox, ...configObject.ibanNumberTextBox }"
          :values="configObject.ibanNumberTextBox.IBANNumberValue" ref="RefibanNumberTextBox" name="ibanNumberTextBox"
          v-if="configObject.ibanNumberTextBox.isVisible" />
      </el-col>
    </el-row>

    <el-row>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="23" :md="23">
        <sprcRadioButton @GenericRadioButton-onChange="(val) => {
      $emit('sprcRadioButton-onChange', val);
    }
    " :values="configObject.sprcRadioButton.radioButtonValues" name="sprcRadioButton" ref="RefsprcRadioButton"
          v-bind="{ ...sprcRadioButton, ...configObject.sprcRadioButton }"
          v-if="configObject.sprcRadioButton.isVisible" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="23" :md="23">
        <eprcRadioButton @GenericRadioButton-onChange="(val) => {
      $emit('eprcRadioButton-onChange', val);
    }
    " :values="configObject.eprcRadioButton.radioButtonValues" name="eprcRadioButton" ref="RefeprcRadioButton"
          v-bind="{ ...eprcRadioButton, ...configObject.eprcRadioButton }"
          v-if="configObject.eprcRadioButton.isVisible" />
      </el-col>
    </el-row>

    <el-row>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="23" :md="23">
        <eprcNumberTextBox @GenericTextBox-onBlur="(val) => {
      $emit('eprcNumberTextBox-onBlur', val);
    }
    " v-bind="{ ...eprcNumberTextBox, ...configObject.eprcNumberTextBox }"
          :values="configObject.eprcNumberTextBox.ePRCNumberValue" ref="RefeprcNumberTextBox" name="eprcNumberTextBox"
          v-if="configObject.eprcNumberTextBox.isVisible" />
      </el-col>
    </el-row>
    <!-- From Date and To Date Text Box -->
    <el-row>
      <el-col :lg="1" :md="1"> </el-col>
      <el-col :lg="10" :md="10">
        <FromDatePicker @GenericDatePicker-onChange="(val) => {
      $emit('FromDatePicker-onChange', val);
    }
    " v-bind="{ ...FromDatePicker, ...configObject.FromDatePicker }"
          :values="configObject.FromDatePicker.fromDate" name="FromDatePicker" ref="RefFromDatePicker"
          v-if="configObject.FromDatePicker.isVisible" />
      </el-col>
      <el-col :lg="1" :md="1"> </el-col>
      <el-col :lg="10" :md="10">
        <ToDatePicker @GenericDatePicker-onChange="(val) => {
      $emit('ToDatePicker-onChange', val);
    }
    " v-bind="{ ...ToDatePicker, ...configObject.ToDatePicker }" :values="configObject.ToDatePicker.toDate"
          name="ToDatePicker" ref="RefToDatePicker" v-if="configObject.ToDatePicker.isVisible" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="23" :md="23">
        <fiscalYearDropDown @GenericDropDown-onChange="(val) => {
      $emit('fiscalYearDropDown-onChange', val);
    }
    " v-bind="{ ...fiscalYearDropDown, ...configObject.fiscalYearDropDown }"
          :values="configObject.fiscalYearDropDown.ficalYearList" name="fiscalYearDropDown" ref="ReffiscalYearDropDown"
          v-if="configObject.fiscalYearDropDown.isVisible" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="23" :md="23">
        <sprcNumberTextBox @GenericTextBox-onBlur="(val) => {
      $emit('sprcNumberTextBox-onBlur', val);
    }
    " v-bind="{ ...sprcNumberTextBox, ...configObject.sprcNumberTextBox }"
          :values="configObject.sprcNumberTextBox.sprcNumberVal" ref="RefsprcNumberTextBox" name="sprcNumberTextBox"
          v-if="configObject.sprcNumberTextBox.isVisible" />
      </el-col>
    </el-row>

    <el-row>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="2" :md="2">
        <ClearButton @GenericButton-onClick="$emit('ClearButton-onClick')" name="ClearButton" ref="RefClearButton"
          v-bind="{ ...ClearButton, ...configObject.ClearButton }" v-if="configObject.SearchButton.isVisible" />
      </el-col>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="2" :md="2">
        <AddButton @GenericButton-onClick="$emit('AddButton-onClick')" name="AddButton" ref="RefAddButton"
          v-bind="{ ...AddButton, ...configObject.AddButton }" v-if="configObject.SearchButton.isVisible" />
      </el-col>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="2" :md="2">
        <SearchButton @GenericButton-onClick="$emit('SearchButton-onClick')" name="SearchButton" ref="RefSearchButton"
          v-bind="{ ...SearchButton, ...configObject.SearchButton }" v-if="configObject.SearchButton.isVisible" />
      </el-col>
      <el-col :lg="4" :md="4"></el-col>
      <el-col :lg="2" :md="2">
        <BackButton @GenericButton-onClick="$emit('BackButton-onClick')" name="BackButton" ref="RefExitButton"
          v-bind="{ ...BackButton, ...configObject.BackButton }" v-if="configObject.BackButton.isVisible" />
      </el-col>
    </el-row>
    <br />

    <el-row>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="21" :md="21">
        <ePRCTable name="ePRCTable" @GenericSortableTableView-onCurrentRow="(val) => {
      $emit('ePRCTable-onCurrentRow', val);
    }
    " @GenericSortableTableView-onClickRow="(val) => {
      $emit('ePRCTable-onClick', val);
    }
    " v-bind="{ ...ePRCTable, ...configObject.ePRCTable }" v-if="configObject.ePRCTable.isVisible" />
      </el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="21" :md="21">
        <sPRCTable name="sPRCTable" @GenericSortableTableView-onCurrentRow="(val) => {
      $emit('sPRCTable-onCurrentRow', val);
    }
    " @GenericSortableTableView-onClickRow="(val) => {
      $emit('sPRCTable-onClick', val);
    }
    " v-bind="{ ...sPRCTable, ...configObject.sPRCTable }" v-if="configObject.sPRCTable.isVisible" />
      </el-col>
    </el-row>



    <el-row>
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="2" :md="2">
        <DownloadButton @GenericButton-onClick="$emit('DownloadButton-onClick')" name="DownloadButton"
          ref="RefDownloadButton" v-bind="{ ...DownloadButton, ...configObject.DownloadButton }"
          v-if="configObject.DownloadButton.isVisible" />
      </el-col>
      <el-col :lg="16" :md="16">
        <reportsPagination @onPagination-currentPage="(val) => {
      $emit('onPagination-currentPage', val);
    }
    " name="reportsPagination" ref="RefReportsPagination"
          v-bind="{ ...reportsPagination, ...configObject.reportsPagination }"
          v-if="configObject.reportsPagination.isVisible" />
      </el-col>
      <!-- <el-col :lg="1" :md="2"></el-col> -->
      <el-col :lg="1" :md="1"></el-col>
      <el-col :lg="2" :md="2">
        <ExitButton @GenericButton-onClick="$emit('ExitButton-onClick')" name="ExitButton" ref="RefExitButton"
          v-bind="{ ...ExitButton, ...configObject.ExitButton }" v-if="configObject.ExitButton.isVisible" />
      </el-col>
      <el-col :lg="1" :md="1"></el-col>
    </el-row>
  </Form>
</template>

<script>
import { reactive, ref } from "vue";
import { Form, useForm } from "vee-validate";
import {
  GenericTextBox as AgentNameTextBox,
  GenericDropDown as AgentTypeDropDown,
  GenericDropDown as ModeofTransDropDown,
  GenericDropDown as channelDropDown,
  GenericDropDown as identificationDocType,
  GenericDropDown as fiscalYearDropDown,
  BranchCodeNumeric4 as branchCodeTextBox,
  GenericTextBox as identificationDocNumberTextBox,
  AccountNumberNumericDashes21 as accountNumberTextBox,
  IbanBahlAlphaNumeric24 as ibanNumberTextBox,
  GenericTextBox as eprcNumberTextBox,
  GenericTextBox as sprcNumberTextBox,
  GenericRadioButton as TransactionRadioButton,
  GenericRadioButton as sprcRadioButton,
  GenericRadioButton as eprcRadioButton,
  GenericDatePicker as FromDatePicker,
  GenericDatePicker as ToDatePicker,
  GenericButton as ClearButton,
  GenericButton as AddButton,
  GenericButton as SearchButton,
  GenericButton as BackButton,
  GenericButton as DownloadButton,
  GenericButton as ExitButton,
  GenericSortableTableView as ePRCTable,
  GenericSortableTableView as sPRCTable,
  GenericPaginationComponent as reportsPagination,
} from "@teresol-v2/ui-components";
export default {
  name: "MegaSet681",
  components: {
    Form,
    AgentNameTextBox,
    AgentTypeDropDown,
    AddButton,
    ModeofTransDropDown,
    channelDropDown,
    identificationDocType,
    fiscalYearDropDown,
    branchCodeTextBox,
    identificationDocNumberTextBox,
    accountNumberTextBox,
    ibanNumberTextBox,
    eprcNumberTextBox,
    sprcNumberTextBox,
    TransactionRadioButton,
    sprcRadioButton,
    eprcRadioButton,
    FromDatePicker,
    ToDatePicker,
    ClearButton,
    SearchButton,
    BackButton,
    DownloadButton,
    ExitButton,
    ePRCTable,
    sPRCTable,
    reportsPagination,
  },
  props: {
    configObj: {},
  },
  setup(props, { emit }) {
    useForm();
    function onSubmit(values) {
      emit("onSubmit", values);
    }
    const configObject = reactive({
      ...props.configObj.componentProps,
    });

    return {
      onSubmit,
      configObject,
      // FieldSetLabel: {
      //   label: "ALHABIB BANKING SYSTEM",
      //   isVisible: false,
      // },
      ModeofTransDropDown: {
        labelFontWeight: "bold",
        isVisible: true,
        dropDownLabel: "Mode of Transaction *",
        spanInputs: ref(6),
        spanLabels: ref(4),
        placeholder: "Account Transfer",
        dataType: "String",
        backgroundColor: "white",
        mandatory: true,
      },
      channelDropDown: {
        labelFontWeight: "bold",
        isVisible: true,
        dropDownLabel: "Channel",
        spanInputs: ref(6),
        spanLabels: ref(4),
        dataType: "String",
        backgroundColor: "white",
        ModeofTransList: [
          {
            Option: "Account Transfer",
            value: "Account Transfer",
          },
          {
            Option: "Cash Over Counter Transaction",
            value: "Cash Over Counter Transaction",
          },
        ],
      },
      identificationDocType: {
        labelFontWeight: "bold",
        isVisible: true,
        dropDownLabel: "Identification Document Type *",
        spanInputs: ref(6),
        spanLabels: ref(6),
        inputLength: ref(17),
        dataType: "String",
        backgroundColor: "white",
        defaultValue: "select",
        colorinput: "grey",
        colorLabel: "black",
      },
      fiscalYearDropDown: {
        labelFontWeight: "bold",
        isVisible: true,
        dropDownLabel: "Fiscal Year *",
        spanInputs: ref(6),
        spanLabels: ref(6),
        placeholder: "-----select-----",
        dataType: "String",
        backgroundColor: "white",
      },
      branchCodeTextBox: {
        isVisible: true,
        labelFontWeight: "bold",
        label: "Branch Code",
        spanInputs: ref(3),
        spanLabels: ref(4),
        backgroundColor: "white",
        inputLength: ref(10),
        dataType: "String",
      },
      identificationDocNumberTextBox: {
        isVisible: true,
        labelFontWeight: "bold",
        label: "Identification Document Number *",
        spanInputs: ref(6),
        spanLabels: ref(6),
        backgroundColor: "white",
        inputLength: ref(17),
        dataType: "String",
      },
      AgentNameTextBox: {
        labelFontWeight: "bold",
        isVisible: true,
        spanInputs: ref(6),
        spanLabels: ref(6),
        inputLength: ref(17),
        dataType: "String",
        backgroundColor: "white",
        defaultValue: "select",
        colorinput: "grey",
        colorLabel: "black",
      },
      AgentTypeDropDown: {
        labelFontWeight: "bold",
        isVisible: true,
        spanInputs: ref(6),
        spanLabels: ref(6),
        inputLength: ref(17),
        dataType: "String",
        backgroundColor: "white",
        defaultValue: "select",
        colorinput: "grey",
        colorLabel: "black",
      },
      accountNumberTextBox: {
        labelFontWeight: "bold",
        label: "Account Number *",
        spanInputs: ref(6),
        spanLabels: ref(4),
        backgroundColor: "white",
        inputLength: ref(10),
        dataType: "numericDashes",
      },

      ibanNumberTextBox: {
        isVisible: true,
        labelFontWeight: "bold",
        label: "IBAN *",
        spanInputs: ref(6),
        spanLabels: ref(4),
        backgroundColor: "white",
        inputLength: ref(10),
        dataType: "alphaNumericSpecial",
      },
      eprcNumberTextBox: {
        isVisible: true,
        labelFontWeight: "bold",
        label: "ePRC Number *",
        spanInputs: ref(6),
        spanLabels: ref(4),
        backgroundColor: "white",
        inputLength: ref(31),
        dataType: "String",
      },
      sprcNumberTextBox: {
        isVisible: true,
        labelFontWeight: "bold",
        label: "SPRC Number *",
        spanInputs: ref(6),
        spanLabels: ref(4),
        backgroundColor: "white",
        inputLength: ref(10),
        dataType: "String",
      },
      TransactionRadioButton: {
        isVisible: true,
        // radioLabel: "SPRC Number",
        spanInputs: ref(10),
        spanLabels: ref(4),
        labelFontWeight: "bold",
        dataType: "String",
        backgroundColor: "white",
      },
      sprcRadioButton: {
        isVisible: true,
        spanInputs: ref(10),
        spanLabels: ref(4),
        dataType: "String",
        backgroundColor: "white",
      },
      eprcRadioButton: {
        isVisible: true,
        spanInputs: ref(10),
        spanLabels: ref(4),
        dataType: "String",
        backgroundColor: "white",
      },
      FromDatePicker: {
        isVisible: true,
        labelFontWeight: "bold",
        datePickerLabel: "Date From *",
        // spanInputs: 12,
        // spanLabels: 11,
        spanInputs: ref(10),
        spanLabels: ref(14),
      },
      ToDatePicker: {
        isVisible: true,
        labelFontWeight: "bold",
        datePickerLabel: ref("Date To *"),
        spanInputs: ref(10),
        spanLabels: ref(4),
      },
      SearchButton: {
        isVisible: true,
        nativeType: ref("button"),
        spanInputs: ref(24),
        label: ref("Search"),
      },
      ClearButton: {
        isVisible: true,
        nativeType: ref("button"),
        spanInputs: ref(24),
        label: ref("Clear"),
        backgroundColor: "white",
      },
      BackButton: {
        isVisible: true,
        nativeType: ref("button"),
        spanInputs: ref(24),
        label: ref("Back"),
      },
      DownloadButton: {
        isVisible: true,
        nativeType: ref("button"),
        spanInputs: ref(24),
        label: ref("Download"),
      },
      ExitButton: {
        isVisible: true,
        nativeType: ref("button"),
        spanInputs: ref(24),
        label: ref("Exit"),
      },
      AddButton: {
        isVisible: true,
        nativeType: ref("button"),
        spanInputs: ref(24),
        label: ref("Add"),
        backgroundColor: "white",
      },
      ePRCTable: {
        isVisible: true,
        spanLabel: ref(0),
        spanInput: ref(24),
        tableWidth: ref("100"),
        tableHeight: ref("300"),
        isVisible: true,
        tabIndex: -1,
        labelColor: "green",
        showGridlines: true,
        tableColumns: [
          {
            prop: "Name of Remitter",
            label: "Name of Remitter",
            align: "center",
            columnsWidth: "100",
          },
          {
            prop: "IBAN/Account Number of Remitter",
            label: "IBAN/Account Number of Remitter",
            align: "center",
            columnsWidth: "150",
          },
          {
            prop: "Remitter Country",
            label: "Remitter Country",
            align: "center",
            columnsWidth: "150",
          },
          {
            prop: "PRC No.",
            label: "PRC No.",
            align: "center",
            columnsWidth: "150",
          },
          {
            prop: "Date of PRC",
            label: "Date of PRC",
            align: "center",
            columnsWidth: "150",
          },
          {
            prop: "Amount of Remittance in (PKR)",
            label: "Amount of Remittance in (PKR)",
            align: "center",
            columnsWidth: "10",
          },
        ],
        tableData: [
          {
            AgentName: "Zohaib",
            ReferenceNumber: "Kashish",
            StatusFrom: "Wali",
            StatusTo: "Talha",
            UserID: "Irma",
            UpdateDate: "Abdullah",
            Remarks: "Touseef",
          },
          {
            AgentName: "Wlai",
            ReferenceNumber: "Kashish",
            StatusFrom: "Wali",
            StatusTo: "Talha",
            UserID: "Irma",
            UpdateDate: "Abdullah",
            Remarks: "Touseef",
          },
        ],
      },
      sPRCTable: {
        isVisible: true,
        spanLabel: ref(0),
        spanInput: ref(24),
        tableWidth: ref("100"),
        tableHeight: ref("300"),
        isVisible: true,
        tabIndex: -1,
        showGridlines: true,
        tableColumns: [
          {
            prop: "Download PRC",
            label: "Download PRC",
            align: "center",
            columnsWidth: "100%",
          },
          {
            prop: "Name of Remitter",
            label: "Name of Remitter",
            align: "center",
            columnsWidth: "100%",
          },
          {
            prop: "IBAN/Account Number of Remitter",
            label: "IBAN/Account Number of Remitter",
            align: "center",
            columnsWidth: "150%",
          },
          {
            prop: "Remitter Country",
            label: "Remitter Country",
            align: "center",
            columnsWidth: "150%",
          },
          {
            prop: "PRC No.",
            label: "PRC No.",
            align: "center",
            columnsWidth: "150%",
          },
          {
            prop: "Date of PRC",
            label: "Date of PRC",
            align: "center",
            columnsWidth: "150%",
          },
          {
            prop: "Amount of Remittance in (PKR)",
            label: "Amount of Remittance in (PKR)",
            align: "center",
            columnsWidth: "10%",
          },
        ],
        tableData: [
          {
            AgentName: "Zohaib",
            ReferenceNumber: "Kashish",
            StatusFrom: "Wali",
            StatusTo: "Talha",
            UserID: "Irma",
            UpdateDate: "Abdullah",
            Remarks: "Touseef",
          },
          {
            AgentName: "Wlai",
            ReferenceNumber: "Kashish",
            StatusFrom: "Wali",
            StatusTo: "Talha",
            UserID: "Irma",
            UpdateDate: "Abdullah",
            Remarks: "Touseef",
          },
        ],
      },
      reportsPagination: {
        isVisible: true,
        totalPages: 300,
        currentPage: 1,
        currPage: 1,
        selectedPage: 1,
        spanPreviousButton: 3,
        spanNextButton: 3,
        spanPagingDropDown: 3,
        spanPageNumberLabel: 3,
        spanPageLabel: 3,
      },
    };
  },
};
</script>
