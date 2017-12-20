// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema   = mongoose.Schema;

var coinSchema = new Schema({
        coin1: String,
        coin2: String,
        coin3: String
  });

var userSchema = new Schema({

    local            : {
        email        : String,
        firstName        : String,
        lastName        : String,
        password     : String,
        nanoPoolToken     : String,
        favorites:  [coinSchema]
        // unique: true
    }

});



// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
const User =  mongoose.model('user', userSchema);

module.exports = User;
