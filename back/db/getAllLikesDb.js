const { query } = require("./index")

/**
 * Fonction pour recuperer tout les likes d'un post de la db
 */
async function getAllLikesDb(id) {
    const rows = await query(
       `SELECT
            postId,
            userId, 
            value
        FROM likes
        WHERE postId=?;`, [id])
    return rows
}

module.exports = getAllLikesDb;