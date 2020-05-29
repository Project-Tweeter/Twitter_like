let connection = require('../config/db')
// let moment = require('moment')

class User {

    static create(content, callback){
        connection.query('INSERT INTO User SET nom = ?, prénom = ?, email = ?, date_de_naissance = ?, password = ?', [content], (err, result) => { 
            if (err) throw err
            callback(result)
        })
    }

}

module.exports = User