import React, {Component, useState} from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import './catchPackage.css';
import { Form, Input, Button, InputNumber, DatePicker } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import catchPackageService from '../../../services/feature/catchPackage/catchPackage.service';
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

class CatchPackage extends Component {
    state = {
      catchPackages: null
    }

    onFinish = async (values) => {
      console.log(values)
      const result = await catchPackageService.createNew(values);
      console.log(result);
  };

    getAllPallet = async () => {
      const result = await catchPackageService.getAll();
      console.log(result)
      this.setState({catchPackages: result.map((info)=>{
        return(
          <tr key={info.catchPackageId}>
            <td>{info.catchPackageId}</td>
            <td>{info.packingDate}</td>
            <td>{info.palletNum}</td>
          </tr>
        )
      })})
    }
  
    render() {
        return (
          <div>
          <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>

          <Form.Item
            name={'catchPackageId'}
            label="CatchPackageId"
            rules={[
              {
                required: true,
                type: 'string',
              },
            ]}
          >
            <Input />
          </Form.Item>

        {/*Date*/}
        <Form.Item
             name={'packingDate'}
             label="Packing Date Time"
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

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button className='ms-3' type="primary" onClick={this.getAllPallet}>Get All Packages</Button>

          </Form.Item>
        </Form>
        {this.state.catchPackages ? 
          <table style={{margin: 'auto'}}>
            <thead>
              <tr>
                <th>Package ID</th>
                <th>Packing Date</th>
                <th>Pallet Number</th>
              </tr>
            </thead>
            <tbody>
              {this.state.catchPackages}
            </tbody>
          </table> : ''}
        </div>
        )
    };
}

export default withParamsAndNavigation(CatchPackage);

//export default () => <FormLayoutDemo />;
