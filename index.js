const express = require('express');
const vg = require('vega');
const vegaLite = require('vega-lite');

const app = express();

app.get('/', (request, response) => {
  const spec = vegaLite.compile(JSON.parse(request.query.spec)).spec;
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
