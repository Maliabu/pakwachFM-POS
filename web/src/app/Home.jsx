import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import { UserRequests } from "./api/MainRequests";
import Pos from '../images/login.jpeg'
import Button from "react-bootstrap/esm/Button";
import Login from "./Login1";
import Statistics from "./Statistics";
import { TOKEN } from "./api/Api";
import { Heart, Heart2, Paper, PaperDownload, People } from "react-iconly";

export default function Home(){
    const [username, setusername] = useState("")
    useEffect(() => {
        UserRequests().then(res =>{
            setusername(res.first_name)
        })
    },[])
    const checkUser = () => {
        let user = ""
        let todo = ""
        if(username === undefined){
            user = "Guest"
            todo = "Please login"
        }else {
            user = username
            todo = "Lets Get Started"
        }
        return [user, todo]
    }
    const checkToShow = () => {
        if(TOKEN === null){
            return (<Login/>)
        } else {
            return (
                <div>
                <div className=" d-none d-d-md-block d-lg-block">
                <div className="row g-2">
                    <div className="col-4">
                    <Link to="/inflow"><Button variant="outline-dark" className="w-100"><Heart size={50} set="broken" className="p-2 rounded"/><br/> INFLOW </Button></Link>
                    </div>
                    <div className="col-4">
                    <Link to="/outflow"><Button variant="outline-dark" className="w-100"><Heart2 size={50} set="broken" className="p-2 rounded"/><br/>OUTFLOW</Button></Link>
                    </div>
                    <div className="col-4">
                    <Link to="/staff"><Button variant="outline-dark" className="w-100"><People size={50} set="broken" className="p-2 rounded"/><br/>STAFF</Button></Link>
                    </div>
                </div>
                <div className="row mt-2 g-2">
                    <div className="col-4">
                    <Link to="/reports"><Button variant="outline-dark" className="w-100"><Paper size={50} set="broken" className="p-2 rounded"/><br/> REPORTS </Button></Link>
                    </div>
                    <div className="col-4">
                    <Link to="/receipts"><Button variant="outline-dark" className="w-100"><PaperDownload size={50} set="broken" className="p-2 rounded"/><br/>RECEIPTS</Button></Link>
                    </div>
                </div>
                <div className="d-flex flex-row mt-3">
                <Button variant="danger" size="sm"><h6 className="small my-1">Report Templates</h6></Button>
                <Button variant="danger" size="sm" className="mx-3"><h6 className="small my-1">Invoice/Receipt Templates</h6></Button></div>
                </div>
                <div className="d-sm-block d-md-none d-lg-none">
                <div className="row g-2 mt-4 justify-content-center">
                    <div className="col-3">
                    <Link to="/inflow"><Button variant="outline-dark" className="w-100"><Heart size={35} set="broken" className="p-2 rounded"/><br/> <h6 className="small">INFLOW</h6></Button></Link>
                    </div>
                    <div className="col-4">
                    <Link to="/outflow"><Button variant="outline-dark" className="w-100"><Heart2 size={35} set="broken" className="p-2 rounded"/><br/> <h6 className="small">OUTFLOW</h6></Button></Link>
                    </div>
                    <div className="col-3">
                    <Link to="/staff"><Button variant="outline-dark" className="w-100"><People size={35} set="broken" className="p-2 rounded"/><br/> <h6 className="small">STAFF</h6></Button></Link>
                    </div>
                </div>
                <div className="row mt-1 mb-5 g-2 justify-content-center">
                    <div className="col-4">
                    <Link to="/reports"><Button variant="outline-dark" className="w-100"><Paper size={35} set="broken" className="p-2 rounded"/><br/> REPORTS </Button></Link>
                    </div>
                    <div className="col-4">
                    <Link to="/receipts"><Button variant="outline-dark" className="w-100"><PaperDownload size={35} set="broken" className="p-2 rounded"/><br/>RECEIPTS</Button></Link>
                    </div>
                </div>
                <div className="d-flex flex-row mt-3 justify-content-center">
                <Button variant="danger" size="sm"><h6 className="small my-1">Report Templates</h6></Button>
                <Button variant="danger" size="sm" className="mx-3"><h6 className="small my-1">Invoice/Receipt Templates</h6></Button></div>
                </div>
                </div>
            )
        }
    }
    function logged(){
        if(TOKEN === null){
            return null
        } else {
            return (
                <Statistics/>
            )
        }
    }
    return(
        <div>
        <div><NavBar/></div>
        <div className=" d-none d-md-block d-lg-block">
        <div className="row p-5 login-1">
            <div className="col-lg-5 rounded-3">
        <div className="p-3 mt-sm-5">
            <h1 className="lh-1 text-center">{checkUser()[0]}, Welcome to the Dashboard<br/></h1>
            <div className="my-lg-5 mt-5">{checkToShow()}</div></div>
                </div>
                <div className="col-lg-7">
        <div className="d-none">
            <img src={Pos} width="100%" height="100%" alt="pos" className="rounded-4"/>
        </div>
                </div>
            </div>
        <div className="row p-5 ">
                <div className="col-12">
                    {logged()}
                </div>
            </div>
            <div className="row p-5 home1">
            <p className="mt-5 lh-1 text-center text-light-emphasis">All Rights Reserved <br/>
            pos@pakwachFM. pakwachfm@gmail.com.</p>
            </div>
            </div>
            <div className="scroll-sm py-5 d-sm-block d-md-none d-lg-none">
            <div className=" pb-3">
                <h1 className="lh-1 pt-5 mt-5 px-3 text-center">{checkUser()[0]}, Welcome to the Dashboard<br/></h1>
                <div className="m-3">{checkToShow()}</div></div>
                <div className="home">
                    <img src={Pos} width="100%" height="100%" alt="pos"/>
                </div>
                <div className="py-3">
                    {logged()}
                </div>
            <div className="row p-5">
            <p className="mt-5 lh-1 text-center text-light-emphasis">All Rights Reserved <br/>
            pos@pakwachFM. pakwachfm@gmail.com.</p>
            </div>
            </div>
        </div>
    )
}