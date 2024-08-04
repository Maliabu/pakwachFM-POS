import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Buy, Category, Home, MoreSquare, User} from 'react-iconly'
import { Link } from "react-router-dom";
import './App.css'
import Badge from 'react-bootstrap/Badge'
import Button from "react-bootstrap/Button";
import { GetCartProducts, UserRequests } from "./api/MainRequests";
import Logo from '../images/logo-pakwach-fm.png'

export default function NavBar(props){
    const [username, setusername] = useState()
    const [role, setRole] = useState()
    const [profilePicture, setProfilePicture] = useState()
    const [cart, setCart] = useState([])
    useEffect(() => {
        GetCartProducts().then(res => {
          const status = "available"
          localStorage.setItem('status', status)
          setCart(res)
        })
        UserRequests().then(res =>{
            if(!res.detail){
            setusername(res.first_name+" "+res.last_name)
            setRole(res.profile.role)
            setProfilePicture(res.profile.profile_picture)
            }
        })
    },[])
    function status(){
      let theStatus = localStorage.getItem('status')
      if(username === undefined){
        return null}
        else{
        if(theStatus === "available"){
            return cart.length
        } else {
            return 0
        }}
    }
    const checkUser = () => {
        let user = ""
        let todo = ""
        let roles = "Pakwach FM"
        if(username === undefined){
            user = "Guest"
            todo = "Please login"
        }else {
            user = username
            todo = "Lets Get Started"
            roles = role
        }
        return [user, todo, roles]
    }
    function logInOut(){
        if(username === undefined){
            return(
            <div className="d-flex flex-row justify-content-end">
            <Link to="/" className="d-none"><Home size={20} className="mx-3 d-none"/><p className="small my-2 mx-3 text-white">Home</p></Link>
            <Link to="/login" className="mx-3"><Button variant="danger" size="sm"><h6 className="small my-1">Sign In</h6></Button></Link>
            <Button className="d-none" size="sm">Sign Up</Button>
            </div>
            )
        } else{
            return(
            <div className="d-flex flex-row justify-content-center">
            <div className="d-flex flex-row mx-4">
            <h6 className="small mx-2">{profilePic()}</h6><h6 className="mt-2 lh-1 small d-none">{checkUser()[0]}<br/>{checkUser()[2]}<br/></h6></div>
            <Link to="/logout" className="mt-2"><Button variant="danger" size="sm"><h6 className="small my-1">Logout</h6></Button></Link>
            </div>
            )
        }
    }
    function moreOptions(){
        if(username === undefined){
            return null
        } else{
            return(
                <div className="row m-2">
                <div className="col-2">
                <Link to="/reports"><h6 className="small">Reports</h6></Link></div>
                <div className="col-2">
                <Link to="/receipts"><h6 className="small">Receipts</h6></Link></div>
                <div className="col-2">
                <Link to="/staff"><h6 className="small">Staff & Payroll</h6></Link></div>
                <div className="col-2">
                <Link to="/inflow"><h6 className="small">Inflow</h6></Link></div>
                <div className="col-2">
                <Link to="/outflow"><h6 className="small">outflow</h6></Link></div>
                </div>
            )
        }
    }
    function profilePic(){
        if(profilePicture !== undefined){
            return(
                <img src={profilePicture} alt="pic" height={35} width={35} className="rounded-circle object-fit-cover mt-1"/>
            )
        } else{
            return(<Link to="/">
            <img src={Logo} alt="logo" width={35} height={35} className="mt-1"/></Link>)
        }
    }
    return(<div>
        <div className="shadow-sm d-none d-md-block d-lg-block">
        <div className=" row py-1">
            <div className="col-lg-4 px-4">
            <Link to="/">
            <img src={Logo} alt="logo" width={35} height={35} className="mt-1"/></Link>
            </div>
            <div className="col-6">
            {moreOptions()}
            </div>
            <div className="col-lg-2">
            <div className="mt-1">{logInOut()}</div>
            </div>
        </div>
        <div className="row p-2 home">
        <div className="col-10"></div>
        <div className="col-2 d-flex flex-row justify-content-end px-3">
        <h6 className="my-1 small">Cart</h6>
        <Link to="/cart"><Buy label="hi" stroke="regular" className="mx-2"/><Badge bg="dark" text="light">{status()}</Badge></Link></div></div>
        </div>
        <div className="w-100 d-sm-block d-md-none d-lg-none px-2 bg-dark nav-top-sm shadow">
        <div className="row py-2 bg-light">
            <div className="col-8">
                <div className="d-flex flex-row">
                <h6 className="small">{profilePic()}</h6>
                <h6 className="mx-3 d-none mt-2 lh-1 small">{checkUser()[0]}<br/>{checkUser()[2]}<br/></h6>
                </div>
            </div>
            <div className="col-4">
                <div className="d-flex flex-row mt-1">
                <Link to="/cart" className="mx-2"><Buy label="hi" size={25} stroke="regular"/><Badge bg="dark" text="light">{status()}</Badge></Link>
                <Link to="/logout"><Button variant="danger" size="sm"><h6 className="small my-1">Logout</h6></Button></Link></div>
            </div>
        </div>
        <div className="d-flex flex-row py-1" onClick={props.handletab15}>
        <Category className="m-2 text-white" size={20}/><h6 className="m-2 text-white small">Dashboard</h6></div>
        </div>
        <div className="d-sm-block d-md-none d-lg-none nav-bottom rounded-end">
        <div className="p-2">
        <Link to="/"><Home className="text-white m-2"/></Link></div>
        </div>
        </div>
    )
}