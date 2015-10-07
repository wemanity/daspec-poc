var errorHandler = function(err, req, res, next){
  if(err.name == "ValidationError"){
    for(error in err.errors){
      switch(error){
        case "username":
          return res.render("index", {message: "Username must be at least 5 characters and maximum 20 characters long"});
          break;
        case "password":
          return res.render("index", {message: "Password must be at least 8 characters and maximum 15 characters long. It must contain at least one lowercase, one uppercase and one numeric character. It can contain special characters. Example : 'myP@ssw0rd'"});
          break;
        case "type":
          return res.render("index", {message: "Premium accounts must provide first name, last name and date of birth"});
          break;
      }
    }
  }else if(err.type == "AuthError"){
    return res.render("index", {message: err.message})
  }
  console.log("SERVER ERROR ON", req.url);
  console.log(err);
  res.status(500).send("There was a problem...");
}

module.exports = errorHandler;
