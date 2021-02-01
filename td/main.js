const express = require('express');
const bodyParser = require('body-parser');
const Party = require('./models/party');

const PORT = process.env.PORT || 3000;

const app = express();

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/party', (req, res) => {
	res.send('Create a party using POST');
});

app.post('/party', (req, res) => {
	Party.currentParty = new Party(req.body.min || 0, req.body.max || 100);

	res.status(204);
	res.end('Create');
});

app.put('/party/current', (req, res) => {
	if (!Party.currentParty) {
		throw new Error('No party');
	}

	const result = Party.currentParty.guess(req.body.number);
	if (result === '=') {
		res.send(`Félicitation, le chiffre était ${Party.currentParty.number}`);
	} else {
		res.send(result); // + or -
	}
});

app.get('/party/history', (req, res) => {
	if (!Party.currentParty) {
		throw new Error('No party');
	}

	res.send(Party.currentParty.guesses.join(', '));
});

app.listen(PORT, () => {
	console.log(`Server listening on port : ${PORT}`);
});
