const db = require('../config/db')

class Message {

    

    static createTweet(id_user, content, callback){
        db.query('INSERT INTO tweets SET id_user = ?, content= ?, created_at = ?', [id_user, content, new Date()], (error, result) => { 
            if (error) throw error
            callback(result)
        })
    }

    static all(callback) {
        db.query('SELECT * FROM tweets LEFT JOIN users ON tweets.id_user = users.id_user ORDER BY created_at DESC', (error, rows) => {
            if (error) throw error
            callback(rows)
        })
    }

    static allUser(username, callback) {
        db.query('SELECT * FROM tweets LEFT JOIN users ON tweets.id_user = users.id_user WHERE username = ? ORDER BY created_at DESC ',[username], (error, rows) => {
            if (error) throw error
            callback(rows)
        })
    }

    static tweetUser(id_tweet, callback) {
        db.query('SELECT * FROM tweets LEFT JOIN users ON tweets.id_user = users.id_user WHERE id_tweet = ? ',[id_tweet], (error, row) => {
            if (error) throw error
            callback(row)
        })
    }

    static deleteTweet( Id_tweet, callback) {
        db.query( 'DELETE FROM tweets WHERE Id_tweet = ?',[ Id_tweet], (error, row) => {
            if (error) throw error
            callback(row)
        })
    }
    
}

module.exports = Message