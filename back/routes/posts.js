const express = require('express');
const router = express.Router();
const { validateToken } = require("../middleware/auth");
const multer = require('../middleware/multer');
const postsCtrl = require('../controllers/posts');
// Routes pour les posts
router.get('/', postsCtrl.getAllPosts);
router.get('/:id', postsCtrl.getOnePost);
router.post('/createPost', validateToken, multer, postsCtrl.createPost);
router.post('/:id/modify', validateToken, multer, postsCtrl.modifyPost);
router.get('/:id/delete', postsCtrl.deletePost);
router.get('/:id/image', postsCtrl.image);
// Routes pour les commentaires
router.post('/comment', validateToken, postsCtrl.comment);
router.get('/:id/comments', postsCtrl.getAllComments);
router.get('/comment/:id', postsCtrl.getOneComment);
router.get('/comment/:id/delete', postsCtrl.deleteComment);
router.post('/comment/:id/modify', postsCtrl.modifyComment);
// Routes pour les likes
router.post('/:id/like', validateToken, postsCtrl.likePost);
router.get('/:id/likes', postsCtrl.getAllLikes);

module.exports = router;