import { FC, useEffect, useState } from "react";
import { MatrixConnectorJson } from "../../App";
import { MatrixElement } from "./style";

export const Row:FC<{row_:number[],index_:number,updateMatrix:Function,updateMatrixValues:Function,matrixJson:MatrixConnectorJson}> = ({row_,index_,updateMatrix,updateMatrixValues,matrixJson})=>{

    const [row, setrow] = useState(row_)


    useEffect(() => {
      setrow(row_)
    }, [row_])
    


    return <>
    {row.map((elem,index)=>
        <MatrixElement disabled={!matrixJson.independent} key={`${index_},${index}`} onInput={(e:any)=>{updateMatrix(index_,index,parseInt(e.target?.value))}}  data-index={`${index_},${index}`} value={elem}/>
    )} 
    </>
}