import batch_Open from "./BCH_OPN_UC1_OpenBatch.js";
// const batch_Open = () => import("./BCH_OPN_UC1_OpenBatch.js");
const BCH_OPN_UC1_OpenBatch_SuperSet12 = () =>
    import("./MS12UseCase");
const BCH_OPN_UC1_OpenBatch_SuperSet8 = () =>
    import("./MS8UseCase");
// import BCH_OPN_UC1_OpenBatch_SuperSet12 from "./MS12UseCase";
// import BCH_OPN_UC1_OpenBatch_SuperSet8 from "./MS8UseCase";
// import axios from "axios";



let batchOpenRoutes = [
    {
        path: "/MegaSet8_BCH_OPN_UC1_OpenBatch",
        name: "BCH_OPN_UC1_OpenBatch_SuperSet8",
        component: BCH_OPN_UC1_OpenBatch_SuperSet8,
        meta: {
            title: batch_Open.state.MS8_configurationObject.screenTitle,
            hideSideNavMenu: true,
        },
    },
    {
        path: "/MegaSet12_BCH_OPN_UC1_OpenBatch",
        name: "BCH_OPN_UC1_OpenBatch_SuperSet12",
        component: BCH_OPN_UC1_OpenBatch_SuperSet12,
        meta: {
            title: batch_Open.state.MS12_ConfigurationObject.screenTitle,
            hideSideNavMenu: true,
        },
    }
];

const UseCaseLoader = function (context, axios) {
    console.log("batchOpenClicked");
    let batchNumber = context.$store.getters.getHeaders.loginUserBatch;
    console.log("batchNumber", batchNumber);
    // Adding batch Open Routes
    if (context.$router.hasRoute("BCH_OPN_UC1_OpenBatch_SuperSet8")) {
        // remove         BCH_OPN_UC1_OpenBatch_SuperSet8
        // remove         BCH_OPN_UC1_OpenBatch_SuperSet12
        context.$router.removeRoute("BCH_OPN_UC1_OpenBatch_SuperSet8")
        context.$router.removeRoute("BCH_OPN_UC1_OpenBatch_SuperSet12")
    }

    context.$router.addRoute(batchOpenRoutes[0])
    context.$router.addRoute(batchOpenRoutes[1])
    // Adding Batch Open Store
    if (context.$store.hasModule("BCH_OPN_UC1_OpenBatch")) {
        context.$store.unregisterModule("BCH_OPN_UC1_OpenBatch");
    }
    let batch_Open_new2 = { ...batch_Open }
    delete batch_Open_new2.getActions
    batch_Open_new2.actions = batch_Open.getActions(axios)

    const batchStore = {
        namespaced: true,
        ...batch_Open_new2
    };

    context.$store.registerModule("BCH_OPN_UC1_OpenBatch", batchStore)

    console.log("closing");

    // normal process click
    if (batchNumber === null) {
        context.$store.dispatch(
            "fsmURL",
            context.$store.state.BCH_OPN_UC1_OpenBatch.url
        );
        context.$store.dispatch("BCH_OPN_UC1_OpenBatch/MS8_init")
            .then((response) => {
                if (response) {
                    context.$router.push({ name: "BCH_OPN_UC1_OpenBatch_SuperSet8" });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    } else {
        context.$swal.fire("Error", "Batch is already open");
    }
}
// function UseCaseLoader(name) {
//   const sayHelloTo = name || 'World';
//   console.log(`Hellosssssssssssssss, ${sayHelloTo}!`);
// }
export default UseCaseLoader;
