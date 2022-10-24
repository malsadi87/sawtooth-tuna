import React, { Component, useState } from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import './viewCustomPackage.css';
import { Form, Input, Button, InputNumber, DatePicker } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import customPackageService from '../../../services/feature/customPackage/customPackage.service';
import moment from 'moment';
import catchPackageService from '../../../services/feature/catchPackage/catchPackage.service';
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

class ViewCustomPackage extends Component {
  state = {
    customPackageResult: null,
    catchPackageResult: null,
    palletResult: null,
    palletEventResult: null,
    tripResult: null,
    companyResult: null,
    speciesResult: null,
    haulResult: null,
    productResult: ""
  }

  onFinish = async (values) => {
    console.log("Values: ", values.consumerPackageId)
    const customPackageResult = await customPackageService.getById(values.consumerPackageId);
    console.log("customPackageResult:", customPackageResult)

    const catchPackageResult = await catchPackageService.getById(customPackageResult.catchPackageId)
    console.log("catchPackageResult:", catchPackageResult)

    const palletResult = await palletService.getById(catchPackageResult.palletNum)
    console.log("palletResult:", palletResult)
    
    const palletEventResult = await palletEventService.getById(catchPackageResult.palletNum)
    console.log("palletEventResult:", palletEventResult)

    const tripResult = await tripService.getById(palletResult.tripNo)
    console.log("tripResult:", tripResult)

    const companyResult = await companyService.getById(customPackageResult.agent)
    console.log("companyResult:", companyResult)

    const speciesResult = await speciesService.getByCatchPackageId(customPackageResult.catchPackageId)
    console.log("speciesResult:", speciesResult)

    const productResult = await productService.getByProductNum(palletResult.productNum)
    console.log("productResult:", productResult)

    const haulResult = await haulService.getByTripNo(palletResult.tripNo)
    console.log("haulResult:", haulResult)

    this.setState({
      productResult: productResult, 
      haulResult: haulResult, 
      tripResult: tripResult,
      palletEventResult: palletEventResult
    })


    this.setState({
      customPackages: 
          <tr key={customPackageResult.consumerPackageId}>
            <td>{customPackageResult.consumerPackageId}</td>
            <td>{customPackageResult.catchPackageId}</td>
            <td>{customPackageResult.packingDate}</td>
            <td>{customPackageResult.agent}</td>
          </tr>
    })
  }

  render() {
    return (
      <div style={{margin: 'auto', maxWidth: '1000px'}}>
        <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>

          {/*ConsumerPackageId*/}
          <Form.Item
            name={'consumerPackageId'}
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
        {this.state.customPackages ?
          <table>
            <thead>
              <tr>
                <th>Custom Package ID</th>
                <th>Catch Package ID</th>
                <th>Packing Time</th>
                <th>Agent</th>
              </tr>
            </thead>
            <tbody>
              {this.state.customPackages}
            </tbody>
          </table> : ''}
      </div>
    )
  };
}

export default withParamsAndNavigation(ViewCustomPackage);

//export default () => <FormLayoutDemo />;