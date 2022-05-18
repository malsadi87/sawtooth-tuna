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

class coldStorage extends Component {
   state = {
        haulForm: {
            eventId: '',
            shipmentVID: '',
            longitude: '',
            latitude: '',
            date: '',
            time: '',
            temperatureIn: '',
            consigneeNumber: '',
            consigneeName: ''
            }
     }

    onFinish = (values) => {
        console.log(values);
    };


    render() {
        return (
          <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>

            {/*Event ID*/}
            <Form.Item
             name={'eventId'}
             label="Event ID"
             rules={[
                  {
                    required: true
                  },
                ]}
                >
            <InputNumber />
         </Form.Item>

          {/*Shipment VID*/}
            <Form.Item
             name={'shipmentVID'}
             label="Shipment VID"
             rules={[
                  {
                    required: true
                  },
                ]}
                >
            <InputNumber />
         </Form.Item>

          {/*Latitude*/}
        <Form.Item
            name={'latitude'}
            label="Latitude"
            rules={[
              {
                required: true
              },
            ]}
          >
          <Input />
        </Form.Item>

         {/*Longitude*/}
        <Form.Item
            name={'longitude'}
            label="Longitude"
            rules={[
              {
                required: true
              },
            ]}
          >
          <Input />
        </Form.Item>

        {/*Date*/}
            <Form.Item
             name={'date'}
             label="Date"
             rules={[
                  {
                    required: true
                  },
                ]}
                >
            <DatePicker />
         </Form.Item>

         {/*Time*/}
            <Form.Item
             name={'time'}
             label="Time"
             rules={[
                  {
                    required: true
                  },
                ]}
                >
            <TimePicker />
         </Form.Item>

          {/*Temperature In*/}
        <Form.Item
            name={'temperatureIn'}
            label="Temperature In"
            rules={[
              {
                required: true
              },
            ]}
          >
          <Input />
        </Form.Item>

          {/*Congignee Number*/}
        <Form.Item
            name={'consigneeNumber'}
            label="Consignee Number"
            rules={[
              {
                required: true
              },
            ]}
          >
          <InputNumber />
        </Form.Item>

        {/*Congignee Name*/}
        <Form.Item
            name={'consigneeName'}
            label="Consignee Name"
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

export default withParamsAndNavigation(coldStorage);