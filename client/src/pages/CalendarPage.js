import react,{useState, useEffect} from "react";

import MyNavbar from "../components/MyNavbar";
import MyCalendar from "../components/MyCalendar";
import useLocalStorage from '../useLocalStorage';

const CalendarPage = () =>{

    const user = JSON.parse(window.localStorage.getItem("user"))

    const [userCards, setUserCards] = useState();
    /* Array of objects which contains
    [i]
        {
            date,
            self,
            sport,
            title,
        }
    */

    useEffect(() =>{
        // console.log("Use Effect activated");
        // Get all User's cards
        fetch(`http://localhost:3000/api/v1/userCards/${user}`, {
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
            <MyCalendar />
        </div>
    )
}

export default CalendarPage;