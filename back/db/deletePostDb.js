const { query } = require("./index")

/**
 * Fonction pour retirer un commentaire de l'utilisateur
 */
async function deletePostDb(id) {
    await query(`DELETE FROM comments WHERE postId=?;`, [id])
    await query(`DELETE FROM likes WHERE postId=?;`, [id])
    await query(`DELETE FROM posts WHERE id=?;`, [id])
}

module.exports = deletePostDb;