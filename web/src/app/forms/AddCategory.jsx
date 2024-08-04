import React, {useState} from "react"
import Form from 'react-bootstrap/Form'
import axios from "axios";
import { fail, success, preloader} from "../api/RequestFunctions";
import { API_URL_ADD_PRODUCT_CATEGORY, TOKEN } from "../api/Api";
import Button from "react-bootstrap/Button";

export default function AddCategory(){
    const [formData, setFormData] = useState({
        name: '',
        module: 1
    });
    const handleChange = (event) => {
        const name = event.target.id;
        const value = event.target.value;
        setFormData({...formData, [name]: value });
    };
    const handleSubmit = (e) => {
        preloader()
        e.preventDefault();
        axios.post(`${API_URL_ADD_PRODUCT_CATEGORY}`,formData,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${TOKEN}`
            }
        })
        .then(function(response){
            if(!response){
                fail("Unsuccessful")
            }
            else if(response){
                success("Category added successfully", "/inflow", "successful")
            }
        })
    }
    return(
        <div className="my-5 home">
            <div className="login home1">
                <Form onSubmit = { handleSubmit }>
                <Form.Group className = " text-start" >
                <Form.Label > <h6 className = 'm-0'> Category Name </h6> </Form.Label> 
                <Form.Control type = "text"
                    id = 'name'
                    required = "required"
                    onChange = { handleChange }
                    placeholder = "Advert, Announcement..." /> 
                </Form.Group>
                <Button type='submit' id="successMessage" size="sm" variant="outline-dark" className="mt-3">Add Category</Button>
                <h6 id = "errorMessage" className = 'py-2 mt-3 rounded border border-danger text-center fade-in'
                    style = {
                    { display: 'none' }
                    }> hey </h6>
                <h6 id = "infoMessage"
                    className = 'py-2 mt-3 rounded warning-message text-center fade-in'
                    style = {
                    { display: 'none',
                        border: '1px solid black' }
                    }> hey </h6>
                </Form>
            </div>
        </div>
    )
}