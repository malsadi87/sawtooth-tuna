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
    <div>
      <ComposableMap projection="geoMercator" style={{ maxHeight: '500px' }}>
        <ZoomableGroup center={[0, 0]} zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
          {props.haulResult ?
            props.haulResult.map(({ haulId, haulPosition, haulLatitude, haulLongitude }) => (
              <Marker key={haulId} coordinates={[
                haulLongitude, haulLatitude]}>
                <circle
                  className='markerCircle'
                  r={2}
                  fill="#F00"
                  stroke="#fff"
                  strokeWidth={0.1}
                />
                <text
                  className='markerText'
                  textAnchor="middle"
                  y={5}
                  style={{ fontFamily: "system-ui", fontSize: 6, fill: "#5D5A6D" }}
                >
                  {haulPosition}
                </text>
              </Marker>
            )) : ''}
          {props.haulResult ?
            props.haulResult.map(({ haulId, launchPosition, launchLatitude, launchLongitude }) => (
              <Marker key={haulId} coordinates={[launchLongitude, launchLatitude]}>
                <circle
                  className='markerCircle'
                  r={2}
                  fill="#F00"
                  stroke="#fff"
                  strokeWidth={0.1}
                />
                <text
                  className='markerText'
                  textAnchor="middle"
                  y={5}
                  style={{ fontFamily: "system-ui", fontSize: 6, fill: "#5D5A6D" }}
                >
                  {launchPosition}
                </text>
              </Marker>
            )) : ''}
          {props.palletEventResult ?
            props.palletEventResult.map(({ palletEventId, location }) => { 
              const coordinates = JSON.parse(location)
              const palletEventLatitude = coordinates.latitude
              const palletEventLongitude = coordinates.longitude
              return (
              <Marker key={palletEventId} coordinates={[palletEventLongitude, palletEventLatitude]}>
                <circle
                  className='markerCircle'
                  r={2}
                  fill="#F00"
                  stroke="#fff"
                  strokeWidth={0.1}
                />
                <text
                  className='markerText'
                  textAnchor="middle"
                  y={5}
                  style={{ fontFamily: "system-ui", fontSize: 6, fill: "#5D5A6D" }}
                >
                  palletEvent
                </text>
              </Marker>
            )}) : ''}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapChart;
