let connection = require('../config/db')
// let moment = require('moment')

class Message {

    static create(content, callback){
        connection.query('INSERT INTO Tweet SET content= ?, created_at = ?', [content, new Date()], (err, result) => { 
            if (err) throw err
            callback(result)
        })
    }

    static all(callback) {
        connection.query('SELECT * FROM Tweet ORDER BY created_at DESC', (err, rows) => {
            if (err) throw err
            callback(rows)
        })
    }
}

module.exports = Message