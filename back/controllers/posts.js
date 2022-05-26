// Fonctions pour les posts
const getAllPostsDb = require('../db/getAllPostsDb');
const getOnePostDb = require('../db/getOnePostDb');
const createPostDb = require('../db/createPostDb');
const deletePostDb = require('../db/deletePostDb');
const updatePostDb = require('../db/updatePostDb');
// Fonctions pour les commentaires
const getAllCommentsDb = require('../db/getAllCommentsDb');
const getOneCommentDb = require('../db/getOneCommentDb');
const createCommentDb = require('../db/createCommentDb');
const deleteCommentDb = require('../db/deleteCommentDb');
const updateCommentDb = require('../db/updateCommentDb');
// Fonctions pour les likes/dislikes
const deleteLikeDb = require ('../db/deleteLikeDb');
const createLikeDb = require('../db/createLikeDb');
const updateLikeDb = require('../db/updateLikeDb');
const getAllLikesDb = require('../db/getAllLikesDb');
const getLikeDb = require('../db/getLikeDb');

/****************** POSTS ******************/
/**
 * Récupère tout les posts des utilisateurs
 */
exports.getAllPosts = async (req, res) => {
  const posts = await getAllPostsDb()
  res.status(200).json(posts)
}
/**
 * Récupère les infos d'un post
 */
exports.getOnePost = async (req, res) => {
  const post = await getOnePostDb(req.params.id)
  res.status(200).json(post)
}
/**
 * Création d'un post
 */
exports.createPost = async (req, res) => {
  const postTitle = req.body.title
  const postText = req.body.post
  const postImg = req.file?.filename

  const post = await createPostDb(postTitle, postText, req.user.userId, postImg).catch(error => {
    console.log(error)
    res.status(500).json({
      error
    })
    return null
  })
  if (post === null) return
  console.log("Post crée !");
  res.status(200).json(post)
}
/** 
 * Renvoyer l'image d'un post
*/
exports.image = async (req, res) => {
  const id = req.params.id
  const post = await getOnePostDb(id)

  if(post === undefined) return res.sendStatus(404)
  if(post.image === null) return res.sendStatus(404)

  res.status(200).sendFile(post.image, { root: "./images" });
}
/**
 * Supprimer un post
 */
 exports.deletePost = async (req, res) => {
  const deletedPost = await deletePostDb(req.params.id).catch(error => {
    console.log(error)
    res.status(500).json({
      error
    })
    return null
  })

  if (deletedPost === null) return
  console.log("Post supprimé !");
  res.sendStatus(200)
}
/**
 * Modifier un post
 */
exports.modifyPost = async (req, res) => {
  const postTitle = req.body.title
  const postText = req.body.post
  const postImg = req.file?.filename
  const id = req.params.id  

  const post = await updatePostDb(postTitle, postText, postImg, id).catch(error => {
    console.log(error)
    res.status(500).json({
      error
    })
    return null
  })
  if (post === null) return
  console.log("Post modifié !");
  res.status(200).json(post)
}
/****************** COMMENTAIRE ******************/
/**
 * Récupère les infos lors de la création d'un commentaire
 */
exports.comment = async (req, res) => {
  const commentText = req.body.text
  const postId = req.body.postId
  const userId = req.user.userId

  const comment = await createCommentDb(postId, commentText, userId).catch(error => {
    console.log(error)
    res.status(500).json({
      error
    })
    return null
  })
  if (comment === null) return
  console.log("Commentaire crée !");
  res.status(200).json(comment)
}
/**
 * Récupère les infos de tout les commentaires d'un post
 */
exports.getAllComments = async (req, res) => {
  const comments = await getAllCommentsDb(req.params.id)
  res.status(200).json(comments)
}
/**
 * Récupère les infos d'un commentaire existant
 */
 exports.getOneComment = async (req, res) => {
  const comment = await getOneCommentDb(req.params.id)
  res.status(200).json(comment)
}
/** 
 * Supprimmer un commentaire
 * 
*/
exports.deleteComment = async (req, res) => {
  const deletedComment = await deleteCommentDb(req.params.id).catch(error => {
    console.log(error)
    res.status(500).json({
      error
    })
    return null
  })

  if (deletedComment === null) return
  console.log("Commentaire supprimé !");
  res.sendStatus(200)
}
/**
 * Modifier un commentaire
 */
 exports.modifyComment = async (req, res) => {
  const commentText = req.body.text
  console.log("Le req body :", req.body);
  const id = req.params.id  

  const comment = await updateCommentDb(commentText, id).catch(error => {
    console.log(error)
    res.status(500).json({
      error
    })
    return null
  })
  if (comment === null) return
  console.log("Commentaire modifié !");
  res.status(200).json(comment)
}
/****************** LIKE ******************/
/**
 * Like/Dislike un post
 */
exports.likePost = async (req, res) => {
  const postId = req.body.postId
  const userId = req.user.userId
  const likeValue = req.body.value ? 1 : 0;

  const like = await getLikeDb(postId, userId).catch(error => {
    console.log(error)
    res.status(500).json({
      error
    })
    return null
  })
  
  if (like === undefined) {
    console.log("Création du like");
    const createdLike = await createLikeDb(postId, userId, likeValue).catch(error => {
      console.log(error)
      res.status(500).json({
        error
      })
      return null
    })
    if (createdLike === null) return

    res.status(200).json(createdLike)
 
    return
  }

  if (like.value === likeValue) {
    console.log("Delete le like");
    await deleteLikeDb(postId, userId).catch(error => {
      console.log(error)
      res.status(500).json({
        error
      })
      return null
    })

    res.status(200).json({
      userId: userId,
      value: -1
    })
 
    return
  }

  await updateLikeDb(postId, userId, likeValue).catch(error => {
    console.log(error)
    res.status(500).json({
      error
    })
    return null
  })

  const updatedLike = await getLikeDb(postId, userId).catch(error => {
    console.log(error)
    res.status(500).json({
      error
    })
    return null
  })

  if (updatedLike === null) return

  res.status(200).json(updatedLike)
}
/**
 * Récupère la liste de tout les likes
 */
exports.getAllLikes = async (req, res) => {
  const likes = await getAllLikesDb(req.params.id)
  res.status(200).json(likes)
}