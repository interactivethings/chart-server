const express = require('express');
const vg = require('vega');

const app = express();

const TYPES = {
  VegaLite: require('./charts/VegaLite'),
  Bar: require('./charts/Bar'),
  DistrictBar: require('./charts/DistrictBar'),
  DemographicBar: require('./charts/DemographicBar'),
  ZurichMap: require('./charts/ZurichMap')
};

app.get('/:type', (request, response) => {
  if (!TYPES[request.params.type]) {
    return response.status(404).send('Not Found');
  }

  const spec = TYPES[request.params.type]({
    spec: JSON.parse(request.query.spec)
  });
  vg.parse.spec(spec, (error, chart) => {
    if (error) {
      return response.status(400).send(error.toString());
    }
    const view = chart({renderer: 'svg'});
    const svg = view.update().svg();
    response
      .set('Cache-Control', `public, max-age=${60 * 60}`)
      .type('svg').send(svg);
    view.destroy();
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`)); // eslint-disable-line no-console
