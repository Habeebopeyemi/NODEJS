/*
****************

Core Modules:

--> http - Launch a server, send requests
--> https - Launch a SSL server
--> fs - 
--> path
--> os

****************
 */
// importing http, fs module from nodejs
const http = require("http");
const { requestHandler } = require("./route");

// create a server from the http
const server = http.createServer(requestHandler);

// listen to the server
server.listen(3000);
