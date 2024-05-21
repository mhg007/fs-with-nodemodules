import axios from 'axios'
import { ElMessageBox } from 'element-plus'
import { options } from '../mixins/alertOption'
export const printPDF = async (printData, url) => {
  const payloadset = {
    "transition": "MegaSet9_Print",
    "data": { printData }
  }




  //   let header = rootGetters.getHeaders
  // console.log("header for confirmation", header);
  // let selectedBranchName = state.MS18_configurationObject.componentProps.BranchDropDown.BranchValue.value
  // const payloadset = {
  //   "transition": "PRINT_BTN",
  //   "data": { selectedBranchName, voucherNO }
  // }
  try {
    let response = await axios.post(url, payloadset, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/pdf'
      }
    })
    if (response.status != 200) {
      throw new Error()
    }
    else {
      console.log("ahsan file for testing", payloadset);

      let json = {}

      try {
        const txt = String.fromCharCode.apply(null, new Uint8Array(response.data));
        if (txt)
          json = JSON.parse(txt);
      } catch (error) { }
      if (json.mBoolean == true) {
        throw new Error(json.errorMessage)
      }
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Voucher' + Date(Date.now().toString()) + '.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  catch (error) {
    console.error(error);
    ElMessageBox.alert(error.message, 'Message', options)
  }
}








// export const printVoucher=(file) =>{
//     const url = window.URL.createObjectURL(new Blob([file]));
//           const link = document.createElement('a');
//           link.href = url;
//           link.setAttribute('download', 'Voucher.pdf');
//           document.body.appendChild(link);
//           link.click();
// }