const { query } = require("./index")

/**
 * Fonction pour supprimer un post (on supprime les commentaires et likes en amont)
 */
async function deletePostDb(id) {
    await query(`DELETE FROM comments WHERE postId=?;`, [id])
    await query(`DELETE FROM likes WHERE postId=?;`, [id])
    await query(`DELETE FROM posts WHERE id=?;`, [id])
}

module.exports = deletePostDb;