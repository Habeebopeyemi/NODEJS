const http = require("http");
const { requestHandler } = require("./route");

// create a server from the http
const server = http.createServer(requestHandler);

// listen to the server
server.listen(3000);
