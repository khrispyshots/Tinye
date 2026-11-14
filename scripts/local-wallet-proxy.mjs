// NEAR Auth's shared testnet client accepts http://localhost:3000 callbacks.
// Reuse the dev server and its cache instead of running a second Next.js build.
import http from 'node:http';
import net from 'node:net';
const accepted = new Set(['localhost:3000', '127.0.0.1:3000']);
const server = http.createServer((request, response) => {
  if (!accepted.has(request.headers.host) || !request.url?.startsWith('/')) {
    response.writeHead(400); response.end('Invalid local preview host.'); return;
  }
  const upstream = http.request({ hostname:'127.0.0.1', port:3010, method:request.method, path:request.url, headers:request.headers }, result => {
    response.writeHead(result.statusCode || 502, result.headers); result.pipe(response);
  });
  upstream.setTimeout(180000,()=>upstream.destroy());
  upstream.on('error',()=>{if(!response.headersSent)response.writeHead(502,{'Content-Type':'text/plain'});response.end('Start the Tinye development server on port 3010, then refresh.');});
  request.on('aborted',()=>upstream.destroy()); request.pipe(upstream);
});
server.on('upgrade',(request,socket,head)=>{
  if(!accepted.has(request.headers.host)){socket.destroy();return;}
  const upstream=net.connect(3010,'127.0.0.1',()=>{
    upstream.write(`${request.method} ${request.url} HTTP/${request.httpVersion}\r\n`);
    for(let i=0;i<request.rawHeaders.length;i+=2)upstream.write(`${request.rawHeaders[i]}: ${request.rawHeaders[i+1]}\r\n`);
    upstream.write('\r\n'); if(head.length)upstream.write(head); socket.pipe(upstream); upstream.pipe(socket);
  });
  upstream.on('error',()=>socket.destroy()); socket.on('error',()=>upstream.destroy()); socket.on('close',()=>upstream.destroy());
});
server.listen(3000,'127.0.0.1',()=>console.log('Tinye embedded-wallet preview: http://localhost:3000 (forwards to port 3010)'));
