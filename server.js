const express = require("express");
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');

let user_id = 'user1';
let friend_id = 'user2';

app.listen(8080, function () {
    console.log("포트 8080으로 서버 대기중 ... ");
});

app.use(express.static('public'));

//body-parser 라이브러리 추가
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render('home.ejs');
});

app.get("/help", function (req, res) {
    res.render('help.ejs');
});

app.get("/records", function (req, res) {
    res.render('records.ejs');
});

app.get("/settings", function (req, res) {
    res.render('settings.ejs');
});
