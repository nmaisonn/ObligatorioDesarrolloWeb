const path = require('path')
const express = require('express')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const MongoClient = require('mongodb').MongoClient
const dbo = require('../bd/connection')
const cors = require('cors')

const auth = require('../middleware/auth')
const { ObjectId } = require('mongodb')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 8080

const publicDirPath = path.join(__dirname, '../public')
app.use(express.static(publicDirPath))

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
  methods: 'GET, PUT, POST, DELETE',
}
app.use(cors(corsOptions))

// Login de users.
app.post('/login', async (req, res) => {
  if (!req.query.mail || !req.query.pass) {
    return res.status(400).send({
      error: 'Necesitas ingresar todos los campos.',
    })
  }

  MongoClient.connect(process.env.DB_CONNECTION_STRING, async (err, client) => {
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
        error: 'Error al logear.',
      })
    }

    const isMatch = await bcrypt.compare(req.query.pass, user.pass)

    if (!isMatch) {
      client.close()
      return res.status(400).send({
        error: 'Error al logear.',
      })
    }

    // Crear jwt y mandarlo, valido por 2hs
    const token = jwt.sign(
      { mail: user.mail, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    )

    client.close()

    res.send({ token, user: { mail: user.mail, rol: user.rol } })
  })
})

// Endpoints de admins.
// Crear users
app.post('/crearUser', auth(['1']), (req, res) => {
  // Chequeo que se hayan pasado todos los campos.
  if (!req.query.mail || !req.query.pass || !req.query.rol) {
    return res.status(400).send({
      error: 'Necesitas ingresar todos los campos.',
    })
  }

  if (!validator.isEmail(req.query.mail)) {
    return res.status(400).send({
      error: 'El mail ingresado, no es válido.',
    })
  }

  if (req.query.rol < 1 || req.query.rol > 3) {
    return res.status(400).send({
      error: 'El rol debe estar dentro del rango aceptado.',
    })
  }

  MongoClient.connect(process.env.DB_CONNECTION_STRING, async (err, client) => {
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
        error: 'Error al crear usuario.',
      })
    }

    // Creo el pass hasheado
    const password = await bcrypt.hash(req.query.pass, 8)

    const insertResult = await usersCollection.insertOne({
      mail: req.query.mail,
      pass: password,
      rol: req.query.rol,
    })
    console.log('Inserted document =>', insertResult)

    client.close()

    res.send({ msg: 'Usuario creado exitosamente!' })
  })
})

// Borrar users.
app.post('/borrarUser', auth(['1']), (req, res) => {
  if (!req.query.mail) {
    return res.status(400).send({
      error: 'Error al borrar usuario.',
    })
  }

  MongoClient.connect(process.env.DB_CONNECTION_STRING, async (err, client) => {
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
        error: 'Error al borrar usuario.',
      })
    }

    // Borro el usuario que encontre.
    const deleteResult = await usersCollection.deleteOne({
      mail: req.query.mail,
    })
    console.log('Deleted document =>', deleteResult)

    client.close()

    res.send({ msg: 'Usuario borrado exitosamente!' })
  })
})

