import http from 'http';
import fs from 'fs';

const hostname= '127.0.0.1'
const port = '8080'

const server = http.createServer(requestHandle);

function requestHandle(req, res) {
    try {
        /* res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('resources/cite.html', (error, data)=> {
            if (error) {
                res.writeHead(404);
                res.write('Error: Page not found');
            } else {
                res.write(data);    
            }
            res.end();
        }) */
        
        processReq(req,res);
    } catch (error) {
        console.log("internal Error: " + error);
        //errorRespone(res,500,"");
    }
};

//Handles the requests.
function processReq(req,res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('resources/cite.html', (error, data)=> {
        if (error) {
            //Send status 404 (Not found)
            res.writeHead(404);
            res.write('Error: File not found');
        } else {
            res.write(data);
        }
        res.end();
    });
}

/* function errorRespone(res, code, reason) {
    res.statuscode=code;
    res.setHeader('Content-Type', 'text/txt');
    res.write(reason);
} */

server.listen(port, hostname, (error) => {
    if(error) {
        console.log(error);
    } else {
        console.log(`Server is listening on: http://${hostname}:${port}/`);
    }
});