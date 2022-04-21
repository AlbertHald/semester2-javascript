import http from 'http';
const hostname= '127.0.0.1'
const port = '8080'

const server = http.createServer(function requestHandle(req, res) {
    try {
        processReq(req,res);
    } catch (error) {
        console.log("internal Error: " + error);
        errorRespone(res,500,"");
    }
});

function errorRespone(res, code, reason) {
    res.statuscode=code;
    res.setHeader('Content-Type', 'text/txt');
    res.write(reason);
}

