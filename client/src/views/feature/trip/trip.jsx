import React, {Component} from 'react';
import { Form, Input, Button, InputNumber, DatePicker } from 'antd';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import './trip.css';



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
        tripForm: {
            tripId: '',
            departureDate: '',
            landingDate: '',
            supplierName: '',
            supplierNumber: '',
            tripNumber: '',
            tripYearNo: '',
            vesselName: '',
            landingPort: '',
            longText: ''
            }
     }

    onFinish = (values) => {
        console.log(values);
    };


    render() {
        return (
          <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>
            <Form.Item
                name={'tripId'}
                label="Trip ID"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
              <Input />
            </Form.Item>

             <Form.Item
             name={'departureDate'}
             label="Date"
             rules={[
                  {
                    required: true
                  },
                ]}
                >
            <DatePicker />
         </Form.Item>

          <Form.Item
             name={'landingDate'}
             label="Landing Date"
             rules={[
                  {
                    required: true
                  },
                ]}
                >
            <DatePicker />
         </Form.Item>

         <Form.Item
            name={'supplierName'}
            label="Supplier Name"
            rules={[
                {
                    required: false,
                    type: 'name'
                },
               ]}
             >
           <Input />
          </Form.Item>


         <Form.Item
            name={'supplierNumber'}
            label="Supplier Number"
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
            name={'tripNumber'}
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
                name={'longText'}
                label="Long Text"
                rules={[
                  {
                    required: false
                  },
                ]}
               >
               <Input.TextArea />
            </Form.Item>


          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        )
    };
}






export default withParamsAndNavigation(Trip);