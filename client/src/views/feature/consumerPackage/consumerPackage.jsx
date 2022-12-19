import React, { Component, useState } from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import './consumerPackage.css';
import { Form, Input, Button, InputNumber, DatePicker } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import consumerPackageService from '../../../services/feature/consumerPackage/consumerPackage.service';
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

class ConsumerPackage extends Component {
  state = {
    consumerPackages: null
  }

  onFinish = async (values) => {
    const result = await consumerPackageService.createNew(values);
  };

  getAllConsumerPackage = async () => {
    const result = await consumerPackageService.getAll();
    this.setState({
      consumerPackages: result.map((info) => {
        return (
          <tr key={info.pkConsumerPackage}>
            <td>{info.pkConsumerPackage}</td>
            <td>{info.packingDateTime}</td>
            <td>{info.fkPallet}</td>
          </tr>
        )
      })
    })
  }

  render() {
    return (
      <div>
        <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>

          {/*PackingDateTime*/}
          <Form.Item
            name={'packingDateTime'}
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

          {/*FkPallet*/}
          <Form.Item
            name={'fkPallet'}
            label="Fk Pallet"
            rules={[
              {
                required: true,
                type: 'number',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button className='ms-3' type="primary" onClick={this.getAllConsumerPackage}>Get All Packages</Button>

          </Form.Item>
        </Form>
        {this.state.consumerPackages ?
          <table style={{ margin: 'auto' }}>
            <thead>
              <tr>
                <th>Pk Custom Package</th>
                <th>Packing Time</th>
                <th>Fk Pallet</th>
              </tr>
            </thead>
            <tbody>
              {this.state.consumerPackages}
            </tbody>
          </table> : ''}
      </div>
    )
  };
}

export default withParamsAndNavigation(ConsumerPackage);

//export default () => <FormLayoutDemo />;
