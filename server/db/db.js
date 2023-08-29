const mongoose = require("mongoose")
const dburl = 'mongodb+srv://payalashtikar2000:payalashtikar2000@cluster0.8iglqim.mongodb.net/'
// const dbconnection = mongoose.connection;
// dbconnection.on("error",console.error.bind(console,"connection failed"));
// dbconnection.once("open",function(){
//     console.log("connection successfully")
// });

async function connectDatabase(){
    try{
        await mongoose.connect(dburl,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("Connected")
    }
    catch(error){
        console.error("Error:",error.message)
    }
}

module.exports = connectDatabase;