// --utitlity functions--
/*
  input:
*/
export const checkIfZongFranchiseId = (company) => {
  
  return (company === 'CMPAK LIMITED');
};

/*
  input:
*/
export const isFormatableAmount = (propertyName) => {
  let isFormatableAmountFlag = false;

  isFormatableAmountFlag = propertyName === 'amount' || propertyName === 'fedAmount';

  return isFormatableAmountFlag
};


