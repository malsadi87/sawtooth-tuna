import React, {Component} from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import './product.css';
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

class Product extends Component {
    state = {
        productForm: {
            productId: '',
            productName: '',
            description: '',
            attributeName: '',
            attributeValue: '',
            productNumber: ''
         }
    }

    onFinish = (values) => {
        console.log(values);
    };



    render() {
        return (
          <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>

            <Form.Item
                name={'productId'}
                label="Product ID"
                rules={[
                  {
                    required: true
                  },
                ]}
              >
              <InputNumber />
            </Form.Item>

            <Form.Item
                name={'productName'}
                label="Product Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
              <Input />
            </Form.Item>

             <Form.Item
                name={'description'}
                label="Description"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
              <Input />
            </Form.Item>

            <Form.Item
                name={'attributeName'}
                label="Product Parameter: Attribute Name"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
              <Input />
            </Form.Item>

             <Form.Item
                name={'attributeValue'}
                label="Product Parameter: Attribute Value"
                rules={[
                  {
                    required: false,
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


export default withParamsAndNavigation(Product);