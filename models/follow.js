const db = require('../config/db')

class Follow {


    static create(currentUserId, idTarget, callback){
        db.query(' SELECT COUNT(follower_id) AS count FROM follows WHERE follower_id = ? AND followed_id = ?', [currentUserId, idTarget], (error, result) => { 
            if (error) throw error
            if (result[0].count > 0){
                console.log("vous êtes déjà abonné !")
            } else {
                db.query('INSERT INTO follows (follower_id, followed_id) VALUES (?,?)', [currentUserId, idTarget] )
                callback(result)
            }
        })
    }



}

module.exports= Follow