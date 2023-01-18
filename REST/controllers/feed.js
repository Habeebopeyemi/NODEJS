const getAuth = (req, res, next) => {
  res.status(200).json({
    logged_in_user: [
      {
        username: "deveeb",
        email: "opeyemihabeeb4@gmail.com",
      },
    ],
  });
};

const postAuth = (req, res, next) => {
  const { username, password, email } = req.body;
  //   const username = req.body.username;

  res.status(201).json({
    message: "registration successful!!!",
    post: {
      id: new Date().toISOString(),
      username: username,
      email: email,
    },
  });
};

exports.getAuth = getAuth;
exports.postAuth = postAuth;
