import React, { Component } from 'react';
import { Form, Input, Button, InputNumber, DatePicker } from 'antd';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import './trip.css';
import tripService from '../../../services/feature/trip/trip.service';
import moment from 'moment';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 6,
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

class Trip extends Component {
  state = {
    trips: null
  }

  onFinish = async (values) => {
    const result = await tripService.createNew(values);
  };

  getAllTrip = async () => {
    const result = await tripService.getAll();
    console.log(result)
    this.setState({
      trips: result.map((info) => {
        return (
          <tr key={info.pkTrip}>
            <td>{info.pkTrip}</td>
            <td>{info.departureDate}</td>
            <td>{info.landingDate}</td>
            <td>{info.departurePort}</td>
            <td>{info.landingPort}</td>
            <td>{info.tripYearNo}</td>
            <td>{info.vesselName}</td>
          </tr>
        )
      })
    })
  }

  render() {
    return (
      <div>
        <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>

          <Form.Item
            name={'pkTrip'}
            label="Trip Number"
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
            name={'departureDate'}
            label="Departure date"
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
            name={'landingDate'}
            label="Landing date"
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
            name={'departurePort'}
            label="Departure Port"
            rules={[
              {
                required: true
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={'landingPort'}
            label="Landing Port"
            rules={[
              {
                required: true
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={'tripWithinYearNo'}
            label="Trip within year number"
            rules={[
              {
                required: true
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name={'vesselName'}
            label="Vessel Name"
            rules={[
              {
                required: false,
                type: 'name'
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button className='ms-3' type="primary" onClick={this.getAllTrip}>Get All Trip</Button>
          </Form.Item>
        </Form>

        {this.state.trips ?
          <table style={{ margin: 'auto' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Departure date</th>
                <th>Landing date</th>
                <th>Departure Port</th>
                <th>Landing Port</th>
                <th>Vessel Name</th>
              </tr>
            </thead>
            <tbody>
              {this.state.trips}
            </tbody>
          </table> : ''}
      </div>
    )
  };
}






export default withParamsAndNavigation(Trip);