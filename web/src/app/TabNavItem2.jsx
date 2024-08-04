import React from "react";
import '../App.css';
const TabNavItem2 = ({ id, title, activeTab, setActiveTab }) => {

    const handleClick = () => {
        setActiveTab(id);
    };
    return ( 
        <div className = "tab-nav" >
        <h6 onClick = { handleClick }
        className = { activeTab === id ? "" : "" } >{ title } 
        </h6> </div>
    );
};
export default TabNavItem2;