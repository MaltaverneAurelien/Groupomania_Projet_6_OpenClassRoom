const { query } = require("./index")

/**
 * Fonction pour récupèrer l'image de profil de l'utilisateur
 */
async function profileImgDb(image, userId) {
    const inserted = await query(`
    UPDATE utilisateur
    SET image = ?
    WHERE id = ?;`, [image, userId])
    console.log(inserted)
}

module.exports = profileImgDb;