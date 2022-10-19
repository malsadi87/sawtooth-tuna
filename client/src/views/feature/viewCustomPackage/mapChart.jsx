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

  const linesMarkers = (key, label, coordinatesFrom, coordinatesTo = null) => {
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
            props.haulResult.map(({
              haulId, 
              haulPosition, 
              haulLatitude, 
              haulLongitude, 
              launchPosition, 
              launchLatitude, 
              launchLongitude
            }) =>
              <>
                <Line
                  key={haulId}
                  from={[launchLongitude, launchLatitude]}
                  to={[haulLongitude, haulLatitude]}
                  stroke="orange"
                  strokeWidth={1}
                  strokeLinecap="round"
                />
                <Marker key={'haulHaulId' + haulId} coordinates={[haulLongitude, haulLatitude]}>
                  <circle
                    className='markerCircle'
                    r={2}
                    fill="red"
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
                <Marker key={'launchHaulId' + haulId} coordinates={[launchLongitude, launchLatitude]}>
                  <circle
                    className='markerCircle'
                    r={2}
                    fill="blue"
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
              </>
            ) : ''}

          {props.palletEventResult ?
            props.palletEventResult.map(({ palletEventId, location }, index) => {
              const coordinatesFrom = JSON.parse(location)
              const palletEventLatitude = coordinatesFrom.latitude
              const palletEventLongitude = coordinatesFrom.longitude
              let coordinatesTo = null
              index + 1 < props.palletEventResult.length ?
                coordinatesTo = JSON.parse(props.palletEventResult[index + 1].location)
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
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapChart;
