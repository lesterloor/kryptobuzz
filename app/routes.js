module.exports = function(app, passport) {
  var User       = require('./models/user');
  var axios = require('axios')
  global.fetch = require('node-fetch')
  const cc = require('cryptocompare')

    // HOMEPAGE  =========================
    app.get('/', function(req, res) {
      console.log(req.user.local.email)
      console.log(req.user.local.lastName)
      cc.priceFull(['BTC','ETH','LTC','XRP'],['USD'])

      .then(prices => {
        console.log(prices)
          // -> { USD: 1100.24, EUR: 1039.63 }
        res.render('index.pug',{
          btcPrice:prices.BTC.USD.PRICE,
          ethprice:prices.ETH.USD.PRICE,
          ltcprice:prices.LTC.USD.PRICE,
          xrpprice:prices.XRP.USD.PRICE,
          btcPercent:prices.BTC.USD.CHANGEPCTDAY.toFixed(2),
          ethPercent:prices.ETH.USD.CHANGEPCTDAY.toFixed(2),
          ltcPercent:prices.LTC.USD.CHANGEPCTDAY.toFixed(2),
          xrpPercent:prices.XRP.USD.CHANGEPCTDAY.toFixed(2)
          });
        })

      // }));
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });


    // =============================================================================
    // AUTHENTICATE (FIRST LOGIN) ==================================================
    // =============================================================================

        // locally --------------------------------
            // LOGIN ===============================
            // show the login form
            app.get('/login', function(req, res) {
                res.render('login.ejs', { message: req.flash('loginMessage') });
            });

            // process the login form
            app.post('/login', passport.authenticate('local-login', {
                successRedirect : '/home', // redirect to the secure profile section
                failureRedirect : '/login', // redirect back to the signup page if there is an error
                failureFlash : true // allow flash messages
            }));

            // SIGNUP =================================
            // show the signup form
            app.get('/signup', function(req, res) {
                res.render('signup.ejs', { message: req.flash('signupMessage') });
            });

            // process the signup form
            app.post('/signup', passport.authenticate('local-signup', {
                successRedirect : '/', // redirect to the secure profile section
                failureRedirect : '/signup', // redirect back to the signup page if there is an error
                failureFlash : true // allow flash messages
            }));



    // Settings  =========================
    app.get('/settings', function(req, res) {
          res.render('settings.pug');
    });
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
