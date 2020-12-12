const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bCrypt = require('bcryptjs');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [emailValidator, 'Incorrect email format given']
    },
    password: {
        type: String,
        required: true
    },
});

function emailValidator(value) {
    return /^.+@.+\..+$/.test(value);
}

userSchema.pre('save', async function (next) {
    try {
        const salt = await bCrypt.genSalt(10);
        const passwordHash = await bCrypt.hash(this.password, salt);
        this.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.methods.isPasswordValid = async function (value) {
    try {
        return await bCrypt.compare(value, this.password);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = mongoose.model('user', userSchema);