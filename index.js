const express = require('express');
const app = express();
const port = 5000;
const api = require('./routes/api');
const path = require('path')
const firebase = require("firebase")
const mainRoute = require("./routes/main");
firebase.default.initializeApp({
    apiKey: "AIzaSyBrF94v3ywRNEvIMtTUGboO1RwBF9cu840",
    authDomain: "todo-app-7519a.firebaseapp.com",
    projectId: "todo-app-7519a",
    storageBucket: "todo-app-7519a.appspot.com",
    messagingSenderId: "219626010533",
    appId: "1:219626010533:web:12aba06c8d5c6519b41a4c",
    measurementId: "G-1ELDW7V3X9"
})
app.set("view engine","ejs")
app.use(express.static('public'))
app.use(express.json());
app.use('/api',api);
app.use('/',mainRoute);
app.listen(port,()=>{
    console.log("Listening on port "+port);
});