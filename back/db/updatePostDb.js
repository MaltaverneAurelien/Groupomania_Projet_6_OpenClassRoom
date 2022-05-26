const { query } = require("./index")

/**
 * Fonction pour modifier un post
 */
async function updatePostDb(title, postText, image, id) {
    if(image === undefined) {
        await query("UPDATE posts SET title = ?, postText = ? WHERE id = ?;", [title, postText, id])
        return
    }
    await query("UPDATE posts SET title = ?, postText = ?, image = ? WHERE id = ?;", [title, postText, image, id])
}

module.exports = updatePostDb;