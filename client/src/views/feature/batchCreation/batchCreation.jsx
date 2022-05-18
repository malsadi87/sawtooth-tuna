import React, {Component} from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import './batchCreation.css';
import { Form, Input, Button, InputNumber, DatePicker, Table, Tag, Space } from 'antd';

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

class batchCreation extends Component {
    state = {
        productForm: {
           batchId: '',
           skuInfo: '',
           palletsId: '',
           batchNumber: '',
           date: '',
           temperatureOut: ''
         }
    }

    onFinish = (values) => {
        console.log(values);
    };



    render() {
        return (
          <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>

            <Form.Item
                name={'batchId'}
                label="Batch ID"
                rules={[
                  {
                    required: true
                  },
                ]}
              >
              <InputNumber />
            </Form.Item>

            <Form.Item
                name={'skuInfo'}
                label="SKU Info"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
              <Input />
            </Form.Item>

             <Form.Item
                name={'palletsId'}
                label="Pallets ID"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
              <InputNumber />
            </Form.Item>

            <Form.Item
                name={'batchNumber'}
                label="Batch Number"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
              <InputNumber />
            </Form.Item>

             <Form.Item
                name={'date'}
                label="Date"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
              <DatePicker />
            </Form.Item>

             <Form.Item
                name={'temperatureOut'}
                label="Temperature Out"
                rules={[
                  {
                    required: true,
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


export default withParamsAndNavigation(batchCreation);
