const { query } = require("./index")

/**
 * Fonction pour recuperer un utilisateur de la db grace a son id
 */
async function getUserById(id) {
    const rows = await query("SELECT * FROM utilisateur WHERE id = ?;", [id])
    return rows[0]
}

module.exports = getUserById;