import http, { createServer } from 'http'

//The port that the server is listiening on
const port = process.env.PORT || 3000;

//The created server. Need to handle the data of the spycite
const server = new createServer((req,res) => {
    res.statusCode = 200;

});

//Routing for the server
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

//Console.log the data that gets parsed from the mouse over.
