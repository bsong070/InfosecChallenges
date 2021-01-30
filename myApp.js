var express = require('express');
var app = express();
var helmet = require('helmet')
const bcrypt = require('bcrypt')

app.use(helmet.hidePoweredBy({setTo: 'PHP 4.2.0'}))
app.use(helmet.frameguard({action: 'deny'}))
app.use(helmet.xssFilter())
app.use(helmet.noSniff())
app.use(helmet.ieNoOpen())

ninetyDaysInSeconds = 90*24*60*60
timeInSeconds = ninetyDaysInSeconds
app.use(helmet.hsts({maxAge: timeInSeconds, force: true}))

app.use(helmet.dnsPrefetchControl({allow: false}))
app.use(helmet.noCache())

app.use(helmet.contentSecurityPolicy({directives:{defaultSrc:["'self'"], scriptSrc: ["'self'", "trusted-cdn.com"]}}))
const saltRounds = 10;
const myPlaintextPassword='asaasasa'

bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
  bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
    /*res == true or false*/
  });
});


let hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log(hash);
let result = bcrypt.compareSync(myPlaintextPassword, hash);
console.log(result);
























module.exports = app;
var api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
