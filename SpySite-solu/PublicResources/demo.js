'use strict'
//SEE: https://javascript.info/strict-mode


async function post_data(data) {
  let response = await fetch('http://127.0.0.1:3000/spy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: data
  });

  if(response.ok) {
    let body = await response.json();
    return("server answered: " + JSON.stringify(body));
  } else {
    throw new Error("HTTP-Error: " + response.status)
  }
}


function sendSpyData(ev) {
	post_data(JSON.stringify(ev.currentTarget.id))
	.then(console.log).catch(console.log);
}


for (let el of document.querySelectorAll("div, img, a")) {
	el.addEventListener("mouseover", sendSpyData);
}
