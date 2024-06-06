const { createMachine, assign, spawn } = require("xstate");
const { FetchActor, trigger, getToken } = require("@teresol-v2/fsm");
const service = require("./urls.js");
const listOfTransMode = service.get("setupEprcDetail");
const listOfidentificationType = service.get("setupEprcDetail");
const listOfChannels = service.get("setupEprcDetail");
const insertRequestLog = service.get("eprcTransactionDetail");
const fetchEprcRpt = service.get("eprcTransactionDetail");

/**
 * TODO Change the name of this file to your USE_CASE_IDENTIFIER.js
 *
 * This file contains the code for your main machine. It always resides in the project root,
 * and is named after its use case. Please read the CONVENTIONS section of README file for
 * more information.
 */
const TLR_EPRC_SPRC_INQ_UC3_RPT_EPRC = createMachine(
  {
    id: "TLR_EPRC_SPRC_INQ_UC3_RPT_EPRC",
    initial: "Idle",
    predictableActionArguments: true,
    context: {
      tableData: {},
      partialCtx: {},
      header: {},
      mBoolean: false,
      errorMessage: "",
      receiveTranModeList: [],
      receiveRptList: [],
      listOfStatus: [],
      receiveChannelList: [],
      listofValidateAccount: [],
      receiveidentityTypeList: [],
      insertRequestLogRequest: {},
      searchParameters: {},
      insertionLogRequestParameters : [],
      validateParameters: {},
      eprcSearchParameters: {},
    },
    states: {
      Idle: {
        on: {
          INIT: {
            actions: [
              "receiveHeader",
            ],
            target: "FetchTransMode",
          },
        },
      },
      FetchTransMode: {
        entry: [
          "spawnFetch", // API CALLING
          async (context) => {
            trigger(
              context,
              listOfTransMode,
              "GET",
              {
                req_branchCode: "1025",
                isActive: 1,
                res_response : "RequestTypeId,RequestTypeName,RequestTypeDescription,isActive,createdBy,createDate,createTime"
              },
              "FETCH_SUCCESS",
              "FETCH_FAILURE"
            );
          },
        ],
        on: {
          FETCH_SUCCESS: {
            actions: [
              "receiveTranModeList",
            ],
            target: "FetchChannelList",
          },
          FETCH_FAILURE: {
            actions: [
              "receiveErrorMessage",
              "sendPartialCtx",
            ],
            target: "MegaSet681",
          },
        },
      },
      FetchChannelList: {
        entry: [
          "spawnFetch", // API CALLING
          async (context) => {
            trigger(
              context,
              listOfChannels,
              "GET",
              {
                req_branchCode: "1025",
                isActive: 1,
                res_response: "channelId,channelName,channelDescription,isActive,createdBy,createDate,createTime"
              },
              "FETCH_SUCCESS",
              "FETCH_FAILURE"
            );
          },
        ],
        on: {
          FETCH_SUCCESS: {
            actions: [
              "receiveChannelsList",
            ],
            target: "FetchIdentityType",
          },
          FETCH_FAILURE: {
            actions: [
              "receiveErrorMessage",
              "sendPartialCtx",
            ],
            target: "MegaSet681",
          },
        },
      },
      FetchIdentityType: {
        entry: [
          "spawnFetch",
          async (context) => {
            trigger(
              context,
              listOfidentificationType,
              "GET",
              {
                req_branchCode: "1025",
                isActive: 1,
                res_response: "IdentificationTypeId,IdentificationTypeName,IdentificationTypeDescription,isActive,createdBy,createDate,createTime"
              },
              "FETCH_SUCCESS",
              "FETCH_FAILURE"
            );
          },
        ],
        on: {
          FETCH_SUCCESS: {
            actions: [
              "receiveIdentityType",
              "loadData",
              "setmbooleanFalse",
              "sendPartialCtx",
            ],
            target: "MegaSet681",
          },

          FETCH_FAILURE: {
            actions: [
              "setmbooleanFalse",
              "receiveErrorMessage",
              "sendPartialCtx",
            ],
            target: "MegaSet681",
          },
        },
      },
      PostData: {
        entry: [
          "spawnFetch",
          async (context) => {
            trigger(
              context,
              insertRequestLog,
              "POST",
              // context.searchParameters,
              context.insertionLogRequestParameters,
              "FETCH_SUCCESS",
              "FETCH_FAILURE"
            );
          },
        ],
        on: {
          FETCH_SUCCESS: {
            actions: [
              "receiveValidateParameters",
              "receivePostRequest",
              "loadPostRequest",
              "setmbooleanFalse",
              "receiveErrorMessage",
            ],
            target: "FetchBackOfficeRpt",
          },

          FETCH_FAILURE: {
            actions: [
              "setmbooleanFalse",
              "receiveErrorMessage",
              "sendPartialCtx",
            ],
            target: "MegaSet681",
          },
        },
      },
      FetchBackOfficeRpt: {
        entry: [
          "spawnFetch",
          async (context) => {
            trigger(
              context,
              fetchEprcRpt,
              "GET",
              context.eprcSearchParameters,
              "FETCH_SUCCESS",
              "FETCH_FAILURE"
            );
          },
        ],
        on: {
          FETCH_SUCCESS: {
            actions: [
              "receiveTranModeList",
              "loadEprcInfo",
              "sendPartialCtx"
            ],
            target: "MegaSet681",
          },
          FETCH_FAILURE: {
            actions: ["receiveErrorMessage", "sendPartialCtx"],
            target: "MegaSet681",
          },
        },
      },

      MegaSet681: {
        on: {
          SEARCH: {
            actions: [
              "setmbooleanFalse",
              "receiveSearchParameters",
              "receiveRequestType",
              "receiveEprcSearchParameters"
            ],
            target: "PostData",
          },
          SUBMIT: {
            actions: [
              "setmbooleanFalse",
              "receiveRequestType",
            ],
            target: "MegaSet681",
          },
          BACK: {
            target: "Final",
          },
          KILL: {
            target: "Final",
          },
          EXIT: {
            target: "Final",
          },
        },
      },

      Final: {
        type: "final",
        entry: ["sendPartialCtx"],
      },
    },
  },
  {
    actions: {
      receiveHeader: assign({
        header: (context, event) => {
          console.log("Header Response : ", event.header);
          return event.header;
        },
      }),
      receivePostParameters: assign({
        insertRequestLogRequest: (context, event) => {
          console.log("insertRequestLogRequest: ", event.result);
          return event.result;
        },
      }),

      receiveSearchParameters: assign({
        searchParameters: (context, event) => {
          console.log("---------");
          console.log("insertRequestLogRequest: ", event.request);
          context.insertionLogRequestParameters.push(event.request)
          console.log("Insertion Log Rquests Paramters : ", context.insertionLogRequestParameters);
          return event.request;
        },
      }),

      receiveEprcSearchParameters: assign({
        eprcSearchParameters: (context, event) => {
          console.log("---------");
          const request = {};

          // Account Transfer Option 

          if (event.request.requestTypeId == 1) {

            request.branchCode = "1026";

            console.log("when account transfer request Id type value : ", event.request.requestTypeId)

            if (event.request.channelId != 0) {
              console.log("when channel also provided by front-end ")
              request.channel = event.request.channelId;
            }

            if (event.request.targetBranchCode != 0) {
              console.log("when target branchCode also provided by front-end ")
              request.targetBranchCode = event.request.targetBranchCode;
            }

            if (event.request.accountNumber != "") {
              console.log("when account number also provided by front-end ")
              request.beneAccountNo = event.request.wlAccountNo;
            }

            if (event.request.iban != "") {
              console.log("when iban number also provided by front-end ")
              request.beneIban = event.request.iban;
            }

            request.fromDate = event.request.requestDateFrom;
            request.toDate = event.request.requestDateTo;
          }

          // Cash Over Counter Request Option Option 
          if (event.request.requestTypeId == 2) {

            request.branchCode = "1026";

            console.log("when cash over counter transaction request Id type value : ", event.request.requestTypeId)

            if (event.request.channelId != 0) {
              console.log("when channel also provided by front-end ")
              request.channel = event.request.channelId;
            }

            request.identityType = event.request.idenityNumberType;
            request.identityNo = event.request.idDocumentNumber;
            request.fromDate = event.request.requestDateFrom;
            request.toDate = event.request.requestDateTo;
          }

          console.log("Searching Request Payload : ", request);
          return request;
        },
      }),

      receiveValidateParameters: assign({
        validateParameters: (context, event) => {
          console.log("---------");
          console.log("Response from Service Valid Account Number: ", context.searchParameters.accountNumber);
          return event.request;
        },
      }),

      loadData: assign({
        partialCtx: (context, event) => {
          let partialCtxClone = Object.assign({}, context.partialCtx);

          console.log("Mode Of Transaction List : ", context.megaset681.receiveTranModeList);
          console.log("Channel List : ", context.megaset681.receiveChannelList);
          console.log("Identification Document Type List : ", context.megaset681.listOfStatus);

          partialCtxClone.listOfStatus = context.megaset681.listOfStatus;
          partialCtxClone.receiveTranModeList = context.megaset681.receiveTranModeList;
          partialCtxClone.receiveChannelList = context.megaset681.receiveChannelList;
          partialCtxClone.header = context.header;
          return partialCtxClone;
        },
      }),

      loadEprcInfo: assign({
        partialCtx: (context, event) => {
          let partialCtxClone = Object.assign({}, context.partialCtx);
          partialCtxClone.records = context.megaset681.receiveTranModeList;
          console.log("PRC Info Detail : " , context.megaset681.receiveTranModeList);
          return partialCtxClone;
        },
      }),


      loadEprcRptList: assign({
        partialCtx: (context, event) => {
          let partialCtxClone = Object.assign({}, context.partialCtx);
          partialCtxClone.records = context.megaset681.receiveRptList;
          console.log("PRC Back Office Reprt List : " , context.megaset681.receiveRptList);
          return partialCtxClone;
        },
      }),

      receiveRequestType: assign({
        requestType: (context, event) => {
          console.log(event.requestType);
          return event.requestType;
        },
      }),
      receiveTranModeList: assign({
        megaset681: (context, event) => {
          let megaset681Clone = Object.assign({}, context.megaset681);
          megaset681Clone.receiveTranModeList = event.result;
          return megaset681Clone;
        },
      }),

      receiveEprcRptList: assign({
        megaset681: (context, event) => {
          let megaset681Clone = Object.assign({}, context.megaset681);
          megaset681Clone.receiveRptList = event.result;
          return megaset681Clone;
        },
      }),


      receiveChannelsList: assign({
        megaset681: (context, event) => {
          let megaset681Clone = Object.assign({}, context.megaset681);
          megaset681Clone.receiveChannelList = event.result;
          return megaset681Clone;
        },
      }),
      receiveIdentityType: assign({
        megaset681: (context, event) => {
          let megaset681Clone = Object.assign({}, context.megaset681);
          megaset681Clone.listOfStatus = event.result;
          return megaset681Clone;
        },
      }),

      receiveAccountDetail: assign({
        megaset681: (context, event) => {
          let megaset681Clone = Object.assign({}, context.megaset681);
          megaset681Clone.listofValidateAccount = event.result;
          return megaset681Clone;
        },
      }),


      receiveResponse: assign({
        responseData: (context, event) => {
          return event.result;
        },
      }),

      receivePostRequest: assign({
        postRequest: (context, event) => {
          console.log("Receive Insert Response ", event.result);
          return event.result;
        },
      }),
      loadPostRequest: assign({
        partialCtx: (context, event) => {
          let partialCtxClone = Object.assign({}, context.partialCtx);
          partialCtxClone.receivePostRequest = context.postRequest;
          return partialCtxClone;
        },
      }),

      loadValidateData: assign({
        partialCtx: (context, event) => {
          let partialCtxClone = Object.assign({}, context.partialCtx);
          partialCtxClone.receiveAccountDetail = context.megaset681.listofValidateAccount;

          return partialCtxClone;
        },
      }),
      receiveErrorMessage: assign({
        partialCtx: (context, event) => {
          let partialCtxClone = Object.assign({}, context.partialCtx);
          partialCtxClone.errorMessage = event.errorMessage;
          partialCtxClone.mBoolean = event.mBoolean;
          return partialCtxClone;
        },
      }),

      spawnFetch: assign({
        fetch: () => spawn(FetchActor),
      }),
      setmbooleanFalse: assign({
        errorMessage: () => "",
        mBoolean: () => false,
      }),
    },
  }
);

module.exports = TLR_EPRC_SPRC_INQ_UC3_RPT_EPRC;
