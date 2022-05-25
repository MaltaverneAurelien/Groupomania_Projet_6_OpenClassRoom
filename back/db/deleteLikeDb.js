const { query } = require("./index")

/**
 * Fonction pour retirer un like/dislike de l'utilisateur
 */
async function deletelikeDb(postId, userId) {
    const rows = await query(
       `DELETE FROM likes WHERE postId=? AND userId=?;`, [postId, userId])
    return rows[0]
}

module.exports = deletelikeDb;