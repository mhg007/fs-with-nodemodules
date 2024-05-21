// --utitlity functions--
/*
  input:
  accountString
  isCollectionAccount: Default Value is false 
*/

export const chkdigtIBAN = (brn_cd, lcl_ac_type, cust_no, run_no) => {
  console.log("======>", brn_cd, lcl_ac_type, cust_no, run_no);
  var lcl_chk_digt = (parseInt(brn_cd.substring(0, 1)) * 1) + (parseInt(brn_cd.substring(1, 2)) * 2)
    + (parseInt(brn_cd.substring(2, 3)) * 1) + (parseInt(brn_cd.substring(3, 4)) * 2)
    + (parseInt(lcl_ac_type.substring(0, 1)) * 3) + (parseInt(lcl_ac_type.substring(1, 2)) * 1)
    + (parseInt(lcl_ac_type.substring(2, 3)) * 2) + (parseInt(lcl_ac_type.substring(3, 4)) * 1)
    + (parseInt(cust_no.substring(0, 1)) * 2) + (parseInt(cust_no.substring(1, 2)) * 1)
    + (parseInt(cust_no.substring(2, 3)) * 2) + (parseInt(cust_no.substring(3, 4)) * 1)
    + (parseInt(cust_no.substring(4, 5)) * 2) + (parseInt(cust_no.substring(5, 6)) * 1)
    + (parseInt(run_no.substring(0, 1)) * 2) + (parseInt(run_no.substring(1, 2)) * 1);

  var lcl_length = lcl_chk_digt.toString().length;
  var chk_digt = lcl_chk_digt.toString().substring(lcl_length - 1);
  return chk_digt;
}


export const splitCompleteAccountIntoParts = (
  accountString,
  isCollectionAccount = false
) => {
  let accountObject = {};

  let branchCodeMaxLength = 4;
  let accountTypeMaxLength = 4;
  let customerNoMaxLength = 6;
  let runningNoMaxLength = 2;

  if (accountString.includes('-')) {
    let arrayOfAccountParts = accountString.split('-');

    console.log(arrayOfAccountParts);

    if (isCollectionAccount)
      accountObject = {
        accountType: arrayOfAccountParts[0],
        customerNo: arrayOfAccountParts[1],
        runningNo: arrayOfAccountParts[2],
        checkDigit: arrayOfAccountParts[3]
      };
    else
      accountObject = {
        branchCode: arrayOfAccountParts[0],
        accountType: arrayOfAccountParts[1],
        customerNo: arrayOfAccountParts[2],
        runningNo: arrayOfAccountParts[3],
        checkDigit: arrayOfAccountParts[4],
      };
  } else {
    if (isCollectionAccount) {
    } else {
      accountObject = {
        branchCode: accountString.substr(0, branchCodeMaxLength),
        accountType: accountString.substr(4, accountTypeMaxLength),
        customerNumber: accountString.substr(8, customerNoMaxLength),
        runningNumber: accountString.substr(14, runningNoMaxLength),
        checkDigit: accountString.substr(16, 1),
      };
    }
  }
  console.log("splitted accountObject",accountObject)
  return accountObject;
};

/*
  input:
  
  : Default Value is  
*/
export const makeCompleteAccountFromParts = (
  accountPartsObject,
  isCollectionAccount = false,
  isGlAccount = false
) => {
  console.log('accountPartsObject', accountPartsObject);

  let branchCodeMaxLength = 4;
  let accountTypeMaxLength = 4;
  let customerNoMaxLength = 6;
  let runningNoMaxLength = 2;

  // glAccount

  let mainHeadMaxLength = 3;
  let subHead1MaxLength = 2;
  let subHead2MaxLength = 2;
  let glRunNumberMaxLength = 4;

  let account = '';

  if (isCollectionAccount)
    account =
      accountPartsObject.accountType
        .toString()
        .padStart(accountTypeMaxLength, 0) +
      '-' +
      accountPartsObject.customerNo
        .toString()
        .padStart(customerNoMaxLength, 0) +
      '-' +
      accountPartsObject.runningNo.toString().padStart(runningNoMaxLength, 0);
  else if (isGlAccount)
    account =
      accountPartsObject.branchCode.toString().padStart(4, 0) +
      '-' +
      accountPartsObject.identity.toString() +
      '-' +
      accountPartsObject.mainHead.toString().padStart(mainHeadMaxLength, 0) +
      '-' +
      accountPartsObject.subHead1.toString().padStart(subHead1MaxLength, 0) +
      '-' +
      accountPartsObject.subHead2.toString().padStart(subHead2MaxLength, 0) +
      '-' +
      accountPartsObject.glRunNumber
        .toString()
        .padStart(glRunNumberMaxLength, 0) +
      '-' +
      accountPartsObject.glCheckDigit.toString();
  else
    account =
      accountPartsObject.branchCode
        .toString()
        .padStart(branchCodeMaxLength, 0) +
      '-' +
      accountPartsObject.accountType
        .toString()
        .padStart(accountTypeMaxLength, 0) +
      '-' +
      accountPartsObject.customerNo
        .toString()
        .padStart(customerNoMaxLength, 0) +
      '-' +
      accountPartsObject.runningNo.toString().padStart(runningNoMaxLength, 0) +
      '-' +
      accountPartsObject.checkDigit;

  return account;
};

