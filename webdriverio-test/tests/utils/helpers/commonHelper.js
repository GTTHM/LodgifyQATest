const yargs = require('yargs')

const argvPort = yargs(process.argv.slice(2)).options({
    PORT: { type: "number", default: 8080, alias: "p" },
}).argv.PORT

const port = process.env.PORT || argvPort

module.exports.urls = {
    pricing: `http://localhost:${port}/pricing.html`,
    contact: `http://localhost:${port}/contact.html`,
}
