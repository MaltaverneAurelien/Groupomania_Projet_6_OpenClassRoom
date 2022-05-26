const { query } = require("./index")

/**
 * Fonction qui permet d'ajouter le titre, le texte et l'image à la bdd post
 */
async function createPostDb(title, postText, userId, image) {
    const inserted = await query("INSERT INTO posts (title, postText, userId, image) VALUES (?, ?, ?, ?);", [title, postText, userId, image])
    if(inserted.insertId != "0") {
        const rows = await query("SELECT * FROM posts WHERE id = LAST_INSERT_ID();")
        return rows[0]
    }
}

module.exports = createPostDb;