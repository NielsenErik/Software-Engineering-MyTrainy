import React from "react"
import { Card, Button } from "react-bootstrap";



const MySmallCard = ({title, description, start, end, day}) =>{

    return(
            <Card style={{ width: '18rem', display: "inline-block" }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle>{`Giorno: ${day}`}</Card.Subtitle>
                    <Card.Subtitle>{`Inizio: ${start}`}</Card.Subtitle>
                    <Card.Subtitle>{`Fine: ${end}`}</Card.Subtitle>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <div>
                        <Button variant="primary" style={{color: "white"}}>Delete</Button>
                    </div>
                </Card.Body>
            </Card>
    )
}

export default MySmallCard;