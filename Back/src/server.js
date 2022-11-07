const path = require('path')
const express = require('express')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const MongoClient = require('mongodb').MongoClient
const dbo = require('../bd/connection')
const cors = require('cors')

const auth = require('../middleware/auth')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 8080

const publicDirPath = path.join(__dirname, '../public')
app.use(express.json());
app.use(express.static(publicDirPath))

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
  methods: 'GET, PUT, POST, DELETE',
}
app.use(cors(corsOptions))

// Login de users.
app.post('/login', async (req, res) => {
  const {mail, pass} = req.body
  if (!mail || !pass) {
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

    const user = await usersCollection.findOne({ mail })

    if (!user) {
      client.close()
      return res.status(400).send({
        error: 'Error al logear.',
      })
    }

    const isMatch = await bcrypt.compare(pass, user.pass)

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
  const {mail, pass, rol} = req.body
  // Chequeo que se hayan pasado todos los campos.
  if (!mail || !pass || !rol) {
    return res.status(400).send({
      error: 'Necesitas ingresar todos los campos.',
    })
  }

  if (!validator.isEmail(mail)) {
    return res.status(400).send({
      error: 'El mail ingresado, no es válido.',
    })
  }

  if (rol < 1 || rol > 3) {
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
    const user = await usersCollection.findOne({ mail })

    if (user) {
      client.close()
      return res.status(400).send({
        error: 'Error al crear usuario.',
      })
    }

    // Creo el pass hasheado
    const password = await bcrypt.hash(pass, 8)

    const insertResult = await usersCollection.insertOne({
      mail,
      pass: password,
      rol
    })
    console.log('Inserted document =>', insertResult)

    client.close()

    res.send({ msg: 'Usuario creado exitosamente!' })
  })
})

// Borrar users.
app.post('/borrarUser', auth(['1']), (req, res) => {
  const {mail} = req.body
  if (!mail) {
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
    const user = await usersCollection.findOne({ mail })

    if (!user) {
      client.close()
      return res.status(400).send({
        error: 'Error al borrar usuario.',
      })
    }

    // Borro el usuario que encontre.
    const deleteResult = await usersCollection.deleteOne({
      mail,
    })
    console.log('Deleted document =>', deleteResult)

    client.close()

    res.send({ msg: 'Usuario borrado exitosamente!' })
  })
})

// Editar users.
app.put('/editarUser', auth(['1']), (req, res) => {
  const {mail, nuevoMail, rol} = req.body
  // Chequeo que se haya enviado el mail del usuario.
  if (!mail) {
    return res.status(400).send({
      error: 'Error al editar usuario',
    })
  }

  // Ninguno de los campos fue enviado.
  if (!(nuevoMail || rol)) {
    return res.send({
      msg: 'Usuario editado exitosamente',
    })
  }

  if (!validator.isEmail(nuevoMail)) {
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
      mail: nuevoMail,
    })
    if (mailExistente) {
      client.close()
      return res.status(400).send({
        error: 'El mail ya está en uso.',
      })
    }

    // Chequear que el usuario a editar exista.
    const user = await usersCollection.findOne({ mail })
    if (!user) {
      client.close()
      return res.status(400).send({
        error: 'Error al editar usuario.',
      })
    }

    // Edito el usuario que encontre.
    let editResult
    // Caso editar ambos campos
    if (nuevoMail && rol) {
      editResult = await usersCollection.findOneAndUpdate(
        { mail },
        {
          $set: {
            mail: nuevoMail,
            rol,
          },
        },
      )
      // Caso editar solo el mail
    } else if (nuevoMail) {
      editResult = await usersCollection.findOneAndUpdate(
        { mail },
        {
          $set: {
            mail: nuevoMail,
          },
        },
      )
      // Caso editar solo el rol
    } else {
      editResult = await usersCollection.findOneAndUpdate(
        { mail },
        {
          $set: {
            rol,
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
    const users = await usersCollection
      .find()
      .project({ pass: 0 })
      .toArray()

    client.close()

    res.send({ users })
  })
})

// Endpoints de operarios
// Crear pieza
app.post('/crearPieza', auth(['1', '2']), (req, res) => {
  const { nombre, categoria, altura, resViento, material, img } = req.body
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
  const { nombre, categoria, altura, resViento, material } = req.body
  if (!(nombre && categoria && altura && resViento && material)) {
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
    const part = await partsCollection.findOne({
      nombre,
      categoria,
      altura,
      'resistencia eolica': resViento,
      material,
    })

    if (!part) {
      client.close()
      return res.status(400).send({
        error: 'Pieza no existente.',
      })
    }

    const deleteResult = await partsCollection.deleteOne({
      nombre,
      categoria,
      altura,
      'resistencia eolica': resViento,
      material,
    })
    console.log('Deleted document =>', deleteResult)

    client.close()

    res.send({ msg: 'Pieza borrada con exito!' })
  })
})

// Editar pieza
app.post('/editarPieza', auth(['1', '2']), (req, res) => {})

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
    const parts = await partsCollection
      .find()
      .project({ _id: 0, pass: 0 })
      .toArray()

    client.close()

    res.send({ parts })
  })
})

// Crear molino
app.post('/crearDiseño', auth(['1', '2']), (req, res) => {
  const { nombre, categoria, altura, resViento, material, img } = req.body
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

// Test agregar doc referenciando otro doc.
app.post('/tests', (req, res) => {
  MongoClient.connect(process.env.DB_CONNECTION_STRING, async (err, client) => {
    if (err) {
      client.close()
      return console.log(err)
    }
    console.log('Connected to Database')
    const db = client.db('dbObligatorio')
    const usersCollection = db.collection('users')

    const pipeline = [
      {
        $match: {
          nombre: 'seba',
        },
      },
      {
        $lookup: {
          from: 'carreras',
          localField: 'carrera',
          foreignField: '_id',
          as: 'result',
        },
      },
    ]

    const user = await usersCollection.aggregate(pipeline)

    let coso = await user.toArray()
    coso = coso[0].result[0]

    console.log(coso)

    // const insertResult = await usersCollection.insertOne({ nombre: req.query.nombre, carrera: "ing_informatica" })
    // console.log('Inserted document =>', insertResult)

    client.close()

    res.send({ coso })
  })
})

// Test de la bd connection.
app.get('/otroTest', async (req, res) => {
  const dbConnect = await dbo.getDb()

  console.log(dbConnect)

  dbConnect
    .collection('users')
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!')
      } else {
        res.json(result)
      }
    })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
