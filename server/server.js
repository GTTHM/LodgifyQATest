const express = require('express')
const yargs = require('yargs')

const app = express()

const argvPort = yargs(process.argv.slice(2)).options({
    PORT: { type: "number", default: 8080, alias: "p" },
}).argv.PORT

const port = process.env.PORT || argvPort

app.get('/', (req, res) => {
    res.send('<a href="contact.html">contact.html</a><br/><a href="pricing.html">pricing.html</a><br/>')
})

app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Hosted server in the following address: http://localhost:${port} > Leave terminal open and execute tests command in a new one`)
})
