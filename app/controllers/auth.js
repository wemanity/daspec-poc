var router = require("express").Router();
var accountSchema = require("../models/account");
var Account = require("mongoose").model("Account", accountSchema);

var createAccount = function(req, res, next){
  var username = req.body.username;
  if(!Account.confirmPassword(req.body.password, req.body.passwordConfirmation)){
    var myError = new Error("Password and confirmation don't match");
    myError.type = "AuthError";
    return next(myError);
  }
  Account.findOne({username: username}, function(err, account){
    if(err){
      return next(err);
    }
    if(account){
      var myError = new Error("An account with this username alreay exists");
      myError.type = "AuthError"
      return next(myError);
    }
    else{
      var newAccount = new Account(req.body);
      newAccount.save(function(err, account){
        if(err){return next(err);}
        req.session.account = account.toObject();
        return res.redirect("/profile");
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
        req.session.account = account.toObject();
        return res.redirect("/profile");
      }
      else{
        var myError = new Error("Wrong password");
        myError.type = "AuthError";
        return next(myError);
      }
    }
    else{
      var myError = new Error("There is no account with this username");
      myError.type = "AuthError";
      return next(myError);
    }
  });
};

var logout = function(req, res, next){
  req.session.destroy();
  res.redirect("/");
};

router.post("/signup", createAccount)
router.post("/login", logAccount)
router.get("/logout", logout)

module.exports = router;
