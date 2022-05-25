const { query } = require("./index")

/**
 * Fonction pour recuperer tout les posts des utilisateurs grâce a la bd
 */
async function createPostDb(title, postText, userId, image) {
    const inserted = await query("INSERT INTO posts (title, postText, userId, image) VALUES (?, ?, ?, ?);", [title, postText, userId, image])
    if(inserted.insertId != "0") {
        const rows = await query("SELECT * FROM posts WHERE id = LAST_INSERT_ID();")
        return rows[0]
    }
}

module.exports = createPostDb;