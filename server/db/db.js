const mongoose = require("mongoose")
const dburl = 'mongodb+srv://payalashtikar2000:payalashtikar2000@cluster0.8iglqim.mongodb.net/'

mongoose.connect(dburl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

const dbconnection = mongoose.connection;
dbconnection.on("error",console.error.bind(console,"connection failed"));
dbconnection.once("open",function(){
    console.log("connection successfully")
});

module.exports = dbconnection;