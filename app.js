const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { MONGODB } = require('./config/geneal');
const errorHandler = require('./helper/errorHandler');
const routes = require('./routes');

app.use(bodyParser.json());

//Routes
app.use('/api', routes);

app.use((req, res, next) => {
    const err = new Error('not found');
    err.status = 404;
    next(err);
})

//Error handling
app.use(errorHandler)

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to mongodb');
        return app.listen(3300)
    })
    .then(() => console.log('server is running on port 3300'))
    .catch(err => console.log(err));