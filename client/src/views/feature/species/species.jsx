import React, { Component, useState } from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import './species.css';
import { Form, Input, Button, InputNumber, DatePicker } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import speciesService from '../../../services/feature/species/species.service';
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

class Species extends Component {
  state = {
    species: null
  }

  onFinish = async (values) => {
    const result = await speciesService.createNew(values);
  };

  getAllPallet = async () => {
    const result = await speciesService.getAll();
    this.setState({
      species: result.map((info) => {
        return (
          <tr key={info.pkSpecies}>
            <td>{info.pkSpecies}</td>
            <td>{info.name}</td>
            <td>{info.description}</td>
          </tr>
        )
      })
    })
  }

  render() {
    return (
      <div>
        <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>

          {/*Name*/}
          <Form.Item
            name={'name'}
            label="Name"
            rules={[
              {
                required: true,
                type: 'string',
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/*Description*/}
          <Form.Item
            name={'description'}
            label="Description"
            rules={[
              {
                required: false,
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
            <Button className='ms-3' type="primary" onClick={this.getAllPallet}>Get All Species</Button>

          </Form.Item>
        </Form>
        {this.state.species ?
          <table style={{ margin: 'auto' }}>
            <thead>
              <tr>
                <th>Species ID</th>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {this.state.species}
            </tbody>
          </table> : ''}
      </div>
    )
  };
}

export default withParamsAndNavigation(Species);

//export default () => <FormLayoutDemo />;
