'use strict'
//SEE: https://javascript.info/strict-mode

function jsonParse(response){
  if(response.ok) 
     if(response.headers.get("Content-Type") === "application/json") 
       return response.json();
     else throw new Error("Wrong Content Type");   
 else 
    throw new Error("Non HTTP OK response");
}

function jsonFetch(url){
  return  fetch(url).then(jsonParse);
}


function jsonPost(url = '', data={}){
  const options={
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
    };
  return fetch(url,options).then(jsonParse);
}


console.log("JS er klar!");



function extractBeerEvalData(){
  let beerEvalData={};
  beerEvalData.evaluatorName=document.getElementById("name_id").value;
  beerEvalData.beerName= document.getElementById("beers_menu_id").value;
  beerEvalData.score=Number(document.getElementById("score_id").value);
  console.log("Extracted"); console.log(beerEvalData);
  return beerEvalData;
}

function extractBeerCreation() {
  let beerCreationData = {};
  beerCreationData.creatorName = document.getElementById("creatorName_id").value;
  beerCreationData.beerName = document.getElementById("newBeer_id").value;
  console.log("Extracted"); console.log(beerCreationData);
  return beerCreationData;
}

function sendEvalData(event) {
  event.preventDefault(); //we handle the interaction with the server rather than browsers form submission
  document.getElementById("evaluateBtn_id").disabled=true; //prevent double submission
  let drinkData=extractBeerEvalData();

  jsonPost(document.getElementById("beerEvalForm_id").action,drinkData).then(evalStatus=>{
    console.log("Status="); console.log(evalStatus); //expect an date object. 
    document.getElementById("evaluateBtn_id").disabled=false;
  }).catch(e=>console.log("Ooops "+e.message));
}

function sendBeerCreation(event) {
  event.preventDefault();
  document.getElementById("createBtn_id");

  let createData = extractBeerCreation();

  jsonPost(document.getElementById("beerCreation_id").action, createData).then(createStatus => {
    console.log("Status="); console.log(createStatus);
    document.getElementById("createBtn_id");
    if (createStatus) {
      alert("Beer is created!");
    } else {
      alert("Beer already created!");
    }
  }).catch(e=>console.log("Ooops "+e.message));
}

document.getElementById("beerEvalForm_id").addEventListener("submit", sendEvalData);
//Send the beer creation data
document.getElementById("beerCreation_id").addEventListener("submit", sendBeerCreation);

//A fetch that retrives the list of beers and updates the beer select window
function retriveBeers() {
  console.log("I have been called");
  
  jsonFetch("beers").then((beer)=>{
    console.log("Object recived: "); console.log(beer); //expect an empty object. 
    beer.beers.forEach(element => {
      document.getElementById("beers_menu_id").value.replaceChildren(element);
      document.getElementById("beers_menu_id").text.replaceChildren(element);
    });
    //Set Output to the new bac value fetched from server
    
  }).catch(e=>console.log("Ooops "+e.message));
}

setInterval(retriveBeers, 5000);