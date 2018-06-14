
function homePageController(req, res) {
    res.render('index', { title: 'Express' });
}

module.exports = homePageController;
