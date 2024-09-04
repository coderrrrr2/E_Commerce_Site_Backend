const http = require('http');



const server = http.createServer(routes.handler);

server.listen(3001);