export default function CompareList(passedList) {
  var PreDefinedActivities = [
    {
      name: "Credit Card",
      status: false,

      allActivities: [
        { name: "CRCARDI", status: false },
        { name: "CCCCRC", status: false },
        { name: "CCCCRCA", status: false },
        { name: "CCCCRCC", status: false },
        { name: "CCCCRCI", status: false },
        { name: "CCFNDTR", status: false },
        { name: "CCFNDTRA", status: false },
        { name: "CCFNDTRC", status: false },
        { name: "CCFNDTRI", status: false },
      ],
    },
    {
      name: "Pay Cash",
      status: false,

      allActivities: [
        { name: "PYEXPPAY", status: false },
        { name: "PYCPYORD", status: false },
        { name: "TRPTCHG", status: false },
        { name: "PYCCQS10", status: false },
        { name: "INBRNPAY", status: false },
        { name: "PYCLCS10", status: false },
        { name: "PYCDVS10", status: false },
        { name: "PYCDVSGL", status: false },
        { name: "PYCAMO", status: false },
        { name: "PYCDDS00", status: false },
        { name: "TRPTADD", status: false },
        { name: "TRPTCHG", status: false },
      ],
    },
    {
      name: "Receive Deposit",
      status: false,

      allActivities: [
        { name: "RDEXPPAY", status: false },
        { name: "EVSTLMNT", status: false },
        { name: "RCDCHS10", status: false },
        { name: "INBRNRCV", status: false },
        { name: "UBCASHPY", status: false },
        { name: "UBCASHAU", status: false },
        { name: "UBCASHCN", status: false },
        { name: "UBCASHIQ", status: false },
        { name: "PYCCVS10", status: false },
        { name: "PYCCVSGL", status: false },
        { name: "RAGDDS00", status: false },
        { name: "TRDRPTAD", status: false },
        { name: "TRDRPTCH", status: false },
        { name: "EVNGBNKG", status: false },
        { name: "LTCSHRCV", status: false },
        { name: "LTCSHCAN", status: false },
        { name: "LTCSHATH", status: false },
        { name: "EVPOSTUP", status: false },
        { name: "LTCSHINQ", status: false },
        { name: "RPTEBDTL", status: false },
      ],
    },
    {
      name: "Transfer Funds",
      status: false,

      allActivities: [
        { name: "SUPVATAD", status: false },
        { name: "TFVATPAY", status: false },
        { name: "TFVATPIQ", status: false },
        { name: "GLFNDTRS", status: false },
        { name: "GLFNDTRM", status: false },
        { name: "GLFTAUTH", status: false },
        { name: "GLFTRSND", status: false },
        { name: "GLFTINQR", status: false },
        { name: "GLFTDASB", status: false },
        { name: "GLFTDAMB", status: false },
        { name: "GLAUTHDA", status: false },
        { name: "GLFTRSDA", status: false },
        { name: "GLFTINQD", status: false },
      ],
    },
    {
      name: "Balance Cash",
      status: false,

      allActivities: [{ name: "BALCHS00", status: false }],
    },
    {
      name: "Cash Management",
      status: false,

      allActivities: [
        { name: "CMCCRCH", status: false },
        { name: "CMCCRCHA", status: false },
        { name: "CMCCRCHC", status: false },
        { name: "CMCCRCHI", status: false },
        { name: "CMFTCHQ", status: false },
        { name: "CMFTCHQA", status: false },
        { name: "CMFTCHQC", status: false },
      ],
    },
    {
      name: "OBC/IBC",
      status: false,

      allActivities: [
        { name: "OBCORG", status: false },
        { name: "OBCCNCL", status: false },
        { name: "OBCAUTH", status: false },
        { name: "OBCMRKR", status: false },
        { name: "OBCUMRK", status: false },
        { name: "OBCREAL", status: false },
        { name: "OBCRONL", status: false },
        { name: "OBCROTH", status: false },
        { name: "OBCRLAUT", status: false },
        { name: "OBCRCOF", status: false },
        { name: "OBCRCON", status: false },
        { name: "OBCRCOB", status: false },
        { name: "OBCRET", status: false },
        { name: "OBCRETON", status: false },
        { name: "OBCRETOB", status: false },
        { name: "OBCINQ", status: false },
        { name: "IBCRESP", status: false },
        { name: "IBCCNCL", status: false },
        { name: "IBCINQ", status: false },
        { name: "IBCRLAUT", status: false },
        { name: "IBCENTOF", status: false },
        { name: "IBCOFCNL", status: false },
      ],
    },
    {
      name: "Local Currency Advice",
      status: false,

      allActivities: [
        { name: "LADVORG", status: false },
        { name: "LADVORGA", status: false },
        { name: "LADVORGC", status: false },
        { name: "LADVORGI", status: false },
        { name: "LADVRSP", status: false },
        { name: "LADVRSPR", status: false },
        { name: "LADVRSPA", status: false },
        { name: "LADVRSPC", status: false },
        { name: "LADVRSPI", status: false },
      ],
    },
    {
      name: "EPRC",
      status: false,

      allActivities: [
        { name: "EPRCINQR", status: false },
        { name: "SPRCINQR", status: false },
        { name: "EPRCRPOT", status: false },
        { name: "SPRCRPOT", status: false },
      ],
    },
    {
      name: "Inward Clearing",
      status: false,

      allActivities: [
        { name: "CIWBRRBS", status: false },
        { name: "CIWPNCHD", status: false },
        { name: "CIWPNCHC", status: false },
        { name: "CIWBRINQ", status: false },
        { name: "CIWBQINS", status: false },
        { name: "CLRIWLDG", status: false },
        { name: "CLRIWRTN", status: false },
        { name: "CLRIAUTH", status: false },
        { name: "CLRIRSND", status: false },
        { name: "AUTOINWD", status: false },
        { name: "TDEICS12", status: false },
        { name: "TDEINSCN", status: false },
        { name: "TDEICSDD", status: false },
        { name: "TDEICS11", status: false },
        { name: "TDEICS10", status: false },
        { name: "TDEICS13", status: false },
        { name: "CIWRPTGN", status: false },
        { name: "CIWSRPTG", status: false },
        { name: "CIWISCNN", status: false },
        { name: "CIWISCAN", status: false },
        { name: "CIWIAIUP", status: false },
        { name: "CIWIAIUM", status: false },
        { name: "CIWIAIVF", status: false },
        { name: "CIWIAIVM", status: false },
        { name: "CIWIAICN", status: false },
        { name: "CIWCNBLK", status: false },
        { name: "CIWIAIAT", status: false },
        { name: "CIWIARVD", status: false },
        { name: "CIWIARAD", status: false },
        { name: "CIWHDUPD", status: false },
        { name: "CIWHDDEL", status: false },
        { name: "CIWHDATH", status: false },
        { name: "CIWHDCLS", status: false },
        { name: "CIWHDCMP", status: false },
        { name: "CIWIQBRN", status: false },
        { name: "CIWIQINS", status: false },
        { name: "CIWIMGIQ", status: false },
        { name: "CIWRPTGC", status: false },
        { name: "CIWSRPTC", status: false },
        { name: "CIWIMPDT", status: false },
        { name: "CIWNIFTU", status: false },
        { name: "CIWUVNFT", status: false },
        { name: "CIWRETNF", status: false },
        { name: "CIWMRETF", status: false },
        { name: "CIWIRETF", status: false },
      ],
    },

    {
      name: "Outward Clearing",
      status: false,

      allActivities: [
        { name: "CCPYMENT", status: false },
        { name: "CCPYMPDT", status: false },
        { name: "TDEOCS10", status: false },
        { name: "TDEOCS11", status: false },
        { name: "RLCLGS00", status: false },
        { name: "CLROWLDG", status: false },
        { name: "CLROWRTN", status: false },
        { name: "CLRORSND", status: false },
        { name: "CLROAUTH", status: false },
        { name: "OWICLODG", status: false },
        { name: "OWICLCAN", status: false },
        { name: "OWICLAUT", status: false },
        { name: "OWICREAL", status: false },
        { name: "OWICRCAN", status: false },
        { name: "OWICRAUT", status: false },
        { name: "OWICRETN", status: false },
        { name: "OWICRETC", status: false },
        { name: "OWICINQR", status: false },
      ],
    },
    {
      name: "Main Office Clearing",
      status: false,

      allActivities: [{ name: "RPTFTT", status: false }],
    },

    {
      name: "Cancel transaction",
      status: false,

      allActivities: [
        { name: "CNTNOS00", status: false },
        { name: "CNTLTS00", status: false },
        { name: "TCANVCHN", status: false },
        { name: "TCANVCHL", status: false },
      ],
    },
    {
      name: "Define Scanner",
      status: false,

      allActivities: [{ name: "SCANNER", status: false }],
    },
    {
      name: "Balance Clearing",
      status: false,

      allActivities: [{ name: "BALCLS00", status: false }],
    },
    {
      name: "General Inquiry",
      status: false,

      allActivities: [
        { name: "GICABAL6", status: false },
        { name: "GIGLAC6", status: false },
        { name: "GIGABAL6", status: false },
        { name: "GIEXGRT6", status: false },
        { name: "INQINSTL", status: false },
        { name: "GIWHT6", status: false },
      ],
    },
    {
      name: "Change Password",
      status: false,

      allActivities: [{ name: "CHGPWD", status: false }],
    },
    {
      name: "Reports",
      status: false,

      allActivities: [
        { name: "RTBANCHD", status: false },
        { name: "RTCMROCL", status: false },
        { name: "RTCMRUBC", status: false },
        { name: "RTCATRNR", status: false },
        { name: "RTCAOMCR", status: false },
        { name: "RTCAOGCR", status: false },
        { name: "RTCAOZR", status: false },
        { name: "RTCNCLR", status: false },
        { name: "RTCNOUCL", status: false },
        { name: "RTCLEADV", status: false },
        { name: "RTFORERE", status: false },
        { name: "RTGLFTAD", status: false },
        { name: "RTIBCREP", status: false },
        { name: "RTIBCDAE", status: false },
        { name: "RTINBTRR", status: false },
        { name: "RPTIAEXP", status: false },
        { name: "RTMISCTR", status: false },
        { name: "RTMOADV", status: false },
        { name: "RTOBCREP", status: false },
        { name: "RTOFBCRE", status: false },
        { name: "RTONOCIN", status: false },
        { name: "RTONCREC", status: false },
        { name: "RTONRAD", status: false },
        { name: "RTOWICRE", status: false },
        { name: "RTVOCHER", status: false },
        { name: "RTWHDCCB", status: false },
        { name: "RTWHTRCT", status: false },
        { name: "RTHRRTPS", status: false },
      ],
    },
  ];
  // var FinalArray = [];
  let i = 0;
  while (i < passedList.length) {
    let j = 0;
    // breakHere:
    while (j < PreDefinedActivities.length) {
      let k = 0;

      while (k < PreDefinedActivities[j].allActivities.length) {
        if (passedList[i] == PreDefinedActivities[j].allActivities[k].name) {
          PreDefinedActivities[j].status = true;
          PreDefinedActivities[j].allActivities[k].status = true;
          // FinalArray.push(PreDefinedActivities[j]);
          // PreDefinedActivities.splice(j, 1);
          // break breakHere;
        }
        k = k + 1;
      }

      j = j + 1;
    }

    i = i + 1;
  }
  // FinalArray = FinalArray.concat(PreDefinedActivities);
  let hashMap = new Map();

  let actMap = new Map();
  PreDefinedActivities.map((val) => {
    hashMap.set(val.name, val.status)

  })
  PreDefinedActivities.map((val) => {

    val.allActivities.map((val2) => {
      actMap.set(val2.name, val2.status)
    })
    hashMap.set('activities', actMap)
  })
  return hashMap;
}
