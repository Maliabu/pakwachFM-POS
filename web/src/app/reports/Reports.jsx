import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../NavBar";
import TabNavItem from "../TabNavItem";
import TabContent from "../TabContent";
import { Paper, PaperUpload } from "react-iconly";
import { UserRequests } from "../api/MainRequests";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Reports(props){
    const [activeTab, setActiveTab] = useState("tab11");
    const [username, setusername] = useState("")
    const [profilePicture, setProfilePicture] = useState()

    useEffect(() => {
        UserRequests().then(res =>{
            setusername(res.username)
            setProfilePicture(res.profile.profile_picture)
        })
    },[])
    const handleTab11 = () => {
        // update the state to tab1
        setActiveTab("tab11");
    };
    const handleTab12 = () => {
        // update the state to tab2
        setActiveTab("tab12");
    };
    const handleTab13 = () => {
        // update the state to tab1
        setActiveTab("tab13");
    };
    const handleTab14 = () => {
        // update the state to tab2
        setActiveTab("tab14");
    };
    return(
        <div className="">
        <NavBar username={username} profile_picture={profilePicture}/>
        <div className="row px-lg-5 p-3">
            <div className="col-2">
                <Link to="/pos/inflow"><Button variant="outline-dark" size="sm">Inflow Cash</Button></Link>
                <Link to="/pos/outflow"><Button className="my-2" variant="outline-dark" size="sm">Outflow Cash</Button></Link>
            <h4 className="bolder my-5">Reports</h4>
                <div>
                    <TabNavItem 
                    id="tab11" 
                    onClick={handleTab11} 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab} 
                    title={<p className="px-2 m-0"><PaperUpload size={18}/> <span className="mx-2 cursor">Cash Flow</span></p>}/>
                </div>
                <div>
                    <TabNavItem 
                    id="tab12" 
                    onClick={handleTab12} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    title={<p className="px-2 m-0"><Paper size={18}/> <span className="mx-2 cursor">Balance Sheet</span></p>}/>
                </div>
                <div>
                    <TabNavItem 
                    id="tab13" 
                    onClick={handleTab13} 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab} 
                    title={<p className="px-2 m-0"><PaperUpload size={18}/> <span className="mx-2 cursor">Profit and Loss</span></p>}/>
                </div>
                <div>
                    <TabNavItem 
                    id="tab14" 
                    onClick={handleTab14} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    title={<p className="px-2 m-0"><Paper size={18}/> <span className="mx-2 cursor">Trial Balance</span></p>}/>
                </div>
            </div>
            <div className="col-10">
            <TabContent id = "tab11" activeTab = { activeTab }>
                <div className="">
                <h4 className="bolder">Cash Flow</h4>
                </div>
            </TabContent>
            <TabContent id = "tab12" activeTab = { activeTab }>
                <div className="">
                <h4 className="bolder">Balance Sheet</h4>
                </div>
            </TabContent>
            <TabContent id = "tab13" activeTab = { activeTab }>
                <div className="">
                <h4 className="bolder">Profit and Loss</h4>
                </div>
            </TabContent>
            <TabContent id = "tab14" activeTab = { activeTab }>
                <div className="">
                <h4 className="bolder">Trial Balance</h4>
                </div>
            </TabContent>
            </div>
        </div>
        </div>
    )
}