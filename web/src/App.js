// import './App.css';
// import { Home } from './app/Home';

// function App() {
//   return (
//     <Home/>
//   );
// }

// export default App;
// Filename - App.js

import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Home from "./app/Home";
import Contact from "./app/Contact";
import Login from "./app/Login";
import Inflow from "./app/Inflow";
import Outflow from "./app/Outflow";
import "./App.css";
import Logout from "./app/Logout";
import Receipts from "./app/receipts/Receipt";
import Reports from "./app/reports/Reports";
import Staff from "./app/staff/Staff";
import Cart from "./app/Cart";
import Adobe from './images/adobe.jpeg'

export default function App() {
        return (
            <div className="core">
                <Router>
                    <Routes>
                        <Route
                            path="/pos/home"
                            element={<Home />}
                        ></Route>
                        <Route
                            path="/pos"
                            element={<Login />}
                        ></Route>
                        <Route
                            path="/pos/logout"
                            element={<Logout />}
                        ></Route>
                        <Route
                            path="/pos/inflow"
                            element={<Inflow />}
                        ></Route>
                        <Route
                            path="/pos/outflow"
                            element={<Outflow />}
                        ></Route>
                        <Route
                            path="/pos/receipts"
                            element={<Receipts pdf={Adobe}/>}
                        ></Route>
                        <Route
                            path="/pos/reports"
                            element={<Reports />}
                        ></Route>
                        <Route
                            path="/pos/staff"
                            element={<Staff />}
                        ></Route>
                        <Route
                            path="/pos/cart"
                            element={<Cart />}
                        ></Route>
                        <Route
                            path="/pos/contact"
                            element={<Contact />}
                        ></Route>
                    </Routes>
                </Router>
            </div>
        );
}
