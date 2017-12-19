module.exports = function(app, passport) {
var axios = require('axios')
global.fetch = require('node-fetch')
const cc = require('cryptocompare')
    // HOMEPAGE  =========================
    app.get('/', function(req, res) {
      cc.priceFull(['BTC', 'ETH','LTC','XRP'], ['USD'])
      .then(prices => {
        console.log(prices)
          // -> { USD: 1100.24, EUR: 1039.63 }
        res.render('index.pug',{
          btcprice:prices.BTC.USD.PRICE,
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

    // Settings  =========================
    app.get('/settings', function(req, res) {
          res.render('settings.pug');
    });
}
