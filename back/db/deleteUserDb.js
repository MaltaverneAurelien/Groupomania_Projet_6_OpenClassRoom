const { query } = require("./index")

/**
 * Fonction pour retirer un utilisateur de la bdd
 */
async function deleteUserDb(id) {
    await query(`DELETE FROM utilisateur WHERE id=?;`, [id])
}

module.exports = deleteUserDb;