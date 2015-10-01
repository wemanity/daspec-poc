var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var mongoose = require("mongoose");

var config = require("./config/config");
var router = require("./controllers/auth");
var accountSchema = require("./models/account");
var Account = mongoose.model("Account", accountSchema);

mongoose.connect(process.env.MONGO_URI || config.mongoURI);
mongoose.connection.on("error", function(err){
  console.log(err);
});

var sessionParams = {
  secret: config.secret,
  name: "daspecpoc.connect.sid",
  cookie:{
    maxAge: 3600*1000*2 // 2 hours
  },
  saveUninitialized: true,
  resave: true
}

app.set("view engine", "jade");
app.set("views", __dirname + "/views");

app.use(cookieParser());
app.use(session(sessionParams));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.get("/", function(req, res, next){
  if(req.session.account){
    return res.redirect("/profile");
  }
  return res.render("index");
});

app.get("/profile", function(req, res, next){
  return res.render("profile");
});

app.use("/", router);

app.use(function(err, req, res, next){
  if(err.name == "ValidationError"){
    for(error in err.errors){
      switch(error){
        case "username":
          break;
        case "password":
          break;
        case "type":
          break;
      }
    }
  }
  console.log("SERVER ERROR ON", req.url);
  console.log(err);
  res.status(500).send("There was an error");
});

app.set('port', process.env.PORT || 8080);

app.listen(app.get("port"), function(){
  console.log("Server listening on port", app.get("port"));
});
