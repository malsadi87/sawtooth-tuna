import React, {Component} from 'react';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import './batchShipment.css';
import { Form, Input, Button, InputNumber, DatePicker, Table, Tag, Space } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 4,
  }
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

const data = [
    {
    key: '1',
    name: 'Cod',
    weight: '2',
    }
]

class batchShipment extends Component {
    state = {
        productForm: {
           shipmentId: '',
           shipmentVid: '',
           batchesVids: '',
           temperature: '',
           weight: '',
           consignerId: '',
           date: ''
         }
    }

    onFinish = (values) => {
        console.log(values);
    };



    render() {
        return (
          <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>

            <Form.Item
                name={'shipmentId'}
                label="Shipment ID"
                rules={[
                  {
                    required: true
                  },
                ]}
              >
              <InputNumber />
            </Form.Item>

            <Form.Item
                name={'shipmentVid'}
                label="Shipment VID"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
              <InputNumber />
            </Form.Item>

             <Form.Item
                name={'batchesVids'}
                label="Batches VIDs"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
              <InputNumber />
            </Form.Item>

            <Form.Item
                name={'temperature'}
                label="Temperature"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
              <InputNumber />
            </Form.Item>

             <Form.Item
                name={'weight'}
                label="Weight"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
              <InputNumber />
            </Form.Item>

             <Form.Item
                name={'consignerId'}
                label="Consigner ID"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
              <InputNumber />
            </Form.Item>

              <Form.Item
                name={'date'}
                label="Date"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
              <DatePicker />
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


export default withParamsAndNavigation(batchShipment);
