module.exports = {

    // async: 속도가 개선되게 비동기화 해주는것!
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

