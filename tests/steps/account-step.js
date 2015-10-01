var mongoose = require("mongoose");
var accountSchema = require("../../app/models/account");
var accountModel = mongoose.model("Account", accountSchema);

defineStep(/Creating an account with (.*) as password must be (.*)./, function(password, acceptance){
  var account = new accountModel();
  account.username = "i-am-a-user";
  account.password = password;

  return account.validate().then(function(){
    expect("accepted").toEqual(acceptance);
  }, function(err){
    expect("rejected").toEqual(acceptance);
  });
});

defineStep(/Creating an account with (.*) as password and (.*) as confirmation must be (.*)./, function(password, confirmation, acceptance){
  var accepted = accountModel.confirmPassword(password, confirmation);
  expect(accepted ? "accepted" : "rejected").toEqual(acceptance);
});

defineStep(/Creation allowed/, function(accountType, username, password, firstname, lastname, birthDate, acceptance){
  var account = new accountModel();
  account.username = username;
  account.type = accountType;
  account.password = password;
  account.firstname = firstname;
  account.lastname = lastname;
  account.birthdate = birthDate;

  return account.validate().then(function(){
    expect("yes").toEqual(acceptance);
  }, function(err){
    if(err.errors.username){
      expect("Account Name is required").toEqual(acceptance);
    }
    else if(err.errors.password){
      expect("Password is required").toEqual(acceptance);
    }
    else{
      expect("Premium users must provide first name, last name and birth date").toEqual(acceptance);
    }
  });
});
