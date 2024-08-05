import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NonAdminRequests, AdminUserRequests, GetTotalSales, GetProductCategories, GetAllReceipts } from "./api/MainRequests";
import Badge from "react-bootstrap/Badge";
import Chart from 'react-apexcharts'

export default function Statistics(){
    const [adminStaff, setAdminStaff] = useState([]);
    const [nonAdminStaff, setNonAdminStaff] = useState([]);
    const [product, setProducts] = useState([])
    const [sales, setSales] = useState([])
    const [receipts, setReceipts] = useState([])
    useEffect(() => {
        AdminUserRequests().then(res =>{
            setAdminStaff(res)
        })
        NonAdminRequests().then(res =>{
            setNonAdminStaff(res)
        })
        GetProductCategories().then(res =>{
            setProducts(res)
        })
        GetTotalSales().then(res => {
            setSales(res)
        })
        GetAllReceipts().then(res =>{
            setReceipts(res)
        })
    },[])
    const groupedData = sales?.reduce((result, entry) => {
        const { year, month, total_amount } = entry;
        const existingYear = result.find(item => item.name === year);
        let sum = 0
    
        if (existingYear) {
            const existingMonth = existingYear.data.find(item => item.x === month);
            if (existingMonth) {
                existingMonth.y.push(Number(total_amount));
            } else {
                existingYear.data.push({
                    x:month,
                    y: [Number(total_amount)]
                });
            }
        } else {
            result.push({
                name:year,
                data: [{
                    x:month,
                    y: [Number(total_amount)]
                }],
                total:sum
            });
        }
        return result;
    }, []);
    
    groupedData?.forEach(yearData => {
        yearData.data.forEach(monthData => {
            monthData.y = monthData.y.reduce((total, value) => total + value, 0);
        });
    });
    let total = 0
    groupedData?.forEach(yearData => {
    yearData.total = yearData.data.reduce((total, monthData) => total + monthData.y, 0);
    total += yearData.total
    });
    const result = groupedData !== undefined? Object.values(groupedData) : [];
    const totalSales = {
        options: {
            chart: {
                id: 'apexchart-example'
            },
            xaxis: {
                name: '2023',
                title: {
                    text: 'Sales per year'
                },
                categories: result.map(d=>d.data[0].x),
                // categories: ['jun', 'jul', 'aug'],
            },
            yaxis: {
                title: {
                    text: 'Total Sales in UGX'
                }
            },
            colors: ['#b22222', '#F26425', '#000', '#E91E63', '#252859', '#b7b7b7'],

        },
        series: groupedData,
        stroke: {
            curve: 'smooth',
        }
    }
    return(
        <div className="row">
        <div className="col-lg-8 px-3">
        <h1 className="m-3">Cash Flow Statistics</h1>
        <div className="d-none d-m-0 d-lg-block">
            <Chart options = { totalSales.options }
        series = { totalSales.series }
        className = "w-100 my-5"
        type = "area"
        height = { 280 }/></div>
        <div className="d-sm-block d-md-none d-lg-none">
        <Chart options = { totalSales.options }
        series = { totalSales.series }
        className = "w-100 my-5"
        type = "area"
        height = { 180 }/>
        </div>
        <div className="row p-3">
            <div className="col-4">
                <h4 className="bolder">Staff</h4>
                <div className="row">
                    <div className="">
                    <div className=" rounded-4">
                    <Badge bg="dark" text="light">Non Admin Staff</Badge>
                    <span className="mx-3">
                    {nonAdminStaff.length}</span>
                    </div></div>
                <div className="">
                    <div className=" rounded-4">
                    <Badge bg="dark" text="light">Admin Staff</Badge><span className="mx-3">
                    {adminStaff.length}</span>
                    </div></div>
            </div>
            </div>
            <div className="col-4">
            <h4 className="bolder">Products</h4>
            <div className="row">
                <div className="">
                <div className=" rounded-4">
                    <Badge bg="dark" text="light">Total Products</Badge><span className="mx-3">
                    {product.length}</span>
                </div></div>
            </div>
            </div>
            <div className="col-4">
            <h4 className="bolder">Accounts</h4>
            <div className="row">
                <div className="">
                <div className=" rounded-4">
                    <Badge bg="dark" text="light">Reports</Badge><span className="mx-3">
                    0</span>
                </div></div>
                <div className="">
                <div className=" rounded-4">
                    <Badge bg="dark" text="light">Receipts</Badge><span className="mx-3">
                    {receipts.length}</span>
                </div></div>
            </div>
            </div></div>
        </div>
        <div className="col-lg-4 p-5 shadow rounded-3">
            <h4 className=" bolder lh-1">Cash Flow Per Year (Sales)<br/>Summary</h4>
            <div className="row">
            <div className="col-3">
            <h6 className="small">Year</h6></div>
            <div className="col-4">
            <h6 className="small">Cash Flow(UGX)</h6></div>
            <div className="col-5">
            <h6 className="small">Total Sales(UGX)</h6></div>
            </div>
            {
                result.map((year, id) => (
                    <div className="row p-2 active mt-1 rounded-2" key={id}>
                        <div className="col-3"><h6 className="small">{year.name}</h6></div>
                        <div className="col-4"><h6 className="small">{(year.total).toLocaleString()}</h6></div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}