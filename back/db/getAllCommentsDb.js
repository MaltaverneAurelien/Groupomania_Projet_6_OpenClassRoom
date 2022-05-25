const { query } = require("./index")

/**
 * Fonction pour recuperer tout les commentaires d'un post de la db
 */
async function getAllCommentsDb(id) {
    const rows = await query(
       `SELECT
            comments.id,
            postId,
            userId, 
            text,
            utilisateur.username,
            comments.createAt,
            comments.updateAt
        FROM comments
        INNER JOIN utilisateur ON utilisateur.id=comments.userId
        WHERE postId=?;`, [id])
    return rows
}

module.exports = getAllCommentsDb;