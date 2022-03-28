import http from 'http';
const hostname= '127.0.0.1'
const port = '8080'

const server = http.createElement(function requestHandle(req, res) {
    try {
        processReq(req,res);
    } catch (error) {
        console.log("internal Error: " + error);
        errorRespone()
    }
});

function errorRespone(res, code, reason) {
    res.statuscode=200;
    res.setHeader('Content-Type', 'application/json')
}

