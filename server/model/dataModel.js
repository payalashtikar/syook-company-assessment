const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
    name : String,
    origin : String,
    destination : String,
    timestamp : Date,
})

const DataModel = mongoose.model("Data",DataSchema);
module.exports = DataModel;