import React, {Component} from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import './batchLabelling.css';
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

class batchLabelling extends Component {
    state = {
        productForm: {
           labellingId: '',
           batchVid: '',
           productId: '',
           batchId: ''
         }
    }

    onFinish = (values) => {
        console.log(values);
    };



    render() {
        return (
          <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>

            <Form.Item
                name={'labellingId'}
                label="Labelling ID"
                rules={[
                  {
                    required: true
                  },
                ]}
              >
              <InputNumber />
            </Form.Item>

            <Form.Item
                name={'batchVid'}
                label="Batch VID"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
              <InputNumber />
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
                name={'productId'}
                label="Product ID"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
              <InputNumber />
            </Form.Item>

             <Form.Item
                name={'batchId'}
                label="Batch ID"
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


export default withParamsAndNavigation(batchLabelling);
