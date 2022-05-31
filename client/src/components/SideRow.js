import react from "react";

// Import Icons
import ReactDOM from 'react-dom'

const SideRow = ({title, obj}) =>{

    const editHandler = () =>{
        console.log("Edit handler");
    }

    const deleteHandler = (e) =>{
        // alert(`title: ${title} id: ${obj.self}`)
        e.preventDefault();
        fetch('http://localhost:3000'+obj.self, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(),
        })
        .then(function(data){
            alert(`Card ${title}:${obj.self} deleted`)
            window.location.reload()
        })
        .catch(error => alert(error))
    }
    return(
        <div>
            <div style={{display: "inline-block"}}>
                <p>{title}</p>
            </div>
            <div style={{display: "inline-block"}}>
                <i className="bi bi-pencil-square" style={{cursor: "pointer"}} onClick={editHandler}></i>
                <i className="bi bi-trash3" style={{cursor: "pointer"}} onClick={deleteHandler}></i>
            </div>
        </div>
    )
}

export default SideRow;