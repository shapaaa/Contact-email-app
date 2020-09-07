const path = require('path');
const express = require('express');
const transporter = require('./config');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.json());
app.use(express.static(buildPath));

app.post('/send', (req, res) => {
	const mailOptions = {
		from: process.env.email,
		to: req.body.email,
		subject: req.body.subject,
		html: req.body.message,
	};
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
			res.status(500).send({
				success: false,
				message: `Something went wrong try again later ${error}`,
			});
		} else {
			console.log(info.response);
			res.send({
				success: true,
				message: 'Thanks for using it you can donate money if you like this product',
			});
		}
	});
	// } catch (err) {
	// 	res.status(500).send({
	// 		success: false,
	// 		message: `Something went wrong try again later ${err}`,
	// 	});
	// }
});

app.listen(3030, () => {
	console.log('server start on port 3030');
});
