module.exports = (err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({ error: { message: err.message } });
};

// {
//     if (typeof (err) === 'string') {
//         // custom application error
//         return res.status(400).json({ message: err });
//     }

//     if (err.name === 'UnauthorizedError') {
//         // jwt authentication error
//         return res.status(401).json({ message: 'Invalid Token' });
//     }

//     // default to 500 server error
//     return res.status(500).json({ message: err.message });
// };