const express = require('express');

const app = express();



app.use('/add-product',(req, res, next) => {
    console.log('In the another middleware');
    res.send('<h1>Add Product Page</h1>');

});


app.use('/',(req, res, next) => {
    console.log('In the another middleware');
    res.sendFile(__dirname + '/index.html');

});

app.listen(3000);




