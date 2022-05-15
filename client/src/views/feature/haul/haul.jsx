import React, {Component} from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import { Form, Input, Button, InputNumber, DatePicker, TimePicker } from 'antd';
import './haul.css';


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

class Haul extends Component {
   state = {
        haulForm: {
            launchDate: '',
            launchTime: '',
            launchPosition: '',
            launchLatitude: '',
            launchLongitude: '',
            haulDate: '',
            haulTime: '',
            haulPosition: '',
            haulLatitude: '',
            haulLongitude: '',
            catch: '', //TODO: make list?
            }
     }

    onFinish = (values) => {
        console.log(values);
    };


    render() {
        return (
          <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>

            {/*Launch Date*/}
            <Form.Item
             name={'launchDate'}
             label="Launch Date"
             rules={[
                  {
                    required: true
                  },
                ]}
                >
            <DatePicker />
         </Form.Item>

          {/*Launch Time*/}
            <Form.Item
             name={'launchTime'}
             label="Launch Time"
             rules={[
                  {
                    required: true
                  },
                ]}
                >
            <TimePicker />
         </Form.Item>

          {/*Launch Position*/}
          <Form.Item
             name={'launchPosition'}
             label="Launch Position (Name of place)"
             rules={[
                  {
                    required: true
                  },
                ]}
                >
            <Input />
         </Form.Item>

        {/*Launch Latitude*/}
        <Form.Item
            name={'launchLatitude'}
            label="Launch Latitude"
            rules={[
              {
                required: true
              },
            ]}
          >
          <Input />
        </Form.Item>

         {/*Launch Longitude*/}
        <Form.Item
            name={'launchLongitude'}
            label="Launch Longitude"
            rules={[
              {
                required: true
              },
            ]}
          >
          <Input />
        </Form.Item>

        {/*Haul Date*/}
            <Form.Item
             name={'haulDate'}
             label="Haul Date"
             rules={[
                  {
                    required: true
                  },
                ]}
                >
            <DatePicker />
         </Form.Item>

          {/*Haul Time*/}
            <Form.Item
             name={'haulTime'}
             label="Haul Time"
             rules={[
                  {
                    required: true
                  },
                ]}
                >
            <TimePicker />
         </Form.Item>


       {/*Haul Position*/}
       <Form.Item
             name={'haulPosition'}
             label="Haul Position (Name of place)"
             rules={[
                  {
                    required: true
                  },
                ]}
                >
            <Input />
         </Form.Item>

          {/*Haul Latitude*/}
        <Form.Item
            name={'haulLatitude'}
            label="Haul Latitude"
            rules={[
              {
                required: true
              },
            ]}
          >
          <Input />
        </Form.Item>

         {/*Haul Longitude*/}
        <Form.Item
            name={'haulLongitude'}
            label="Haul Longitude"
            rules={[
              {
                required: true
              },
            ]}
          >
          <Input />
        </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} >
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>
        </Form>
        )
    };
}

export default withParamsAndNavigation(Haul);