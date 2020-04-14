const fs = require('fs')
const http = require('http')
const https = require('https')
const express = require('express')

const hostname = 'aosora.ddns.net'
const httpPort = 3000
const httpsPort = 3001

const httpsOptions = {
    cert: fs.readFileSync('./ssl/domain-crt.crt'),
    key: fs.readFileSync('./ssl/domain-key.key')
}

const app = express()
const httpServer = http.createServer(app)
const httpsServer = https.createServer(httpsOptions, app)

app.use((req, res, next) => {
    if(req.protocol == 'http'){
        res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
});

app.use('/', express.static('public', { extensions: ['html','htm']}))

httpServer.listen(httpPort, () => console.log(`Http server is listening at ${hostname}:${httpPort}`))
httpsServer.listen(httpsPort, () => console.log(`Https server is listening at ${hostname}:${httpsPort}`))