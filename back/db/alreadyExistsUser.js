const { query } = require("./index")

/**
 * Fonction qui permet de vérifier si l'username est déjà présent dans la db
 */
async function alreadyExistsUser(username) {
    const existsUser= await query("SELECT COUNT( * ) as count FROM utilisateur WHERE username=?;", [username])
    const result = existsUser[0].count;
    if(result != "0") {
        return true
    } else {
        return false
    }
}

module.exports = alreadyExistsUser;