import axios from 'axios'
import { ElMessageBox } from 'element-plus'
import { options } from '../mixins/alertOption'
export const printPDF=async (printData,url)=>{
    const payloadset = {
        "transition": "MegaSet9_Print",
        "data": {printData}
      }
      try {
        let response = await axios.post(url, payloadset, {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'application/json',
            'Accept': ['application/pdf','application/json']
          }
        })
  
        if (response.status != 200) {
          throw new Error();
        }
        else {
          console.log("global response",response);
          if (response.data.mBoolean == true) {
            console.log("else part:",response.data);
            throw new Error(response.data.errorMessage)
          }
          else {
            console.log("Print MS9 response", response.data);
            printVoucher(response.data)
          }
        }
      }
      catch (error) {
        ElMessageBox.alert(error.message, 'Message', options)
        console.log('Axios Error', error);
      }
}
export const printVoucher=(file) =>{
    const url = window.URL.createObjectURL(new Blob([file]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Voucher.pdf');
          document.body.appendChild(link);
          link.click();
}