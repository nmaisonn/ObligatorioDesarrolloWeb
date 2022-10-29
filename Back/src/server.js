const path = require('path')
const express = require('express')
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const MongoClient = require('mongodb').MongoClient

const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth")

require("dotenv").config()

const app = express()
const port = process.env.PORT || 8080

const publicDirPath = path.join(__dirname, '../public')
app.use(express.static(publicDirPath))

// Login de users.
app.post("/login", async (req, res) => {
    if (!req.query.mail || !req.query.pass) {
        return res.status(400).send({
            error: "Necesitas ingresar todos los campos."
        })
    }

    MongoClient.connect(
        process.env.DB_CONNECTION_STRING,
        async (err, client) => {
            if (err) {
                client.close()
                return console.log(err)
            }
            console.log('Connected to Database')
            const db = client.db('dbObligatorio')
            const usersCollection = db.collection('users')

            const user = await usersCollection.findOne({ mail: req.query.mail })

            if (!user) {
                client.close()
                return res.status(400).send({
                    error: "Error al logear."
                })
            }

            const isMatch = await bcrypt.compare(req.query.pass, user.pass)

            if (!isMatch) {
                client.close()
                return res.status(400).send({
                    error: "Error al logear."
                })
            }

            // Crear jwt y mandarlo, valido por 2hs
            const token = jwt.sign({ mail: user.mail, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: "1h" })

            client.close()

            res.send({ token })
        })
})

// Endpoints de admins.
// Crear users
app.post('/creacion', adminAuth, (req, res) => {
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

    MongoClient.connect(
        process.env.DB_CONNECTION_STRING,
        async (err, client) => {
            if (err) {
                client.close()
                return console.log(err)
            }
            console.log('Connected to Database')
            const db = client.db('dbObligatorio')
            const usersCollection = db.collection('users')

            // Chequear que el mail no exista.
            const user = await usersCollection.findOne({ mail: req.query.mail })

            if (user) {
                client.close()
                return res.status(400).send({
                    error: "Error al crear usuario."
                })
            }

            // Creo el pass hasheado
            const password = await bcrypt.hash(req.query.pass, 8)

            const insertResult = await usersCollection.insertOne({ mail: req.query.mail, pass: password, rol: req.query.rol })
            console.log('Inserted document =>', insertResult)

            client.close()

            res.send({ msg: "Usuario creado exitosamente!" })
        }
    )
})

// Borrar users.
app.post('/borra2', (req, res) => {
    res.send(usersCollection.deleteOne({ a: 1 }))
})

// Editar users.
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

// Listar users
app.get('/obtenien2', async (req, res) => {
    res.send(await usersCollection.find().toArray())
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
