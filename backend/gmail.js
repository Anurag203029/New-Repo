
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service:'gmail',
    // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "anuragvig2@gmail.com",
    pass: "navr fhxn eewy dyaz",
  },
});

// async..await is not allowed in global scope, must use a wrapper
const email= async function(email) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'anurag2gmail.com', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

// main().catch(console.error);
module.exports=email;