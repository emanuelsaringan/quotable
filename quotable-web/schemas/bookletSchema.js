'use strict';

var Schema = require('mongoose').Schema;

var QuoteSchema = function() {
    return new Schema({
        title: { type: String, required: true },
        url: { type: String, required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    });
};

// var BookletSchema = function() {
//     return new Schema({
//         name: { type: String, required: true },
//         quotables: [ QuoteSchema ],
//         createdAt: { type: Date, default: Date.now }
//     });
// };

// module.exports = function(db) {
//     return db.model('Booklet', new BookletSchema());
// };

module.exports = function(db) {
    return db.model('Quote', new QuoteSchema());
};
