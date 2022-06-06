import React, {useState, Component} from "react"

import { useNavigate } from "react-router-dom";

import CalendarPage from "./CalendarPage";

import NavPreReg from "../components/NavPreReg";

// Import Logo
import logo from '../media/logo.svg'

import {
    Form, 
    Button,
    ButtonGroup, 
    Container,
    ToggleButton
} from 'react-bootstrap'

// Select component to choose the sport
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated()



const RegistrationPage = ({loggedUser, setLoggedUser, setToken, setPage}) =>{

    const navigate = useNavigate()

    // User type selection
    const [userValue, setUserValue] = useState('1');
    const userType = [
        { name: 'Athlete', value: '1' },
        { name: 'Trainer', value: '2' },
    ];
    // Sport options
    const sportOptions = [
        {value: 'calcio', label:'Calcio'},
        {value: 'atletica', label:'Atletica'},
        {value: 'palestra', label:'Palestra'},
        {value: 'zapping', label:'Zapping'},
    ]
    // Info required for registration
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkPwd, setCheckPwd] = useState("");


    
    // Registration function
    const registration = (e) =>{
        e.preventDefault();

        if(password !== checkPwd){
            return ;
        }

        fetch('../api/v1/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { email: email, password: password, userType: userType[0].name } ),
        })
            .then(res => res.json())
            .then(function(data) {

                console.log(data);
                if(data.success){
                    // const newUser ={
                    //     email: data.email,
                    //     id: data.id,
                    //     self: data.self,
                    //     token: setToken(data.token)
                    // }
                    // setLoggedUser(newUser)
                    // console.log("Registrazione avvenuta. Redirect to Calendar page");
                    setLoggedUser(data.id)
                    setPage(<CalendarPage/>)
                    navigate('/calendar')
                    // console.log("Set page avvenuto");

                }

                // loggedUser.id = loggedUser.self.substring(loggedUser.self.lastIndexOf('/') + 1);
                // document.getElementById("newUser").innerHTML = "Created";
                return;
            })
            .catch( error => console.error(error) ); // If there is any error you will catch them here
            
    }

    return(
        <>
            <NavPreReg />
            <Container className='d-flex justify-content-center align-items-center' style={{height: "70vh"}}>
                <div>
                    <Form onSubmit={registration}>
                        <img src={logo} alt="logo"/>
                        <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Confirm password" onChange={(e) => setCheckPwd(e.target.value)}/>
                        </Form.Group>
                        <ButtonGroup className="mb-2 d-flex justify-content-center">
                            {userType.map((user, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`user-${idx}`}
                                type="radio"
                                variant="outline-secondary"
                                name="radio"
                                value={user.value}
                                checked={userValue === user.value}
                                onChange={(e) => setUserValue(e.currentTarget.value)}
                            >
                                {user.name}
                            </ToggleButton>
                            ))}
                        </ButtonGroup>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">    
                            {/* React select */}
                            {userValue === '2' ? <Select options={sportOptions} components={animatedComponents} placeholder="Sport" isMulti/> : <></>}
                            {/* <Select 
                                options={sportOptions}
                                components={animatedComponents}
                                placeholder="Sport"
                                isMulti
                            /> */}
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex justify-content-center" controlId="formBasicCheckbox">
                            <Button variant="primary" type="submit" className="text-light" >
                                Registrati
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
            </Container>

        </>



    )
}

export default RegistrationPage;