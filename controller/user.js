module.exports = {
    signup: async(req, res) => {
        res.status(200).json({
            msg: 'signup!!!'
        });
    },

    login: async(req, res) => {
        res.status(200).json({
            msg: 'login!!'
        });
    },

    secret: async(req, res) => {
        res.status(200).json({
            msg: 'secet!!'
        });
    }

};

