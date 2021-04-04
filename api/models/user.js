const Sequelize = require('sequelize');
const db = require('./../db');
const crypto = require("crypto");


class User extends Sequelize.Model {
    hash(password, salt) {
      return bcrypt.hash(password, salt);
    }
  }
  
  User.init(
    {
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      salt: {
        type: Sequelize.STRING,
      },
    },
    { sequelize: db, modelName: "user" }
  );
  
  User.addHook('beforeCreate', (user) => {
      user.salt = crypto.randomBytes(20).toString('hex')
      user.password = user.hashPassword(user.password);
  })

  User.prototype.hashPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
  };

  User.prototype.validPassword = function(loginPassword) {
      return this.password === this.hashPassword(loginPassword);
  };

    
  module.exports = User;