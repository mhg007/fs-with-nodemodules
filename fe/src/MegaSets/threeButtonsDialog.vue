<template>
  <Form as="el-form">
    <div style="text-align: center ; color:black;"><h3>{{message}}</h3></div>
    
    <el-row>
      <el-col :lg="6" :md="6"> </el-col>
      <el-col :lg="3" :md="3">
        <YesButton
          @YesButton-onClick="$emit('YesButton-onClick')"
          name="YesButton"
          :spanInputs="24"
          v-if="true"
        />
      </el-col>
      <el-col :lg="1" :md="1"> </el-col>
      <el-col :lg="3" :md="3">
        <NoButton
          @NoButton-onClick="$emit('NoButton-onClick')"
          name="NoButton"
          :spanInputs="24"
          v-if="true"
        />
      </el-col>
      <el-col :lg="1" :md="1"> </el-col>
      <el-col :lg="3" :md="3">
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
import {NoButton , YesButton , CancelButton} from "@teresol/ui-components";


export default defineComponent({
  name: "DialogRadioButton",
  components: {
    Form,
    NoButton,
    CancelButton,
    YesButton
  },
  props: {
    messages:{},
  },
  setup(props) {
    return {
      message: props.messages,
    };
  },
});
</script>
