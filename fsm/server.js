"use strict";
require("dotenv").config(); //This should always be the first import
const session = require("express-session");
const { authorize, getLogger, getKeyCloak, handler, httpServer } = require("@teresol-v2/fsm");
const machine = require("./TLR_EPRC_SPRC_INQ_UC3_RPT_EPRC");

const logger = getLogger("server.js");
const memoryStore = new session.MemoryStore();
const keycloak = getKeyCloak(memoryStore);
const app = httpServer(memoryStore, keycloak);

/**
 * TODO
 * - Replace USE-CASE-IDENTIFIER with your USE-CASE-IDENTIFIER
 * - Replace <ADD-MODULE-NAME> with the correct MODULE-NAME
 * - Replace <ACTIVITY-CODE> with the correct ACTIVITY CODE
 * - Rename USE_CASE_STATE_MACHINE.js to your USE_CASE_IDENTIFIER, and 
 * code your main machine inside this file
 * - Store all URLS in urls.js file. For complete example see service.js and fetchActor.js sections of 
 * node_modules/@teresol/fsm/README.md.
 */

app.post(
	"/fsm/TLR_EPRC_SPRC_INQ_UC3_RPT_EPRC",
	
	keycloak.protect(),
	authorize("TELLER", "EPRCRPOT"),
	(req, res) => {
		handler(machine, req, res);
	}
);

app.listen(process.env.PORT, () => {
	logger.info(`TLR_EPRC_SPRC_INQ_UC3_RPT_EPRC app listening at ${process.env.FSM}:${process.env.PORT}`);
});
