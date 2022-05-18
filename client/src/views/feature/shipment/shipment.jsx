import React, { Component } from 'react';
import './shipment.css';
import { Form, Input, Button, DatePicker } from 'antd';
import { withParamsAndNavigation } from '../../../utility/routerHelper';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 4,
  }
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

const data = [
  {
    key: '1',
    name: 'Cod',
    weight: '2',
  }
]

class Shipment extends Component {
  state = {
    productForm: {
      shipmentID: '',
      shipmentVID: '',
      palletVIDs: '',
      date: '',
      latitude: '',
      longitude: '',
      temperatureOut: '',
      consignerNumber: '',
      consignerName: ''
    }
  }

  onFinish = (values) => {
    console.log(values);
  };



  render() {
    return (
      <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>
        <Form.Item
          name={'shipmentID'}
          label="Shipment ID"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={'shipmentVID'}
          label="Shipment VID"
          rules={[
            {
              required: true
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={'palletVIDs'}
          label="Pallet VIDs"
          rules={[
            {
              required: true
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={'date'}
          label="Date">
          <DatePicker />
        </Form.Item>

        {/*Latitude*/}
        <Form.Item
          name={'latitude'}
          label="Latitude"
          rules={[
            {
              required: true
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/*Launch Longitude*/}
        <Form.Item
          name={'longitude'}
          label="Longitude"
          rules={[
            {
              required: true
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={'temperatureOut'}
          label="Temperature Out"
          rules={[
            {
              required: true
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={'consignerNumber'}
          label="Consigner Number"
          rules={[
            {
              required: true
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={'consignerName'}
          label="Consigner Name"
          rules={[
            {
              required: true
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
    )
  };
}


export default withParamsAndNavigation(Shipment);