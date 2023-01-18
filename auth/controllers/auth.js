const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const sendgridMail = require("@sendgrid/mail");
// const nodemailer = require("nodemailer");
// const sendgridTransport = require("nodemailer-sendgrid-transport");

// const transporter = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
//       api_key:
//         "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",
//     },
//   })
// );
const User = require("../models/user");
dotenv.config();
sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);
// sendgridMail.setApiKey(
//   "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"
// );

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  /* flash() will return array whether,
  there is message or not */
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
    // isAuthenticated: false,
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");

  /* flash() will return array whether,
  there is message or not */
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
    // isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        /* 
        flashing a message into our session,
        by passing a key and value, separated
        by comma
         */
        req.flash("error", "Invalid email or password");
        return res.redirect("/login");
      }

      /*comparing the password with hashed password */

      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect("/");
            });
          }

          req.flash("error", "Invalid email or password");
          return res.redirect("/login");
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  /*checking if user exist */

  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        req.flash("error", "E-mail exist already");

        return res.redirect("/signup");
      }
      //the line below return a promise
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });

          return user.save();
        })
        .then(result => {
          res.redirect("/login");

          /* sending email */

          return sendgridMail.send({
            to: email,
            from: "suleimanohabeeb@gmail.com",
            subject: "Signup successful!",
            text: "You successfully signed up to pursclip business!!!",
            html: "<h1>You successfully signed up to pursclip business!!!</h1>",
          });
        })
        .then(response => {
          console.log("MESSAGE SENT");
          // console.log(response[0].statusCode);
          // console.log(response[0].headers);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/");
  });
};
