// Fetch per ottenere tutte le Cards (GET)

import React,{useEffect, useState} from "react";
import { Container } from "react-bootstrap";

// Import Components
import MyNavbar from '../components/MyNavbar'
import Sidebar from "../components/Sidebar";

// Import React bootstrap



const ProgCardPage = () => {

    const user = JSON.parse(window.localStorage.getItem("user"))
    const [userCards, setUserCards] = useState()
    const [userPrograms, setUserPrograms] = useState()

    useEffect(() =>{

        fetch('../api/v2/userCards/'+user, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(),
        })
            .then((resp) => resp.json())
            .then(function(data) {
                // console.log(`Data: ${data}`);
                // console.log(data);
                setUserCards(data)
            })
            .catch(error => console.log(error))
        fetch('../api/v1/userPrograms/'+user, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(),
        })
            .then((resp) => resp.json())
            .then(function(data){
                // console.log("Ricezione di tutti i programmi")
                setUserPrograms(data)
            })
            .catch(error => console.log(error))
        

    }, [])
    return(
        <>
            <MyNavbar />
            <Container>
                <Sidebar 
                    userCards={userCards} 
                    setUserCards={setUserCards} 
                    userPrograms={userPrograms} 
                    setUserPrograms={setUserPrograms}
                />
            </Container>
            
        </>
    )
}

export default ProgCardPage;