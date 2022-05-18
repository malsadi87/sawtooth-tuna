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
            haulId: '',
            launchDate: '',
            launchTime: '',
            launchPosition: '',
            launchLatitude: '',
            launchLongitude: '',
            tripId: '',
            catchProductNumber: '',
            catchProductId: '',
            catchWeight: ''
            }
     }

    onFinish = (values) => {
        console.log(values);
    };


    render() {
        return (
          <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>

            {/*Haul ID*/}
            <Form.Item
             name={'haulId'}
             label="Haul ID"
             rules={[
                  {
                    required: true
                  },
                ]}
                >
            <InputNumber />
         </Form.Item>

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

         {/*Trip ID*/}
            <Form.Item
             name={'tripId'}
             label="Trip ID"
             rules={[
                  {
                    required: true
                  },
                ]}
                >
            <InputNumber />
         </Form.Item>

          {/*Catch: Product Number*/}
            <Form.Item
             name={'catchProductNumber'}
             label="Catch: Product Number"
             rules={[
                  {
                    required: true
                  },
                ]}
                >
            <InputNumber />
         </Form.Item>

         {/*Catch: Product ID*/}
            <Form.Item
             name={'catchProductId'}
             label="Catch: Product ID"
             rules={[
                  {
                    required: true
                  },
                ]}
                >
            <InputNumber />
         </Form.Item>

            {/*Catch: Weight*/}
            <Form.Item
             name={'catchWeight'}
             label="Catch: Weight"
             rules={[
                  {
                    required: true
                  },
                ]}
                >
            <InputNumber />
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