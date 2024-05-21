/*
  input:
  
  : Default Value is false 

  function: 
*/
export const extractPropertyFromtargetArrayOfObjects = (targetArrayOfObjects, referenceObject, targetProperty) => {
  let targetPropertyValue = '';

  console.log('targetArrayOfObjects', targetArrayOfObjects)

  targetPropertyValue = targetArrayOfObjects.filter(
    (currentRow) =>
      currentRow.trans_from_acc === referenceObject.trans_from_acc &&
      currentRow.trans_to_acc === referenceObject.trans_to_acc
  )[0][targetProperty];

  console.log('targetPropertyValue', targetPropertyValue);

  return targetPropertyValue;
};
