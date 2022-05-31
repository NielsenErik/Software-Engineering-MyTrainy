import react,{useEffect, useState} from "react";
import { Container } from "react-bootstrap";

// Import Components
import MyNavbar from '../components/MyNavbar'
import Sidebar from "../components/Sidebar";

// Import React bootstrap



const ProgCardPage = () => {

    const user = JSON.parse(window.localStorage.getItem("user"))
    const [userCards, setUserCards] = useState()

    useEffect(() =>{
        fetch(`http://localhost:3000/api/v1/userCards/${user}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(),
                    })
                .then((resp) => resp.json())
                .then(function(data) {
                    // console.log(data);
                    setUserCards(data)
                })
    }, [])
    return(
        <>
            <MyNavbar />
            <Container>
                <Sidebar userCards={userCards} setUserCards={setUserCards}/>
            </Container>
            
        </>
    )
}

export default ProgCardPage;