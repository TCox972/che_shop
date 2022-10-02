const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

//REGISTER NEW USER

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            lastName: req.body.lastname, //required
            firstName: req.body.firstname, //required
            email: req.body.email, //required
            password: hash, //required
            address1: req.body.address1, //required
            address2: req.body.address2,
            zipCode: req.body.zipcode, //required
            town: req.body.town //required
        })
        user.save()
            .then(() => res.status(201).json({message : 'Utilisateur créé.'}))
            .catch(err => res.status(400).json({err : 'Il y a une erreur'}))
    })
    .catch(error => res.status(500).json({error}))
}

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                return res.status(401).json({error : "Utilisateur inexistant."})
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid){
                        return res.status(401).json({error: "Mot de passe incorrect."})
                    }
                    const {password, ...others} = user._doc
                    res.status(200).json({
                        ...others,
                        token: jwt.sign(
                            {
                            userId: user._id,
                            isAdmin: user.isAdmin,
                            },
                            process.env.JWT_SEC,
                            {expiresIn: "24h"}
                        )
                    })
                })
                .catch(err => res.status(500).json({err}))
        })
        .catch(err => res.status(500).json({err}))
}

exports.modify = (req, res, next) => {

}

exports.delete = (req, res, next) => {
    
}