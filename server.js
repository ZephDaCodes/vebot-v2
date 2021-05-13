const express = require('express');

const server = express();

server.all('/', (req, res)=>{
    res.send('VE is online!')
});

function keepAlive(){
    server.listen(3000, ()=>{console.log("VE lives yo!")});
}

module.exports = keepAlive;