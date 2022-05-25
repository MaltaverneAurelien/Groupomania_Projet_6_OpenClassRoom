const { query } = require("./index")

/**
 * Fonction pour recuperer un utilisateur de la db grace a son username
 */
async function getUserByUsername(username) {
    const rows = await query("SELECT * FROM utilisateur WHERE username = ?;", [username])
    return rows[0]
}

module.exports = getUserByUsername;