const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Scheam
const userSchema = new Schema ({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
    
});

module.exports = User = mongoose.model('user', userSchema);