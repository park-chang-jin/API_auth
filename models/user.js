const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

// Create Scheam
const userSchema = new Schema ({
    // name: {
    //     type: String
    // },
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     lowercase: true
    // },
    // password: {
    //     type: String,
    //     required: true
    // }

    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    local: {
        name: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        },
        password: {
            type: String
        }
    },
    google: {
        id: {
            type: String
        },
        name: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    },
    facebook: {
        id: {
            type: String
        },
        name: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    }
    
});

userSchema.pre('save', async function(next) {
    try {
        
        console.log('entered');
        if (this.method != 'local') {
            next();
        }

        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Generate a password hash
        const passwordhash = await bcrypt.hash(this.local.password, salt);
        // Re-assign hashed version over original, plain text password
        this.local.password = passwordhash;
        console.log(passwordhash);
        next();

    } catch (error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function(newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.local.password);
    } catch (error) {
        throw new Error(error);
    }
};


module.exports = User = mongoose.model('user', userSchema);