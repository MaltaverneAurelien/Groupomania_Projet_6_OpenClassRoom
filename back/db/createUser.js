const { query } = require("./index")

/**
 * Fonction qui permet d'ajouter l'username, l'email et le password à la db
 */
async function createUser(username, email, password) {
  const inserted = await query("INSERT INTO utilisateur (username, email, password, admin) VALUES (?, ?, ?, false);", [username, email, password])
  if(inserted.insertId != "0") {
    const rows = await query("SELECT * FROM utilisateur WHERE id = LAST_INSERT_ID();")
    return rows[0]
  }
}

module.exports = createUser;