import React, {useState} from "react"
import {CloseSquare} from 'react-iconly'
import Form from 'react-bootstrap/Form'
import axios from "axios";
import { fail, success, preloader } from "../api/RequestFunctions";
import { TOKEN, API_URL_ADD_PRODUCT } from "../api/Api";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table'
import InputGroup from 'react-bootstrap/InputGroup'

export default function TalkShows(props){
    const [formData, setFormData] = useState({
        name: '',
        unit_amount: 0,
        quantity: 0,
        total_amount: 0,
        cid: props.cid
    });
    const [newFormData, setNewFormData] = useState([]);
    const [rows, setRows] = useState([{
        name: '',
        unit_amount: 0,
        quantity: 0,
        total_amount: 0,
        cid: props.cid
    }])
    const addToSummary = () => {
        setNewFormData([...newFormData, formData]);
      };
    const handleTableChange = idx => e => {
        const name = e.target.id;
        const value = e.target.value;
        const rowss = [...rows];
        rowss[idx] = {
          [name]: value
        };
        setRows(
          rowss
        );
        setFormData({...formData, [name]:value})
    };
    const handleAddRow = () => {
      const item = [{
        name: '',
        unit_amount: 0,
        quantity: 0,
        total_amount: 0,
        cid: props.cid
      }];
      setRows([...rows, item]);
    };
    // const handleRemoveRow = () => {
    //   setRows(rows.slice(0, -1));
    // };
    const handleRemoveSpecificRow = (idx) => () => {
        const rowss = [...newFormData]
        rowss.splice(idx, 1)
        setNewFormData( rowss )
      }
    // const handleChange = (event) => {
    //     const name = event.target.id;
    //     const value = event.target.value;
    //     setFormData({...formData, [name]: value });
    // };
    const handleSubmit = (e) => {
        preloader()
        e.preventDefault();
        axios.post(`${API_URL_ADD_PRODUCT}`,newFormData,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${TOKEN}`
            }
        })
        .then(function(response){
            if(!response){
                fail("Unsuccessful")
            }
            else if(response){
                success("Products now in Cart", "/cart", "successful")
            }
        })
    }
    function multiple(a, b){
        let prod = 0
        prod = a*b
        return parseFloat(prod)
    }
    const summation = () => {
        let sum = newFormData.map(data=>multiple(data.unit_amount, data.quantity))
        if(sum.length > 0){
            let result = 0
            sum.forEach(element => {
                result = result + parseFloat(element)
            });
        return (
            <h6 className="bolder mt-5">Total: {result.toLocaleString()}</h6>
        )}
    }
    let count = 1
    return(
        <div>
                    <Form className="mb-4" id="form1" onSubmit={handleSubmit}>
                    <Table 
                    borderless={true}
                    >
                    <thead>
        <tr>
          <th>No.</th>
          <th>TalkShow Name</th>
          <th>Unit Value</th>
          <th>Number of times played (Frequency)</th>
          <th>Total Amount</th>
        </tr>
      </thead>
      <tbody>
      {rows.map((item, idx) => (
        <tr id="addr0" key={idx}>
          <td>{count}</td>
          <td>
          <Form.Group>
          <Form.Control type = "text"
                                    id = 'name'
                                    size="sm"
                                    required = "required"
                                    value={rows[idx].name}
                                    onChange={handleTableChange(idx)}
                                    placeholder = "Radio TalkShow" /> 
                                </Form.Group>
          </td>
          <td>
          <Form.Group>
          <InputGroup hasValidation size="sm">
            <InputGroup.Text id="inputGroupPrepend">UGX</InputGroup.Text>
            <Form.Control
              type="number"
              onChange={handleTableChange(idx)}
              placeholder="0.00"
              value={rows[idx].name}
              id="unit_amount"
              aria-describedby="inputGroupPrepend"
              required
            />
          </InputGroup>
        </Form.Group>
          </td>
          <td>
          <Form.Group>
          <Form.Control type = "number"
                                    id = 'quantity'
                                    size="sm"
                                    required = "required"
                                    value={rows[idx].name}
                                    onChange={handleTableChange(idx)}
                                    placeholder = "0" /> 
                                </Form.Group>
          </td>
          <td>
          <Form.Group>
          <InputGroup hasValidation size="sm">
            <InputGroup.Text id="inputGroupPrepend">UGX</InputGroup.Text>
            <Form.Control
              type="number"
              onChange={handleTableChange(idx)}
              placeholder="0.00"
              value = {multiple(formData.unit_amount, formData.quantity)}
              id="total_amount"
              disabled
              aria-describedby="inputGroupPrepend"
              required
            />
          </InputGroup>
        </Form.Group>
          </td>
        </tr>
    ))}
      </tbody>
                    </Table>
                    <div className="d-flex flex-row">
                    <Button variant="outline-dark" size="sm" onClick={handleAddRow} className="d-none">Add New Row</Button>
                    <Button variant="outline-dark" size="sm" onClick={addToSummary} className="mx-2">Move to Summary</Button></div>
                        <div className="mt-5">
                            <h6 className="bolder">Summary</h6>
                            <Table size="sm">
                                <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>TalkShow Name</th>
                                    <th>Unit Value</th>
                                    <th>Number of times played (Frequency)</th>
                                    <th>Total Amount</th>
                                    <th>Remove</th>
                                </tr>
                                </thead>
                                <tbody>
                                {newFormData.map((data,id)=>(
                                    <tr key={id}>
                                        <td>{id+1}</td>
                                        <td>{data.name}</td>
                                        <td>{data.unit_amount}</td>
                                        <td>{data.quantity}</td>
                                        <td>{multiple(data.unit_amount, data.quantity)}</td>
                                        <td><CloseSquare onClick={handleRemoveSpecificRow(id)}/></td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <div>{summation()}</div>
                            <Button variant="outline-dark" size="sm" className="mt-4" type="submit" id="successMessage">Add to Cart</Button>
                            <h6 id = "errorMessage" className = 'py-2 mt-3 rounded border border-danger text-center fade-in'
                    style = {
                    { display: 'none' }
                    }> hey </h6>
                <h6 id = "infoMessage"
                    className = 'py-2 mt-3 rounded warning-message text-center fade-in'
                    style = {
                    { display: 'none',
                        border: '1px solid black' }
                    }> hey </h6>
                        </div>
                    </Form>
                </div>
    )
}