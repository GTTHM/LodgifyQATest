
const express = require('express')
const app = express()

const yargs = require('yargs')
const PORT = process.env.PORT 
    || yargs(process.argv.slice(2)).options({
        PORT: { type: "number", default: 8000, alias: "p" },
    }).argv.PORT

app.get('/', (req, res) => {
    res.send('<a href="contact.html">contact.html</a><br/><a href="pricing.html">pricing.html</a><br/>')
})

app.use(express.static('public'))


app.listen(PORT, () => {
    console.log(`Hosted server in the following address: http://localhost:${PORT} > Leave terminal open and execute tests command in a new one`)
})
