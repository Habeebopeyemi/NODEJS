const fs = require("fs");

const requestHandler = (req, res) => {
  //   console.log(req.url, req.method, req.headers);
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter message</title></head>");
    res.write(
      "<body><form action='/message' method = 'POST'><input type='text' name='message'><button>send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    // 'on method' always triggered whenever there is an event
    req.on("data", chunk => {
      //   console.log(chunk);
      body.push(chunk);
    });

    return req.on("end", () => {
      //returning the on method is necessary, so as to prevent omission of this block before headers are set.
        // console.log(Buffer);
      const parsedBody = Buffer.concat(body).toString();
      //   console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, err => {
        res.statusCode = 302; //status code for redirecting
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = { requestHandler };
