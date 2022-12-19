import React, { Component, useState } from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import './production.css';
import { Form, Input, Button, InputNumber, DatePicker } from 'antd';
import moment from 'moment';
import productionService from '../../../services/feature/production/production.service';

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

class Production extends Component {
  state = {
    productions: null
  }

  onFinish = async (values) => {
    const result = await productionService.createNew(values);
  };

  getAllProduction = async () => {
    const result = await productionService.getAll();
    this.setState({
      productions: result.map((info) => {
        return (
          <tr key={info.pkProduction}>
            <td>{info.pkProduction}</td>
            <td>{info.productionDate}</td>
            <td>{info.fkPallet}</td>
            <td>{info.fkProduct}</td>
            <td>{info.fkHaul}</td>
          </tr>
        )
      })
    })
  }

  render() {
    return (
      <div>
        <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>

          {/*Date*/}
          <Form.Item
            name={'productionDate'}
            label="Production Date"
            rules={[
              {
                required: true
              },
            ]}
          >
            <DatePicker
              showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
            />
          </Form.Item>

          <Form.Item
            name={'fkPallet'}
            label="FkPallet"
            rules={[
              {
                required: true,
                type: 'number'
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name={'fkProduct'}
            label="FkProduct"
            rules={[
              {
                required: true,
                type: 'number'
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name={'fkHaul'}
            label="FkHaul"
            rules={[
              {
                required: true,
                type: 'number'
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button className='ms-3' type="primary" onClick={this.getAllProduction}>Get All Productions</Button>

          </Form.Item>
        </Form>
        {this.state.productions ?
          <table style={{ margin: 'auto' }}>
            <thead>
              <tr>
                <th>Production ID</th>
                <th>Production Date</th>
                <th>FkPallet</th>
                <th>FkProduct</th>
                <th>FkHaul</th>
              </tr>
            </thead>
            <tbody>
              {this.state.productions}
            </tbody>
          </table> : ''}
      </div>
    )
  };
}

export default withParamsAndNavigation(Production);

//export default () => <FormLayoutDemo />;
