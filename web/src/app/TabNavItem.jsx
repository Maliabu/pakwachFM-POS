import React from "react";
import '../App.css';
const TabNavItem = ({ id, title, activeTab, setActiveTab }) => {

    const handleClick = () => {
        setActiveTab(id);
    };
    return ( 
        <div className = "tab-nav" >
        <h6 onClick = { handleClick }
        className = { activeTab === id ? "active p-2 bolder" : "" } >{ title } 
        </h6> </div>
    );
};
export default TabNavItem;