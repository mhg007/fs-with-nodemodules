const { createMachine } = require("xstate");
const service = require("../urls.js");
/** 
 * Import URLS at the top as follows:
 * 
 * const branchDetail = service.get("branchDetail");
 * const currencyDetail = service.get("currencyDetail"); 
 * 
 * Please refer to example in service.js and fetchActor.js section
 * of node_modules/@teresol-v2/fsm/README.md
 */
const MegaSet18Actor = createMachine({
  initial: "Idle",
  predictableActionArguments: true,
  context: {},
  states: {
    Idle: {
      on: {
        START: {}
      }
    },
    Final: {
      type: "final"
    }
  }
}, {
  actions: {
    spawnFetch: assign({
      fetch: () => spawn(FetchActor)
    }),
  }
});

exports.MegaSet18Actor = MegaSet18Actor;

