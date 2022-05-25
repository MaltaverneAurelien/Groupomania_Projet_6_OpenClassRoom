const { query } = require("./index")

/**
 * Fonction pour recuperer un post grâce a la bd
 */
async function getOnePostDb(id) {
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
        INNER JOIN utilisateur ON utilisateur.id=posts.userId
        WHERE posts.id=?;`, [id])
    return rows[0]
}

module.exports = getOnePostDb;