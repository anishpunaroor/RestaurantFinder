import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

// Connect to database 
MongoClient.connect(
    process.env.RESTFINDER_DB_URI, 
    {
        maxPoolSize: 50, 
        wtimeoutMS: 2500, 
        useNewUrlParser: true }
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