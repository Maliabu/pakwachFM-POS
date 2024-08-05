import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../NavBar";
import TabNavItem from "../TabNavItem";
import TabNavItem2 from "../TabNavItem2";
import TabContent from "../TabContent";
import { UserRequests, AdminUserRequests, NonAdminRequests, GetAllDepartments, GetAllUsers } from "../api/MainRequests";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import SignUp from './SignUp'
import Badge from "react-bootstrap/Badge";
import Photo from "./UserPhoto";
import Modal from "react-bootstrap/Modal";
import AddDepartment from "../forms/AddDepartment";

export default function Staff(props){
    const [activeTab, setActiveTab] = useState("tab16");
    const [username, setusername] = useState("")
    const [adminStaff, setAdminStaff] = useState([]);
    const [nonAdminStaff, setNonAdminStaff] = useState([]);
    const [profilePicture, setProfilePicture] = useState()
    const [holdId, setHoldId] = useState()
    const [show, setShow] = useState(false);
    const [depts, setDepts] = useState([])
    const [users, setUsers] = useState([])
    const handleShow = () => {
        setShow(true)
    }
    const handleClose = () => {
        setShow(false)
    }
    useEffect(() => {
        UserRequests().then(res =>{
            setusername(res.first_name + " " + res.last_name)
            setProfilePicture(res.profile.profile_picture)
        })
        AdminUserRequests().then(res =>{
            setAdminStaff(res)
        })
        NonAdminRequests().then(res =>{
            setNonAdminStaff(res)
        })
        GetAllDepartments().then(res => {
            setDepts(res)
        })
        GetAllUsers().then(res => {
            setUsers(res)
        })
    },[])
    function onlyId(id){
        setHoldId(id)
        handleShow()
    }
    function departments(){
        if(depts.length !== 0){
            return(<div className="scroll-y">
                {
                depts.map((d, id)=>(
                <div className="row mt-2 justify-content-start" key={id}><h6><Badge bg="dark" className="px-3 py-2">{d.name}</Badge></h6>
                {
                    <div className="col-1"></div>
                }
                </div>
            ))}</div>
            )
        } else{
            return null
        }
    }
    function nonAdminStaf(){
        if(nonAdminStaff.length <= 0){
            return null
        } else{
            return(
                <div>
                <Table borderless={true} size="sm" striped className="d-none">
                    <thead>
                    <tr>
          <th>Staff Id</th>
          <th>Photo</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Role</th>
          <th>Date Created</th>
        </tr>
      </thead>
      <tbody>
      {nonAdminStaff.map((staff, id)=>(
        <tr key={id}>
          <td>{staff.profile.profile_id}</td>
          <td><img src={staff.profile.profile_picture} alt="pic" height={35} width={35} className="rounded-circle"/></td>
          <td>{staff.first_name}</td>
          <td>{staff.last_name}</td>
          <td>{staff.profile.role}</td>
          <td>{(staff.profile.created).slice(0,10)}</td>
        </tr>))}
      </tbody>
        </Table>
        <div className="row g-2 scroll-y">
            {
                nonAdminStaff.map((staff, id)=>(
                    <div className="col-lg-3 col-6" key={id}>
                    <div className=" bg-light p-3 rounded-4 my-1">
                    <div className="row">
                        <div className="col-7">
                        <img src={staff.profile.profile_picture} alt="pic" height={65} width={65} className="rounded-circle cursor object-fit-cover" onClick={() => onlyId(staff.profile.profile_id)}/></div>
                        <div className="col-5"><Badge bg="dark" className="mx-3">ID: {staff.profile.profile_id}</Badge></div>
                    </div>
                    <h6 className="mt-2"><Badge bg="dark" className="mx-3">{staff.profile.role}</Badge>
                    <p className="small bolder mx-3 mt-1">{staff.first_name + " " + staff.last_name}</p></h6>
                    </div></div>
                ))
            }
        </div>
        </div>
            )
        }
    }
    function adminStaf(){
        if(adminStaff.length <= 0){
            return null
        } else{
            return(
                <div>
                <Table className="d-none" borderless={true} size="sm" striped>
                    <thead>
                    <tr>
          <th>Staff Id</th>
          <th>Photo</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Role</th>
          <th>Date Created</th>
        </tr>
      </thead>
      <tbody>
      {adminStaff.map((staff, id)=>(
        <tr key={id}>
          <td>{staff.profile.profile_id}</td>
          <td><img src={staff.profile.profile_picture} alt="pic" height={35} width={35} className="rounded-circle cursor"/></td>
          <td>{staff.first_name}</td>
          <td>{staff.last_name}</td>
          <td>{staff.profile.role}</td>
          <td>{(staff.profile.created).slice(0,10)}</td>
        </tr>))}
      </tbody>
        </Table>
        <div className="row g-2 scroll-y">
            {
                adminStaff.map((staff, id)=>(
                    <div className="col-lg-3 col-6" key={id}>
                    <div className=" bg-light p-3 rounded-4 my-1">
                    <div className="row">
                        <div className="col-7">
                        <img src={staff.profile.profile_picture} alt="pic" height={65} width={65} className="rounded-circle object-fit-cover cursor" onClick={() => onlyId(staff.profile.profile_id)}/></div>
                        <div className="col-5"><Badge bg="dark" className="mx-3">ID: {staff.profile.profile_id}</Badge></div>
                    </div>
                    <h6 className="mt-2"><Badge bg="dark" className="mx-3">{staff.profile.role}</Badge>
                    <p className="small bolder mx-3 mt-1">{staff.first_name + " " + staff.last_name}</p></h6>
                    </div></div>
                ))
            }
        </div>
        </div>
            )
        }
    }
    const handleTab15 = () => {
        // update the state to tab1
        setActiveTab("tab15");
    };
    const handleTab16 = () => {
        // update the state to tab2
        setActiveTab("tab16");
    };
    const handleTab17 = () => {
        // update the state to tab2
        setActiveTab("tab17");
    };
    const handleTab18 = () => {
        // update the state to tab2
        setActiveTab("tab18");
    };
    const handleTab19 = () => {
        // update the state to tab2
        setActiveTab("tab19");
    };
    return(
        <div>
        <NavBar username={username} profile_picture={profilePicture} handletab15 = {handleTab15}/>
        <div className=" d-none d-md-block d-lg-block">
        <div className="row px-lg-5 p-3">
            <div className="col-lg-2">
                <Link to="/pos/inflow"><Button variant="outline-dark" size="sm">Inflow Cash</Button></Link>
                <Link to="/pos/outflow"><Button className="my-2" variant="outline-dark" size="sm">Outflow Cash</Button></Link>
                <h4 className="bolder my-5">Staff & Payroll</h4>
                <div>
                    <TabNavItem 
                    id="tab15" 
                    onClick={handleTab15} 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab} 
                    title={<p className="px-2 m-0"> <span className=" cursor">Admin Staff</span></p>}/>
                </div>
                <div>
                    <TabNavItem 
                    id="tab16" 
                    onClick={handleTab16} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    title={<p className="px-2 m-0"><span className=" cursor">Non-Admin Staff</span></p>}/>
                </div>
                <div>
                    <TabNavItem 
                    id="tab19" 
                    onClick={handleTab19} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    title={<p className="px-2 m-0"><span className=" cursor">Department Staff</span></p>}/>
                </div>
                <div>
                    <TabNavItem2
                    id="tab17"
                    onClick={handleTab17} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    title={<Button variant="outline-dark" size="sm" className="mt-5">Add New Staff</Button>}/>
                    <TabNavItem2 
                    id="tab18" 
                    onClick={handleTab18} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    title={<Button variant="outline-dark" size="sm" className="mt-0">Add New Department</Button>}/>
                </div>
            </div>
            <div className="col-lg-10">
            <TabContent id = "tab15" activeTab = { activeTab }>
                <div className="">
                    {adminStaf()}
                    <p className="bolder my-5">Total Staff: <Badge bg="dark" className="mx-3">{adminStaff.length}</Badge></p>
                </div>
            </TabContent>
            <TabContent id = "tab16" activeTab = { activeTab }>
                <div className="">
                    {nonAdminStaf()}
                    <p className="bolder my-5">Total Staff: <Badge bg="dark" className="mx-3">{nonAdminStaff.length}</Badge></p>
                </div>
            </TabContent>
            <TabContent id = "tab17" activeTab = { activeTab }>
                <div className="">
                    <h4 className="bolder">Add New Staff</h4>
                    <SignUp/>
                </div>
            </TabContent>
            <TabContent id = "tab18" activeTab = { activeTab }>
                <div className="">
                    <h4 className="bolder">Add New Department</h4>
                    <AddDepartment/>
                </div>
            </TabContent>
            <TabContent id = "tab19" activeTab = { activeTab }>
                <div className="">
                    <h4 className="bolder">Departments</h4>
                    {departments()}
                </div>
            </TabContent>
            </div>
        </div>
        </div>
        <div className="py-5 mt-5 p-3 d-sm-block d-md-none d-lg-none">
            <div className="row mt-5">
            <div className="col-6">
                <h4 className="bolder">Staff & Payroll</h4>
                <div>
                    <TabNavItem 
                    id="tab15" 
                    onClick={handleTab15} 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab} 
                    title={<p className="px-2 m-0"> <span className=" cursor">Admin Staff</span></p>}/>
                </div>
                <div>
                    <TabNavItem 
                    id="tab16" 
                    onClick={handleTab16} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    title={<p className="px-2 m-0"><span className=" cursor">Non-Admin Staff</span></p>}/>
                </div>
                <div>
                    <TabNavItem 
                    id="tab19" 
                    onClick={handleTab19} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    title={<p className="px-2 m-0"><span className=" cursor">Department Staff</span></p>}/>
                </div></div>
                <div className="col-6">
                <div>
                    <TabNavItem2
                    id="tab17"
                    onClick={handleTab17} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    title={<Button variant="outline-dark" size="sm" className="mt-5">Add New Staff</Button>}/>
                    <TabNavItem2 
                    id="tab18" 
                    onClick={handleTab18} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    title={<Button variant="outline-dark" size="sm" className="mt-0">Add New Department</Button>}/>
                </div></div>
            </div>
            </div>
            <div className="col-12">
            <TabContent id = "tab15" activeTab = { activeTab }>
                <div className="mx-2">
                    {adminStaf()}
                    <p className="bolder my-5">Total Staff: <Badge bg="dark" className="mx-3">{adminStaff.length}</Badge></p>
                </div>
            </TabContent>
            <TabContent id = "tab16" activeTab = { activeTab }>
                <div className="mx-2">
                    {nonAdminStaf()}
                    <p className="bolder my-5">Total Staff: <Badge bg="dark" className="mx-3">{nonAdminStaff.length}</Badge></p>
                </div>
            </TabContent>
            <TabContent id = "tab17" activeTab = { activeTab }>
                <div className="mx-2">
                    <h4 className="bolder">Add New Staff</h4>
                    <SignUp/>
                </div>
            </TabContent>
            <TabContent id = "tab18" activeTab = { activeTab }>
                <div className="mx-2">
                    <h4 className="bolder">Add New Department</h4>
                    <AddDepartment/>
                </div>
            </TabContent>
            <TabContent id = "tab19" activeTab = { activeTab }>
                <div className="mx-2">
                    <h4 className="bolder">Departments</h4>
                    {departments()}
                </div>
            </TabContent>
        </div>
            <Modal show={show} onHide={handleClose} className = "p-3 text-center">
            <Photo id={holdId}/>
            </Modal>
        </div>
    )
}