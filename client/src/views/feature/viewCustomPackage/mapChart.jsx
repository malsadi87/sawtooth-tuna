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
