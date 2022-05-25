const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; // On récupère le token de la requête entrante

  if(!token) return res.json({error: "L'utilisateur n'est pas connecté"}) // On vérifie si l'utilisateur est connecté

  try {
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // On vérifie le token
    req.user = decodedToken;

    if (decodedToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err})
  }
}

module.exports = { validateToken };