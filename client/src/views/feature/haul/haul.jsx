import React, {Component} from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import { Form, Input, Button, InputNumber, DatePicker, TimePicker, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './haul.css';
import haulService from '../../../services/feature/haul/haul.service';
import moment from 'moment';


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 15,
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
            launchDateTime: '',
            haulDateTime: '',
            launchPosition: '',
            haulPosition: '',
            launchLatitude: '',
            launchLongitude: '',
            tripId: '',
            //productNum: '',
            //productId: '',
            //catchWeight: ''
            }
     }

     onFinish = async (values) => {
      console.log(values);
      const result = await haulService.createNew(values);
      console.log(result);
  };


    render() {
        return (
          <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>

            {/*Haul ID
            {/*<Form.Item
             name={'haulId'}
             label="Haul ID"
             rules={[
                  {
                    required: true
                  },
                ]}
                >
            <InputNumber />
         </Form.Item>*/}

            {/*Launch Date*/}
            <Form.Item
             name={'launchDateTime'}
             label="Launch Date Time"
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
             name={'haulDateTime'}
             label="Haul Date Time"
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

         {/*Trip ID*/}
            <Form.Item
             name={'tripNo'}
             label="Trip ID"
             rules={[
                  {
                    required: true
                  },
                ]}
                >
            <InputNumber />
         </Form.Item>
            {/*
            <Form.List name="catch">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline" style={{ width:700 }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'productNum']}
                      rules={[{ required: true, message: 'Missing product number' }]}
                    >
                      <Input placeholder="Product Number" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'productId']}
                      rules={[{ required: true, message: 'Missing product ID' }]}
                    >
                      <Input placeholder="Product ID" />
                    </Form.Item>

                     <Form.Item
                      {...restField}
                      name={[name, 'catchWeight']}
                      rules={[{ required: true, message: 'Missing catch weight ' }]}
                    >
                      <Input placeholder="Catch Weight" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Catch
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          */}

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