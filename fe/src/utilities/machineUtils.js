export const validateRequest = (request) => {
    return request;
}

export const validateResponse = (response, dto) => {
    dto.errorMessage = undefined;
    let errorMessage = "System error";
    if (isEmpty(response.data)) {
        errorMessage = "System error";
    } else if ((response.status && response.status != 200) || response.data.mBoolean == true || !isEmpty(response.data.errorMessage)) {
        if (!isEmpty(response.data.errorMessage)) {
            errorMessage = response.data.errorMessage;
        } else {
            errorMessage = response.status + " : System error";
        }
        dto.errorMessage = updateMessageInResponse (errorMessage);
        return dto;
    } 
    return response;
}

export const updateMessageInResponse = (errorMessage) => {
    if (errorMessage.indexOf("ACC01-028") >= 0) {
        return "Invalid customer number.";
    }else if(errorMessage.indexOf("ACC09-006") >= 0){
        return "No Account Condition Found against given account no";
    } else if(errorMessage.indexOf("INS01-025") >= 0 || errorMessage.indexOf("INS01-020") >= 0){
        return "No record found.";
    } else if(errorMessage.indexOf("USR03-098") >= 0 || errorMessage.indexOf("USR03-097") >= 0){
        return "Posting limit is zero, Cannot post.";

    }

    return errorMessage;
}

export const isEmpty = (val) => {
    if (typeof(val) === 'undefined' || val == null || val == "{}" || val == "[]" || val == "[{}]") {
        return true;
    } else if(typeof(val) === 'string' && (val == "" || val.length <= 0)) {
        return true;
    } else if(typeof(val) === 'number' && isNaN(val)) {
        return true;
    } else if (typeof(val) === 'object' && (Object.keys(val).length <=0 || Object.values(val).length <=0)) {
        return true;
    } else {
        return false;
    }    
}
export const dateFormater = (date) =>{
    if(!date){
        return "";
    }
    let splitdate=date.split("-")
    return splitdate[2]+"/"+splitdate[1]+"/"+splitdate[0]
}

// export const isNotEmpty = (val) => {
//     return (val && val != "" && val.length >0);
// }

// export const isNotBlank = (val) => {
//     // return Object.isObject(val)
//     return (val && val != "undefined" && val != null && val != "null");
// }


// export const notEmptyNorBlank = (val) => {
//     // return Object.isObject(val)
//     return (val && val != "undefined" && val != null && val != "null" && val != "" && val.length >0);
// }

export const padStr = (str, size) => {
    if (str !== null && str !== undefined) {
        while (str.toString().length < size) {
            str = '0' + str;
        }
    }
    return str;
}

// @author      [akash.kumar - 20-06-2022]
// @desc        [created a new utility function]
export const formatCurrency = (amount) => {
    if (amount !== null && amount !== undefined && amount !== 0) {
        let pakLocale = Intl.NumberFormat('en-PK',{
            minimumFractionDigits:2
        });
        return pakLocale.format(amount);
    }
    return '0.00';
}


// @author      [akash.kumar - 06-07-2022]
// @desc        [created a new utility function]
export const formatQuantity = (quantity) => {
    if (quantity !== null && quantity !== undefined && quantity !== 0) {
        let numberLocale = Intl.NumberFormat('en-PK');
        return numberLocale.format(quantity);
    }
    return '0';
}

// @author      [akash.kumar - 04-10-2022]
// @desc        [created a new utility function for transform Array to Map]
export const transformToMap = (arrayObject, keyParamName, valueParamName) => {
    let mapObj = {};
    for (const element of arrayObject) {
        Object.defineProperty(mapObj, element[keyParamName], {
            value: element[valueParamName],
            writable: true,
            enumerable: true,
            configurable: true
        })
    }
    return mapObj;
}