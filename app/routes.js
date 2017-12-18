module.exports = function(app, passport) {



    // HOMEPAGE  =========================
    app.get('/', function(req, res) {
          res.render('index.pug');
    });
}
