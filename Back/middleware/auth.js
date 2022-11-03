const jwt = require('jsonwebtoken')

const auth = (roles) => {
    return async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            if (!roles.includes(decoded.rol)) {
                throw new Error()
            }
    
            next()
        } catch (e) {
            console.log(e)
            res.status(401).send({ error: 'Falta autenticación.' })
        }
    }
}

module.exports = auth