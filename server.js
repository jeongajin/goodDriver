const express = require("express");
const serverless = require("serverless-http");
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

let user_id = 'user1';
let friend_id = 'user2';

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'html');
app.use(express.static("public"));

// 서버리스 함수의 특성상, 각 요청을 함수로 처리해야 합니다.
app.get("/", function (req, res) {
    res.render('index.ejs');
});

app.get("/help", function (req, res) {
    res.render('help.html');
});

app.get("/records", function (req, res) {
    res.render('records.html');
});

app.get("/setttings", function (req, res) {
    res.render('settings.html');
});

// Netlify Functions의 엔드포인트로 export
module.exports.handler = serverless(app);
