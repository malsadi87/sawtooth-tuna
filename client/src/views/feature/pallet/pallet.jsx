import React, {Component, useState} from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import './pallet.css';
import { Form, Input, Button, InputNumber, DatePicker } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';


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
            palletNumber: '',
            productNumber: '',
            weight: '',
            temperatureIn: ''
         }
    }

    onFinish = (values) => {
        console.log(values);
    };

    render() {
        return (
          <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>
            <Form.Item
                name={'palletID'}
                label="Pallet ID"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
              <Input />
            </Form.Item>
            <Form.Item
                name={'palletVID'}
                label="Pallet VID"
                rules={[
                  {
                    required: true
                  },
                ]}
              >
              <Input />
            </Form.Item>
            <Form.Item
            name={'productID'}
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
             name={'date'}
             label="Date">
            <DatePicker />
         </Form.Item>

       <Form.Item
        name={'palletNumber'}
        label="Pallet Number"
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
        name={'productNumber'}
        label="Product Number"
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
        name={'weight'}
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
