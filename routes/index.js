var express = require('express');
var router = express.Router();

const precisionRound = (number, precision) => {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

const GOOD_ORES = ['Flawless Arkonor', 'Cubic Bistot', 'Pellucid Crokite', 'Dazzling Spodumain', 'Jet Ochre'];

const processData = (string) => {
  let header = null;

  let result = string.split('\n');

  if (result[0].split('\t')[0] === 'Moon' && result[0].split('\t')[1] === 'Moon Product') {
    result = result.splice(1); // ommit first line with column names
  }

  result = result.reduce((result, curr) => {
    curr = curr.replace('\r', ''); // remove \r from string
    curr = curr.split('\t'); // split by tab chars

    if (curr.length === 1) { // is a moon name
      header = curr[0];

      result[header] = [];

      return result;
    } else {
      curr = curr.splice(1);
      const [ oreName, quantity, oreId, solarSystemId, planetId, moonId] = curr;

      const isGood = GOOD_ORES.includes(oreName);

      const b = {
        oreName,
        quantity: precisionRound(quantity, 2),
        oreId,
        solarSystemId,
        planetId,
        moonId,
        isGood,
      };

      result[header].push(b);

      return result;
    }

    return result;
  }, {});

  return result;
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', data: 'no data' });
});

router.post('/add', function(req, res, next) {
  res.render('index', {title: 'express', table: processData(req.body.moondata)});
});

module.exports = router;
