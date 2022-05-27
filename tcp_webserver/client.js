import { Socket } from 'dgram';
import { maxHeaderSize } from 'http';
import net from 'net'

const client = new net.Socket();

client.connect({port: 8000, host: process.argv[2]}, () => {
    client.write('GET / HTTP/1.0\r\n\r\n');
});
client.on('data', (data) => {
    console.log("Recived:\n" + data.toString('utf-8'));
});

