import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./NavBar";
import TabNavItem from "./TabNavItem";
import TabNavItem2 from "./TabNavItem2";
import TabContent from "./TabContent";
import { UserRequests } from "./api/MainRequests";
import Adverts from "./inflow/Adverts";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AddCategory from "./forms/AddCategory";
import { GetInflowProductCategories } from "./api/MainRequests";
import Sponsorships from "./inflow/Sposorships";
import Announcements from "./inflow/Announcements";
import Productions from "./inflow/Production";
import TalkShows from "./inflow/TakShow";
import Mentions from "./inflow/Mentions";
import { Paper } from "react-iconly";

export default function Inflow(props){
    const [categories, setCategories] = useState([])
    const [activeTab, setActiveTab] = useState("tab7");
    const [username, setusername] = useState("")
    const [profilePicture, setProfilePicture] = useState()
    // const [formData, setFormData] = useState({
    //     number_of_times_played: ''
    // });
    useEffect(() => {
        UserRequests().then(res =>{
            setusername(res.first_name + " " + res.last_name)
            setProfilePicture(res.profile.profile_picture)
        })
        GetInflowProductCategories().then(res => {
            setCategories(res)
        })
    },[])
    function tabContent(name, cid){
        switch(name){
            case "Adverts":
                return (<Adverts cid={cid}/>)
            case "Sponsorship":
                return (<Sponsorships cid={cid}/>)
            case "Announcements":
                return (<Announcements cid={cid}/>)
            case "Talk Shows":
                return (<TalkShows cid={cid}/>)
            case "Mentions":
                return (<Mentions cid={cid}/>)
            case "Production":
                return (<Productions cid={cid}/>)
            default:
                return (<div className="login"><Paper/></div>)
        }
        
    }
    const handleTab = (id) => {
        // update the state to tab1
        setActiveTab("tab"+id);
    };
    const handleTab18 = () => {
        // update the state to tab2
        setActiveTab("tab18");
    };
    // const handleChange = (event) => {
    //     const name = event.target.id;
    //     const value = event.target.value;
    //     setFormData({...formData, [name]: value });
    // };
    return(
        <div className="">
        <NavBar username={username} profile_picture={profilePicture}/>
        <div className="d-flex flex-row px-5 mt-3">
                <Link to="/outflow"><Button variant="outline-dark" size="sm">Outflow Cash</Button></Link>
            </div>
        <div className="row px-lg-5 p-3">
            <div className="col-2">
            <h4 className="bolder mb-5">Inflow Cash</h4>
            {categories.map((item, id) => (
                <div key={id}>
                    <TabNavItem 
                    id={"tab"+item.id}
                    onClick={() => handleTab(id)} 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab} 
                    title={<p className="px-2 m-0"> <span className="cursor">{item.name}</span></p>}/>
                </div>
            ))}
                {/* <div>
                    <TabNavItem 
                    id="tab2" 
                    onClick={handleTab2} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    title={<h6> <span className="cursor">Announcements</span></h6>}/>
                </div>
                <div>
                    <TabNavItem 
                    id="tab3" 
                    onClick={handleTab3} 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab} 
                    title={<h6> <span className="cursor">Talk Shows</span></h6>}/>
                </div>
                <div>
                    <TabNavItem 
                    id="tab4" 
                    onClick={handleTab4} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    title={<h6> <span className="cursor">DJ Mentions</span></h6>}/>
                </div>
                <div>
                    <TabNavItem 
                    id="tab5" 
                    onClick={handleTab5} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    title={<h6> <span className="cursor">Sponsorships</span></h6>}/>
                </div>
                <div>
                    <TabNavItem 
                    id="tab7" 
                    onClick={handleTab7} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    title={<h6><span className="cursor">Production</span></h6>}/>
                </div>
                <div>
                    <TabNavItem 
                    id="tab8" 
                    onClick={handleTab8} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    title={<h6><span className="cursor">Other Inflow Cash</span></h6>}/>
                </div> */}
                <div>
                    <TabNavItem2 
                    id="tab18" 
                    onClick={handleTab18} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    title={<Button size="sm" variant="outline-dark" className="mt-5">Add Category to Inflow</Button>}/>
                </div>
            </div>
            <div className="col-10">
            {categories.map((item, id) => (
                <TabContent id = {"tab"+item.id} activeTab = { activeTab } key={id}>
                <h4 className="bolder">{item.name}</h4>
                {tabContent(item.name, item.id)}
            </TabContent>)
            )}
            <TabContent id = "tab18" activeTab = { activeTab }>
                <div className="">
                    <h4 className="bolder">Add Categories Under Inflow Cash</h4>
                    <AddCategory/>
                </div>
            </TabContent>
            </div>
        </div>
        </div>
    )
}