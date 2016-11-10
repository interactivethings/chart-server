const express = require('express');
const vg = require('vega');

const app = express();

const TYPES = {
  undefined: require('./charts/Generic'),
  DistrictBar: require('./charts/DistrictBar')
};

app.get('/:type?', (request, response) => {
  const spec = TYPES[request.params.type]({
    spec: JSON.parse(request.query.spec)
  });
  vg.parse.spec(spec, (error, chart) => {
    if (error) {
      response.status(400).send(error.toString());
    } else {
      const svg = chart({renderer: 'svg'}).update().svg();
      response.type('svg').send(svg);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
