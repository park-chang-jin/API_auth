const Joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                return res.status(400).json({
                    msg: result.error
                });
            } else {
                if (!req.value) {
                    req.value = {};
                }
                req.value['body'] = result.value;
                next();
            }
        } 
    },
    scheams: {
        signupSchema: Joi.object().keys({
            name: Joi.string().min(3).max(20),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }),
        loginSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })

    }
};