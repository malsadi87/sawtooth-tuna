import React, { Component } from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { Form, Input, Button, InputNumber, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import productService from '../../../services/feature/product/product.service';
import './product.css';

class Product extends Component {
  state = {
    products: null
  };


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
    const result = await productService.createNew(values);
  };


  getAllProduct = async () => {
    const result = await productService.getAll();
    this.setState({
      products: result.map((info) => {
        return (
          <tr key={info.pkProduct}>
            <td>{info.pkProduct}</td>
            <td>{info.title}</td>
            <td>{info.productId}</td>
            <td>{info.fkSpecies}</td>
          </tr>
        )
      })
    })
  }

  render() {
    return (
      <div>
        <Form {...this.layout} name="nest-messages" onFinish={this.onFinish} validateMessages={this.validateMessages}>

          <Form.Item name={'title'} label="Title" rules={[{ 
            required: true,
            type: "string"
          }]}>
            <Input />
          </Form.Item>

          <Form.Item name={'productId'} label="ProductId" rules={[{
            required: true,
            type: "string"
          }]}>
            <Input />
          </Form.Item>

          <Form.Item name={'fkSpecies'} label="FkSpecies" rules={[{
             required: true,
             type: "number"
            }]}>
            <InputNumber />
          </Form.Item>

          <Form.Item wrapperCol={{ ...this.layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>

            <Button className='ms-3' type="primary" onClick={this.getAllProduct}>Get All Product</Button>
          </Form.Item>
        </Form>
        {this.state.products ?
          <table style={{ margin: 'auto' }}>
            <thead>
              <tr>
                <th>PkProduct</th>
                <th>Title</th>
                <th>ProductID</th>
                <th>FkSpecies</th>
              </tr>
            </thead>
            <tbody>
              {this.state.products}
            </tbody>
          </table> : ''}
      </div>
    )
  };
}


export default withParamsAndNavigation(Product);