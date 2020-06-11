const connection = require('../config/db');
const bcrypt = require('bcryptjs');


class User {

        static hashingPassword(password){
          const salt = bcrypt.genSaltSync(12);
          const hash = bcrypt.hashSync(password, salt);
          return hash
        }

        static create(nom, prenom, email, birthday, password, username, link, callback){
            password = this.hashingPassword(password);
            connection.query('INSERT INTO User SET nom = ?, prenom = ?, email = ?, birthday = ?,  password = ?, username = ?, link = ?', [nom,prenom,email,birthday,password,username,link], (err, result) => { 
            if (err) throw err
            callback(result)
            })
        }

        static updateUser(nom, prenom, email, username, link, id_user, callback){
          connection.query('UPDATE User SET nom = ?, prenom = ?, email = ?, username = ?, link = ? WHERE id_user = ?', [nom,prenom,email,username,link, id_user], (err, result) => { 
          if (err) throw err
          callback(result)
          })
      }

        static findUser(username, callback) {
          connection.query("SELECT * FROM User WHERE username = ?", [username], (err, user) =>{
            if (err) throw err
            callback(err, user);
          });

        }

        static allUser(username, callback) {
          connection.query("SELECT * FROM User WHERE username != ? ", [username], (err, user) =>{
            if (err) throw err
            callback(err, user);
          });

        }

}

module.exports= User;