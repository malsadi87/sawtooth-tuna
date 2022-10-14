import React, { Component, useState } from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import './customPackage.css';
import { Form, Input, Button, InputNumber, DatePicker } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import customPackageService from '../../../services/feature/customPackage/customPackage.service';
import moment from 'moment';


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

class CustomPackage extends Component {
  state = {
    customPackages: null
  }

  onFinish = async (values) => {
    const result = await customPackageService.createNew(values);
  };

  getAllCustomPackage = async () => {
    const result = await customPackageService.getAll();
    this.setState({
      customPackages: result.map((info) => {
        return (
          <tr key={info.consumerPackageId}>
            <td>{info.consumerPackageId}</td>
            <td>{info.catchPackageId}</td>
            <td>{info.packingDate}</td>
            <td>{info.agent}</td>
          </tr>
        )
      })
    })
  }

  render() {
    return (
      <div>
        <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>

          {/*ConsumerPackageId*/}
          <Form.Item
            name={'consumerPackageId'}
            label="Consumer Package Id"
            rules={[
              {
                required: true,
                type: 'string',
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/*CatchPackageId*/}
          <Form.Item
            name={'catchPackageId'}
            label="Catch Package Id"
            rules={[
              {
                required: true,
                type: 'string',
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/*LaunchDateTime*/}
          <Form.Item
            name={'packingDate'}
            label="Packing Date"
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

          {/*Agent*/}
          <Form.Item
            name={'agent'}
            label="Agent"
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
            <Button className='ms-3' type="primary" onClick={this.getAllCustomPackage}>Get All Packages</Button>

          </Form.Item>
        </Form>
        {this.state.customPackages ?
          <table style={{ margin: 'auto' }}>
            <thead>
              <tr>
                <th>Custom Package ID</th>
                <th>Catch Package ID</th>
                <th>Packing Time</th>
                <th>Agent</th>
              </tr>
            </thead>
            <tbody>
              {this.state.customPackages}
            </tbody>
          </table> : ''}
      </div>
    )
  };
}

export default withParamsAndNavigation(CustomPackage);

//export default () => <FormLayoutDemo />;
