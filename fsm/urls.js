const { Service } = require("@teresol-v2/fsm");
const service = new Service();

service.addList([    
    ["core-api-eprc","eprcRequestType"],
    ["core-api-eprc","eprcIdentificationType"],
    ["core-api-eprc","eprcChannel"],
    ["core-api-eprc","eprcRequestLog"],
    ["core-api-eprc", "eprcBackOfficeRpt"],
]);

module.exports = service;