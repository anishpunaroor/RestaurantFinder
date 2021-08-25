import app from "./server.js"
import mongodb, { MongoClient } from "mongodb"
import dotenv from "dotenv"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

// Connect to database 
MongoClient.connect(
    process.env.RESTFINDER_DB_URI, 
    {
        poolSize: 50, 
        wtimeout: 2500, 
        useNewUrlParse: true }
    )
    // Check and record any errors
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })