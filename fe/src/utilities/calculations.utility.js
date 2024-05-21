// --utitlity functions--
/*
  input:
*/
export const calculateNoOfSignatories = (signatoriesDataArray) => {
  let noOfSignatories = 1;

  noOfSignatories = signatoriesDataArray.length - 1;

  return noOfSignatories;
};

export const evaluateCrOrDr = (property) => {
  return (row, crOrDr) => {
    let credit = 0;
    let debit = 0;

    if (property === 'cr') {
      credit = row[property];
      return credit > 0 ? credit : -credit;
    }
    else 
    if (property === 'dr') {
      debit = row[property];
      return debit > 0 ? debit : -debit;
    }
    else 
    
    if (row[property] > 0) {
      credit = row[property];
      return crOrDr === 'cr' ? credit : 0;
    } else if (row[property] < 0) {
      debit = row[property];
      return crOrDr === 'dr' ? -debit : 0;
    }

    return 0;
  };
};
