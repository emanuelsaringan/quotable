'use strict';

var Schema = require('mongoose').Schema;

var QuoteSchema = function() {
    return new Schema({
        title: { type: String, required: true },
        url: { type: String, required: true },
        text: { type: String, required: true },
        bookletId: Schema.ObjectId,
        createdAt: { type: Date, default: Date.now }
    });
};

module.exports = function(db) {
    return db.model('Quote', new QuoteSchema());
};
