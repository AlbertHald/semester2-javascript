import net from 'net'



const server = net.createServer((socket) => {
    let addr = socket.address();
    console.log("%s: %d connected", addr.address, addr.port);
    socket.on('data', () => {
        console.log(data.toString());
    });

    socket.write(`
    <!DOCTYPE html>
    <html>
    <head>title = "Mkonei"</head>
    <body><h1>Hello World FUCKING LORTE PIS</h1></body>
    </html>
    `);

    socket.end("You are " + addr.address + ":" + addr.port + "\n");
});

server.listen(8000);
