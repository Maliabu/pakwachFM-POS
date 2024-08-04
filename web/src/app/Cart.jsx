import React, {useState, useEffect, useRef} from "react"
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table'
import NavBar from "./NavBar";
import '../App.css'
import { UserRequests, GetCartProducts } from "./api/MainRequests";
import { Link } from "react-router-dom";
import InvoiceTemp from "./receipts/InvoiceTemp";
import InvoiceTemp1 from "./receipts/InvoiceTemp1";
import Modal from 'react-bootstrap/Modal'
import jsPDF from 'jspdf'
import axios from "axios";
import { TOKEN, API_URL_PRINT_RECEIPT, API_URL_DELETE_PRODUCT } from "./api/Api";
import { fail, success2, success, preloaderCartDelete } from "./api/RequestFunctions";

export default function Cart(){
  const invoiceTempRef = useRef(null)
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [username, setusername] = useState("")
  const [role, setRole] = useState("")
  const [cart, setCart] = useState([])
  const [preloadName, setPreloadName] = useState("")
  const [profilePicture, setProfilePicture] = useState()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  useEffect(() => {
        UserRequests().then(res =>{
            setusername(res.first_name + " " + res.last_name)
            setRole(res.profile.role)
            setProfilePicture(res.profile.profile_picture)
        })
        GetCartProducts().then(res => {
          const status = "available"
          localStorage.setItem('status', status)
          setCart(res)
        })
  },[])
  const handleGeneratePDF = () =>{
    const receipt = new jsPDF({
      format: [320, 1000],
      unit: 'px',
    });
    receipt.setFontSize({
      size: 5
    })
    receipt.html(invoiceTempRef.current, {
      async callback(receipt){
        await receipt.save('receipt');
      }
    })
  }
  const handleGenerateInvoice = () =>{
    const receipt = new jsPDF({
      format: 'a4',
      unit: 'px',
    });
    receipt.setFontSize({
      size: 5
    })
    receipt.html(invoiceTempRef.current, {
      async callback(receipt){
        await receipt.save('receipt');
      }
    })
  }
  const handleSavePDF = () =>{
    axios.get(`${API_URL_PRINT_RECEIPT}`,{ // post
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Token ${TOKEN}`
      }
    })
    .then(function(response){
      if(!response){
          fail("Unsuccessful")
      }
      else if(response){
        success("Receipt done", "/receipts", "successful")
      }
    })
  }
  const deleteProduct = (id, name) =>{
    setPreloadName(name)
    axios.post(`${API_URL_DELETE_PRODUCT}`, id, { // post
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${TOKEN}`
      }
    })
    .then(function(response){
      if(response){
        preloaderCartDelete(preloadName)
        success2("/cart")
      }
    })
  }
    function multiple(a, b){
        let prod = 0
        prod = a*b
        return parseFloat(prod)
    }
    const summation = () => {
      let sum = cart.map(data=>multiple(data.unit_amount, data.quantity))
      if(sum.length > 0){
          let result = 0
          sum.forEach(element => {
              result = result + parseFloat(element)
          });
      return (
          <h6 className="bolder mt-5">Total: UGX {result.toLocaleString()}</h6>
      )}
    }
    const groupArrayObject = cart.reduce((group, obj) => {
      const { name, quantity, unit_amount, total_amount, category, id } = obj;
      if (!group[category]) {
          group[category] = {
              category: category,
              data: []
          };
      }
      group[category].data.push({name, quantity, unit_amount, total_amount, id});
      return group;
  }, {});
  const result = Object.values(groupArrayObject);
  const buton = () => {
    if (cart.length > 0){
      return(
        <Button size="sm" variant="outline-dark" className="mt-5" id="successMessage" onClick={handleSavePDF}>Generate Receipt</Button>
      )
    } else{
      return null
    }
  }
    return(
        <div className="">
        <NavBar username={username} cart={cart} profile_picture={profilePicture}/>
        <div className="d-flex flex-row px-lg-5 px-3 mt-3">
        <h2 className="">Cart</h2>
        <div className="d-flex felx-row justify-content-end mx-lg-5 mx-3">
            <Link to="/inflow"><Button variant="outline-dark" size="sm">Inflow Cash</Button></Link>
            <Link to="/outflow"><Button variant="outline-dark" size="sm" className="mx-2">Outflow Cash</Button></Link></div>
            </div>
            <h6 id = "deleteMessage" className = 'p-2 mx-5 text-end rounded text-dark fade-in'
                    style = {
                    { display: 'none' }
                    }> Delete Alert </h6>
                    <Form className="m-5" id="form1">
                    {result.map(cat => (
                      <div>
                      <div className="bolder">{cat.category}</div>
                      <div>
                    <Table size="sm" striped borderless>
                                <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Item</th>
                                    <th>Unit Value</th>
                                    <th>Number of times played (Frequency)</th>
                                    <th>Total Amount</th>
                                </tr>
                                </thead>
                                {cat.data.map((datas, id) => (
                                <tbody>
                                    <tr key={id}>
                                        <td>{id+1}</td>
                                        <td>{datas.name}</td>
                                        <td>{datas.unit_amount}</td>
                                        <td>{datas.quantity}</td>
                                        <td>{multiple(datas.unit_amount, datas.quantity)}</td>
                                        <td><td><Button size="sm" variant="no-outline" onClick={() => deleteProduct(datas.id, datas.name)}>X</Button></td></td>
                                    </tr>
                                </tbody>
                              ))}
                            </Table></div></div>
                    ))}
                            <div>{summation()}</div>
                    <div className="d-flex flex-row">
                            <Button variant="outline-dark" size="sm" className="mt-4" onClick={handleShow}>Receipt</Button>
                            <Button variant="outline-dark" size="sm" className="mt-4 mx-2" onClick={handleShow1}>Invoice</Button>
                        </div>
                    </Form>
                    <Modal show = { show }
            onHide = { handleClose } ><div className="row">
            <div className="col-8" ref={invoiceTempRef}>
            <InvoiceTemp result = {result} summation={summation} multiple={multiple} username={username} role={role}/> </div>
            <div className="col-4">
            {buton()}
            <Button size="sm" variant="outline-dark" className="my-2 d-none" onClick={handleGeneratePDF}>Download</Button>
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
            </div>
            </Modal ><Modal show = { show1 }
            onHide = { handleClose1 } ><div className="row">
            <div className="col-8" ref={invoiceTempRef}>
            <InvoiceTemp1 result = {result} summation={summation} multiple={multiple} username={username} role={role}/> </div>
            <div className="col-4">
            {buton()}
            <Button size="sm" variant="outline-dark" className="my-2 d-none" onClick={handleGenerateInvoice}>Send Email</Button>
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
            </div>
            </Modal >
                </div>
    )
}