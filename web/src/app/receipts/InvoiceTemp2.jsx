import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Message } from "react-iconly";
import '../App.css'

export default function InvoiceTemp(props){
    let receipt = []
    receipt.push(props.result)
    function multiple(a, b){
        let prod = 0
        prod = a*b
        return prod
    }
    const summation = () => {
        let sum = receipt.map(data=>data.cart.map(data=>multiple(data.unit_amount, data.quantity)))
        if(sum.length > 0){
            let result = 0
            sum.forEach(item => {
                item.forEach(element => result += element)
            })
            return (
                <h6 className="bolder small text-center">Total: UGX {result.toLocaleString()}</h6>
            )
        }
    }
    let date = new Date()
    var rid = receipt.map(id=>id.id)
    return(
        <div className="p-3 bg-white sizes">
        <div>
        <h6 className="receipt-no text-end">N0. {props.prepend(rid[0])}{rid}</h6>
            <h4 className="lh-1 bolder my-5 text-center">PAKWACH FM <br/>100.2 - mamuwa</h4>
            <div className="row">
                <div className="col-6">
                    <p className="lh-1">Plot 14, Fred Jachan Lane Wanglei B, <br/>Pakwach District, Uganda</p>
                </div>
                <div className="col-6">
                    <p><span className="bolder">Date:</span> {date.getDate()}/{date.getMonth()}/{date.getFullYear()}</p>
                    <p className="lh-1 mt-2">Service by: <span className="bolder lh-1">{receipt.map(user=>user.user)} <br/> {receipt.map(role=>role.role)}</span></p>
                </div>
            </div>

            {receipt.map(cat => (
            <div className="my-5">
                <div className="row my-0 py-0 bolder">
                    <div className="col-1 my-0 d-none"><p>No.</p></div>
                    <div className="col-4 my-0"><p>Product</p></div>
                    <div className="col-3 my-0"><p>Unit</p></div>
                    <div className="col-2 my-0"><p>Qty.</p></div>
                    <div className="col-3 my-0"><p>Total</p></div>
                </div>
                {cat.cart.map((datas, id) => (
                    <div className="row">
                    <div className="col-1 my-0 d-none"><p>{id}</p></div>
                    <div className="col-4"><p>{datas.name}</p></div>
                    <div className="col-3"><p>{datas.unit_amount}</p></div>
                    <div className="col-2"><p>{datas.quantity}</p></div>
                    <div className="col-3"><p>{multiple(datas.unit_amount, datas.quantity)}</p></div>
                </div>
                ))}
            </div>))}

            <div>{summation()}</div>
        </div>
        <p className="lh-1 text-center my-5">contact: 0776 994 301 <br/> <Message className="mx-1" size={15}/> pakwachfm@gmail.com</p>
        </div>
    )
}