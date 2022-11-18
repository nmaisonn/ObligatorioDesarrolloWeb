const path = require('path')
const express = require('express')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
const sgMail = require("@sendgrid/mail")

const auth = require('../middleware/auth')
const { ObjectId } = require('mongodb')

require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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
  const { mail, pass } = req.body
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

// Olvido de contraseña
app.post("/forgotPass", async (req, res) => {
  const { mail } = req.body
  const newPass = Math.ceil(Math.random() * (1000000 - 100000) + 100000)
  const cryptedPass = await bcrypt.hash(newPass.toString(), 8)

  MongoClient.connect(process.env.DB_CONNECTION_STRING, async (err, client) => {
    if (err) {
      client.close()
      return console.log(err)
    }
    console.log('Connected to Database')
    const db = client.db('dbObligatorio')
    const usersCollection = db.collection('users')

    // Chequear que el usuario a editar exista.
    const user = await usersCollection.findOne({ mail })
    if (!user) {
      client.close()
      return res.status(400).send({
        error: 'Error al editar usuario.',
      })
    }

    let editResult = await usersCollection.findOneAndUpdate(
      { mail },
      {
        $set: {
          pass: cryptedPass
        },
      },
    )

    console.log('Edited document =>', editResult)

    client.close()

    const msg = {
      to: mail, // Change to your recipient
      from: 'jojoteam.webdev@gmail.com', // Change to your verified sender
      subject: 'Cambio de contraseña',
      html: `Hola ${mail}! Esta es tu nueva contraseña: <strong>${newPass}</strong>. No olvides cambiarla una vez accedas a la cuenta.`
    }
    sgMail.send(msg).catch((error) => {
      res.send(error)
    })

    res.send({ msg: 'Revisa el mail que enviamos con tu nueva contraseña.' })
  })
})

app.post("/actualizarPass", auth(["1", "2", "3"]), async (req, res) => {
  const { mail, currentPass, newPass1, newPass2 } = req.body
  console.log(mail, currentPass, newPass1, newPass2)
  if (newPass1 !== newPass2) {
    return res.status(400).send({
      error: 'Las contraseñas deben coincidir.',
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
        error: 'Error al cambiar la contraseña.',
      })
    }

    const isMatch = await bcrypt.compare(currentPass, user.pass)

    if (!isMatch) {
      client.close()
      return res.status(400).send({
        error: 'Error al cambiar la contraseña.',
      })
    }

    const password = await bcrypt.hash(newPass1, 8)

    editResult = await usersCollection.findOneAndUpdate(
      { mail },
      {
        $set: {
          pass: password,
        },
      },
    )

    client.close()

    res.send({ msg: "Contraseña cambiada con éxito." })
  })
})

// Endpoints de admins.
// Crear users
app.post('/crearUser', auth(['1']), (req, res) => {
  const { mail, pass, rol } = req.body
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
  const { mail } = req.body
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
  const { mail, nuevoMail, rol } = req.body
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
    const users = await usersCollection.find().project({ pass: 0 }).toArray()

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
      'resistenciaEolica': resViento,
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
      'resistenciaEolica': resViento,
      material,
      img: { nombre: img.nombre, ext: img.ext },
      inUse: false
    })
    console.log('Inserted document =>', insertResult)

    client.close()

    res.send({ msg: 'Pieza creada exitosamente!' })
  })
})

// Borrar pieza
app.post('/borrarPieza', auth(['1', '2']), (req, res) => {
  const { _id } = req.body
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
  const { part } = req.body
  if (!part._id) {
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

    const _id = part._id

    // Chequear que el usuario a editar exista.
    const partBD = await partsCollection.findOne({ _id: ObjectId(_id) })
    if (!partBD) {
      client.close()
      return res.status(400).send({
        error: 'Error al editar pieza.',
      })
    }

    const editResult = await partsCollection.findOneAndUpdate(
      { _id: ObjectId(_id) },
      {
        $set: {
          nombre: part.name,
          altura: part.height,
          "resitencia eolica": part.windResistance,
          material: part.material,
          img: part.picture
        },
      },
    )

    console.log('Edited document =>', editResult)

    client.close()

    res.send({ msg: 'Pieza editada exitosamente!' })
  })
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
app.post('/crearMolino', auth(['1', '2']), (req, res) => {
  console.log(req.body)
  const { _idBase, _idCuerpo, _idAspa } = req.body
  if (!(_idBase && _idCuerpo && _idAspa)) {
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
    const partsCollection = db.collection("windmill-parts")

    const insertResult = await windmillsCollection.insertOne({
      base: _idBase,
      cuerpo: _idCuerpo,
      aspa: _idAspa,
      estado: "pendiente"
    })

    console.log('Inserted document =>', insertResult)

    let editResult = await partsCollection.findOneAndUpdate(
      { _id: ObjectId(_idBase) },
      {
        $set: {
          inUse:true
        },
      },
    )

    console.log("Edited document => ", editResult)

    editResult = await partsCollection.findOneAndUpdate(
      { _id: ObjectId(_idCuerpo) },
      {
        $set: {
          inUse:true
        },
      },
    )

    console.log("Edited document => ", editResult)

    editResult = await partsCollection.findOneAndUpdate(
      { _id: ObjectId(_idAspa) },
      {
        $set: {
          inUse:true
        },
      },
    )

    console.log("Edited document => ", editResult)

    client.close()

    res.send({ msg: 'Molino creado exitosamente!' })
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

    const insertResult = await partsCollection.insertOne({ "carrera1": _id1, "carrera2": _id2, "carrera3": _id3 })
    console.log('Inserted document =>', insertResult)

    client.close()

    res.send({ msg: 'Pieza creada exitosamente!' })
  })
})

// OBTENER 3 COSOS
app.get("/quierotraer", async (req, res) => {
  MongoClient.connect(process.env.DB_CONNECTION_STRING, async (err, client) => {
    if (err) {
      client.close()
      return console.log(err)
    }
    console.log('Connected to Database')
    const db = client.db('dbObligatorio')
    const alumnos = db.collection('alumnos')

    const user = await alumnos.aggregate([
      { $unwind: { path: "$carreras" } },
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
        "$project": {
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
