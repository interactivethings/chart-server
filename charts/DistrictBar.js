const Generic = require('./Generic');

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

  return Generic({
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
        x: {title: 'District', field: cfg.district, type: 'ordinal'},
        y: {
          title: cfg.valueTitle, aggregate: cfg.aggregate,
          field: cfg.value, type: 'quantitative'
        }
      }
    }
  });
};
