import React, { useEffect } from "react";
import Plot from 'react-plotly.js';


const EventView = (props) => {

  useEffect(() => {
    console.log(props)
  }, [props]);

  let [x, temperatureY, shockY, tiltY] = props.palletEventResult ? props.palletEventResult.reduce((
    [x, temperatureY, shockY, tiltY],
    { eventTime, temperature, shock, tilt }) => {
    x.push(eventTime);
    // It is not clear how the format of temperature should be.
    temperatureY.push(temperature.replace(/\D/g, ''));
    
    // TODO: Shock and Tilt json object needs strict definition in the entity description.
    shockY.push(shock.replace(/\D/g, '')); //(JSON.parse(shock).acceleration * JSON.parse(shock).duration)

    tiltY.push(tilt.replace(/\D/g, '')); //(JSON.parse(shock).acceleration * JSON.parse(shock).duration)

    return [x, temperatureY, shockY, tiltY];
  }, [[], [], [], []]) : [[0], [0], [0], [0]]

  return (
    props.palletEventResult ?
      <>
        <Plot
          layout={{
            xaxis: {
              title: {
                text: "Time",
              }
            },
            yaxis: {
              title: {
                text: "Temprature",
              }
            }
          }}
          data={[
            {
              x: x,
              y: temperatureY,
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'red' },
            },
          ]}
        />
        <Plot
          layout={{
            xaxis: {
              title: {
                text: "Time",
              }
            },
            yaxis: {
              title: {
                text: "Shock",
              }
            }
          }}
          data={[
            {
              x: x,
              y: shockY,
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'red' },
            },
          ]}
        />
        <Plot
          layout={{
            xaxis: {
              title: {
                text: "Time",
              }
            },
            yaxis: {
              title: {
                text: "Tilt",
              }
            }
          }}
          data={[
            {
              x: x,
              y: tiltY,
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'red' },
            },
          ]}
        />
      </>
      : <></>
  )
}

export default EventView
