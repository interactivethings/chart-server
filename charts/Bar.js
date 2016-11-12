const VegaLite = require('./VegaLite');

const defaults = {
  data: undefined,
  filter: undefined,
  y: undefined,
  aggregate: undefined,
  value: undefined,
  valueTitle: undefined,
  facet: undefined,
  facetTitle: undefined
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
          cfg.y && {field: 'y', 'expr': cfg.y},
          cfg.value && {field: 'value', 'expr': cfg.value}
        ].filter(Boolean)
      },
      mark: 'bar',
      encoding: {
        column: cfg.facet && {title: cfg.facetTitle || cfg.facet, field: 'facet', type: 'nominal'},
        x: {
          title: cfg.valueTitle, aggregate: cfg.aggregate,
          field: cfg.aggregate === 'count' ? '*' : 'value', type: 'quantitative'
        },
        y: {
          title: false, field: 'y', type: 'ordinal',
          axis: {axisWidth: 0, tickSize: 0, labelAngle: 0},
          sort: {
            op: cfg.aggregate,
            field:  cfg.aggregate === 'count' ? '*' : 'value',
            order: 'descending'
          }
        }
      }
    }
  });
};
