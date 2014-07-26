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
var db      = mongoose.createConnection('mongodb://localhost/quotable');
var Booklet = require('./schemas/bookletSchema')(db);
var Quote   = require('./schemas/quoteSchema')(db);

app.get('/booklet',
    function(req, res) {
        Booklet.find({}, function(err, booklets) {
                if (err) {
                    console.log(err);
                    res.send(500);
                    return;
                }

                res.send(booklets);
            }
        );
    }
);

app.get('/booklet/:id',
    function(req, res) {
        Quote.find({
            bookletId: new mongoose.Types.ObjectId(req.param('id'))
        }, function(err, quotes) {
                if (err) {
                    console.log(err);
                    res.send(500);
                    return;
                }

                res.send(quotes);
            }
        );
    }
);

app.get('/shared',
    function(req, res) {
        res.json({
            // TODO
        });
    }
);

app.get('/quote',
    function(req, res) {
        Quote.find({},
            function(err, quotes) {
                if (err) {
                    console.log(err);
                    res.send(500);
                    return;
                }

                res.send(quotes);
            }
        );
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
                    res.send(500);
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
// luigi was here :)
