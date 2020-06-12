const connection = require('../config/db')
// let moment = require('moment')

class Message {

    

    static createTweet(id_user, content, callback){
        connection.query('INSERT INTO Tweet SET id_user = ?, content= ?, created_at = ?', [id_user, content, new Date()], (error, result) => { 
            if (error) throw error
            callback(result)
        })
    }

    static all(callback) {
        connection.query('SELECT * FROM Tweet LEFT JOIN users ON Tweet.id_user = users.id_user ORDER BY created_at DESC', (error, rows) => {
            if (error) throw error
            callback(rows)
        })
    }

    static allUser(username, callback) {
        connection.query('SELECT * FROM Tweet LEFT JOIN users ON Tweet.id_user = users.id_user WHERE username = ? ORDER BY created_at DESC ',[username], (error, rows) => {
            if (error) throw error
            callback(rows)
        })
    }

    static tweetUser(id_tweet, callback) {
        connection.query('SELECT * FROM Tweet LEFT JOIN users ON Tweet.id_user = users.id_user WHERE id_tweet = ? ',[id_tweet], (error, row) => {
            if (error) throw error
            callback(row)
        })
    }

    static deleteTweet( Id_tweet, callback) {
        connection.query( 'DELETE FROM Tweet WHERE Id_tweet = ?',[ Id_tweet], (error, row) => {
            if (error) throw error
            callback(row)
        })
    }
    
}

module.exports = Message