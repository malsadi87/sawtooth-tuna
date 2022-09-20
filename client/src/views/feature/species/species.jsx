import React, {Component, useState} from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import './species.css';
import { Form, Input, Button, InputNumber, DatePicker } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import speciesService from '../../../services/feature/species/species.service';
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

class Species extends Component {
    state = {
      species: null
    }

    onFinish = async (values) => {
      console.log(values)
      const result = await speciesService.createNew(values);
      console.log(result);
  };

    getAllPallet = async () => {
      const result = await speciesService.getAll();
      console.log(result)
      this.setState({species: result.map((info)=>{
        return(
          <tr key={info.speciesId}>
            <td>{info.speciesId}</td>
            <td>{info.quantity}</td>
            <td>{info.species}</td>
            <td>{info.catchPackageId}</td>
            <td>{info.launchDateTime}</td>
          </tr>
        )
      })})
    }
  
    render() {
        return (
          <div>
          <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>

          {/*Quantity*/}
          <Form.Item
            name={'quantity'}
            label="Quantity"
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

          {/*Species*/}
          <Form.Item
            name={'species'}
            label="Species"
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

          {/*CatchPackageId*/}
          <Form.Item
            name={'catchPackageId'}
            label="Catch Package ID"
            rules={[
              {
                required: true,
                type: 'string',
              },
            ]}
          >
            <Input />
          </Form.Item>

        {/*LaunchDateTime*/}
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

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button className='ms-3' type="primary" onClick={this.getAllPallet}>Get All Species</Button>

          </Form.Item>
        </Form>
        {this.state.species ? 
          <table style={{margin: 'auto'}}>
            <thead>
              <tr>
                <th>Species ID</th>
                <th>Quanntity</th>
                <th>Species</th>
                <th>Catch Package ID</th>
                <th>Launch Date Time</th>
              </tr>
            </thead>
            <tbody>
              {this.state.species}
            </tbody>
          </table> : ''}
        </div>
        )
    };
}

export default withParamsAndNavigation(Species);

//export default () => <FormLayoutDemo />;
