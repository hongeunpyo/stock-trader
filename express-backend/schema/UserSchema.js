const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: 'Your email is required',
        trim: true
    },
    password: {
        type: String,
        required: 'Your password is required',
        max: 100
    },
    fullName: {
        type: String,
        required: 'Full Name is required',
        max: 100
    },
    // values stored in cents so we don't need to store in a float. We convert cents in request controller.
    cents: {
        type: Number,
        default: 500000
    }
}, {timestamps: true});

// middleware for hashing password prior to login verification/account creation
UserSchema.pre('save',  function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

// compares hashed password to password passed in request
UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function() {
    // 10 minutes expiration time
    const secondsTillExpiration = 600;

    const payload = {
        id: this._id,
        email: this.email,
        fullName: this.fullName,
    };
    console.log(payload);
    return jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: secondsTillExpiration * 1000 // convert seconds to milliseconds
    });
};

module.exports = mongoose.model('Users', UserSchema);