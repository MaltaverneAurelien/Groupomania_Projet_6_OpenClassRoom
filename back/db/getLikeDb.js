const { query } = require("./index")

/**
 * Fonction pour recuperer un like grace a son userId & postId
 */
async function getLikeDb(postId, userId) {
    const rows = await query(
       `SELECT
            postId,
            userId,
            value
        FROM likes
        WHERE postId=? AND userId=?;`, [postId, userId])
    return rows[0]
}

module.exports = getLikeDb;