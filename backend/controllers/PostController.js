const Post = require('../models/PostsModel');
const PostController = {
    //[GET] api/v1/posts
    index: async function (req, res,next) {
        try{
            let posts = await Post.find({}).populate({
                path: 'author',
                select: ['username', 'image']
            }).select('content author createdAt image');
            res.status(200).json({
                status: 'success',
                message: 'List of articles',
                lenght: posts.length,
                data: posts
            })
        }catch(err){
            next(err);
        }
    },
    //[POST] api/v1/posts/create
    //khi tạo cần verify token -> tạo một middleware để verify token
    createPost: async function(req, res, next){
        try{
            const imagePost = req.file.filename;
            req.body.image = imagePost;
            const {userId} = req.user;
            let post = await Post.create({...req.body, author: userId});
            res.status(200).json({
                status: 'success',
                message: 'Successful post creation',
                data: post
            })
        }catch(err){
            next(err);
        }
    },
    //[DELETE] api/v1/posts/delete/:id
    deletePost: async function(req, res, next){
        try{
            let post = await Post.findByIdAndDelete(req.params.id);
            res.status(200).json({
                status: 'success',
                message: 'Post deleted successfully',
                data: post
            })
        }catch(err){
            next(err);
        }
    },
    //[PUT] api/v1/posts/update/:id
    updatePost: async function(req, res, next){
        try{
            const imagePost = req.file.filename;
            req.body.image = imagePost;
            let post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidator: true});
            res.status(200).json({
                status: 'success',
                message: 'Post update successfully',
                data: post
            })
        }catch(err){
            next(err);
        }
    }
}
module.exports = PostController;