const db = require("../config/db");

class Message {
  static createTweet(currentIdUser, content, callback) {
    db.query(
      "INSERT INTO tweets SET user_id = ?, content= ?, created_at = ?",
      [currentIdUser, content, new Date()],
      (error, result) => {
        if (error) throw error;
        callback(result);
      }
    );
  }

  static showAllTweets(callback) {
    db.query(
      "SELECT * FROM tweets LEFT JOIN users ON tweets.user_id = users.id ORDER BY created_at DESC",
      (error, tweets) => {
        if (error) throw error;
        callback(tweets);
      }
    );
  }

  static showAllTweetsCurrentUser(username, callback) {
    db.query(
      "SELECT * FROM tweets LEFT JOIN users ON tweets.user_id = users.id WHERE username = ? ORDER BY created_at DESC ",
      [username],
      (error, tweets) => {
        if (error) throw error;
        callback(tweets);
      }
    );
  }

  static showOneTweetCurrentUser(tweet_id, callback) {
    db.query(
      "SELECT * FROM tweets LEFT JOIN users ON tweets.user_id = users.id WHERE tweet_id = ? ",
      [tweet_id],
      (error, tweet) => {
        if (error) throw error;
        callback(tweet);
      }
    );
  }

  static deleteTweet(tweet_id, callback) {
    db.query(
      "DELETE FROM tweets WHERE tweet_id = ?",
      [tweet_id],
      (error, tweet) => {
        if (error) throw error;
        callback(tweet);
      }
    );
  }
}

module.exports = Message;
