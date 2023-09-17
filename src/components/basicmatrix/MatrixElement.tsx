import { FC, useEffect, useState } from "react"
import { MatrixElementInput } from "./style"

export const MatrixElement:FC<{val_:string|number,updateMatrix:Function,index_:number,index:number,disabled:boolean}> =({val_,updateMatrix,index_,index,disabled}) =>{


    const [val, setval] = useState(val_)


    // useEffect(() => {
    //   console.log(val)
    // }, [val])

    useEffect(() => {
        if(disabled){
            setval(val_)
        }
      }, [disabled, val_])
    

    function OnInput(value:string){
        if(value.startsWith("-")){
            // if(isNaN(parseFloat(value))){
            //     setval("-")
            //     updateMatrix(index_,index,0)
            // }
            let temp = value.substring(1);
            if(/^\d+$/.test(temp)){
                setval(value)
                updateMatrix(index_,index,parseFloat(value))
            }

            if(value.length === 1){
                setval("-")
                updateMatrix(index_,index,0)
            }
            // else{
            //     setval(val)
            // }
        }

        if(value === ""){
            setval("");
            updateMatrix(index_,index,0)
        }

        // if(!isNaN(parseFloat(value))){
        //     setval(value)  
        //     updateMatrix(index_,index,parseFloat(value))
        // }

        if(/^\d+$/.test(value)){
            setval(value)
            updateMatrix(index_,index,parseFloat(value))
        }
    }

    return<MatrixElementInput disabled={disabled} 
    // onKeyDown={(e:any)=>{if(e.keycode === 38){ setval(parseFloat(e.target.value) + 1) }}} 
    onBlur={(e:React.ChangeEvent<HTMLInputElement>)=>{if(val === "" || val=== "-" ){setval("0")}}} 
    data-index={`${index_},${index}`} type={"text"} value={val}  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{OnInput(e.target.value)}} />
}