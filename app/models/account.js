var bcrypt = require("bcrypt");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usernameValidator = function(username){
  return username.length <= 20 && username.length > 5;
};

var passwordValidator = function(password){
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/.test(password) && /^[\x20-\x7E\xA3]+$/.test(password);
};

var emailValidator = function(email){
  return email.length < 40;
};

var premiumValidator = function(type){
  if(type === "Free" || this.firstname && this.lastname && this.birthdate){
    return true;
  }
  return false;
}

var accountSchema = new Schema({
  username: {type: String, required: true, unique: true, validate: usernameValidator},
  password: {type: String, required: true, validate: [passwordValidator, "Password must be blablabla"]},
  email: {type: String, validate: emailValidator},
  "type": {type: String, default: "Free", enum:["Free", "Premium"], validate: [premiumValidator, "Premium Account must be blablablabla"]},
  firstname: {type: String},
  lastname: {type: String},
  birthdate: {type: Date}
});

accountSchema.pre("save", function(next){
  if(this.isModified("password")){
    //TODO
  }
  next();
});

accountSchema.methods.generateHash = function(toHash){
  return bcrypt.hashSync(toHash, bcrypt.genSaltSync(8), null);
};

accountSchema.methods.comparePassword = function(toConfirm){
  //return bcrypt.compareSync(toConfirm, this.password);
  return toConfirm == this.password;
};

accountSchema.statics.confirmPassword = function(password, confirmation){
  return password === confirmation;
};

module.exports = accountSchema;
