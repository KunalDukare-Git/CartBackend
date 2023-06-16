var nodemailer = require("nodemailer");
const config = require("../config");
const email = config.get("staging").email;
console.log(email);

export const SendEmail = (from, to, subject, text) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email.username,
      pass: email.password,
    },
  });

  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return true;

      console.log(error);
    } else {
      console.log("Email sent: " + info.response);

      return false;
    }
  });
};