const express = require("express");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require('body-parser');

let user_id = 'user1';
let friend_id = 'user2';

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get("/help", function (req, res) {
    res.sendFile(__dirname + '/public/help.html');
});

app.get("/records", function (req, res) {
    res.sendFile(__dirname + '/public/records.html');
});

app.get("/settings", function (req, res) {
    res.sendFile(__dirname + '/public/settings.html');
});

module.exports.handler = serverless(app);
