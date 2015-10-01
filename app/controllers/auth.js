var router = require("express").Router();
var accountSchema = require("../models/account");
var Account = require("mongoose").model("Account", accountSchema);

var createAccount = function(req, res, next){
  var username = req.body.username;
  if(!Account.confirmPassword(req.body.password, req.body.confirmationPassword)){
    return res.send({message: "Password and confirmation don't match"});
  }
  Account.findOne({username: username}, function(err, account){
    if(err){
      return next(err);
    }
    if(account){
      return res.status(401).send({"message":"An account with this username alreay exists"});
    }
    else{
      var newAccount = new Account(req.body);
      newAccount.save(function(err, account){
        if(err){return next(err);}
        return res.send({account: account.toObject()});
      });
    }
  });
};

var logAccount = function(req, res, next){
  var username = req.body.username;
  var password = req.body.password;
  Account.findOne({username: username}, function(err, account){
    if(err){
      return next(err);
    }
    if(account){
      if(account.comparePassword(password)){
        req.session.account = {account: account.toObject()};
        return res.redirect("/profile");
      }
      else{
        return res.status(401).send({"message": "Wrong password"});
      }
    }
    else{
      return res.status(404).send({"message": "There is no account with this username"});
    }
  });
};

var logout = function(req, res, next){
  req.session.destroy();
  res.send({"message":"You should be logged out"});
};

router.post("/signup", createAccount)
router.post("/login", logAccount)
router.get("/logout", logout)

module.exports = router;
