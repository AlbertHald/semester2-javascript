console.log("Hello World")

//Print Half a pyramid
const MAXROW = 7;
let hash = "";
for(let i=0; i < MAXROW; i++) {
  	console.log(hash+="#");
}

//make 8x8 chess table
const CHESS_ROW = 8;
let string = "";
for (let i = 0; i < CHESS_ROW; i++) {
    for(let j = 0; j < CHESS_ROW; j++){
        if (i % 2 == 1) {
           j % 2 == 1 ? string += " ": string += "#";
        }
        else {
            j % 2 == 1 ? string += "#": string += " ";
        }
    }
    j = 0;
    string += "\n";
}
console.log(string);

//f-string
function renderPage(title,heading,demoString) {

    return `<!DOCTYPE html>
    <html lang="da">
        <head>
            <meta charset="utf-8">
            <title>${title}</title>
        </head>
        <body>
            <!-- page content -->
            <h1>${heading}</h1>
            <script>
            console.log("${demoString}");
            </script>
        </body>
    </html>`
} 

renderPage("Simpel IWP Demo", "IWP demo","JS Script er kørt");
console.log(renderPage("Simpel IWP Demo", "IWP demo","JS Script er kørt"));

//Compute average length og strings Addis huge slkong
let strings=["Hejsa", "med", "dig!"];
console.log(averagelength(strings));

function averagelength(array) {
    let sumOfStrings = 0;
    for (let str of array) {
        sumOfStrings += str.length;
    }
    return sumOfStrings/array.length;
} 

