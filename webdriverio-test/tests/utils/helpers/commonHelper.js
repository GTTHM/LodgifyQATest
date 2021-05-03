const yargs = require('yargs')
const PORT = process.env.PORT 
    || yargs(process.argv.slice(2)).options({
        PORT: { type: "number", default: 8000, alias: "p" },
    }).argv.PORT

module.exports.urls = {
    pricing: `http://localhost:${PORT}/pricing.html`,
    contact: `http://localhost:${PORT}/contact.html`,
}
