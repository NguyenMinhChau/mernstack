const siteRouter = require('./siteRouter');
const postRouter = require('./postsRoter');
const userRouter = require('./userRouter');

const router = (app) => {
    app.use('/api/v1/posts', postRouter);
    app.use('/api/v1/users', userRouter);
    // app.use('/', siteRouter);
}

module.exports = router;