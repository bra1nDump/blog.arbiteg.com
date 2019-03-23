let express = require('express')
var bodyParser = require('body-parser')

const stripeSecretKey = process.env.skStripe || "sk_test_SkgQFmLtlPhZxSeJVOTLRHfC"
var stripe = require("stripe")(stripeSecretKey)

let app = express()

app.use(express.static('blog.arbiteg.com/_site'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.post('/api/place-order', async (req, res) => {
	console.log(req.body)

	const charge = await stripe.charges.create({
		amount: req.body.amount,
		currency: 'usd',
		description: req.body.order,
		source: req.body.stripeToken,
		statement_descriptor: 'Arbiteg Cinamon',
	});

	console.log(charge)

	res.redirect(charge.receipt_url)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log('listening on ' + port)
})