/*
  input:
  
  : Default Value is  
*/
export const makeAccountNumberFromGlAccount = (branchCode, glAccountNumber) => {
  return branchCode + '-' + glAccountNumber;
};

/*
  input:
  
  : Default Value is  
*/
export const makeCompleteBranchFromParts = (branchPartsObject) => {
  let branch =
    branchPartsObject.branchCode + '-' + branchPartsObject.branchName;

  return branch;
};

/*
  input:
  
  : Default Value is  
*/
export const formatBranchString = (branchString) => {
  return makeCompleteBranchFromParts(
    splitCompleteBranchIntoParts(branchString)
  );
};

/*
  input:
  
  : Default Value is  
*/
export const splitCompleteBranchIntoParts = (branchString) => {
  let indexOfSplit = branchString.indexOf('-');

  let branchCodeMaxLength = 4;
  let branchObject = {
    branchCode: '',
    branchName: '',
  };

  if (indexOfSplit != -1) {
    let branchCode = branchString
      .substring(0, indexOfSplit)
      .padStart(branchCodeMaxLength, 0);
    let branchName = branchString.substring(indexOfSplit + 1);

    branchObject = {
      branchCode,
      branchName,
    };
  } else if (branchString === 'ALL') {
    branchObject = {
      branchCode: 'ALL',
      branchName: 'ALL',
    };
  }

  return branchObject;
};

// ----

/*
  input:
  
  : Default Value is  
*/
export const formatDate = (inputDateString, fromFormatString) => {
  let day = '';
  let month = '';
  let year = '';

  let dateArray = [];

  let outputinputDateString = '';
  if (inputDateString != undefined) {

    switch (fromFormatString.toLowerCase()) {
      case 'yyyy-mm-dd':
        dateArray = inputDateString.split('-');

        year = dateArray[0];
        month = dateArray[1];
        day = dateArray[2];

        outputinputDateString = day + '/' + month + '/' + year;

        break;

      case 'dd/mm/yyyy':
        dateArray = inputDateString.split('/');

        day = dateArray[0];
        month = dateArray[1];
        year = dateArray[2];

        outputinputDateString = year + '-' + month + '-' + day;

        break;

      case 'mm-dd-yyyy':
        dateArray = inputDateString.split('-');

        year = dateArray[0];
        month = dateArray[1];
        day = dateArray[2];
        break;

      default:
        outputinputDateString = inputDateString;
    }

    return outputinputDateString;
  }
};

/*
  input:
  
  : Default Value is  
*/

export const makeCompleteCurrencyString = (currencyName, currencyCode) => {
  return currencyName + '-' + currencyCode;
};

/*
  input:
  
  : Default Value is  
*/

export const makeSubActivityCode = (loginBranch, fromBranch, toBranch) => {
  let subActivityCode = '';

  if (loginBranch == fromBranch) {
    if (fromBranch == toBranch) {
      subActivityCode = 'AAA';
    } else {
      subActivityCode = 'AAB';
    }
  } else {
    if (fromBranch == toBranch) {
      subActivityCode = 'ABA';
    } else if (loginBranch == toBranch) {
      subActivityCode = 'ABB';
    } else {
      subActivityCode = 'ABC';
    }
  }

  console.log('loginBranch', loginBranch);
  console.log('fromBranch', fromBranch);
  console.log('toBranch', toBranch);
  console.log('subActivityCode', subActivityCode);

  return subActivityCode;
};

/*
  input:
  
  : Default Value is  
*/

export const formatAmountFromNumberToString = (amountNumber) => {
  let formattedAmountString = parseFloat(amountNumber).toLocaleString('es-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedAmountString;
};

/*
  input:
  
  : Default Value is  
*/

export const formatVoucherNumberInTableData = (inputTableDataArray, voucherNumberPropertyName, voucherYearPropertyName) => {

  let formattedVoucherNumberTableData = []

  formattedVoucherNumberTableData = inputTableDataArray.map((inputTableDataRowObject) => {
    inputTableDataRowObject[voucherNumberPropertyName] = inputTableDataRowObject[voucherNumberPropertyName] + "/" + inputTableDataRowObject[voucherYearPropertyName]
    return inputTableDataRowObject;
  })

  return formattedVoucherNumberTableData;
};

