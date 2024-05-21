<template>
  <Form as="el-form">
    <!-- <div style="text-align: center"><h2>Slip Print</h2></div> -->
    <GenericRadioButton
      @GenericRadioButton-onChange="
        (val) => {
          $emit('DialogRadioButton-onChange', val);
        }
      "
      :radioGroup="radioGroup"
      :values="selectedValues"
      :spanInputs="20"
      :spanLabels="4"
      name="DialogRadioButton"
      :marginRight="10"
    ></GenericRadioButton>

    <el-row>
      <el-col :lg="4" :md="4">
        <OkButton
          @OkButton-onClick="$emit('OkDialog-onClick')"
          name="OkButton"
          :spanInputs="24"
          v-if="true"
        />
      </el-col>
      <el-col :lg="16" :md="16"> </el-col>
      <el-col :lg="4" :md="4">
        <CancelButton
          @CancelButton-onClick="$emit('CancelButton-onClick')"
          name="CancelButton"
          :spanInputs="24"
          v-if="true"
        />
      </el-col>
    </el-row>
  </Form>
</template>
<script>
import { defineComponent, toRef, watchEffect } from "vue";
import { Form, useForm } from "vee-validate";
import {OkButton, CancelButton , GenericRadioButton } from "@teresol/ui-components";

export default defineComponent({
  name: "DialogRadioButton",
  components: {
    Form,
    GenericRadioButton,
    OkButton,
    CancelButton,
  },
  props: {
    selectedValue:{},
    value: {},
    radioGroup: {},
    isDisable: {},
  },
  setup(props) {
    return {
      selectedValues: props.value,
      isDisabled: props.isDisable,
    };
  },
});
</script>
