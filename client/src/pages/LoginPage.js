import React,{useState, useEffect} from "react"
import {Form, Button, Container} from 'react-bootstrap'

import logo from '../media/logo.svg'
import CalendarPage from "./CalendarPage";
import NavPreLog from "../components/NavPreLog";
import RegistrationPage from "./RegistrationPage";
import { useNavigate } from "react-router-dom";

const LoginPage = ({loggedUser , setLoggedUser, token, setToken, page, setPage}) =>{

    // const [token, setToken] = useState();

    const navigate = useNavigate();
    
    // Form state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const authentication = (e) =>{
        e.preventDefault();

        fetch('../api/v1/authentications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { email: email, password: password } ),
        })
        .then((resp) => resp.json()) // Transform the data into json
        .then(data => { // Here you get the data to modify as you please
            //console.log(data);
            // console.log(data);
            if(data.success){
                setLoggedUser({
                    id: data.id,
                    email: setEmail(data.email),
                    token: setToken(data.token),
                })
                console.log("Login avvenuto. Redirect to Calendar page");
                setLoggedUser(data.id)
                setPage(<CalendarPage/>)
                navigate('/calendar')
                console.log("Set page avvenuto");
                
            } else{
                alert(data.message)
            }
        })
        .catch( error => console.error(`Errore nell'autenticazione ${error}`) ); // If there is any error you will catch them here
    }  

    

    return(
        <>
            <NavPreLog />
            <Container className='d-flex justify-content-center align-items-center' style={{height: "70vh"}}>
                <div>
                    <Form onSubmit={authentication}>
                        <img src={logo} alt="logo"/>
                        <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex justify-content-center" controlId="formBasicCheckbox">

                            <Button variant="primary" type="submit" className="text-light" >
                                Accedi
                            </Button>

                        </Form.Group>
                    </Form>
                </div>
            </Container>
        </>
    )
}

export default LoginPage;