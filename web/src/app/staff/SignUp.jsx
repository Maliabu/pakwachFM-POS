import React, {useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { API_URL,API_URL_GET_AUTH_USER_BY_EMAIL } from '../api/Api';
import axios from 'axios';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import { success, catch_errors, fail, preloader, dismissPreloader, ValidateForms } from '../api/RequestFunctions'
import { GetAllDepartments } from '../api/MainRequests';

function SignUp(props) {
    const [step, setStep] = useState(1);
    const [valuePhone, setValuePhone] = useState("");
    const [countryInput, setCountryInput] = useState("");
    const [showpassword,setShowPassword] = useState(false)
    const [depts, setDepts] = useState([])
    //state for form data
    const [formData2, setFormData2] = useState({
        gender: '',
        country: countryInput,
        phone_no: valuePhone,
        birth_date: '',
        department_id: '',
        role:''
    });
    formData2.phone_no = valuePhone
    formData2.country = countryInput
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        password: '',
        username: 'pakwachFMUser',
        confirmpassword: '',
        email: '',
        profile: ''
    });
    formData.profile = formData2
    formData.username = "pakwachFMUser"
    useEffect(() => {
        GetAllDepartments().then(res => {
          setDepts(res)
        })
    },[])
    const { handleSubmit } = useForm();
    const validate1 = () => {
        preloader()
        let fname = ValidateForms("first_name")
        let lname = ValidateForms("last_name")
        let email = ValidateForms("email")

        if (fname.length === 0) {
            document.getElementById("errorFirst").style.display = "block"
            document.getElementById("errorFirst").style.color = "crimson"
            document.getElementById("errorFirst").innerText = "First name is required"
        } else {
            document.getElementById("errorFirst").style.display = "none"
        }
        if (lname.length === 0) {
            document.getElementById("errorLast").style.display = "block"
            document.getElementById("errorLast").style.color = "crimson"
            document.getElementById("errorLast").innerText = "Last name is required"
        } else {
            document.getElementById("errorLast").style.display = "none"
        }
        if (email.length === 0) {
            document.getElementById("errorEmail").style.display = "block"
            document.getElementById("errorEmail").style.color = "crimson"
            document.getElementById("errorEmail").innerText = "Email is required"
        } else {
            document.getElementById("errorEmail").style.display = "none"
        }
        if (fname.length !== 0 && lname.length !== 0 && email.length !== 0) {
            axios.post(`${API_URL_GET_AUTH_USER_BY_EMAIL}`,email,{
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function(response){
                if(response.data === true){
                    document.getElementById("errorEmail").style.display = "block"
                    document.getElementById("errorEmail").style.color = "crimson"
                    document.getElementById("errorEmail").innerText = "This account already exists, try to login instead"
                }
                else{
                    document.getElementById("errorEmail").style.display = "none"
                    dismissPreloader()
                    setStep(step + 1)
                }
            })
        }
    }
    const validate2 = () => {
        let dob = ValidateForms("birth_date")
        let phone = valuePhone
        let gender = ValidateForms("gender")

        if (dob.length === 0) {
            document.getElementById("errorDate").style.display = "block"
            document.getElementById("errorDate").style.color = "crimson"
            document.getElementById("errorDate").innerText = "Select a date of birth"
        } else {
            document.getElementById("errorDate").style.display = "none"
        }
        if (gender === "Male" || gender === "Female") {
            document.getElementById("errorGender").style.display = "none"
        } else {
            document.getElementById("errorGender").style.display = "block"
            document.getElementById("errorGender").style.color = "crimson"
            document.getElementById("errorGender").innerText = "Select your gender"
        }
        if (phone.length === 0 || phone.length < 10) {
            document.getElementById("errorPhone").style.display = "block"
            document.getElementById("errorPhone").style.color = "crimson"
            document.getElementById("errorPhone").innerText = "Phone is required"
        } else {
            document.getElementById("errorPhone").style.display = "none"
        }
        if (dob.length !== 0 && phone.length >= 10) {
            setStep(step + 1)
        }
    }
    const validate3 = () => {
        let password = ValidateForms("password")
        let confirmpassword = ValidateForms("confirmpassword")
        let userType = ValidateForms("department_id")
        let role = ValidateForms("role")

        if (password.length === 0) {
            document.getElementById("errorPassword").style.display = "block"
            document.getElementById("errorPassword").style.color = "crimson"
            document.getElementById("errorPassword").innerText = "Password is required"
        } else {
            document.getElementById("errorPassword").style.display = "none"
        }
        if (confirmpassword === 0) {
            document.getElementById("errorConfirmP").style.display = "block"
            document.getElementById("errorConfirmP").style.color = "crimson"
            document.getElementById("errorConfirmP").innerText = "Please confirm your password"
        } else {
            document.getElementById("errorConfirmP").style.display = "none"
        }
        if (role.length === 0) {
            document.getElementById("errorRole").style.display = "block"
            document.getElementById("errorRole").style.color = "crimson"
            document.getElementById("errorRole").innerText = "User needs a Role"
        } else {
            document.getElementById("errorRole").style.display = "none"
        }
        if (userType.length === 0) {
            document.getElementById("errorUserType").style.display = "block"
            document.getElementById("errorUserType").style.color = "crimson"
            document.getElementById("errorUserType").innerText = "Select the type of user"
        } else {
            document.getElementById("errorUserType").style.display = "none"
        }
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({...formData, [name]: value })
    }
    const handleChange2 = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData2({...formData2, [name]: value })
    }
    const togglePassword =()=>{
        setShowPassword(!showpassword)
    }
    const submitButton = () => {
        if (step === 3) {
            return ( 
                <div className = 'text-center my-3' > 
                <h6 id = "errorMessage"
                className = 'py-2 rounded border border-danger text-center'
                style = {
                    { display: 'none' }
                }> hey </h6> 
                <h6 id = "infoMessage"
                className = 'py-2 rounded warning-message text-center'
                style = {
                    { display: 'none' }
                }> hey </h6>   
                <Button
                size='sm'
                variant="outline-dark"
                id = 'successMessage'
                type = "submit" >
                Submit </Button> 
                </div>
            )
        }
        return null
    }
    const nextButton = () => {
        if (step === 1) {
            return ( <div className='text-end my-3'>
                <Button size='sm' variant='outline-dark' id='successMessage'
                onClick = {
                    () => validate1()
                } >
                Next </Button></div>
            )
        }
        if (step === 2) {
            return ( <div className='text-end my-3'>
                <Button size='sm' variant='outline-dark' id='successMessage'
                onClick = {
                    () => validate2()
                } >
                Next </Button></div>
            )
        }
        return null
    }
    const prevButton = () => {
        if (step !== 1) {
            return ( <div className='text-end my-3'>
                <Button size='sm' variant='outline-dark' className='text-end'
                onClick = {
                    () => { setStep(step - 1) }
                } >
                Previous </Button></div>)
            }
            return null
        }

        function onSubmit() {
            validate3()
            preloader()
            formData.profile = formData2
            axios.post(`${API_URL}`, formData, {
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
                        success("A verification link has been sent to your email", "/staff", "successful");
                    }
                });
        }
        return ( 
            <React.Fragment > 
            <div className = 'row bg-lighter py-4 rounded-4' >
            <form className = 'bg-white rounded-4 col-12'
            onSubmit = { handleSubmit(onSubmit) } > 
            <Learn1 currentStep = { step }
            change = { handleChange }
            /> 
            <Learn2 currentStep = { step }
            change2 = { handleChange2 }
            value = { valuePhone }
            setPhone = { setValuePhone }
            setCountry = { setCountryInput }
            country = { countryInput }
            /> 
            <Learn3 currentStep = { step }
            change2 = { handleChange2 }
            change = { handleChange }
            togglePassword = {togglePassword}
            showpassword = {showpassword}
            depts = {depts}
            /> <div className='d-flex flex-row justify-content-end'>{prevButton()}<span className='mx-2'>{nextButton()}</span>{submitButton()}</div>
            </form > </div>
            </React.Fragment>
        );

    }

    function Learn1(props) {
        if (props.currentStep !== 1) {
            return null
        }
        return ( 
            <div className='row'> 
            <div className='col-lg-4'>
            <Form.Group className = " rounded-3 px-3 mt-3"
            controlId = "formBasicDate" >
            <Form.Label > <h6 className = 'm-0' > First Name </h6> </Form.Label > 
            <Form.Control type = "text"
            name = "first_name"
            onChange = { props.change }
            placeholder = "Your first name" /> 
            <p id = "errorFirst"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            }> hey </p> 
            </Form.Group > </div>
            <div className='col-lg-4'>
            <Form.Group className = " rounded-3 px-3 my-2"
            controlId = "formBasicText" >
            <Form.Label > <h6 className = 'm-0' > Last Name </h6> </Form.Label > 
            <Form.Control type = "text"
            name = "last_name"
            onChange = { props.change }
            placeholder = "your last name" /> 
            <p id = "errorLast"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            }> hey </p> </Form.Group ></div> 
            <div className='col-lg-4'>
            <Form.Group className = " rounded-3 px-3 mb-2"
            controlId = "formBasicText" >
            <Form.Label > <h6 className = 'm-0' > Email </h6> </Form.Label> 
            <Form.Control type = "email"
            name = "email"
            onChange = { props.change }
            placeholder = "your email" /> 
            <p id = "errorEmail"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            } > hey </p> 
            </Form.Group></div> 
            </div> 
        )
    }

    function Learn2(props) {
        if (props.currentStep !== 2) {
            return null
        }
        return ( 
            <div> 
            <div className='row'>
                <div className='col-lg-4'>
            <Form.Group className = "mb-3"
            controlId = "formBasicText" >
            <Form.Label > <h6 className = 'm-0'> Date of Birth </h6> </Form.Label > 
            <Form.Control type = "date"
            name = "birth_date"
            onChange = { props.change2 }
            placeholder = "optional" /> 
            <p id = "errorDate"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            }> hey </p> 
            </Form.Group ></div>
            <div className='col-lg-4'>
            <Form.Label > <h6 className = 'm-0'> Gender </h6> </Form.Label> 
            <Form.Select name = "gender"
            onChange = { props.change2 }> 
            <option value = "Gender" > Select your gender </option> 
            <option value = "Male" > Male </option> 
            <option value = "Female" > Female </option> 
            </Form.Select > 
            <p id = "errorGender"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            }> hey </p>   </div>
            <div className='col-lg-4'>
            <Form.Group className = "mb-3" >
            <Form.Label > <h6 className = 'm-0'> Country and Phone </h6> </Form.Label > 
            <PhoneInput international placeholder = "Enter phone number"
            name = "phone_no"
            country = { props.country }
            onCountryChange = { props.setCountry }
            value = { props.value }
            onChange = {
                props.setPhone
            }
            /> 
            <p id = "errorPhone"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            }> hey </p></Form.Group >
                    </div>
                </div>
            </div > )
    }

    function Learn3(props) {
        if (props.currentStep !== 3) {
            return null
        }
        return ( 
            <div >
            <div className='row'>
            <div className='col-lg-6'>
            <Form.Group className = " rounded-3 px-3" >
            <Form.Label > <h6 className = 'm-0' > Role </h6> </Form.Label > 
            <Form.Control
            type = "text"
            name = "role"
            onChange = { props.change2 }
            placeholder = "Editor, Presenter" /> 
            <p id = "errorRole"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            } > hey </p> </Form.Group ></div>
            <div className='col-lg-6'>
            <Form.Label > <h6 className = 'm-0'> Department </h6> </Form.Label> 
            <Form.Select name = "department_id"
            onChange = { props.change2 }> 
            {props.depts.map((d, id) => (
                <option value={d.id} key={id}>{d.name}</option>
            ))}
            </Form.Select > 
            <p id = "errorUserType"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            }> hey </p></div>
            </div>
            <div className='row mt-3'>
                <div className='col-lg-6'>
            <Form.Group className = " rounded-3 px-3" >
            <Form.Label > <h6 className = 'm-0' > Password </h6> </Form.Label > 
            <Form.Control
            type = {props.showpassword?"text":"password"}
            name = "password"
            onChange = { props.change }
            placeholder = "create a strong password" /> 
            <p id = "errorPassword"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            } > hey </p> </Form.Group ></div>
            <div className='col-lg-6'>
            <Form.Group className = " rounded-3" >
            <Form.Label > <h6 className = 'm-0' > Repeat Password </h6> </Form.Label > 
            <Form.Control
            type = {props.showpassword?"text":"password"}
            name = "confirmpassword"
            onChange = { props.change }
            placeholder = "confirm password" /> 
            <p id = "errorConfirmP"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            } > hey </p>
            <div className='my-1'
            key = "default-checkbox" >
                <Form.Check type='checkbox' id = "default-checkbox" label='Show Password' onClick={props.togglePassword}/></div> 
            </Form.Group >
                    </div>
                </div>
            </div> )
    }
    export default SignUp;