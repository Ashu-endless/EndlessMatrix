import { FC } from "react";

export const Defination:FC<{title:string,defination:string}> = ({title,defination})=>{
    return <div>
        <p>{title}</p>
        <span> {defination }</span>
    </div>
}


const d = {
    "name" :{
        title : "diagnal matrix",
        defination:"a matrix is said to be",
        
    }
}