const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // génère un token
const fs = require('fs');
const createUser = require('../db/createUser');
const alreadyExistsUser = require('../db/alreadyExistsUser');
const getUserByUsername = require('../db/getUserByUsername');
const getUserById = require('../db/getUserById');
const profileImgDb = require('../db/profileImgDB');
const modifyPasswordUser = require('../db/modifyPasswordUser');
// const deleteUserDb = require('../db/deleteUserDb');

// Enregistrer un compte utilisateur
exports.signup = async (req, res) => {
   // Vérification si l'utilisateur est déjà présent
  const alreadyExistUser = await alreadyExistsUser(req.body.username);
  if (alreadyExistUser === true) {
    console.log("Utilisateur existe déjà !");
    res.status(400).json({
      error: "L'utilisateur existe déjà",
      type: "username"
    })
    return
  } 
  // Sinon on crée l'utilisateur
  else {
    // Crypte le mot de passe
    const hash = await bcrypt.hash(req.body.password, 10).catch(error => {
      res.status(500).json({
        error
      })
      return null
    })
    // Si la fonction de hachage a une erreur
    if (hash === null) return

    const newUser = await createUser(req.body.username, req.body.email, hash).catch(error => {
      res.status(500).json({
        error
      })
      return null
    })

    // Si la fonction de création a une erreur
    if (newUser === null) return

    res.status(200).json({
      token: jwt.sign(
        { userId: newUser.id },
        'RANDOM_TOKEN_SECRET',
        { expiresIn: '24h' }
        )
    });
    console.log("Utilisateur crée !");
  }
}
// connexion au compte
exports.login = async (req, res) => {
  const user = await getUserByUsername(req.body.username)

  const isValid = await bcrypt.compare(req.body.password, user.password).catch(error => {
    res.status(500).json({
      error
    })
    return false
  });
  // Si le mot de passe n'est pas le même que dans la bdd
  if (isValid === false){
    return res.status(401).json({ error : 'Mot de passe incorrect !' });
  }

  res.status(200).json({
    token: jwt.sign(
      { userId: user.id },
      'RANDOM_TOKEN_SECRET',
      { expiresIn: '24h' }
    )
  });
  console.log("Connexion");
}
// récupère les informations de l'user
exports.userInfo = async (req, res) => {
  const user = await getUserById(req.user.userId)
  res.status(200).json({
    id: user.id,
    username: user.username,
    email: user.email,
    admin: user.admin
  })
}
// récupère l'image de profil
exports.profileImg = async (req, res) => {
  const user = await getUserById(req.user.userId)
  fs.unlink("./images/" + user.image, err => {
      if (err) return console.log("Il y a eu une erreur\n" + err)

      console.log("./images/" + user.image + " supprimé !")
  })
  
  await profileImgDb(req.file.filename, req.user.userId)
   
  res.status(200).json({
    msg: "ok"
  })
}
// afficher l'image de profil d'un utilisateur
exports.avatar = async (req, res) => {
  const user = await getUserById(req.params.id)
  if(!user || user.image === null) {
    return res.status(200).sendFile("avatar.jpg", { root: "./imagesDefault" });
  }
  res.status(200).sendFile(user.image, { root: "./images" });
}
// modifier le password de l'utilisateur
exports.modifyPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body
  
  const user = await getUserById(req.user.userId)

  const isValid = await bcrypt.compare(oldPassword, user.password).catch(error => {
    return false
  });

  if (isValid === false){
    return res.status(401).json({ error : 'Mauvais Mot de passe !' });
  } 
    // Crypte le mot de passe
    const hash = await bcrypt.hash(newPassword, 10).catch(error => {
      res.status(500).json({
        error
      })
      return null
    })
    // Si la fonction de hachage a une erreur
    if (hash === null) return

    const modifyUser = await modifyPasswordUser(req.user.userId, hash).catch(error => {
      res.status(500).json({
        error
      })
      return null
    })

    // Si la fonction de modification a une erreur
    if (modifyUser === null) return

    res.status(200).json({})
    console.log("Mot de passe modifié !"); 
}
// Supprime un compte utilisateur
// exports.userDelete = async (req,res) => {
//   const deletedUser = await deleteUserDb(req.params.id).catch(error => {
//     console.log(error)
//     res.status(500).json({
//       error
//     })
//     return null
//   })

//   if (deletedUser === null) return
//   console.log("Utilisateur supprimé !");
//   res.sendStatus(200)
// }