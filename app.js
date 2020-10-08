// importing libraries
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const { createHook } = require('async_hooks');
const discord = new Webhook('xxxxxxxxxxxxxxxxx');
app = express();
const port = process.env.PORT || 3000;

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
		user: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
		pass: 'xxxxxxxxxxxxxxxxxxxxxx',
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
			const embed = new MessageBuilder()
				.setTitle('Contact App Message')
				.setThumbnail(
					'https://images.unsplash.com/photo-1505238680356-667803448bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80'
				)
				.addField('Name: ', `${fname} ${lname}`, true)
				.addField('Email: ', email, true)
				.setDescription(msg)
				.setTimestamp();
			discord.send(embed);
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
