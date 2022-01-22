const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const PostController = require('../controllers/PostController');

router.post('/create', verifyToken, PostController.createPost);
router.delete('/delete/:id', verifyToken, PostController.deletePost);
router.put('/update/:id', verifyToken, PostController.updatePost);
router.get('/', PostController.index);

module.exports = router;