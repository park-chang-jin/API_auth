const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');



signToken = user => {
    return jwt.sign({
        iss: 'ckdwls',
        sub: user.id,
        lat: new Date().getTime,
        exp: new Date().setDate(new Date().getDate() + 1)
    }, keys.secretOrkey);
};




module.exports = {


    // async: 속도가 개선되게 비동기화 해주는것!
    signup: async(req, res) => {
       const { name, email, password } = req.value.body;


       userModel
        .findOne({ email })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    msg: 'Email is already in user'
                });
            }
            const newUser = new userModel({
                name,
                email,
                password
            });

            const token = signToken(newUser);

            newUser
                .save()
                .then(user => {
                    res.status(200).json({
                        msg: 'Successful SignUp',
                        userInfo: user,
                        tokenInfo: token
                    });
                })
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
    },

    login: async(req, res) => {
        
    },

    secret: async(req, res) => {
        res.status(200).json({
            msg: 'secet!!'
        });
    }

};

