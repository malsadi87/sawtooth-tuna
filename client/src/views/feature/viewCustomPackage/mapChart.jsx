import React, { useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
  Line
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json";

const MapChart = (props) => {

  useEffect(() => {
    console.log(props)
  }, [props]);

  const flightDestinations = [
    {
      from: { coord: [-0.128, 51.507], city: "London" },
      to: { coord: [55.271, 25.205], city: "Dubai" },
    },
    {
      from: { coord: [-0.128, 51.507], city: "London" },
      to: { coord: [-96.797, 32.777], city: "Dallas" },
    },
    {
      from: { coord: [-0.128, 51.507], city: "London" },
      to: { coord: [-123.121, 49.283], city: "Vancouver" },
    },
    {
      from: { coord: [-0.128, 51.507], city: "London" },
      to: { coord: [-43.173, -22.907], city: "Rio De Janiero" },
    },
    {
      from: { coord: [-0.128, 51.507], city: "London" },
      to: { coord: [18.424, -33.925], city: "Cape Town" },
    },
    {
      from: { coord: [-0.128, 51.507], city: "London" },
      to: { coord: [34.782, 32.085], city: "Tel Aviv" },
    },
    {
      from: { coord: [-0.128, 51.507], city: "London" },
      to: { coord: [30.361, 59.931], city: "St petersburg" },
    },
    {
      from: { coord: [-0.128, 51.507], city: "London" },
      to: { coord: [103.82, 1.352], city: "Singapore" },
    },
    {
      from: { coord: [-0.128, 51.507], city: "London" },
      to: { coord: [-99.133, 19.433], city: "Mexico City" },
    },
  ];

  const lines = (flightDestinations) => {
    return (
      flightDestinations.map((route) => (
      <>
        <Line
          key={route.to.city}
          from={route.from.coord}
          to={route.to.coord}
          stroke="yellow"
          strokeWidth={1}
          strokeLinecap="round"
        />
        <Marker coordinates={route.to.coord}>
          <circle r={2} fill="yellow" />
        </Marker>
      </>
    ))
    )
  }

  const linesMarkers = (key, label, coordinatesFrom, coordinatesTo=null) => {
    return (
      coordinatesTo ? <>
        <Line
          key={key}
          from={coordinatesFrom}
          to={coordinatesTo}
          stroke="purple"
          strokeWidth={1}
          strokeLinecap="round"
        />
        <Marker coordinates={coordinatesFrom}>
          <circle r={2.5} fill="yellow" />
        </Marker>
      </> :
        <Marker coordinates={coordinatesFrom}>
          <circle r={2.5} fill="yellow" />
        </Marker>
    )
  }

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
            props.haulResult.map(({ haulId, haulPosition, haulLatitude, haulLongitude }, index) => {
              return index + 1 < props.haulResult.length ? 
              linesMarkers(
                haulId, 
                haulPosition, 
                [haulLongitude, haulLatitude], 
                [ 
                  props.haulResult[index+1].haulLongitude,
                  props.haulResult[index+1].haulLatitude
                ]
              ) :
              linesMarkers(
                haulId, 
                haulPosition, 
                [haulLongitude, haulLatitude]
              )
            }) : ''}

            {props.palletEventResult ?
            props.palletEventResult.map(({ palletEventId, location }, index) => {
              const coordinatesFrom = JSON.parse(location)
              const palletEventLatitude = coordinatesFrom.latitude
              const palletEventLongitude = coordinatesFrom.longitude
              let coordinatesTo = null
              index + 1 < props.palletEventResult.length ? 
              coordinatesTo = JSON.parse(props.palletEventResult[index+1].location)
              : coordinatesTo = null
              console.log("CoordinatesTo", coordinatesTo)
              return index + 1 < props.palletEventResult.length ? 
              linesMarkers(
                palletEventId, 
                'palletEvent', 
                [palletEventLongitude, palletEventLatitude], 
                [ 
                  coordinatesTo.longitude,
                  coordinatesTo.latitude
                ]
              ) :
              linesMarkers(
                palletEventId, 
                'palletEvent', 
                [palletEventLongitude, palletEventLatitude]
              )
            }) : ''}

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
              )
            }) : ''}
          {lines(flightDestinations)}
          <Marker coordinates={[-0.128, 51.507]}>
            <circle r={2} fill="yellow" />
          </Marker>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapChart;
