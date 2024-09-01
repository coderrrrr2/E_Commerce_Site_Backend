const { randomInt } = require('crypto');
const fs = require('fs');




const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write('<head><title>My First Page</title><head>');
      res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
      res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
      res.write('</html>');
     return  res.end();
      }
      if(url === "/users"){
        res.write('<html>');
        res.write('<head><title>My First Page</title><head>');
        res.write('<body><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul></body>');
        res.write('</html>');
        return res.end();
      }
      if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
          console.log(chunk);
          body.push(chunk);
        });
        req.on('end', () => {
          const parsedBody = Buffer.concat(body).toString();
          const message = parsedBody.split('=')[1];
        //   let number = randomInt(1, 100);
        //   console.log(number);
          fs.writeFileSync(`message.txt`, message);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      }
    
      
     
};


exports.handler = requestHandler;



