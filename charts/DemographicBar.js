const VegaLite = require('./VegaLite');

const defaults = {
  data: undefined,
  filter: undefined,
  age: undefined,
  sex: undefined,
  aggregate: 'sum',
  value: undefined,
  valueTitle: 'Population',
  bandSize: 21,
  facet: undefined,
  facetTitle: undefined,
  orient: 'vertical'
};

module.exports = ({spec}) => {
  const cfg = Object.assign({}, defaults, spec);

  return VegaLite({
    spec: {
      config: {axis: {characterWidth: 0}},
      data: {
        url: cfg.data
      },
      transform: {
        filter: cfg.filter,
        calculate: [
          cfg.facet && {field: 'facet', 'expr': cfg.facet},
          cfg.age && {field: 'age', 'expr': cfg.age},
          cfg.sex && {field: 'sex', 'expr': cfg.sex},
          cfg.value && {field: 'value', 'expr': cfg.value},
        ].filter(Boolean)
      },
      mark: 'bar',
      encoding: {
        [cfg.orient === 'vertical' ? 'column' : 'row']:
          cfg.facet && {title: cfg.facetTitle || cfg.facet, field: 'facet', type: 'nominal'},
        [cfg.orient === 'vertical' ? 'row' : 'column']:
          {title: 'Gender', field: 'sex', type: 'nominal'},
        color: {
          field: 'sex',
          type: 'nominal',
          legend: false,
          scale: {range: ['#EA98D2', '#659CCA']}
        },
        x: {
          title: 'Age', field: 'age', type: 'ordinal',
          axis: {axisWidth: 0, tickSize: 0},
          scale: {bandSize: cfg.bandSize}
        },
        y: {
          title: cfg.valueTitle,
          aggregate: cfg.aggregate,
          field: cfg.aggregate === 'count' ? '*' : 'value',
          type: 'quantitative'
        }
      }
    }
  });
};
