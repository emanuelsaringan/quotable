var express      = require('express');
var http         = require('http');
var path         = require('path');
var favicon      = require('static-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose     = require('mongoose');
var bodyParser   = require('body-parser');

var routes = require('./routes');
var users = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/', routes.index);
app.get('/users', users.list);

/* ANGELHACK START */

// MongoDB
var db       = mongoose.createConnection('mongodb://localhost/quotable');
// var Booklet  = require('./schemas/bookletSchema')(db);
var Quote  = require('./schemas/bookletSchema')(db);

// Sample Data
var quote1 = {
    title: 'Quote 1',
    url: 'www.wikipedia.org',
    text: 'The quick brown',
    time: new Date()
};

var quote2 = {
    title: 'Quote 2',
    url: 'www.google.com',
    text: 'fox jumps over',
    time: new Date()
};

var quote3 = {
    title: 'Quote 3',
    url: 'www.facebook.com',
    text: 'the lazy dog',
    time: new Date()
};

var booklet1 = {
    name: 'Booklet 1',
    quotables: [ quote1 ]
};

var booklet2 = {
    name: 'Booklet 2',
    quotables: [ quote2, quote3 ]
};

app.get('/booklet',
    function(req, res) {
        res.json([
            booklet1,
            booklet2
        ]);
    }
);

app.get('/booklet/:id',
    function(req, res) {
        res.json(booklet2);
    }
);

app.get('/shared',
    function(req, res) {
        res.json({
            // TODO
        });
    }
);

app.post('/quote',
    function(req, res) {
        var quote = new Quote({
            title: req.param('title'),
            url: req.param('url'),
            text: req.param('text')
        });

        quote.save(
            function(err) {
                if (err) {
                    console.log(err);
                    res.send(200);
                    return;
                }

                res.send(200);
            }
        );
    }
);
/* ANGELHACK END */

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
