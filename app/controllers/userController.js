
const User = require('./../models/user');
const jwtHelper = require('../../helper/jwtHelper');

exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = await User.findOne({ email });

        if (user)
            return res.status(403).json({ error: { message: 'email already exist' } });

        const newUser = new User({ firstName, lastName, email, password });
        await newUser.save();

        const token = jwtHelper.generateToken(user);
        res.status(200).json({ message: 'success', token: token })
    } catch (error) {
        error.status = 400;
        next(error);
    }

};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user)
            return res.status(403).json({ error: { message: 'invalid email/password' } });

        const isValid = await user.isPasswordValid(password);

        if (!isValid)
            return res.status(403).json({ error: { message: 'invalid email/password' } });

        const token = jwtHelper.generateToken(user);
        res.status(200).json({ message: 'login success', token: token });
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

