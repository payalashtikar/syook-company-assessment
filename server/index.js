// mongodb+srv://payalashtikar2000:<password>@cluster0.8iglqim.mongodb.net/

const express = require('express')
const app = express();
const port = 8080
const http=require('http')

const server = http.createServer(app)

const dbconnection = require('./db/db')
const DataModel = require('./model/dataModel')

server.listen(port,()=>{
    console.log(`listenning ${port}`)
})