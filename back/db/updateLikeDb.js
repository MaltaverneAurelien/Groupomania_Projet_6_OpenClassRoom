const { query } = require("./index")

/**
 * Fonction pour modifier le like ou dislike du post
 */
async function updateLikeDb(postId, userId, likeValue) {
    const rows = await query(
        `UPDATE likes SET value = ? WHERE postId = ? AND userId= ?;`, [likeValue, postId, userId])
    console.log(rows);
    return rows[0]
}

module.exports = updateLikeDb;