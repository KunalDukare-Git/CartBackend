'ude strict';

require('@babel/polyfill');
require('@babel/register');

const config = require('../config');
const configValue = config.get("staging");

const port = configValue.api_port;

const app = require('../app').default;
const http = require('http');


const server = http.createServer(app);
server.listen(port);

server.on("listening",()=>{
    console.log("Listening to port :",port)
})