// Editar users.
app.put('/editarUser', auth(['1']), (req, res) => {
  // Chequeo que se haya enviado el mail del usuario.
  if (!req.query.mail) {
    return res.status(400).send({
      error: 'Error al editar usuario',
    })
  }

  // Ninguno de los campos fue enviado.
  if (!(req.query.nuevoMail || req.query.rol)) {
    return res.send({
      msg: 'Usuario editado exitosamente',
    })
  }

  if (!validator.isEmail(req.query.nuevoMail)) {
    return res.status(400).send({
      error: 'Debes ingresar un mail valido',
    })
  }

  MongoClient.connect(process.env.DB_CONNECTION_STRING, async (err, client) => {
    if (err) {
      client.close()
      return console.log(err)
    }
    console.log('Connected to Database')
    const db = client.db('dbObligatorio')
    const usersCollection = db.collection('users')

    // Chequear que el mail nuevo no exista.
    const mailExistente = await usersCollection.findOne({
      mail: req.query.nuevoMail,
    })
    if (mailExistente) {
      client.close()
      return res.status(400).send({
        error: 'El mail ya está en uso.',
      })
    }

    // Chequear que el usuario a editar exista.
    const user = await usersCollection.findOne({ mail: req.query.mail })
    if (!user) {
      client.close()
      return res.status(400).send({
        error: 'Error al editar usuario.',
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
            rol: req.query.rol,
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

    res.send({ msg: 'Usuario editado exitosamente!' })
  })
})

// Listar users
app.get('/listarUsers', auth(['1']), async (req, res) => {
  MongoClient.connect(process.env.DB_CONNECTION_STRING, async (err, client) => {
    if (err) {
      client.close()
      return console.log(err)
    }
    console.log('Connected to Database')
    const db = client.db('dbObligatorio')
    const usersCollection = db.collection('users')

    // Chequear que el usuario exista.
    const users = await usersCollection.find().project({ pass: 0 }).toArray()

    client.close()

    res.send({ users })
  })
})

// Endpoints de operarios
// Crear pieza
app.post('/crearPieza', auth(['1', '2']), (req, res) => {
  const { nombre, categoria, altura, resViento, material, img } = req.query
  if (!(nombre && categoria && altura && resViento && material && img)) {
    return res.status(400).send({
      error: 'Faltan parametros.',
    })
  }

  MongoClient.connect(process.env.DB_CONNECTION_STRING, async (err, client) => {
    if (err) {
      client.close()
      return console.log(err)
    }
    console.log('Connected to Database')
    const db = client.db('dbObligatorio')
    const partsCollection = db.collection('windmill-parts')

    // Chequear que la parte no exista.
    const part = await partsCollection.findOne({
      nombre,
      categoria,
      altura,
      'resistencia eolica': resViento,
      material,
    })

    if (part) {
      client.close()
      return res.status(400).send({
        error: 'Pieza ya existente.',
      })
    }

    const insertResult = await partsCollection.insertOne({
      nombre,
      categoria,
      altura,
      'resistencia eolica': resViento,
      material,
      img: { nombre: img.nombre, ext: img.ext },
    })
    console.log('Inserted document =>', insertResult)

    client.close()

    res.send({ msg: 'Pieza creada exitosamente!' })
  })
})

// Borrar pieza
app.post('/borrarPieza', auth(['1', '2']), (req, res) => {
  const { _id } = req.query
  if (!_id) {
    return res.status(400).send({
      error: 'Faltan parametros.',
    })
  }

  MongoClient.connect(process.env.DB_CONNECTION_STRING, async (err, client) => {
    if (err) {
      client.close()
      return console.log(err)
    }
    console.log('Connected to Database')
    const db = client.db('dbObligatorio')
    const partsCollection = db.collection('windmill-parts')

    // Chequear que la parte exista
    const part = await partsCollection.findOne({ _id: ObjectId(_id) })

    if (!part) {
      client.close()
      return res.status(400).send({
        error: 'Pieza no existente.',
      })
    }

    const deleteResult = await partsCollection.deleteOne({ _id: ObjectId(_id) })
    console.log('Deleted document =>', deleteResult)

    client.close()

    res.send({ msg: 'Pieza borrada con exito!' })
  })
})

// Editar pieza
app.post('/editarPieza', auth(['1', '2']), (req, res) => {
  const { _id } = req.query
  if (!_id) {
    return res.status(400).send({
      error: 'Faltan parametros.',
    })
  }
})

// Listar piezas
app.get('/listarPiezas', auth(['1', '2']), (req, res) => {
  MongoClient.connect(process.env.DB_CONNECTION_STRING, async (err, client) => {
    if (err) {
      client.close()
      return console.log(err)
    }
    console.log('Connected to Database')
    const db = client.db('dbObligatorio')
    const partsCollection = db.collection('windmill-parts')

    // Chequear que el usuario exista.
    const parts = await partsCollection.find().toArray()

    client.close()

    res.send({ parts })
  })
})

// Crear molino
app.post('/crearDiseño', auth(['1', '2']), (req, res) => {
  const { _idBase, _idCuerpo, _idAspa, img } = req.query
  if (!(_idBase && _idCuerpo && _idAspa && img)) {
    return res.status(400).send({
      error: 'Faltan parametros.',
    })
  }

  MongoClient.connect(process.env.DB_CONNECTION_STRING, async (err, client) => {
    if (err) {
      client.close()
      return console.log(err)
    }
    console.log('Connected to Database')
    const db = client.db('dbObligatorio')
    const windmillsCollection = db.collection('windmills')

    // Chequear que la parte no exista.
    const part = await windmillsCollection.findOne({
      nombre,
      categoria,
      altura,
      'resistencia eolica': resViento,
      material,
    })

    if (part) {
      client.close()
      return res.status(400).send({
        error: 'Pieza ya existente.',
      })
    }

    const insertResult = await partsCollection.insertOne({
      nombre,
      categoria,
      altura,
      'resistencia eolica': resViento,
      material,
      img: { nombre: img.nombre, ext: img.ext },
    })
    console.log('Inserted document =>', insertResult)

    client.close()

    res.send({ msg: 'Pieza creada exitosamente!' })
  })
})

// CREAR CON REFERENCIA A 3 COSOS
app.post('/testingXD', async (req, res) => {
  const _id1 = "6366ca9918ef5cf8a3aa3f1d"
  const _id2 = "6366cb6818ef5cf8a3aa3f1e"
  const _id3 = "6366cb7418ef5cf8a3aa3f1f"

  MongoClient.connect(process.env.DB_CONNECTION_STRING, async (err, client) => {
    if (err) {
      client.close()
      return console.log(err)
    }
    console.log('Connected to Database')
    const db = client.db('dbObligatorio')
    const partsCollection = db.collection('users')

    const insertResult = await partsCollection.insertOne({"carrera1":_id1,"carrera2":_id2,"carrera3":_id3})
    console.log('Inserted document =>', insertResult)

    client.close()

    res.send({ msg: 'Pieza creada exitosamente!' })
  })
})

// OBTENER 3 COSOS
app.get("/quierotraer",async (req,res)=>{
  MongoClient.connect(process.env.DB_CONNECTION_STRING, async (err, client) => {
    if (err) {
      client.close()
      return console.log(err)
    }
    console.log('Connected to Database')
    const db = client.db('dbObligatorio')
    const alumnos = db.collection('alumnos')

    const user = await alumnos.aggregate([
      { $unwind: {path: "$carreras"}},
      {
        "$project": {
          "coso": {
            "$toObjectId": "$carreras",
          },
        }
      },
      {
        "$lookup": {
          "from": "carreras",
          "localField": "coso",
          "foreignField": "_id",
          "as": "carrerita"
        }
      },
      {
        "$project":{
          coso: 0,
          _id: 0
        }
      }
    ])

    let resultadoFinal = await user.toArray()

    console.log(resultadoFinal[0].carrerita[0].nombre)

    client.close()

    res.send({ resultadoFinal })
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
