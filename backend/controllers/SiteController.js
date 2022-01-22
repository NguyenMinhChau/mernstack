const SiteController = {
    index: function (req, res) {
        res.status(200).json({
            status: 'success',
            message: 'Welcome to the Home Page',
            data: []
        })
    }
}
module.exports = SiteController;