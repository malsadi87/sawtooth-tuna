import React, {Component} from 'react';
import { Form, Input, Button, InputNumber, DatePicker } from 'antd';
import { withParamsAndNavigation } from '../../../utility/routerHelper';
import { RouteUrl } from '../../../constants/routeUrls';
import './trip.css';
import tripService from '../../../services/feature/trip/trip.service';


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
            departurePort: '',
            landingPort: '',
            longText: ''
            },
        trips: null
     }

    onFinish = async (values) => {
        console.log(values);
        const result = await tripService.createNew(values);
        console.log(result);
    };

    getAllTrip = async () => {
      const result = await tripService.getAll();
      console.log(result)
      this.setState({trips: result.map((info)=>{
        return(
          <tr key={info.tripNo}>
            <td>{info.tripNo}</td>
            <td>{info.departureDate}</td>
            <td>{info.landingDate}</td>
            <td>{info.supplierName}</td>
            <td>{info.supplierNumber}</td>
            <td>{info.tripYearNo}</td>
            <td>{info.vesselName}</td>
            <td>{info.landingPort}</td>
            <td>{info.longText}</td>
          </tr>
        )
      })})
    }

    render() {
        return (
          <div>
          <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>

          <Form.Item
            name={'tripNo'}
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
             name={'departureDate'}
             label="Departure date"
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
             label="Landing date"
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
            name={'departurePort'}
            label="Departure Port"
            rules={[
              {
                required: true
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
            <Button className='ms-3' type="primary" onClick={this.getAllTrip}>Get All Trip</Button>
          </Form.Item>
        </Form>
        
          {this.state.trips ? 
          <table style={{margin: 'auto'}}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Departure date</th>
                <th>Landing date</th>
                <th>Supplier Name</th>
                <th>Supplier Number</th>
                <th>Vessel Name</th>
                <th>Departure Port</th>
                <th>Landing Port</th>
                <th>Long Text</th>
              </tr>
            </thead>
            <tbody>
              {this.state.trips}
            </tbody>
          </table> : ''}
        </div>
        )
    };
}






export default withParamsAndNavigation(Trip);