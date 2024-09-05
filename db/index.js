/*
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/auth-app')
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => console.log(err));
*/










const mongoose = require('mongoose');

// Replace <db_password> with your actual database password
const dbPassword = 'L0gmhr1JH91cdF0M';
const dbName = 'auth-app'; // Replace with your actual database name if different
const dbURI = `mongodb+srv://nivaranhackx:${dbPassword}@cluster0.u6foq.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => console.log('Error connecting to database:', err));
