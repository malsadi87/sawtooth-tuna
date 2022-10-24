import React, { Component } from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import { Form, Input, Button, InputNumber, DatePicker, TimePicker, Checkbox } from 'antd';
import './palletEvent.css';
import moment from 'moment';
import palletEventService from '../../../services/feature/palletEvent/palletEvent.service';

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

class PalletEvent extends Component {
  state = {
    palletEvents: null
  }

  onFinish = async (values) => {
    console.log('Values:', values)
    console.log('Relative?', values.isRelative)
    let palletEvent = {
      'eventTime': values.dateTime,
      'palletNum': values.palletNum,
      'temperature': JSON.stringify({ 
        'isRelative': values.isRelative,
        'startValue': values.startValue,
        'value': values.value
      }),
      'location': JSON.stringify({ 
        'latitude': values.latitude, 
        'longitude': values.longitude 
    }),
      'tilt': JSON.stringify({ 
        'x': values.x,
        'y': values.y
      }),
      'shock': JSON.stringify({ 
        'acceleration': values.acceleration,
        'duration': values.duration
      })
    }
    const result = await palletEventService.createNew(palletEvent);
  };

  getAllPalletEvent = async () => {
    const result = await palletEventService.getAll();
    this.setState({
      palletEvents: result.map((info) => {
        return (
          <tr key={info.palletEventId}>
            <td>{info.palletEventId}</td>
            <td>{info.eventTime}</td>
            <td>{info.palletNum}</td>
            <td>{info.temperature}</td>
            <td>{info.location}</td>
            <td>{info.tilt}</td>
            <td>{info.shock}</td>
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
            name={'dateTime'}
            label="Date Time"
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

          {/*Pallet Number*/}
          <Form.Item
            name={'palletNum'}
            label="Pallet Number"
            rules={[
              {
                required: true,
                type: 'string',
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/*Latitude*/}
          <Form.Item
            name={'latitude'}
            label="Latitude"
            rules={[
              {
                required: true,
                type: 'number'
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          {/*Longitude*/}
          <Form.Item
            name={'longitude'}
            label="Longitude"
            rules={[
              {
                required: true,
                type: 'number'
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          {/*Temperature isRelative*/}
          <Form.Item
            name={'isRelative'}
            label="Temperature is relative?"
            valuePropName="checked"
            rules={[
              {
                type: 'boolean'
              },
            ]}
          >
            <Checkbox />
          </Form.Item>

          {/*Temperature start value*/}
          <Form.Item
            name={'startValue'}
            label="Temperature start value"
            rules={[
              {
                required: true,
                type: 'number'
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          {/*Temperature change value*/}
          <Form.Item
            name={'value'}
            label="Temperature change value"
            rules={[
              {
                required: true,
                type: 'number'
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          {/*Tilt X*/}
          <Form.Item
            name={'x'}
            label="Tilt x"
            rules={[
              {
                required: true,
                type: 'number'
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          {/*Tilt Y*/}
          <Form.Item
            name={'y'}
            label="Tilt y"
            rules={[
              {
                required: true,
                type: 'number'
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          {/*Shock acceleration*/}
          <Form.Item
            name={'acceleration'}
            label="Acceleration"
            rules={[
              {
                required: true,
                type: 'number'
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          
          {/*Shock duration*/}
          <Form.Item
            name={'duration'}
            label="Duration"
            rules={[
              {
                required: true,
                type: 'number'
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} >
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
            <Button className='ms-3' type="primary" onClick={this.getAllPalletEvent}>Get All Event</Button>
          </Form.Item>
        </Form>
        {this.state.palletEvents ?
          <table style={{ margin: 'auto' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Event Time</th>
                <th>Pallet Number</th>
                <th>Temperature</th>
                <th>Location</th>
                <th>Tilt</th>
                <th>Shock</th>
              </tr>
            </thead>
            <tbody>
              {this.state.palletEvents}
            </tbody>
          </table> : ''}
      </div>
    )
  };
}

export default withParamsAndNavigation(PalletEvent);