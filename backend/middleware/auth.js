const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]

    if (authHeader) {
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) res.status(403).json('Token not valid.')
            req.user = user
            next()
        })
    } else {
        return res.status(401).json("You are not authenticated !")
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.userId === req.params.id || req.user.isAdmin){
            next()
        } else {
            console.log(req.params.id)
            res.status(403).json('You are not alowed to do that.')
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuthorization}