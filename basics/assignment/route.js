const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>create a user</title></head>");
    res.write(
      "<body><form  action = '/create-user' method='POST'><h1>Welcome to root url</h1><ul><li>First user</li><li>Second user</li></ul><input type='text' name='username'><button type='submit'>create</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", chunk => {
      //   console.log(chunk);
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      //   console.log(parsedBody);
      const username = parsedBody.split("=")[1];
      console.log(username);
    });
  }
};

exports.route = requestHandler;
