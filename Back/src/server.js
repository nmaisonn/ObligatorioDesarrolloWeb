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

            res.send({ token, user: user.rol })
        })
})

// Endpoints de admins.
// Crear users
app.post('/crearUser', adminAuth, (req, res) => {
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

app.post('/tests', (req, res) => {
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

            const pipeline = [
                {
                    '$match': {
                        'nombre': 'seba'
                    }
                }, {
                    '$lookup': {
                        'from': 'carreras',
                        'localField': 'carrera',
                        'foreignField': '_id',
                        'as': 'result'
                    }
                }
            ]

            const user = await usersCollection.aggregate(pipeline)

            let coso = await user.toArray()
            coso = coso[0].result[0]

            console.log(coso)

            // const insertResult = await usersCollection.insertOne({ nombre: req.query.nombre, carrera: "ing_informatica" })
            // console.log('Inserted document =>', insertResult)

            client.close()

            res.send({ coso })
        }
    )
})

// Borrar users.
app.post('/borrarUser', adminAuth, (req, res) => {
    if (!req.query.mail) {
        return res.status(400).send({
            error: "Error al borrar usuario."
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

            // Chequear que el usuario exista.
            const user = await usersCollection.findOne({ mail: req.query.mail })

            if (!user) {
                client.close()
                return res.status(400).send({
                    error: "Error al borrar usuario."
                })
            }

            // Borro el usuario que encontre.
            const deleteResult = await usersCollection.deleteOne({ mail: req.query.mail })
            console.log('Deleted document =>', deleteResult)

            client.close()

            res.send({ msg: "Usuario borrado exitosamente!" })
        }
    )
})

// Editar users.
app.put('/editarUser', adminAuth, (req, res) => {
    // Chequeo que se haya enviado el mail del usuario.
    if (!req.query.mail) {
        return res.status(400).send({
            error: "Error al editar usuario"
        })
    }

    // Ninguno de los campos fue enviado.
    if (!(req.query.nuevoMail || req.query.rol)) {
        return res.send({
            msg: "Usuario editado exitosamente"
        })
    }

    if (!validator.isEmail(req.query.nuevoMail)) {
        return res.status(400).send({
            error: "Error al editar usuario."
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

            // Chequear que el mail nuevo no exista.
            const mailExistente = await usersCollection.findOne({ mail: req.query.nuevoMail })
            if (mailExistente) {
                client.close()
                return res.status(400).send({
                    error: "El mail ya está en uso."
                })
            }

            // Chequear que el usuario a editar exista.
            const user = await usersCollection.findOne({ mail: req.query.mail })
            if (!user) {
                client.close()
                return res.status(400).send({
                    error: "Error al editar usuario."
                })
            }

            // Edito el usuario que encontre.
            let editResult
            // Caso editar ambos campos
            if (req.query.nuevoMail && req.query.rol) {
                editResult = await usersCollection.findOneAndUpdate(
                    { mail: req.query.mail },
                    {
                        $set: {
                            mail: req.query.nuevoMail,
                            rol: req.query.rol
                        },
                    },
                )
                // Caso editar solo el mail
            } else if (req.query.nuevoMail) {
                editResult = await usersCollection.findOneAndUpdate(
                    { mail: req.query.mail },
                    {
                        $set: {
                            mail: req.query.nuevoMail,
                        },
                    },
                )
                // Caso editar solo el rol
            } else {
                editResult = await usersCollection.findOneAndUpdate(
                    { mail: req.query.mail },
                    {
                        $set: {
                            rol: req.query.rol,
                        },
                    },
                )
            }

            console.log('Edited document =>', editResult)

            client.close()

            res.send({ msg: "Usuario editado exitosamente!" })
        }
    )
})

// Listar users
app.get('/listarUsers', adminAuth, async (req, res) => {
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

            // Chequear que el usuario exista.
            const users = await usersCollection.find().project({ _id: 0, pass: 0 }).toArray()

            client.close()

            res.send({ users })
        }
    )
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
