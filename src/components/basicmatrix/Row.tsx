import { FC, useEffect, useState } from "react";
import { MatrixConnectorJson } from "../../App";
import { fracStr } from "../../MatrixSol";
import { MatrixElement } from "./MatrixElement";
// import { MatrixElement } from "./style";

export const Row:FC<{row_:number[],index_:number,updateMatrix:Function,updateMatrixValues:Function,matrixJson:MatrixConnectorJson}> = ({row_,index_,updateMatrix,updateMatrixValues,matrixJson})=>{

    const [row, setrow] = useState(row_)



    useEffect(() => {
      setrow(row_)
    }, [row_])
    



    return <>
    {row.map((elem,index)=>
    // onFocus={(e:any)=>{console.log("focus");settemp_val(parseInt(e.target.value));e.target.value = ""}} onBlur={(e:any)=>{console.log("blur");e.target.value = temp_val}} disabled={!matrixJson.independent} key={`${index_},${index}`}
        // <MatrixElement  onInput={(e:any)=>{updateMatrix(index_,index,isNaN(e.target?.value) ? 0 : parseInt(e.target?.value))}}  data-index={`${index_},${index}`} value={elem}/>
        <MatrixElement new_={matrixJson.new} updateMatrix={updateMatrix} disabled={!(matrixJson.independent === true)} index={index} index_={index_}    val_={fracStr(elem)}/>
    
    )} 
    </>
}