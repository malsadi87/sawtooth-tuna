import React, { Component, useState } from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import './catch.css';
import { Form, Input, Button, InputNumber, DatePicker } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import catchService from '../../../services/feature/catch/catch.service';

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

class Catch extends Component {
  state = {
    catchs: null
  }

  onFinish = async (values) => {
    const result = await catchService.createNew(values);
  };

  getAllPallet = async () => {
    const result = await catchService.getAll();
    this.setState({
      catchs: result.map((info) => {
        return (
          <tr key={info.pkCatch}>
            <td>{info.pkCatch}</td>
            <td>{info.updatedDateTime}</td>
            <td>{info.quantity}</td>
            <td>{info.fkHaul}</td>
            <td>{info.fkSpecies}</td>
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
            name={'updatedDateTime'}
            label="Packing Date Time"
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
            name={'quantity'}
            label="Quantity"
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

          <Form.Item
            name={'fkSpecies'}
            label="FkSpecies"
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
            <Button className='ms-3' type="primary" onClick={this.getAllPallet}>Get All Packages</Button>

          </Form.Item>
        </Form>
        {this.state.catchs ?
          <table style={{ margin: 'auto' }}>
            <thead>
              <tr>
                <th>Package ID</th>
                <th>Packing Date</th>
                <th>Quantity</th>
                <th>FkHaul</th>
                <th>FkSpecies</th>
              </tr>
            </thead>
            <tbody>
              {this.state.catchs}
            </tbody>
          </table> : ''}
      </div>
    )
  };
}

export default withParamsAndNavigation(Catch);

//export default () => <FormLayoutDemo />;
