const nodemailer = require("nodemailer"); //import  nodemailer for sending mail
require("dotenv").config();
const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;

// write an async function for sending Mail
exports.SendMail = async (doc) => {
  try {
    console.log("Doc", doc);
    // create option object for transporter
    const options = {
      host: MAIL_HOST,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    };
    // create transporter for nodemailer
    let transporter = nodemailer.createTransport(options);

    // send mail
    let info = await transporter.sendMail({
      from: "Prince Raj",
      to: doc.email,
      subject: "New file Uploaded to Cloudinary",
      html: `<h1>Hello ${doc.name}</h1> <p> File uploaded on media server <br/> veiw here: <a href="${doc.imageUrl}">${doc.tags}</a></p>`,
    });
    console.log("info", info);
  } catch (err) {
    console.err(err);
    console.log(err);
  }
};
