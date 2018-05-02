var express = require('express');
var router = express.Router();

const processData = (string) => {
  let alois = null;

  result = string.split('\n').reduce((result, curr) => {
    let a = curr.replace('\r', ''); // remove \r from string
    a = curr.split('\t'); // split by tab chars

    if (a.length === 1) {
      alois = a[0];

      result[alois] = [];

      return result;
    } else {
      a = a.splice(1);
      const [ product, quantity, oreId, solarSystemId, planetId, moonId] = a;
      const b = {
        product,
        quantity,
        oreId,
        solarSystemId,
        planetId,
        moonId,
        addedAt: +(new Date())
      };

      result[alois].push(b);

      return result;
    }

    return result;
  }, {});

  return [JSON.stringify(result), result];
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', data: 'no data' });
});

router.post('/add', function(req, res, next) {
  const table = processData(req.body.moondata);
  res.render('index', {title: 'express', script: table[0], table: table[1]});
});

module.exports = router;
