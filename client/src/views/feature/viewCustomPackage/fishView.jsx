import React, { PureComponent, useEffect } from 'react';
import salmon from './salmon.png'

//export default class FishView extends PureComponent {

const FishView = (props) => {

  useEffect( ()=>{
   }, [props]);

   let fish = (
    <div id="fish">
      {props.productResult ?
      <div>
        <div>
          Product name: {props.productResult[1].productName}
        </div>
        <img style={{display: 'flex', maxWidth: '500px'}} src={salmon} alt='Salmon'></img>
      </div>
      : ''}
    </div>
   )

  return fish
    

}

export default FishView