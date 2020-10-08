// importing libraries
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
app = express();
const port = 8000;

// basic app setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));
app.use('/static', express.static('static'));
app.use(
	express.urlencoded({
		extended: false,
	})
);

// smtp setup for mail
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'xxxxxxxxxxxxxxxxxxxxxxx',
		pass: 'xxxxxxxxxxxxxxxxxxxxxxx',
	},
});

// app's url route
app.get('/', (req, res) => {
	res.status(200).render('index', {
		fnme: '',
		fmsg: '',
	});
});
// handling post requests
app.post('/', (req, res) => {
	const fname = req.body.fname;
	const lname = req.body.lname;
	const email = req.body.email;
	const msg = req.body.msg;
	const mailContent = {
		from: 'theh4ckersbrain@gmail.com',
		to: email,
		subject: 'Thanks for contacting us.',
		text: `Hey There ${fname},\nHope You're Doing well and Enjoying your time.\nThanks for contacting us,\nwill be back to you As soon as Possible\nThanks for being patient.\n\tBy - \n\t\tTheHackersBrain [Gaurav Raj]`,
	};
	transporter.sendMail(mailContent, function (error, info) {
		if (error) {
			console.log(`Email Failed to ${email},${info.response}`);
		} else {
			console.log(`Email Sent to ${email},${info.response}`);
		}
	});
	res.status(200).render('index', {
		fnme: fname,
		fmsg:
			'Message Has been sent successfully. we will get back to you soon.',
	});
});

app.listen(port, () => {
	console.log(`Server is Started on http://127.0.0.1:${port}/`);
});
