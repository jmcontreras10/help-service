const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const configurePassport= require("./configurePassport.js");
const passportRouter = require("./routes/passport");

const indexRouter = require('./routes/index');
const solicitudesRouter = require('./routes/solicitude');
const reportsRouter = require('./routes/report');
const usersRouter = require('./routes/user');
const dbManagerv = require('./util/dbManager').mongoConnect;

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front/build")));

configurePassport(app);

app.use('/', indexRouter);
app.use('/reports', reportsRouter);
app.use('/solicitudes', solicitudesRouter);
app.use('/users', usersRouter);

app.use("/auth",passportRouter);
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/front/build/index.html"));
});

dbManagerv(()=>{
    
});

module.exports = app;