import React, {useState} from "react"
import Form from 'react-bootstrap/Form'
import axios from "axios";
import { catch_errors, fail, success, preloader, togglePasswordVisibility } from "./api/RequestFunctions";
import { API_RESEND_VERIFICATION_EMAIL,API_URL_GET_AUTH_USER_BY_EMAIL,API_EMAIL_VERIFY,API_URL_LOGIN } from "./api/Api";
import Button from "react-bootstrap/Button";

export default function Login(){
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const resendEmail = () => {
        document.getElementById("errorMessage").style.display = "none"
        axios.post(`${API_RESEND_VERIFICATION_EMAIL}`,formData.username,{
            headers: {
                "Content-Type": "application/json"
            }
        })
        .catch(function(error) {
            catch_errors(error)
        })
        .then(function(response){
            if (!response) {
                fail("Something went wrong...")
            } else if (response.status === 200 && response.data.success === false) {
                fail(response.data.message)
            } else {
                success("A verification link has been sent to your email", "/", "Successful");
            }
        })
    }
    const handleEmailChange = (event) => {
        const name = event.target.id;
        const value = event.target.value;
        setFormData({...formData, [name]: value });
    };
    const handleChange = (event) => {
        const name = event.target.id;
        const value = event.target.value;
        setFormData({...formData, [name]: value });
    };
    const handleSubmit = (e) => {
        preloader()
        e.preventDefault();
        // does the account exist?
        axios.post(`${API_URL_GET_AUTH_USER_BY_EMAIL}`,formData.username,{
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function(response){
            if(response.data === false){
                document.getElementById("errorMessage").style.display = "block"
                document.getElementById("errorMessage").style.color = "crimson"
                document.getElementById("errorMessage").style.backgroundColor = '#ff353535'
                document.getElementById("errorMessage").innerText = "This account is not registered please sign up"
            }
            else if(response.data === true){
                document.getElementById("errorMessage").style.display = "none"
                // does this user need verification?
                axios.post(`${API_EMAIL_VERIFY}`,formData.username,{
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(function(response){
                    if(response.data.success === false){
                        document.getElementById("errorMessage").style.display = "block"
                        document.getElementById("errorMessage").style.color = "crimson"
                        document.getElementById("errorMessage").style.backgroundColor = '#ff353535'
                        document.getElementById("errorMessage").innerText = "Looks like your account is not verified. Click below to get a verification link"
                        document.getElementById("infoMess").style.display = "block"
                    }
                    else{
                        document.getElementById("errorMessage").style.display = "none"
                        document.getElementById("infoMess").style.display = "none"
                        axios.post(`${API_URL_LOGIN}`, formData, {
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })
                            .catch(function(error) {
                                catch_errors(error)
                            })
                            .then(function(response) {
                                if (!response) {
                                    fail("Something went wrong...")
                                } else if (response.status === 200 && response.data.success === false) {
                                    fail(response.data.message)
                                } else {
                                    success("Login successful", "/", "successful");
                                    const token = response.data.token
                                    localStorage.setItem('token', token)
                                }
                            });
                    }
                })
            }
        })
    }
    return(
        <div className="m-2">
            <div className="text-center p-5 rounded-4">
                <Form onSubmit = { handleSubmit }>
                <h2>Sign In</h2>
                <Form.Group className = " rounded-2 px-3 text-start" >
                <Form.Label > <h6 className = 'm-0'> Email </h6> </Form.Label> 
                <Form.Control type = "text"
                    id = 'username'
                    required = "required"
                    onChange = { handleEmailChange }
                    placeholder = "username@pakwachfm.com" /> 
                </Form.Group>
                <Form.Group className = " rounded-2 px-3 my-2 text-start" >
                <Form.Label > <h6 className = 'm-0' > Password </h6> </Form.Label> 
                <Form.Control type = "password"
                    id = 'password'
                    required = "required"
                    onChange = { handleChange }
                    placeholder = "password" />
                <div className='my-1' key = "default-checkbox" >
                <Form.Check type='checkbox' id = "default-checkbox" label='Show Password' onClick={togglePasswordVisibility}/></div>
                </Form.Group>
                <Button type='submit' id="successMessage" variant="danger" size="sm" className="px-5">Sign in</Button>
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
                <span id = "infoMess"
                    className = 'active bolder status rounded p-2 mt-1'
                    style = {
                    { display: 'none',
                        borderColor: 'black'
                     }
                    } 
                    onClick={resendEmail}> Resend email verification link </span>
                </Form>
            </div>
        </div>
    )
}