import React, { Component, useState } from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import './viewConsumerPackage.css';
import { Form, Input, Button, InputNumber, DatePicker } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import consumerPackageService from '../../../services/feature/consumerPackage/consumerPackage.service';
import moment from 'moment';
import catchService from '../../../services/feature/catch/catch.service';
import palletService from '../../../services/feature/pallet/pallet.service';
import palletEventService from '../../../services/feature/palletEvent/palletEvent.service';
import tripService from '../../../services/feature/trip/trip.service';
import companyService from '../../../services/feature/company/company.service';
import speciesService from '../../../services/feature/species/species.service';
import productService from '../../../services/feature/product/product.service';
import haulService from '../../../services/feature/haul/haul.service';
import FishView from './fishView';
import MapChart from "./mapChart";
import EventView from './eventView';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 4,
  },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

class ViewConsumerPackage extends Component {
  state = {
    consumerPackageResult: null,
    catchResult: null,
    palletResult: null,
    palletEventResult: null,
    tripResult: null,
    companyResult: null,
    speciesResult: null,
    haulResult: null,
    productResult: ""
  }

  onFinish = async (values) => {
    console.log("Values: ", values.pkConsumerPackage)
    const consumerPackageResult = await consumerPackageService.getById(values.pkConsumerPackage);
    console.log("consumerPackageResult:", consumerPackageResult)

    const catchResult = await catchService.getById(consumerPackageResult.fkPallet)
    console.log("catchResult:", catchResult)

    const palletResult = await palletService.getById(catchResult.pkPallet)
    console.log("palletResult:", palletResult)
    
    const palletEventResult = await palletEventService.getById(catchResult.pkPallet)
    console.log("palletEventResult:", palletEventResult)

    const tripResult = await tripService.getById(palletResult.pkTrip)
    console.log("tripResult:", tripResult)

    const companyResult = await companyService.getById(consumerPackageResult.agent)
    console.log("companyResult:", companyResult)

    // TODO: GetSpecies

    const productResult = await productService.getByPalletId(palletResult.palletId)
    console.log("productResult:", productResult)

    const haulResult = await haulService.getByPkTrip(palletResult.pkTrip)
    console.log("haulResult:", haulResult)

    this.setState({
      productResult: productResult, 
      haulResult: haulResult, 
      tripResult: tripResult,
      palletEventResult: palletEventResult
    })


    this.setState({
      consumerPackages: 
          <tr key={consumerPackageResult.pkConsumerPackage}>
            <td>{consumerPackageResult.pkConsumerPackage}</td>
            <td>{consumerPackageResult.fkPallet}</td>
            <td>{consumerPackageResult.packingDateTime}</td>
            <td>{consumerPackageResult.agent}</td>
          </tr>
    })
  }

  render() {
    return (
      <div style={{margin: 'auto', maxWidth: '1000px'}}>
        <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>

          {/*PkConsumerPackage*/}
          <Form.Item
            name={'pkConsumerPackage'}
            label="Consumer Package Id"
            rules={[
              {
                required: true,
                type: 'string',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form> 
        <FishView productResult={this.state.productResult}/>
        <EventView palletEventResult={this.state.palletEventResult}/>
        <MapChart 
          tripResult = {this.state.tripResult} 
          haulResult = {this.state.haulResult}
          palletEventResult = {this.state.palletEventResult}
        />
        {this.state.consumerPackages ?
          <table>
            <thead>
              <tr>
                <th>Consumer Package ID</th>
                <th>Catch ID</th>
                <th>Packing Time</th>
                <th>Agent</th>
              </tr>
            </thead>
            <tbody>
              {this.state.consumerPackages}
            </tbody>
          </table> : ''}
      </div>
    )
  };
}

export default withParamsAndNavigation(ViewConsumerPackage);

//export default () => <FormLayoutDemo />;
