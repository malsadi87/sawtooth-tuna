import React, {Component, useState} from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import './pallet.css';
import { Form, Input, Button, InputNumber, DatePicker } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import palletService from '../../../services/feature/pallet/pallet.service';


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

class Pallet extends Component {
    state = {
        palletForm: {
            palletID: '',
            palletVID: '',
            productID: '',
            date: '',
            palletNum: '',
            productNum: '',
            weight: '',
            temperatureIn: ''
         },
      pallets: null
    }

    onFinish = async (values) => {
      console.log(values)
      const result = await palletService.createNew(values);
      console.log(result);
  };

    getAllPallet = async () => {
      const result = await palletService.getAll();
      console.log(result)
      this.setState({pallets: result.map((info)=>{
        return(
          <tr key={info.palletNum}>
            <td>{info.palletNum}</td>
            <td>{info.productNum}</td>
            <td>{info.supplierId}</td>
            <td>{info.palletWeight}</td>
            <td>{info.tripNo}</td>
          </tr>
        )
      })})
    }
  
    render() {
        return (
          <div>
          <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>

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

            <Form.Item
            name={'productNum'}
            label="Product Number"
            rules={[
              {
                required: true,
                type: 'number',
                min: 0
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

        <Form.Item
        name={'supplierId'}
        label="Supplier Id"
        rules={[
          {
            required: true,
            type: 'string',
          },
        ]}
      >
        <Input />
      </Form.Item>

        <Form.Item
        name={'palletWeight'}
        label="Weight"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
            max: 99999.9999
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        name={'tripNo'}
        label="Trip Id"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button className='ms-3' type="primary" onClick={this.getAllPallet}>Get All Pallet</Button>

          </Form.Item>
        </Form>
        {this.state.pallets ? 
          <table style={{margin: 'auto'}}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product ID</th>
                <th>Supplier ID</th>
                <th>Weight</th>
                <th>Trip ID</th>
              </tr>
            </thead>
            <tbody>
              {this.state.pallets}
            </tbody>
          </table> : ''}
        </div>
        )
    };
}

export default withParamsAndNavigation(Pallet);

//export default () => <FormLayoutDemo />;
