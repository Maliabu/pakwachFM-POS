import React, {useState, useEffect, useRef} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetAllReceipts } from "../api/MainRequests";
import Badge from "react-bootstrap/esm/Badge";
import InvoiceTemp from "./InvoiceTemp2";
import jsPDF from "jspdf";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function Invoices(props){
    const invoiceTempRef = useRef(null)
    const [receipts, setReceipts] = useState([])
    const [rct, setRct] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        GetAllReceipts().then(res => {
            setReceipts(res)
        })
    },[])
    function display(receiptt){
        setRct(receiptt)
        handleShow()
    }
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
    const prepend = (id) => {
        var string = String(id)
        if(string.length > 1){
        return "0".repeat(string.length - 1)}
        else{
            return "0".repeat(2)
        }
    }
    return(
        <div>
        <div className="mx-2">
        <div className="row mt-2 border-bottom border-1 border-dark">
                        <div className="col-1"><h6 className="bolder">R/No.</h6></div>
                        <div className="col-2"><h6 className="bolder">Department</h6></div>
                        <div className="col-3"><h6 className="bolder">Role</h6></div>
                        <div className="col-2"><h6 className="bolder">Staff</h6></div>
                        <div className="col-2"><h6 className="bolder">Receipt/PDF</h6></div>
                        <div className="col-2"><h6 className="bolder">Date created</h6></div>
                    </div>
                    <div className="scroll-y mt-2">
            {
                receipts.map((receipt, id) => (
                    <div className="row mt-1" key={id}>
                        <div className="col-1"><h6 className="receipt-no">{prepend(receipt.id)}{receipt.id}</h6></div>
                        <div className="col-2"><h6 className="small">{receipt.department}</h6></div>
                        <div className="col-3"><h6 className="small">{receipt.role}</h6></div>
                        <div className="col-2"><h6 className="small lh-1">{receipt.user}</h6></div>
                        <div className="col-2"><img src={props.pdf} alt="receipt-pdf" width={30} height={30} onClick={() => display(receipt)}/></div>
                        <div className="col-2"><h6 className="small">{receipt.created}</h6></div>
                    </div>
                ))
            }
        </div><Modal show = { show }
            onHide = { handleClose } >
            <div className="row">
            <div className="col-9" ref={invoiceTempRef}>
            <InvoiceTemp result = {rct} prepend={prepend}/> </div>
            <div className="col-3">
            <Button size="sm" variant="outline-dark" className="my-2" onClick={handleGeneratePDF}>Download</Button>
            <h6 id = "errorMessage" className = 'py-2 mt-3 rounded border border-danger text-center fade-in'
                    style = {
                    { display: 'none' }
                    }> hey </h6>
                <h6 id = "infoMessage"
                    className = 'py-2 mt-3 rounded warning-message text-center fade-in'
                    style = {
                    { display: 'none',
                        border: '1px solid black' }
                    }> hey </h6></div></div>
            </Modal></div>
            <h6 className="small">Total Number of Receipts
            <Badge bg="dark" className="mx-3">{receipts.length}</Badge></h6>
        </div>
    )
}