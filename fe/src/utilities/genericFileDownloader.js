import axios from 'axios'
import { ElMessageBox } from 'element-plus'
import { options } from '../mixins/alertOption'
import { ElLoader } from './Loading';

async function genericFileDownloader(FSMTransition, reportFileName, printData, url) {
    let loadingIndicator = ElLoader();
    try {

        let fileName = reportFileName; //name of report file with extension

        const payloadset = {
            "transition": FSMTransition,
            "data":  printData 
        }

        let response = await axios.post(url, payloadset, {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf,text/html,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' //all document types being used in R2 (.pdf,.xlsx,.txt)
            }
        });
        if (response.status != 200) {
            throw new Error()
        } else {
            let json = {}
            try {
                const txt = String.fromCharCode.apply(null, new Uint8Array(response.data));
                if (txt) {
                    json = JSON.parse(txt);
                }
            } catch (error) { 
            }
            if (json.mBoolean == true) {
                throw new Error(json.errorMessage)
            }

            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement('a');
            link.href = downloadUrl;

            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            loadingIndicator.close();
        }
    }
    catch (error) {
        loadingIndicator.close();
        ElMessageBox.alert(error.message, 'Message', options)
    }
}
export {genericFileDownloader}