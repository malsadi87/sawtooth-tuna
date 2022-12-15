import React, { Component, useState } from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import './company.css';
import { Form, Input, Button, InputNumber, DatePicker } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import companyService from '../../../services/feature/company/company.service';


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

class Company extends Component {
  state = {
    companies: null
  }

  onFinish = async (values) => {
    const result = await companyService.createNew(values);
  };

  getAllPallet = async () => {
    const result = await companyService.getAll();
    this.setState({
      companies: result.map((info) => {
        return (
          <tr key={info.pkCompany}>
            <td>{info.pkCompany}</td>
            <td>{info.companyName}</td>
            <td>{info.companyAddress}</td>
            <td>{info.contactInfo}</td>
          </tr>
        )
      })
    })
  }

  render() {
    return (
      <div>
        <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>

          {/*companyName*/}
          <Form.Item
            name={'companyName'}
            label="Company Name"
            rules={[
              {
                required: true,
                type: 'string',
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/*companyAddress*/}
          <Form.Item
            name={'companyAddress'}
            label="Company Address"
            rules={[
              {
                required: true,
                type: 'string',
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/*contactInfo*/}
          <Form.Item
            name={'contactInfo'}
            label="Contanct Info"
            rules={[
              {
                required: true,
                type: 'string',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button className='ms-3' type="primary" onClick={this.getAllPallet}>Get All Companies</Button>

          </Form.Item>
        </Form>
        {this.state.companies ?
          <table style={{ margin: 'auto' }}>
            <thead>
              <tr>
                <th>Company ID</th>
                <th>Company Name</th>
                <th>Company Address</th>
                <th>Company Contact Info</th>
              </tr>
            </thead>
            <tbody>
              {this.state.companies}
            </tbody>
          </table> : ''}
      </div>
    )
  };
}

export default withParamsAndNavigation(Company);

//export default () => <FormLayoutDemo />;
