import React from "react";
import Form from 'react-bootstrap/Form';
import { API_URL_USER_ID_PROFILE_PHOTO, TOKEN } from "../api/Api";
import axios from 'axios';
import Button from "react-bootstrap/esm/Button";
import { success, fail, catch_errors, preloader } from "../api/RequestFunctions";
import { Camera } from "react-iconly";

class Photo extends React.Component {
    state = {
        photo: null,
        id: this.props.id
    }
    handleChange = (e) => {
        this.setState({
            photo: e.target.files[0]
        })
    };
    handleSubmit = () => {
        preloader()
        let form_data = new FormData();
        form_data.append('photo', this.state);
        axios.post(`${API_URL_USER_ID_PROFILE_PHOTO}`, this.state, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Accept': 'application/json',
                    "Authorization": `Token ${ TOKEN }`
                }
            })
            .catch(function(error) {
                catch_errors(error)
            })
            .then(function(response) {
                if (!response) {
                    fail("Something went wrong...")
                } else if (response.data.success === false) {
                    fail(response.data.message)
                } else {
                    success("You have successfully edited your profile photo", "/staff", "successful");
                }
            });
    }

    render() {
        return ( 
            <React.Fragment >
            <form className = "p-5 text-center bg-white rounded-4"
            onSubmit = { this.handleSubmit }>
            <div className = "text-center">
            <Camera size = {30}
            set = "broken"
            className = 'm-lg-3' />
            <h4 className = "my-3 text-center bolder" > Change Profile Photo </h4> 
            <Form.Group className = "mb-3 p-3" >
            <Form.Label > Choose Photo </Form.Label>  
            <Form.Control type = "file"
            id = "photo"
            onChange = {
                this.handleChange
            }
            placeholder = "No image chosen" />
            </Form.Group> 
            <div className = 'row justify-content-center'>
            <h6 id = "errorMessage"
            className = 'py-2 mt-3 rounded border border-danger text-center'
            style = {
                { display: 'none' }
            } > hey </h6> 
            <h6 id = "infoMessage"
            className = 'py-2 mt-3 rounded warning-message text-center'
            style = {
                { display: 'none' }
            } > hey </h6>   
            <Button variant="outline-dark" size="sm"
            className = 'text-center'
            id = 'successMessage'
            onClick = { this.handleSubmit }
            type = "button">
            Save Photo </Button> 
            </div> </div> </form> 
            </React.Fragment>
        );
    }
}
export default Photo;