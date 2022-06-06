// Fetch per eliminare una Card (DELETE)

import React from "react";

// Import Icons
import ReactDOM from 'react-dom'

const SideRow = ({title, obj, counter, setLastCreated, type}) =>{

    const deleteCardHandler = (e) =>{
        e.preventDefault()

        console.log(obj.self);

        fetch('../'+obj.self, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(),
        })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data){
            alert(`Card ${title}:${obj.title} deleted`)
            window.location.reload()
        })
        .catch(error => alert(error))
    }

    const deleteProgramHandler = () =>{
        // console.log("programDeleteHandler");
        fetch('../'+obj.self, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(),
        })
        .then((resp) => resp.json())
        .then(function(data){
            alert(`Program ${title}:${obj.title} deleted`)
            window.location.reload()
        })
    }

    return(
        <div>
            <div style={{display: "inline-block"}} onClick={
                (e) =>{
                    // console.log(counter);
                    setLastCreated(`${type}${counter}`)
                }
            }>
                <p>{title}</p>
            </div>
            <div style={{display: "inline-block"}}>
                {
                    type === 'card'
                    ?
                    <i className="bi bi-trash3" style={{cursor: "pointer"}} onClick={deleteCardHandler}></i>
                    :
                    ""
                }
                {
                    type === 'program'
                    ?
                    <i className="bi bi-trash3" style={{cursor: "pointer"}} onClick={deleteProgramHandler}></i>
                    :
                    ""
                }
            </div>
        </div>
    )
}

export default SideRow;