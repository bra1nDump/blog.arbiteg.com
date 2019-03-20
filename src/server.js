let express = require('express')
var bodyParser = require('body-parser')

let stripeAPIToken = process.env.stripToken || "sk_test_SkgQFmLtlPhZxSeJVOTLRHfC"
var stripe = require("stripe")(stripeAPIToken)

let app = express()

app.use(express.static('blog.arbiteg.com/_site'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.post('/api/place-order', async (req, res) => {
	console.log('place order POST')
	console.log(req.body)

	const charge = await stripe.charges.create({
		amount: req.body.amount,
		currency: 'usd',
		description: req.body.order,
		source: req.body.stripeToken,
		statement_descriptor: 'Arbiteg Cinamon',
	});

	console.log(charge)
})

app.listen(3000, () => {
	console.log('listening on 3000')
})