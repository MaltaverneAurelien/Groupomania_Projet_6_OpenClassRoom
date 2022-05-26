const { query } = require("./index")

/**
 * Fonction qui permet de modifier le password de l'utilisateur
 */
async function modifyPasswordUser(id, password) {
    const rows = await query(
        `UPDATE utilisateur SET password = ? WHERE id = ?;`, [password, id])
        
    return rows[0]
}

module.exports = modifyPasswordUser;