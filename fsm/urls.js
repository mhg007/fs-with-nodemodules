const { Service } = require("@teresol-v2/fsm");
const service = new Service();

service.addList([    
    ["core-api-setup","setupEprcDetail"],

    ["core-api-eprc","eprcRequestLog"],
    ["core-api-eprc", "eprcBackOfficeRpt"],
]);

module.exports = service;