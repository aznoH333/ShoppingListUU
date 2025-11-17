const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/', {});


function defineDBSchema(name, schema) {
    const newSchema = new mongoose.Schema(schema);
    return mongoose.model(name, newSchema);
}

module.exports = { defineDBSchema }