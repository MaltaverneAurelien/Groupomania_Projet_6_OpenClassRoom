const { query } = require("./index")

/**
 * Fonction pour recuperer tout les posts des utilisateurs grâce a la bd
 */
async function updatePostDb(title, postText, image, id) {
    if(image === undefined) {
        await query("UPDATE posts SET title = ?, postText = ? WHERE id = ?;", [title, postText, id])
        return
    }
    await query("UPDATE posts SET title = ?, postText = ?, image = ? WHERE id = ?;", [title, postText, image, id])
}

module.exports = updatePostDb;