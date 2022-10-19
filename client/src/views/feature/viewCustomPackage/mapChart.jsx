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
              <React.Fragment key={haulId}>
                <Line
                  from={[launchLongitude, launchLatitude]}
                  to={[haulLongitude, haulLatitude]}
                  stroke="orange"
                  strokeWidth={1}
                  strokeLinecap="round"
                />
                <Marker coordinates={[haulLongitude, haulLatitude]}>
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
                <Marker coordinates={[launchLongitude, launchLatitude]}>
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
              </React.Fragment>
            ) : <></>}

          {props.palletEventResult ?
            props.palletEventResult.map(({
              palletEventId,
              location
            },
              index
            ) => {
              return (
                <React.Fragment key={palletEventId}>
                  {index + 1 < props.palletEventResult.length ?
                    <Line
                      key={palletEventId}
                      from={[
                        JSON.parse(location).longitude,
                        JSON.parse(location).latitude
                      ]}
                      to={[
                        JSON.parse(props.palletEventResult[index + 1].location).longitude,
                        JSON.parse(props.palletEventResult[index + 1].location).latitude
                      ]}
                      stroke="purple"
                      strokeWidth={1}
                      strokeLinecap="round"
                    />
                    : <></>}
                  <Marker
                    key={'palletEventId' + palletEventId}
                    coordinates={[JSON.parse(location).longitude, JSON.parse(location).latitude]}>
                    <circle
                      className='markerCircle'
                      r={2}
                      fill="yellow"
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
                </React.Fragment>)
            }) : <></>}

        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapChart;
