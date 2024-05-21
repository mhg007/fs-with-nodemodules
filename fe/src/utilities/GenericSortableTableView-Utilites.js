function setTableRowElementTabIndexToZero(passedList){
    const children = Array.from(passedList);

      const foundChild = children.find(
        (child) => child.ariaSelected === "true"
      );

      if (foundChild) {
        foundChild.tabIndex = 0;
      }
}
function scrollToRow(table) {
    const dataTable = table;
    const rowElement = dataTable.$el.querySelector('.p-highlight');
    if (rowElement) {
      const tableContainer = dataTable.$el.querySelector('.p-datatable-wrapper');
      tableContainer.scrollTo({
      top: rowElement.offsetTop-50,
      behavior: 'smooth'
    });
    }
  }
  export {
    setTableRowElementTabIndexToZero,
    scrollToRow
  }