const { query } = require("./index")

/**
 * Fonction qui permet de vérifier si l'username est déjà présent dans la db
 */
async function modifyPasswordUser(id, password) {
    const rows = await query(
        `UPDATE utilisateur SET password = ? WHERE id = ?;`, [password, id])
        
    return rows[0]
}

module.exports = modifyPasswordUser;