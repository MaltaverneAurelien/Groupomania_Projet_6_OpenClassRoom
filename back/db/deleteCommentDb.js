const { query } = require("./index")

/**
 * Fonction pour retirer un commentaire de l'utilisateur
 */
async function deleteCommentDb(id) {
    const rows = await query(
       `DELETE FROM comments WHERE id=?;`, [id])
    return rows[0]
}

module.exports = deleteCommentDb;