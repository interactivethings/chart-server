const defaults = {
  topojson: 'https://gist.githubusercontent.com/tpreusse/e4c166de85211a2a9294207acd23210c/raw/682266b75fc1970025e65a7312eff57c0d4fe8f6/map.topojson'
};

module.exports = ({spec}) => {
  const cfg = Object.assign({}, defaults, spec);

  const projection = {
    projection: 'mercator',
    scale: 160000,
    translate: [290, 310],
    center: [8.55, 47.366667]
  };

  return {
    width: 520,
    height: 520,
    padding: 'auto',
    data: [
      {
        name: 'districts',
        url: cfg.topojson,
        format: {type: 'topojson', feature: 'districts'},
        transform: [
          Object.assign({
            type: 'geopath'
          }, projection)
        ]
      },
      {
        name: 'lake',
        url: cfg.topojson,
        format: {type: 'topojson', feature: 'lake'},
        transform: [
          Object.assign({
            type: 'geopath'
          }, projection)
        ]
      },
      {
        name: 'points',
        url: cfg.data,
        format: {type: 'csv', parse: 'auto'},
        transform: [
          Object.assign({
            type: 'geo',
            lon: 'lon', lat: 'lat'
          }, projection)
        ]
      }
    ],
    scales: cfg.category ? [
      {
        name: 'color',
        type: 'ordinal',
        range: 'category10',
        domain: {data: 'points', field: cfg.category}
      }
    ] : undefined,
    legends: cfg.category ? [
      {
        fill: 'color',
        properties: {
          legend: {
            x: {value: 400},
            y: {value: 30}
          },
          symbols: {
            stroke: {value: 'transparent'}
          }
        }
      }
    ] : undefined,
    marks: [
      {
        type: 'path',
        from: {data: 'districts'},
        properties: {
          enter: {
            fill: {value: '#dedede'},
            stroke: {value: 'white'}
          },
          update: {
            path: {field: 'layout_path'}
          }
        }
      },
      {
        type: 'path',
        from: {data: 'lake'},
        properties: {
          enter: {
            fill: {value: 'white'}
          },
          update: {
            path: {field: 'layout_path'}
          }
        }
      },
      {
        type: 'symbol',
        from: {data: 'points'},
        properties: {
          enter: {
            size: {value: 50},
            fill: cfg.category ? {scale: 'color', field: cfg.category} : {value: 'steelblue'},
            fillOpacity: {value: 0.8},
            stroke: {value: 'white'},
            strokeWidth: {value: 1}
          },
          update: {
            x: {field: 'layout_x'},
            y: {field: 'layout_y'}
          }
        }
      }
    ]
  };
};
