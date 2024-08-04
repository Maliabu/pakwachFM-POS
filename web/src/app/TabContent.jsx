import React from "react";
import '../App.css';

const TabContent = ({ id, activeTab, children }) => {
    return (
        activeTab === id ? <div className = "TabContent" > { children } </div> :
        null
    );
};

export default TabContent;