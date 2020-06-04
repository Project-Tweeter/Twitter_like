let connection = require('../config/db');


class User {

        static hashingPassword(password){
          let bcrypt = require('bcryptjs');
          let salt = bcrypt.genSaltSync(12);
          let hash = bcrypt.hashSync(password, salt);
          return hash
        }

        static create(nom, prenom, email, birthday, password, username, callback){
            password = this.hashingPassword(password);
            connection.query('INSERT INTO User SET nom = ?, prenom = ?, email = ?, birthday = ?,  password = ?, username = ?', [nom,prenom,email,birthday,password,username], (err, result) => { 
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

}

module.exports= User;