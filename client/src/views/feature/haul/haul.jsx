import React, {Component} from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import { Form, Input, Button, InputNumber, DatePicker, TimePicker, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './haul.css';


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
            launchDate: '',
            launchTime: '',
            launchPosition: '',
            launchLatitude: '',
            launchLongitude: '',
            tripId: '',
            productNumber: '',
            productId: '',
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

            <Form.List name="catch">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline" style={{ width:700 }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'productNumber']}
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