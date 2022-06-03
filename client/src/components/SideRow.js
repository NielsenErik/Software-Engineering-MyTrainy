// Fetch per eliminare una Card (DELETE)

import React from "react";

// Import Icons
import ReactDOM from 'react-dom'

const SideRow = ({title, obj, counter, setLastCreated, type}) =>{

    const deleteHandler = (e) =>{
        e.preventDefault()
        fetch('http://localhost:3000'+obj.self, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(),
        })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data){
            alert(`Card ${title}:${obj.self} deleted`)
            window.location.reload()
        })
        .catch(error => alert(error))
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
                {/* <i className="bi bi-pencil-square" style={{cursor: "pointer"}} onClick={editHandler}></i> */}
                <i className="bi bi-trash3" style={{cursor: "pointer"}} onClick={deleteHandler}></i>
            </div>
        </div>
    )
}

export default SideRow;