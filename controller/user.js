const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');



signToken = user => {
    return jwt.sign({
        iss: 'ckdwls',
        sub: user._id,
        lat: new Date().getTime,
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET);
};


module.exports = {


    // async: 속도가 개선되게 비동기화 해주는것!
    signup: async(req, res) => {
       const { name, email, password } = req.value.body;

       userModel
        .findOne({ "local.email": email })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    msg: 'Email is already in user'
                });
            }
            const newUser = new userModel({
                method: 'local',
                local: {
                    name: name,
                    email: email,
                    password: password
                }
            });

            const token = signToken(newUser);

            console.log(token);

            newUser
                .save()
                .then(user => {
                    res.status(200).json({
                        msg: 'Successful SignUp',
                        tokenInfo: token
                    });
                })
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
    },





    login: async(req, res) => {
        console.log('여기오냐?111');
        const token = signToken(req.user);
        console.log('여기오냐?222');
        res.status(200).json({
            result: "Successful Login",
            tokenInfo: 'Bearer ' + token
        })
    },

    secret: async(req, res) => {
        // res.status(200).json({
        //     msg: 'secet!!'
        // });
        res.status(200).json({
            secret: 'Successful!'
        });
    }

};

