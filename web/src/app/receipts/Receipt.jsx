import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../NavBar";
import TabNavItem from "../TabNavItem";
import TabContent from "../TabContent";
import { Paper, PaperUpload } from "react-iconly";
import { UserRequests, GetAllReceipts } from "../api/MainRequests";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Invoices from "./Invoice";
import Badge from "react-bootstrap/Badge";

export default function Receipts(props){
    const [activeTab, setActiveTab] = useState("tab9");
    const [username, setusername] = useState("")
    const [profilePicture, setProfilePicture] = useState()
    const [receipts, setReceipts] = useState([])
    useEffect(() => {
        UserRequests().then(res =>{
            setusername(res.first_name + " " + res.last_name)
            setProfilePicture(res.profile.profile_picture)
        })
        GetAllReceipts().then(res => {
            setReceipts(res)
        })
    },[])
    const handleTab9 = () => {
        // update the state to tab1
        setActiveTab("tab9");
    };
    const handleTab10 = () => {
        // update the state to tab2
        setActiveTab("tab10");
    };
    return(
        <div className="">
        <NavBar username={username} profile_picture={profilePicture}/>
        <div className=" d-none d-md-block d-lg-block">
        <div className="row px-lg-5 p-3 mt-3">
            <div className="col-2">
                <Link to="/inflow"><Button variant="outline-dark" size="sm">Inflow Cash</Button></Link>
                <Link to="/outflow"><Button className="my-2" variant="outline-dark" size="sm">Outflow Cash</Button></Link>
            <h4 className="bolder my-5">Receipts</h4>
                <div>
                    <TabNavItem 
                    id="tab9" 
                    onClick={handleTab9} 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab} 
                    title={<p className="px-2 m-0"><PaperUpload size={18}/> <span className="mx-2 cursor">Invoices</span></p>}/>
                </div>
                <div>
                    <TabNavItem 
                    id="tab10" 
                    onClick={handleTab10} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    title={<p className="px-2 m-0"><Paper size={18}/> <span className="mx-2 cursor">Petty Cash</span></p>}/>
                </div>
            </div>
            <div className="col-10">
            <TabContent id = "tab9" activeTab = { activeTab }>
                <div className="">
                    <h4 className="bolder">Invoices/Receipts</h4>
                    <Invoices pdf={props.pdf}/>
                </div>
            </TabContent>
            <TabContent id = "tab10" activeTab = { activeTab }>
                <div className="">
                <h4 className="bolder">Petty Cash</h4>
                </div>
            </TabContent>
            </div>
        </div>
        </div>
        <div className="row p-3 py-5 mt-5 d-sm-block d-md-none d-lg-none">
            <h4 className="bolder mt-5">Receipts</h4>
            <div className="row">
                <div className="col-6">
                    <TabNavItem 
                    id="tab9" 
                    onClick={handleTab9} 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab} 
                    title={<p className="px-2 m-0"><PaperUpload size={18}/> <span className="mx-2 cursor">Invoices</span></p>}/>
                </div>
                <div className="col-6">
                    <TabNavItem 
                    id="tab10" 
                    onClick={handleTab10} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    title={<p className="px-2 m-0"><Paper size={18}/> <span className="mx-2 cursor">Petty Cash</span></p>}/>
                </div>
            </div>
            <div className="">
            <TabContent id = "tab9" activeTab = { activeTab }>
                <div className="">
                    <h4 className="bolder">Invoices/Receipts</h4>
                    <Invoices pdf={props.pdf}/>
                </div>
            </TabContent>
            <TabContent id = "tab10" activeTab = { activeTab }>
                <div className="">
                <h4 className="bolder">Petty Cash</h4>
                </div>
            </TabContent>
            </div>
        </div>
        </div>
    )
}