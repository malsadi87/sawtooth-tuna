import React, { Component } from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { Form, Input, Button, InputNumber, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import productService from '../../../services/feature/product/product.service';
import './product.css';

class Product extends Component {
  state = {
    productForm: {
      productId: '',
      productName: '',
      productDescription: '',
      name: '',
      value: '',
      productNum: ''
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

  onFinish = async (values) => {
    alert('New request made!!');
    console.log(values);
    const result = await productService.createNew(values);
    console.log(result);
  };

  getAllProduct = async () => {
    const result = await productService.getAll();
    console.log(result);
  }

  render() {
    return (
      <Form {...this.layout} name="nest-messages" onFinish={this.onFinish} validateMessages={this.validateMessages}>
        <Form.Item name={'productId'} label="Product ID" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>

        <Form.Item name={'productName'} label="Product Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name={'productDescription'} label="Description" rules={[{ required: false }]}>
          <Input />
        </Form.Item>

        <Form.List name="productAttribute">
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

        <Form.Item name={'productNum'} label="Product Number" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>

        <Form.Item wrapperCol={{ ...this.layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>

          <Button className='ms-3' type="primary" onClick={this.getAllProduct}>Get All Product</Button>
        </Form.Item>
      </Form>
    )
  };
}


export default withParamsAndNavigation(Product);