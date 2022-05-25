const { query } = require("./index")

/**
 * Fonction pour creer & recuperer les informations d'un commentaire grâce à la db
 */
async function createCommentDb(postId, commentText, userId) {
    const inserted = await query("INSERT INTO comments (postId, text, userId) VALUES (?, ?, ?);", [postId, commentText, userId])
    if(inserted.insertId != "0") {
        const rows = await query(
        `SELECT *
        FROM comments
        INNER JOIN utilisateur ON utilisateur.id=comments.userId
        WHERE comments.id = LAST_INSERT_ID();`)
        return rows[0] 
    }
}

module.exports = createCommentDb;