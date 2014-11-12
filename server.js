var fs = require('fs');
var util = require('util');

var _ = require('underscore');
var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();


var idxSrc = fs.readFileSync(__dirname + '/templates/index.template').toString();
var rowSrc = fs.readFileSync(__dirname + '/templates/row.template').toString();
var mailSrc = fs.readFileSync(__dirname + '/templates/mail.template').toString();

var idxTpl = _.template(idxSrc);


app.get('/', function (req, res) {
    var content = idxTpl({
        rowTemplate: rowSrc,
        mailTemplate: mailSrc
    });
    res.end(content);
});

app.use('/hohoho', bodyParser.urlencoded());
app.use('/hohoho', bodyParser.json());
app.post('/hohoho', function (req, res) {
    // TODO


    console.log(util.inspect(req.body));

    // unpack data
    var body = req.body;
    var i;
    var santas = [];
    var errors = [];
    var email;
    for (i = 0; i < body.name.length; i++) {
        email = body.email[i];
        if (email.trim()) {
            santas.push({
                name: body.name[i].trim(),
                email: email.trim()
            })
        } else {
            errors.push(i);
        }
    }

    var mailTpl = _.template(body['mail-template']);

    santas = _.shuffle(santas);

    // send emails
    var my, their, text;
    var mailOptions;
    for (i = 0; i < santas.length; i++) {
        my = santas[i];
        their = santas[(i + 1) % santas.length];
        console.log('sending from ' + util.inspect(my) + ' to ' + util.inspect(their));
        text = mailTpl({
            my: my,
            their: their
        });

        mailOptions = {
            from: 'Secret Santa <' + EMAIL + '>', // sender address
            to: my.email,
            subject: body.subject,
            text: text
//            ,
//            html: text
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });
    }

    // NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols


// send mail with defined transport object


    // redirect to success / error

    res.end('TO DO');
});

app.use('/static', express.static(__dirname + '/public'));


var EMAIL = 'sorteioprendinhasnatal2014@gmail.com';

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: EMAIL,
        pass: 'ehnatalehnatal2014'
    }
});


var PORT = 9700;

app.listen(PORT, function () {
    console.log('Ready on port ' + PORT);
});