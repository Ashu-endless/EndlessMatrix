import { FC, useEffect, useState } from "react";
import { MatrixElement } from "./style";

export const Row:FC<{row_:number[],index_:number,updateMatrix:Function}> = ({row_,index_,updateMatrix})=>{

    const [row, setrow] = useState(row_)


    useEffect(() => {
      setrow(row_)
    }, [row_])
    


    return <>
    {row.map((elem,index)=>
        <MatrixElement key={`${index_},${index}`} onInput={(e:any)=>{updateMatrix(index_,index,parseInt(e.target?.value))}}  data-index={`${index_},${index}`} value={elem}/>
    )} 
    </>
}