// get 404 page
module.exports = {
    getError: (req, res) => {
        res.render('error', { errorCSS: true })
    }
};