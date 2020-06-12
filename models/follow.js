const connection = require("../config/db");
// let moment = require('moment')

class Follow {
  static create(currentUserId, idTarget, callback) {
    connection.query(
      " SELECT COUNT(id_follower) AS count FROM Follow WHERE id_follower = ? AND id_followed = ?",
      [currentUserId, idTarget],
      (err, result) => {
        if (err) throw err;
        if (result[0].count > 0) {
          console.log("vous êtes déjà abonné !");
        } else {
          connection.query("INSERT INTO Follow (id_follower, id_followed) VALUES (?,?)", [currentUserId, idTarget]);
          callback(result);
        }
      }
    );
  }

  static delete(currentUserId, idTarget, callback) {
      console.log(currentUserId, idTarget)
    connection.query("DELETE FROM Follow WHERE id_follower = ? AND id_followed = ?", [currentUserId, idTarget], (err, result) => {
      if (err) throw err;
      callback(result);
    });
  }

  static isFollow(currentUserId, idTarget, callback) {
    console.log(currentUserId, idTarget);
    connection.query(
      "SELECT * FROM Follow WHERE id_follower = ? AND id_followed = ?",
      [currentUserId, idTarget],
      (err, result) => {
        console.log(result);
        callback(result);
      }
    );
  }
}

module.exports = Follow;
