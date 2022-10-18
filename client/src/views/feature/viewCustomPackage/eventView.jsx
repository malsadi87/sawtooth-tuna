import React, { useEffect } from "react";
import Plot from 'react-plotly.js';


const EventView = (props) => {

  useEffect(() => {
    console.log(props)
  }, [props]);

  let [x,y] = props.palletEventResult ? props.palletEventResult.reduce(([x,y], {eventTime,temperature})=>{
    x.push(eventTime);
    // It is not clear how the format of temperature should be.
    y.push(temperature.replace(/\D/g, ''));
    return [x,y];
  }, [[],[]]) : [[0], [0]]

  return (
    <div>
      {props.palletEventResult ? 
      <Plot
        layout={{
          xaxis: {
            title: {
              text: "Time",
            }},
          yaxis: {
            title: {
              text: "Temprature",
            }}
          }}
        data={[
          {
            x: x,
            y: y,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
        ]}
      /> : ''}
    </div>
  )
}

export default EventView
