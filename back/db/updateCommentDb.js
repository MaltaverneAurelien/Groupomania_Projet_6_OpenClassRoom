const { comment } = require("../controllers/posts");
const { query } = require("./index")

/**
 * Fonction pour recuperer tout les posts des utilisateurs grâce a la bd
 */
async function updateCommentDb(text, id) {
    await query("UPDATE comments SET text = ? WHERE id = ?;", [text, id])
}

module.exports = updateCommentDb;