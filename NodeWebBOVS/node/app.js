
//We use EC6 modules!
import {extractJSON, fileResponse, htmlResponse,extractForm,jsonResponse,errorResponse,reportError,startServer} from "./server.js";
export {ValidationError, NoResourceError, processReq};

const ValidationError="Validation Error";
const NoResourceError="No Such Resource";

startServer();


/* ****************************************************************************
 * Application code for the BØVS application 
 ***************************************************************************** */
function round2Decimals(floatNumber){
  return Math.round(floatNumber*100)/100;
 }

//constants for validating input from the network client
const maxScore=10;
const minScore=1;
const minNameLength=1;
const maxNameLength=30;
const minBeerLength=1;
const maxBeerLength=30;


//function that validates the constraints of the beer evaluation Form
function validateEvalForm(beerEvaluationFormData){
  let evaluatorNameLen;
  let evaluatorName;
  let beerNameLen;
  let beerName;
  let score; 
  
  try {
    evaluatorNameLen=beerEvaluationFormData.evaluatorName.length;
    evaluatorName=beerEvaluationFormData.evaluatorName;
    beerNameLen=beerEvaluationFormData.beerName.length;
    beerName=beerEvaluationFormData.beerName;    
    score=Number(beerEvaluationFormData.score);
  }
  catch(e) {console.log (e);throw (new Error(ValidationError));}

    if(
      (evaluatorNameLen>=minNameLength) && (evaluatorNameLen<=maxNameLength) &&
      (beerNameLen>=minBeerLength) && (beerNameLen<=maxBeerLength) &&
      (minScore <= score) && (score <=maxScore) && 
      lookup(beerName)
      ){
      let beerData={evaluatorName: evaluatorName, beerName:beerName, score:score};
      return beerData;
    } 
    else throw(new Error(ValidationError));
 }

 function validateCreateForm(beerCreateFormData){
  let creatorName;
  let creatorNameLen;
  let beerName;
  let beerNameLen;
  
  try {
    creatorNameLen=beerCreateFormData.creatorName.length;
    creatorName=beerCreateFormData.creatorName;
    beerNameLen=beerCreateFormData.beerName.length;
    beerName=beerCreateFormData.beerName;    
  }
  catch(e) {console.log (e);throw (new Error(ValidationError));}

    if(
      (creatorNameLen>=minNameLength) && (creatorNameLen<=maxNameLength) &&
      (beerNameLen>=minBeerLength) && (beerNameLen<=maxBeerLength)
      ){
      let beerCreateFormData={creatorName: creatorName, beerName:beerName};
      console.log(beerCreateFormData);
      return beerCreateFormData;
    } 
    else throw(new Error(ValidationError)); 
 }

/* "Databases" emulated by maintained an in-memory arrays. 
  One DB "beersDB" for the registered beer names, and one "beerScoresDB" for the evaluations.  
   Higher index means newer data record: you can insert by simply 'push'ing new data records 
*/
//insert some sample data 
let beer1={creatorName: "Mickey", beerName:"Porse Guld"};
let beer2={creatorName: "Michele", beerName:"Limfjords Porter"};
let beer3={creatorName: "Mickey", beerName:"Thy Økologisk Humle"};
let beer4={creatorName: "Brian", beerName:"Fur Bock"};

let beersDB=[
  beer1,beer2,beer3,beer4
 ];

 function lookup(){
     return beersDB.find(e=>e.beerName ===beerName)
  }

    
//insert some sample data 
 let eval1={evaluatorName: "Mickey", beerName:"Porse Guld", score:3};
 let eval2={evaluatorName: "Mouse", beerName:"Porse Guld", score:7};
 let eval3={evaluatorName: "Mickey", beerName:"Limfjords Porter", score:10};

let beerScoresDB=[
  eval1,eval2,eval3
];

//Adds information about a new beer to the database
//A record consist of validated form data.
function recordBeer(beerData){
  if(!lookup(beerData.beerName)){
    beersDB.push(beerData);
    console.log(beerData);
    return true;
  } 
  else 
    return false; //beer already exists
}

//A function that computes and teurn an array of the currently registered beer names
function getBeers() {
  let beerNames = [];
  for (let i = 0; i < beersDB.length; i++) {
    beerNames.push(beersDB[i].beerName);
  }
  return beerNames;
}


//Adds information about a new evaluation to the database
//A record consist of validated form data.
function recordEvaluation(beerData){
  beerScoresDB.push(beerData);
  console.log(beerScoresDB);
  return new Date(); //return time of insert: not used in exercise. 
}


/* *********************************************************************
   Setup HTTP route handling: Called when a HTTP request is received 
   ******************************************************************** */
function processReq(req,res){
  console.log("GOT: " + req.method + " " +req.url);

  let baseURL = 'http://' + req.headers.host + '/';    //https://github.com/nodejs/node/issues/12682
  let url=new URL(req.url,baseURL);
  let searchParms=new URLSearchParams(url.search);
  let queryPath=decodeURIComponent(url.pathname); //Convert uri encoded special letters (eg æøå that is escaped by "%number") to JS string

  switch(req.method){
    case "POST": {
      let pathElements=queryPath.split("/"); 
      console.log(pathElements[1]);
       switch(pathElements[1]){
        case "beers": 
        extractJSON(req)
        .then(beerCreateFormData => validateCreateForm(beerCreateFormData))
        .then(beerData => jsonResponse(res,recordBeer(beerData)))
        .catch(err=>reportError(res,err));
        break;
        case "beerEvaluations": 
          extractJSON(req)
          .then(beerEvaluationFormData => validateEvalForm(beerEvaluationFormData))
          .then(beerData => jsonResponse(res,recordEvaluation(beerData)))
          .catch(err=>reportError(res,err));
          break;
        default: 
          console.error("Resource doesn't exist");
          reportError(res, NoResourceError); 
        }
      } 
      break; //POST URL
    case "GET":{
      let pathElements=queryPath.split("/"); 
      console.log(pathElements);
      //USE "sp" from above to get query search parameters
      switch(pathElements[1]){     
        case "": // 
           fileResponse(res,"/html/bovs.html");
           break;
        case "date":{ // 
          let date=new Date();
          console.log(date);
          jsonResponse(res,date);
        }
        break;
        case "beers":

          let data = {beers: getBeers()};
          console.log(data);
          jsonResponse(res,data);
          break;
        default: //for anything else we assume it is a file to be served
           fileResponse(res, req.url);
         break;
      }//path
    }//switch GET URL
    break;
    default:
     reportError(res, NoResourceError); 
  } //end switch method
}


