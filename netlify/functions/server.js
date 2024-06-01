const express = require("express");
const serverless = require("serverless-http");
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

let user_id = 'user1';
let friend_id = 'user2';

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

// 서버리스 함수의 특성상, 각 요청을 함수로 처리해야 합니다.
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get("/help", function (req, res) {
    res.sendFile(path.join(__dirname, '../public', 'help.html'));
});

app.get("/records", function (req, res) {
    res.sendFile(path.join(__dirname, '../public', 'records.html'));
});

app.get("/settings", function (req, res) {
    res.sendFile(path.join(__dirname, '../public', 'settings.html'));
});

// Netlify Functions의 엔드포인트로 export
module.exports.handler = serverless(app);
