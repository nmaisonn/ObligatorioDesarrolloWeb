const path = require('path')
const express = require('express')
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const MongoClient = require('mongodb').MongoClient

require("dotenv").config()

let usersCollection

MongoClient.connect(
    process.env.DB_CONNECTION_STRING,
    (err, client) => {
        if (err) {
            return console.log(err)
        }
        console.log('Connected to Database')
        const db = client.db('dbObligatorio')
        usersCollection = db.collection('users')
    },
)

const app = express()

const port = process.env.PORT || 8080

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')

// Setup static directory
app.use(express.static(publicDirPath))

app.post('/creacion', async (req, res) => {
    // Chequeo que se hayan pasado todos los campos.
    if (!req.query.mail || !req.query.pass || !req.query.rol) {
        return res.status(400).send({
            error: "Necesitas ingresar todos los campos."
        })
    }

    if (!validator.isEmail(req.query.mail)) {
        return res.status(400).send({
            error: "El mail ingresado, no es válido."
        })
    }

    if (req.query.rol < 1 || req.query.rol > 3) {
        return res.status(400).send({
            error: "El rol debe estar dentro del rango aceptado."
        })
    }

    // Chequear que el mail no exista.
    const user = await usersCollection.findOne({ mail: req.query.mail })

    if (user) {
        return res.status(400).send({
            error: "Error al crear usuario."
        })
    }

    // Creo el pass hasheado
    const password = await bcrypt.hash(req.query.pass, 8)

    const insertResult = await usersCollection.insertOne({ mail: req.query.mail, pass: password, rol: req.query.rol })
    console.log('Inserted document =>', insertResult)
    res.send(insertResult)
})

app.post("/login", async (req, res) => {
    if (!req.query.mail || !req.query.pass) {
        return res.status(400).send({
            error: "Necesitas ingresar todos los campos."
        })
    }

    const user = await usersCollection.findOne({ mail: req.query.mail })

    if (!user) {
        return res.status(400).send({
            error: "Error al logear."
        })
    }

    const isMatch = await bcrypt.compare(req.query.pass, user.pass)

    if (!isMatch) {
        return res.status(400).send({
            error: "Error al logear."
        })
    }

    // Crear jwt y mandarlo
    const token = jwt.sign({ mail: user.mail, rol: user.rol }, process.env.JWT_SECRET)

    res.send({ token })
})

app.post('/borra2', (req, res) => {
    res.send(usersCollection.deleteOne({ a: 1 }))
})

app.put('/editan2', (req, res) => {
    res.send(
        usersCollection.findOneAndUpdate(
            { a: 1 },
            {
                $set: {
                    a: 5,
                },
            },
        ),
    )
})

app.get('/obtenien2', async (req, res) => {
    res.send(await usersCollection.find().toArray())
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
    console.log('Server is up on port ' + port)
})
