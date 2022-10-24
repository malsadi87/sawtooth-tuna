import React, { useEffect } from "react";
import Plot from 'react-plotly.js';


const EventView = (props) => {

  useEffect(() => {
    console.log(props)
  }, [props]);

  let [x, temperatureY, temperatureStartValue, temperatureIsRelative, shockObject, tiltY, tiltX] = props.palletEventResult ? props.palletEventResult.reduce((
    [x, temperatureY, temperatureStartValue, temperatureIsRelative, shockObject, tiltY, tiltX],
    { eventTime, temperature, shock, tilt }) => {

    const endTime = new Date(eventTime)
    x.push(endTime);

    if (JSON.parse(temperature).isRelative) {
      temperatureY.push(JSON.parse(temperature).value + JSON.parse(temperature).startValue);
    } else {
      temperatureY.push(JSON.parse(temperature).value);
    }
    temperatureStartValue.push(JSON.parse(temperature).startValue)
    temperatureIsRelative.push(JSON.parse(temperature).isRelative)

    const startTime = new Date(eventTime)
    startTime.setSeconds(startTime.getSeconds() - JSON.parse(shock).duration)
    shockObject.push({ startAcceleration: 0, endAcceleration: JSON.parse(shock).acceleration, startTime: startTime, endTime: endTime })

    tiltY.push(JSON.parse(tilt).y);
    tiltX.push(JSON.parse(tilt).x);

    return [x, temperatureY, temperatureStartValue, temperatureIsRelative, shockObject, tiltY, tiltX];
  }, [[], [], [], [], [], [], []]) : [[0], [0], [0], [0], [0], [0], [0]]

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
          data={
            shockObject.map(({ startAcceleration, endAcceleration, startTime, endTime }) => ({
              x: [startTime, endTime],
              y: [startAcceleration, endAcceleration],
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'red' },
            }))
          }
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
              name: 'Tilt Y'
            },
            {
              x: x,
              y: tiltX,
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'blue' },
              name: 'Tilt X'
            },
          ]}
        />
      </>
      : <></>
  )
}

export default EventView
