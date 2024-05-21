import { isFormatableAmount } from './conditions.utility';
import {
  formatAmountFromNumberToString,
  formatBranchString,
  makeCompleteAccountFromParts,
  splitCompleteAccountIntoParts,
  makeCompleteBranchFromParts,
} from './formatting.utility';

/*
  input:
  
  : Default Value is false 

  function: 
*/
export const mapListFsmToFe = (fsmList, targetProperty) => {
  let formattedList = fsmList.map((item) => {
    let value = '';

    if (typeof item === 'object') {
      switch (targetProperty) {
        case 'branchObject':
          value = makeCompleteBranchFromParts(item);
          break;
        case 'accountObject':
          value = makeCompleteAccountFromParts(item);
          break;
        case 'brn':
          value = formatBranchString(item['brn']);
          break;
        default:
          value = item[targetProperty];
      }
    } else {
      value = item;
    }

    return {
      value: value,
      option: value,
    };
  });

  return formattedList;
};

/*
  input:
  
  : Default Value is false 

  function: 
*/
export const mapTableData = (
  inputTableData,
  tableDataMap,
  isCollectionAccount = false
) => {
  console.log('inputTableData', inputTableData);

  console.log('tableDataMap', tableDataMap);

  let mappedTableData = [];

  let isGlAccount = false;

  mappedTableData = inputTableData.map((inputTableRow) => {
    let mappedTableDataRow = {};

    // loop over all properties
    Object.keys(tableDataMap).forEach((key) => {
      if (key === 'account_no') {
        let account = {};

        if (typeof inputTableRow[tableDataMap[key]] !== 'string') {
          //  if the account_no in the inputTableRow is NOT a string

          isGlAccount = inputTableRow['accIden'] === 'G';

          if (isGlAccount) {
            account = {
              branchCode:inputTableRow.branchCode,
              identity: inputTableRow.iden,
              mainHead: inputTableRow.mainHead,
              subHead1: inputTableRow.subHead1,
              subHead2: inputTableRow.subHead2,
              glRunNumber: inputTableRow.glRunNo,
              glCheckDigit: inputTableRow.glChkDigit,
            };
          } else if (isCollectionAccount) {
          } else {
            account = {
              branchCode: inputTableRow.branchCode,
              accountType: inputTableRow.accountType,
              customerNo: inputTableRow.customerNumber,
              runningNo: inputTableRow.runNumber,
              checkDigit: inputTableRow.chkDigit,
            };
          }

          mappedTableDataRow[key] = makeCompleteAccountFromParts(
            account,
            isCollectionAccount,
            isGlAccount
          );
        } else {
          //  if account_no is string
          account = inputTableRow[tableDataMap[key]];
          mappedTableDataRow[key] = account;
        }
      } else if (key === 'dr' || key === 'cr') {
        mappedTableDataRow[key] = formatAmountFromNumberToString(tableDataMap[key](inputTableRow, key));
      } 
      else if (isFormatableAmount(key)) {
        console.log("amount",inputTableRow[tableDataMap[key]]);
        mappedTableDataRow[key] = inputTableRow[tableDataMap[key]].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      else {
        mappedTableDataRow[key] = inputTableRow[tableDataMap[key]];
      }
      if (key === 'trans_from_acc') {
        var account = splitCompleteAccountIntoParts(mappedTableDataRow[key])
        var trans_from_acc_string = account.branchCode + "-" + account.accountType + "-" + account.customerNumber + "-" + account.runningNumber + "-" + account.checkDigit;
        mappedTableDataRow[key] = trans_from_acc_string;
      }
      if (key === 'trans_to_acc') {
        var account = splitCompleteAccountIntoParts(mappedTableDataRow[key])
        var trans_to_acc_string = account.branchCode + "-" + account.accountType + "-" + account.customerNumber + "-" + account.runningNumber + "-" + account.checkDigit;
        mappedTableDataRow[key] = trans_to_acc_string;
      }
      if (key === 'ref_no') {
        var ref;
        if (inputTableRow.transactionStatus == '0') {
          ref = inputTableRow.transctionNumber;
        }
        else {
          ref = inputTableRow.referenceNumber;
        }
        mappedTableDataRow[key] = ref;

      }
    });

    // add remining properties of inputTableRow

    mappedTableDataRow = { ...inputTableRow, ...mappedTableDataRow }; //  mappedTableDataRow is preferred in case of properties duplication

    return mappedTableDataRow;
  });

  console.log('mappedTableData', mappedTableData);

  return mappedTableData;
};
