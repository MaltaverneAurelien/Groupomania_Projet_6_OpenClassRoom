const { query } = require("./index")

/**
 * Fonction pour recuperer un commentaire grâce a la bd
 */
async function getOneCommentDb(id) {
    const rows = await query(
       `SELECT
            comments.id,
            userId,
            postId,
            text,
            utilisateur.username,
            comments.createAt,
            comments.updateAt
        FROM comments
        INNER JOIN utilisateur ON utilisateur.id=comments.userId
        WHERE comments.id=?;`, [id])
    return rows[0]
}

module.exports = getOneCommentDb;