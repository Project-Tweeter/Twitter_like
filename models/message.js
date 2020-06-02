let connection = require('../config/db')
// let moment = require('moment')

class Message {

    static create(id_user, content, callback){
        connection.query('INSERT INTO Tweet SET id_user = ?, content= ?, created_at = ?', [id_user, content, new Date()], (err, result) => { 
            if (err) throw err
            callback(result)
        })
    }

    static all(callback) {
        connection.query('SELECT * FROM Tweet LEFT JOIN User ON Tweet.id_user = User.id_user ORDER BY created_at DESC', (err, rows) => {
            if (err) throw err
            callback(rows)
        })
    }

    static allUser(callback) {
        connection.query('SELECT * FROM Tweet LEFT JOIN User ON Tweet.id_user = User.id_user WHERE username = "andreiaa"', (err, rows) => {
            if (err) throw err
            callback(rows)
        })
    }
}

module.exports = Message