import React, { Component } from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import './product.css';
import { Form, Input, Button, InputNumber, Space, Row, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

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

  layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 15,
    }
  };

  validateMessages = {
    required: '${label} is required!',
    types: {
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  onFinish = (values) => {
    console.log(values);
  };

  render() {
    return (
      <Form {...this.layout} name="nest-messages" onFinish={this.onFinish} validateMessages={this.validateMessages}>
        <Form.Item name={'productId'} label="Product ID" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>

        <Form.Item name={'productName'} label="Product Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name={'description'} label="Description" rules={[{ required: false }]}>
          <Input />
        </Form.Item>

        <Form.List name="attribute">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8, paddingLeft: '33.3%' }} align="baseline">
                  <Form.Item {...restField} name={[name, 'name']} rules={[{ required: true, message: 'Missing attribute name' }]}>
                    <Input placeholder="Attribute Name" />
                  </Form.Item>

                  <Form.Item {...restField} name={[name, 'value']} rules={[{ required: true, message: 'Missing attribute value' }]}>
                    <Input placeholder="Attribute Value" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}

            <Space style={{ display: 'flex', marginBottom: 8, paddingLeft: '33.3%' }} align="baseline">
              <Form.Item>
                  <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                    Add Attribute
                  </Button>
                </Form.Item>
            </Space>
            </>
          )}
        </Form.List>

        <Form.Item name={'productNumber'} label="Product Number" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>

        <Form.Item wrapperCol={{ ...this.layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  };
}


export default withParamsAndNavigation(Product);