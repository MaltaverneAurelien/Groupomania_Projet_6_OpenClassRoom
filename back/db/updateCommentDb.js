const { query } = require("./index")

/**
 * Fonction pour modifier le commentaire
 */
async function updateCommentDb(text, id) {
    await query("UPDATE comments SET text = ? WHERE id = ?;", [text, id])
}

module.exports = updateCommentDb;