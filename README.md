# Chart Server

A server for a light-weight charting system.

[![Demo of how charts are rendered in a Google Spreadsheet](docs/playground.gif)](https://docs.google.com/spreadsheets/d/18ByaFrHDh7y0_nY-mFrk05Nx21e0UBAWe-qKfd2tAL8/edit#gid=0)

Read «[Roll your own charting system](https://blog.interactivethings.com/69f5753efc1c)» on the Interactive Things blog to learn more.

## Chart Types

You can render any Vega-Lite specification to SVG by sending it to `/VegaLite` with the `spec` query paramter.

Example:
```json
{
  "description": "A simple bar chart with embedded data.",
  "data": {
    "values": [
      {"a": "A","b": 28}, {"a": "B","b": 55}, {"a": "C","b": 43},
      {"a": "D","b": 91}, {"a": "E","b": 81}, {"a": "F","b": 53},
      {"a": "G","b": 19}, {"a": "H","b": 87}, {"a": "I","b": 52}
    ]
  },
  "mark": "bar",
  "encoding": {
    "x": {"field": "a", "type": "ordinal"},
    "y": {"field": "b", "type": "quantitative"}
  }
}
```

![A simple bar chart with embedded data.](https://chart-server.now.sh/VegaLite?spec=%7B%0A%20%20%22description%22%3A%20%22A%20simple%20bar%20chart%20with%20embedded%20data.%22%2C%0A%20%20%22data%22%3A%20%7B%0A%20%20%20%20%22values%22%3A%20%5B%0A%20%20%20%20%20%20%7B%22a%22%3A%20%22A%22%2C%22b%22%3A%2028%7D%2C%20%7B%22a%22%3A%20%22B%22%2C%22b%22%3A%2055%7D%2C%20%7B%22a%22%3A%20%22C%22%2C%22b%22%3A%2043%7D%2C%0A%20%20%20%20%20%20%7B%22a%22%3A%20%22D%22%2C%22b%22%3A%2091%7D%2C%20%7B%22a%22%3A%20%22E%22%2C%22b%22%3A%2081%7D%2C%20%7B%22a%22%3A%20%22F%22%2C%22b%22%3A%2053%7D%2C%0A%20%20%20%20%20%20%7B%22a%22%3A%20%22G%22%2C%22b%22%3A%2019%7D%2C%20%7B%22a%22%3A%20%22H%22%2C%22b%22%3A%2087%7D%2C%20%7B%22a%22%3A%20%22I%22%2C%22b%22%3A%2052%7D%0A%20%20%20%20%5D%0A%20%20%7D%2C%0A%20%20%22mark%22%3A%20%22bar%22%2C%0A%20%20%22encoding%22%3A%20%7B%0A%20%20%20%20%22x%22%3A%20%7B%22field%22%3A%20%22a%22%2C%20%22type%22%3A%20%22ordinal%22%7D%2C%0A%20%20%20%20%22y%22%3A%20%7B%22field%22%3A%20%22b%22%2C%20%22type%22%3A%20%22quantitative%22%7D%0A%20%20%7D%0A%7D)

Additionally three example chart types, `Bar`, `DemographicBar` and `DistrictBar`, built on top of Vega-Lite and one, `ZurichMap`, build on top of Vega are provided in the [`charts` folder](https://github.com/interactivethings/chart-server/tree/master/charts). There is also a example [essay](https://interactivethings.github.io/chart-server/example.html) and [spreadsheet](https://docs.google.com/spreadsheets/d/1Mt6xzEGcuO9cusTUB3q3JwhNOZbhwHK71TfpOaUWS9c/edit?usp=sharing) available utilizing those types.

## Prerequisites

- make
- [Node.js](https://nodejs.org/) (v6)
- [Cairo](https://github.com/Automattic/node-canvas#installation)

## Develop

Install dependencies and start the development server

```
make
```

## Deploy

The repository contains a `Dockerfile` and `app.json` manifesto and can easily be deployed.

- [▲ ZEIT `now --docker`](https://zeit.co/now)
- [Deploy to Heroku](https://heroku.com/deploy)
