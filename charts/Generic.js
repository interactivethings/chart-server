const vegaLite = require('vega-lite');

module.exports = ({spec}) => {
  return vegaLite.compile(spec).spec;
};
