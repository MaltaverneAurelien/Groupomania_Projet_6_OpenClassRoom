const { query } = require("./index")

/**
 * Fonction pour recuperer tout les posts des utilisateurs grâce a la bd
 */
async function getAllPostsDb() {
    const rows = await query(
       `SELECT
            posts.id,
            title, 
            postText,
            userId,
            posts.image,
            utilisateur.username,
            posts.createAt,
            posts.updateAt
        FROM posts
        INNER JOIN utilisateur ON utilisateur.id=posts.userId;`)
    return rows
}

module.exports = getAllPostsDb;