export default function tableList(passedList){
    const children = Array.from(passedList);

      const foundChild = children.find(
        (child) => child.ariaSelected === "true"
      );

      if (foundChild) {
        foundChild.tabIndex = 0;
      }
}



   // this.$nextTick(() => {
   //    tableList(this.$refs.megaSet55Ref.$refs.RefChargesTable.$refs.singleTable.$el.children[0].children[0].children[1].children)
   //  });