const express = require('express');
const router = express.Router();
const multer = require('multer');
const verifyToken = require('../middlewares/verifyToken');
const PostController = require('../controllers/PostController');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        //../frontend/public/uploads/posts
        cb(null, './uploads/posts');
        // cb(null, '../frontend/public/uploads/posts');
    }, 
    filename: function(req, file, cb){
        cb(null, file.fieldname + "_" + Date.now() + "_" + 
        file.originalname);
    }
})
const upload = multer({storage: storage});

router.post('/create', verifyToken, upload.single('image'), PostController.createPost);
router.delete('/delete/:id', verifyToken, PostController.deletePost);
router.put('/update/:id', verifyToken, upload.single('image'), PostController.updatePost);
router.get('/', PostController.index);

module.exports = router;