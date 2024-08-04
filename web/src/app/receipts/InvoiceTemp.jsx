import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Message } from "react-iconly";
import '../App.css'

export default function InvoiceTemp(props){
    let date = new Date()
    return(
        <div className="p-3 bg-white sizes">
        <div>
            <h3 className="lh-1 bolder my-5 text-center">PAKWACH FM <br/>100.2 - mamuwa</h3>
            <div className="row">
                <div className="col-6">
                    <p className="lh-1">Plot 14, Fred Jachan Lane Wanglei B, <br/>Pakwach District, Uganda</p>
                </div>
                <div className="col-6">
                    <p><span className="bolder">Date:</span> {date.getDate()}/{date.getMonth()}/{date.getFullYear()}</p>
                    <p className="lh-1 mt-2">Service by: <span className="bolder lh-1">{props.username} <br/> {props.role}</span></p>
                </div>
            </div>

            {props.result.map(cat => (
            <div>
            <p className="bolder mt-3 mb-0">{cat.category}</p>
                <div className="row my-0 py-0 bolder">
                    <div className="col-1 my-0 d-none"><p>No.</p></div>
                    <div className="col-4 my-0"><p>Product</p></div>
                    <div className="col-3 my-0"><p>Unit</p></div>
                    <div className="col-2 my-0"><p>Qty.</p></div>
                    <div className="col-3 my-0"><p>Total</p></div>
                </div>
                {cat.data.map((datas, id) => (
                    <div className="row">
                    <div className="col-1 my-0 d-none"><p>{id}</p></div>
                    <div className="col-4"><p>{datas.name}</p></div>
                    <div className="col-3"><p>{datas.unit_amount}</p></div>
                    <div className="col-2"><p>{datas.quantity}</p></div>
                    <div className="col-3"><p>{props.multiple(datas.unit_amount, datas.quantity)}</p></div>
                </div>
                ))}
            </div>))}
                            <p className="text-center">{props.summation()}</p>
        </div>
        <p className="lh-1 text-center my-5">contact: 0776 994 301 <br/> <Message className="mx-1" size={15}/> pakwachfm@gmail.com</p>
        </div>
    )
}