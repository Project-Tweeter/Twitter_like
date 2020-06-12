const connection = require('../config/db');
const bcrypt = require('bcryptjs');


class User {

        static hashingPassword(password){
          const salt = bcrypt.genSaltSync(12);
          const hash = bcrypt.hashSync(password, salt);
          return hash
        }

        static createUser(nom, prenom, email, birthday, password, username, link, callback){
            password = this.hashingPassword(password);
            connection.query('INSERT INTO users SET nom = ?, prenom = ?, email = ?, birthday = ?,  password = ?, username = ?, link = ?', [nom,prenom,email,birthday,password,username,link], (error, result) => { 
            if (error) throw error
            callback(result)
            })
        }

        static updateUser(nom, prenom, email, username, link, id_user, callback){
          connection.query('UPDATE users SET nom = ?, prenom = ?, email = ?, username = ?, link = ? WHERE id_user = ?', [nom,prenom,email,username,link, id_user], (error, result) => { 
          if (error) throw error
          callback(result)
          })
      }

        static findUser(username, callback) {
          connection.query("SELECT * FROM users WHERE username = ?", [username], (error, user) =>{
            if (error) throw error
            callback(error, user);
          });

        }

        static findUsersExceptMe(username, callback) {
          connection.query("SELECT * FROM users WHERE username != ? ", [username], (error, user) =>{
            if (error) throw error
            callback(error, user);
          });

        }

}

module.exports= User;