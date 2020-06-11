const connection = require('../config/db')
// let moment = require('moment')

class Follow {


    static create(currentUserId, idTarget, callback){
        connection.query(' SELECT COUNT(id_follower) AS count FROM Follow WHERE id_follower = ? AND id_followed = ?', [currentUserId, idTarget], (err, result) => { 
            if (err) throw err
            if (result[0].count > 0){
                console.log("vous êtes déjà abonné !")
            } else {
                connection.query('INSERT INTO Follow (id_follower, id_followed) VALUES (?,?)', [currentUserId, idTarget] )
                callback(result)
            }
        })
    }



}

module.exports= Follow