import React, {Component} from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import './product.css';
import { Form, Input, Button, InputNumber, DatePicker, Table, Tag, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 15,
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

            <Form.List name="attribute">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'attributeName']}
                      rules={[{ required: true, message: 'Missing attribute name' }]}
                    >
                      <Input placeholder="Attribute Name" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'attributeValue']}
                      rules={[{ required: true, message: 'Missing attribute value' }]}
                    >
                      <Input placeholder="Attribute Value" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Attribute
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>




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