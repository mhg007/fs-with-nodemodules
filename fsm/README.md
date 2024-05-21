# Replace this text with USE_CASE_IDENTIFIER_IN_ALL_CAPS
Change the heading of this section to your use case name. For example if your use case identifier is ```OBS_CC_UC5_CC_RC_FSM``` then the heading should be ```OBS_CC_UC5_CC_RC_FSM```. Also write a brief 
overview of your use case. You can also remove the CURL example given in the ```Running``` section.
## Prerequisites
### NodeJS
This is a [Node.js](https://nodejs.org/) project written in [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript). Before getting started you must download, and install [Node.js](https://nodejs.org/en/download/)(16.13 or higher).

### NPM Registry
You need to config npm to fetch modules from Teresol's npm registry. Please ask for these instructions for your team lead.

### Docker
For ```containerization``` you must install [Docker](https://docs.docker.com/engine/install/) on your system.

## Running
To run this project: 
1. ```git clone``` this project to any location on your machine
2. Run ```npm install``` to download required ```node_modules```
3. Run ```node server``` to serve the project on your machine

You can use CURL to send a test http request.    

**NOTE: This request is on multiple lines for readibility. Follow CURL syntax rules).**

```bash
curl -X POST http://localhost:3500/fsm/USE-CASE-IDENTIFIER
-H "Content-Type: application/json"  
-H "Authorization: Bearer <token>" 
-d '{ 
      "transition":"INIT", 
      "data":{ 
            "header" : { 
                "loginBranch" : 1001, 
                "loginUserId": "USERNAME", 
                "loginUserBatch": 100, 
                "activityCode": "FVIEWLST", 
                "loginBranchDate":"2022-07-04" 
            } 
       } 
    }'
```

**Note: For above request you will need an authorization token. Also replace values in ```header``` with correct
values for your use case. The above values are just for example.**


This will give you the following sample response:

```json
{
    "header":{
        "loginBranch" : 1001, 
        "loginUserId": "USERNAME", 
        "loginUserBatch": 100, 
        "activityCode": "FVIEWLST", 
        "loginBranchDate":"2022-07-04"
    },
    "megaSet18":{},
    "megaSet17":{},
    "mBoolean":false,
    "errorMessage":"",
    "message":"Hello world from Sample Machine!"
}
```

## Conventions
- All machines (including spawned machines like actors) must be named in PascalCase.
- All events and the main machine must be named in ALL_CAPS_SNAKE_CASE.
- All file names (except main machine file), actions, functions and variables must be in camelCase.
- All actors reside in the actors directory. The principle is one actor per file.
- Every directory must have a base.js file that exports all modules contained in that directory.
- The context property that contains the reference of spawned FetchActor must always be named 'fetch'.
- Specify all urls in urls.js file as per the given format. See the example in node_modules/@teresol-v2/fsm/README.md
for service.js and fetchActor.js

## Environments
Application settings are defined in the environment ```.env``` environment file. Certain properties are set via
environment variables. Some important settings are:
- API_GATEWAY specifies the api gateway
- AUTH_TOKEN_KEYCLOAK specifies the keycloak instance
- AUTH_TOKEN_SERVER specifies the authentication token server
- API_VERSION for which the urls should be generated. If undefined then urls will be generated without version identifier
- ALLOWED_ORIGIN for CORS. The default is only an example. Should be updated to correct value as per your environment

## Containerization
This section shows how to build and save docker images. Replace ```<use-case-name>``` and ```tag``` with the name
and tag of your image. 
1. The image name should be same as the name of the use case.  
2. The image name should be in kebab-case.
3. It should be all lower case.

Building an image
```bash
docker build . -t harbor.teresol.com/fsm/<use-case-name>:<tag>
```

Saving an image as tar
```bash
docker save . -t harbor.teresol.com/fsm/<use-case-name>:<tag>.tar -o <some-location-on-your-disk>
```
