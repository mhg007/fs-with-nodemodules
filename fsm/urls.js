const { Service } = require("@teresol-v2/fsm");
const service = new Service();

service.addList([    
    ["core-api-setup","setupEprcDetail"],
    ["core-api-certificate", "eprcTransactionDetail"],
]);

module.exports = service;