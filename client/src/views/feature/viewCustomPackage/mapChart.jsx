import React, { useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json";

const markers = [
  {
    markerOffset: -15,
    name: "Buenos Aires",
    coordinates: [-58.3816, -34.6037]
  },
  { markerOffset: -15, name: "La Paz", coordinates: [-68.1193, -16.4897] },
  { markerOffset: 25, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
  { markerOffset: 25, name: "Santiago", coordinates: [-70.6693, -33.4489] },
  { markerOffset: 25, name: "Bogota", coordinates: [-74.0721, 4.711] },
  { markerOffset: 25, name: "Quito", coordinates: [-78.4678, -0.1807] },
  { markerOffset: -15, name: "Georgetown", coordinates: [-58.1551, 6.8013] },
  { markerOffset: -15, name: "Asuncion", coordinates: [-57.5759, -25.2637] },
  { markerOffset: 25, name: "Paramaribo", coordinates: [-55.2038, 5.852] },
  { markerOffset: 25, name: "Montevideo", coordinates: [-56.1645, -34.9011] },
  { markerOffset: -15, name: "Caracas", coordinates: [-66.9036, 10.4806] },
  { markerOffset: -15, name: "Lima", coordinates: [-77.0428, -12.0464] },
  { markerOffset: -15, name: "Lima2", coordinates: [77.0428, 12.0464] }
];

const MapChart = (props) => {

  useEffect(() => {
    console.log(props)
  }, [props]);

  return (
    <div style={{ display: 'flex', maxWidth: '1000px', maxHeight: '500px', margin: 'auto' }}>
      <ComposableMap projection="geoMercator">
        <ZoomableGroup center={[0, 0]} zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
          {props.haulResult ?
            props.haulResult.map(({ haulPosition, haulLatitude, haulLongitude }) => (
              <Marker key={haulPosition} coordinates={[haulLongitude, haulLatitude]}>
                <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
                <text
                  textAnchor="middle"
                  y={25}
                  style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                >
                  {haulPosition}
                </text>
              </Marker>
            )) : ''}
            {props.haulResult ?
            props.haulResult.map(({ launchPosition, launchLatitude, launchLongitude }) => (
              <Marker key={launchPosition} coordinates={[launchLongitude, launchLatitude]}>
                <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
                <text
                  textAnchor="middle"
                  y={25}
                  style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                >
                  {launchPosition}
                </text>
              </Marker>
            )) : ''}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapChart;
