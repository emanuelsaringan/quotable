'use strict';

var Schema = require('mongoose').Schema;

var BookletSchema = function() {
    return new Schema({
        name: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    });
};

module.exports = function(db) {
    return db.model('Booklet', new BookletSchema());
};
