const path = require("path")
const express = require("express")
const MongoClient = require("mongodb").MongoClient
let usersCollection

MongoClient.connect('', (err, client) => {
    if (err) {
        return console.log(err)
    }
    console.log("Connected to Database")
    const db = client.db('dbObligatorio')
    usersCollection = db.collection("users")
})

const app = express()

const port = process.env.PORT || 8080

// Define paths for express config
const publicDirPath = path.join(__dirname, "../public")

// Setup static directory
app.use(express.static(publicDirPath))

app.post("/test", async (req, res) => {
    const insertResult = await usersCollection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
    console.log('Inserted documents =>', insertResult);
    res.send(insertResult)
})

// app.post("/addUser", (req, res) => {
//     if (!req.query.address) {
//         return res.send({
//             error: "You must provide an address"
//         })
//     }
// })

// app.get("/listUsers", (req, res) => {

// })

// app.delete("/deleteUser", (req, res) => {

// })

// app.post("/modifyUser", (req, res) => {

// })

app.listen(port, () => {
    console.log("Server is up on port " + port)
})