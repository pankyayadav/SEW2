
const express = require('express')
const app = express()
const port = process.env.PORT || 8081
const bodyParser = require('body-parser')

app.use(express.static('public'));
// app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
const nodemailer = require("nodemailer");


app.engine('html', require('ejs').renderFile);

app.set('views', __dirname + '/public/views');
app.get('', (req, res) => {
    res.render('home.html', { text: 'Hey' })
})

app.post('/views/Mail', (req, res) => {

try {
const {name, email, subject, message } = req.body;
// res.status(200).send('Ok');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "ruppellsairlines57@gmail.com",
    pass: "djyddxkvsrfoxllo",
  },
});
console.log('to ' , email , ' subject : ' , subject , ' text : ', message);
// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "ruppellsairlines57@gmail.com", // sender address
    to: "pankaj25665@gmail.com", // list of receivers
    subject: subject, // Subject line
    text: "Hi Team , " + name + email + message, // plain text body
    // html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);
// res.render('contact.html', { text: 'Success' })
// res.writeHead(200);
// res.redirect("contact.html")
// alert("Success");
res.render('contact.html', { errormessage: 'Success' })

// res.send(`<script>alert("Email Sent Successfully.")</script>`);

// res.render("Success");
// window.location.href = '/views/contact.html';
// res.redirect(301, 'contact.html')
// app.post('/views/contact.html', (req, res) => res.status(204).send());

console.log("Sucess::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")
} catch (error) {
  res.render('contact.html', { errormessage: 'Something Went Wrong ' })
  console.log('Error while sending email : ' , error);
}  
})

app.listen(port, () => console.info(`App listening on port ${port}`))