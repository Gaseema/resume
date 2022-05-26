require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nodemailer = require('nodemailer');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Node nodemailer
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
app.post('/mail', (req, res, next) => {
    console.log('running mail');
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'gaseema.n@gmail.com',
                pass: process.env.GmailPASS
            }
        });

        // setup email data with unicode symbols
        var mail = req.body
        let mailOptions = {
            from: '' + mail.name + ' "👻" <' + mail.email + '>', // sender address
            to: 'gaseema.n@gmail.com', // list of receivers
            subject: 'Resume Mail ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<div style="background: #92D3DA;border-radius:5px;color:white;width: 80%;display: block;margin-left: auto;margin-right: auto;padding: 20px;"><h4 style=" text-align: center; font-size: 2.5em; margin: 0px; padding-bottom: 25px;">New Email from ' + mail.name + '</h4><p style=" font-size: 1.5em; margin: 0px; padding-left: 5%;"><span style=" font-weight: bold;">Name:</span> ' + mail.name + ' </p><p style=" font-size: 1.5em; margin: 0px; padding-left: 5%;"><span style=" font-weight: bold;">Email:</span> ' + mail.email + '</p><p style=" font-size: 1.5em; margin: 0px; padding-left: 5%;"><span style=" font-weight: bold;">Subject:</span> ' + mail.subject + ' </p><p style=" font-size: 1.5em; margin: 0px; padding-left: 5%;"><span style=" font-weight: bold;">Message:</span> ' + mail.message + '</p></div>' // html body
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.send("not working");
                return console.log(error);
            }
            //Message sent successfully function here
            console.log('Mail sent');
            res.send("working");
        });
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;