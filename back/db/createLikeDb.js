const { query } = require("./index")

/**
 * Fonction pour recuperer un like/dislike la premiere fois de l'utilisateur
 */
async function createlikeDb(postId, userId, likeValue) {
    const inserted = await query("INSERT INTO likes (postId, userId, value) VALUES (?, ?, ?);", [postId, userId, likeValue])
    if(inserted.insertId != "0") {
        const rows = await query("SELECT * FROM likes WHERE id = LAST_INSERT_ID();")
        return rows[0]
    }
   
}

module.exports = createlikeDb;