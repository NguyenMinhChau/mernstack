const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkCurrentUser = require('../middlewares/checkCurrentUser');
const UserController = require('../controllers/UserController');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/users/');
    }, 
    filename: function(req, file, cb){
        cb(null, file.fieldname + "_" + Date.now() + "_" + 
        file.originalname);
    }
})
const upload = multer({storage: storage});

router.post('/register', upload.single('image'), UserController.register);
router.post('/login', UserController.login);
router.get('/getall', UserController.index);
router.get('/', checkCurrentUser, UserController.getCurentUser);

module.exports = router;