const express = require('express');
const mongoose = require('mongoose');
const app = express();


mongoose.connect('mongodb+srv://admin:admin@cluster0-tejxt.mongodb.net/test?retryWrites=true',
{
    useNewUrlParser : true,
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require('./routes'));

app.listen(3333);