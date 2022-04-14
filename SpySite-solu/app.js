const http = require('http');
const fs=require("fs");
const path=require("path");
const util = require('util')

const hostname = '127.0.0.1';
const port = 3000;

const publicResources="PublicResources/";
//secure file system access as described on 
//https://nodejs.org/en/knowledge/file-system/security/introduction/
const rootFileSystem=process.cwd();
function securePath(userPath){
  if (userPath.indexOf('\0') !== -1) {
    // could also test for illegal chars: if (!/^[a-z0-9]+$/.test(filename)) {return undefined;}
    return undefined;

  }
  userPath = path.normalize(userPath).replace(/^(\.\.(\/|\\|$))+/, '');
  userPath= publicResources+userPath;

  let p = path.join(rootFileSystem,path.normalize(userPath)); 
  return p;
}

function fileResponse(filename,res){
  const sPath=securePath(filename);
  console.log("Reading:"+sPath);
  fs.readFile(sPath, (err, data) => {
    if (err) {
      console.error(err);
      res.statusCode=404;
      res.setHeader('Content-Type', 'text/txt');
      res.write("File Error:"+String(err));
      res.end("\n");
    }else {
      res.statusCode = 200;
      res.setHeader('Content-Type', guessMimeType(filename));
      res.write(data);
      res.end('\n');
    }
  })
}
const server = http.createServer((req, res) => {
  let date=new Date();
  console.log("GOT: " + req.method + " " +req.url);
  if(req.method=="GET"){
    switch(req.url){
      case "/":    
       fileResponse("index.html",res);
      break;
    default:
      fileResponse(req.url,res);
      break;
    }
  } else if(req.method=="POST" && req.url=="/spy") {
		let spydate=new Date();

        let body = "";
        req.on("data", function (chunk) {
            body += chunk;
        });

        req.on("end", function(){
			let spyfile = path.join(rootFileSystem, "spylog.txt");
			let spymsg = JSON.stringify(spydate) + ", " + req.socket.remoteAddress+":"+ req.socket.remotePort+ ", "+ body;
			console.log(spymsg);
			fs.appendFile(spyfile, spymsg+"\n", err => {
				if (err) throw err;
					console.log('Saved!');
			});

            res.writeHead(200, { "Content-Type": "text/html" });
            console.log("I have just spied: ", spymsg)
            res.end(JSON.stringify(spymsg));
        });
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end('\n');
  }
});

//better alternative: use require('mmmagic') library
function guessMimeType(fileName){
  const fileExtension=fileName.split('.').pop().toLowerCase();
  console.log(fileExtension);
  const ext2Mime ={ //Aught to check with IANA spec
    "txt": "text/txt",
    "html": "text/html",
    "ico": "image/ico", // CHECK x-icon vs image/vnd.microsoft.icon
    "js": "text/javascript",
    "json": "application/json", 
    "css": 'text/css',
    "png": 'image/png',
    "jpg": 'image/jpeg',
    "wav": 'audio/wav',
    "mp3": 'audio/mpeg',
    "svg": 'image/svg+xml',
    "pdf": 'application/pdf',
    "doc": 'application/msword',
    "docx": 'application/msword'
   };
    //incomplete
  return (ext2Mime[fileExtension]||"text/plain");
}


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//https://www.w3schools.com/nodejs/nodejs_url.asp

