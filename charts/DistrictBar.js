const VegaLite = require('./VegaLite');

const defaults = {
  data: undefined,
  parse: undefined,
  calculate: [],
  filter: undefined,
  district: undefined,
  aggregate: undefined,
  value: undefined,
  valueTitle: undefined
};

module.exports = ({spec}) => {
  const cfg = Object.assign({}, defaults, spec);

  return VegaLite({
    spec: {
      config: {axis: {characterWidth: 0}},
      data: {
        url: cfg.data,
        format: {parse: cfg.parse}
      },
      transform: {
        filter: cfg.filter,
        calculate: cfg.calculate
      },
      mark: 'bar',
      encoding: {
        x: {
          title: 'District', field: cfg.district, type: 'ordinal',
          axis: {axisWidth: 0, tickSize: 0, labelAngle: 0}
        },
        y: {
          title: cfg.valueTitle, aggregate: cfg.aggregate,
          field: cfg.value, type: 'quantitative'
        }
      }
    }
  });
};
