import React, {Component, useState} from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import './pallet.css';
import { Form, Input, Button, InputNumber, DatePicker } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import palletService from '../../../services/feature/pallet/pallet.service';


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

class Pallet extends Component {
    state = {
        palletForm: {
            palletID: '',
            palletVID: '',
            productID: '',
            date: '',
            palletNum: '',
            productNum: '',
            weight: '',
            temperatureIn: ''
         }
    }

    onFinish = async (values) => {
      console.log(values)
      const result = await palletService.createNew(values);
      console.log(result);
  };

    render() {
        return (
          <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>
            <Form.Item
            name={'productNum'}
            label="Product ID"
            rules={[
              {
                required: true,
                type: 'number',
                min: 0
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

        <Form.Item
        name={'supplierId'}
        label="Supplier Id"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

        <Form.Item
        name={'palletWeight'}
        label="Weight"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        name={'tripNo'}
        label="Trip Id"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0
          },
        ]}
      >
        <InputNumber />
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

export default withParamsAndNavigation(Pallet);

//export default () => <FormLayoutDemo />;
