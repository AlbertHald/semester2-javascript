

//Sørg for at alle values ar

for (const element of document.querySelectorAll('img, div, a')) {
    element.addEventListener("mouseover", sendData);
}

function sendData(event) {
    postData(JSON.stringify(event.currentTarget.id)).then(console.log).catch(console.log);
}

//Sender en post request
async function postData(data) {
    //Make the post request
    let response = await fetch('http://127.0.0.1/8080/spy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    if (response.ok) {
        let body = await response.json();
        return('Server recived: ' + JSON.stringify(body));
    } else {
        throw new Error("HTTP-Error: " + response.status)
    }
}
