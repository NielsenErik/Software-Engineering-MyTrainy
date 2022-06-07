import React,{useState, useEffect} from "react";

import MyNavbar from "../components/MyNavbar";
import MyCalendar from "../components/MyCalendar";


import MyTrainyHome from "./MyTrainyHome";

import { useNavigate } from "react-router-dom";



const CalendarPage = ({token}) =>{

    const navigate = useNavigate()
    const user = JSON.parse(window.localStorage.getItem("user"))
    const userToken = JSON.parse(window.localStorage.getItem("token"))

    const [userCards, setUserCards] = useState();
    /* Array of objects which contains
    [i]
        {
            date: data da svolgere l'allenamento,
            self: penso sia l'id, non serve per ora,
            sport: sport riguardante la scheda,
            title: titolo della scheda,
        }
    */

    useEffect(() =>{
        // console.log("Use Effect activated");
        fetch("../api/v1/users/me?token="+userToken)
        .then(resp => resp.json())
        .then(data => {
            // console.log(data);
            if(data.success === false){
                navigate('/login')
                window.location.reload()
            }
        })
        .catch((error) => {console.log("Errore richiesta token");console.log(error)})
        // Get all User's cards
        fetch(`../api/v2/userCards/${user}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(),
                })
            .then((resp) => resp.json())
            .then(function(data) {
                // console.log(data);
                setUserCards(data);
            })
    }, [])
    // console.log(userCards);
    // const [cardsLenght, setCardsLegght] = useState(userCards.length)
    // console.log(user);
    return(
        <div className="calendar-page">
            <MyNavbar/>
            <MyCalendar userCards={userCards}/>
        </div>
    )
}

export default CalendarPage;