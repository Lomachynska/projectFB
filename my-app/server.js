const express = require('express');
const mongoose = require('mongoose');
const movieRoutes = require('./sample_mflix/tovar');

const PORT = 3000;
const URL = "mongodb+srv://lomachyn:<Loma551873>@cluster0.crfk3.mongodb.net/sample_mflix";

const app = express();
app.use(express.json());

mongoose
.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then((re) => console.log('Connected to MongoDB'))
.catch((err) => console.log('DB connection error: &{err}'));

app.listen(PORT, (err) => {
    err ? console(err) : console.log('listening port &{PORT}');
});

app.use(movieRoutes);