import react from "react";

// Import Icons
import ReactDOM from 'react-dom'

const SideRow = ({title}) =>{

    const editHandler = () =>{
        console.log("Edit handler");
    }

    const deleteHandler = () =>{
        console.log("Delete handler");
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