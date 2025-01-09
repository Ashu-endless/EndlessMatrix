import { FC, useEffect, useState } from "react"
import { MatrixElementInput } from "./style"

export const MatrixElement:FC<{new_:boolean,val_:string|number,updateMatrix:Function,index_:number,index:number,disabled:boolean}> =({val_,updateMatrix,index_,index,disabled,new_}) =>{


    const [val, setval] = useState(new_ ? "" : val_ )


    // useEffect(() => {
    //   console.log(val)
    // }, [val])

    useEffect(() => {
        if(disabled){
            setval(val_)
        }
      }, [disabled, val_])
    

    // function OnInput(value:string){
    //     if(value.startsWith("-")){
    //         // if(isNaN(parseFloat(value))){
    //         //     setval("-")
    //         //     updateMatrix(index_,index,0)
    //         // }
    //         let temp = value.substring(1);
    //         if(/^\d+$/.test(temp)){
    //             setval(value)
    //             updateMatrix(index_,index,parseFloat(value))
    //         }

    //         if(value.length === 1){
    //             setval("-")
    //             updateMatrix(index_,index,0)
    //         }
    //         // else{
    //         //     setval(val)
    //         // }
    //     }

    //     if(value === ""){
    //         setval("");
    //         updateMatrix(index_,index,0)
    //     }

    //     // if(!isNaN(parseFloat(value))){
    //     //     setval(value)  
    //     //     updateMatrix(index_,index,parseFloat(value))
    //     // }

    //     if(/^\d+$/.test(value)){
    //         setval(value)
    //         updateMatrix(index_,index,parseFloat(value))
    //     }
    // }

    function OnInputany(value:string){

        if(value.includes("/")){
            let n = parseInt(value.split("/")[0])
            let d = parseInt(value.split("/")[1])
            // console.log(n/d)
            if(!isNaN(n/d)){
                // console.log(n,d)
                updateMatrix(index_,index,n/d)
            }
            // math.numeric("0.67","Fraction")
        }else{

            
            if(isNaN(parseFloat(value))){
            }else{
                updateMatrix(index_,index,parseFloat(value))
            }
        }
        setval(value)
            
    }

    return<MatrixElementInput key={`${index_},${index}`} disabled={disabled} 
    // onKeyDown={(e:any)=>{if(e.keycode === 38){ setval(parseFloat(e.target.value) + 1) }}} 
    onBlur={(e:React.ChangeEvent<HTMLInputElement>)=>{if(val === "" || val=== "-" ){setval("0");updateMatrix(index_,index,0)}}} 
    data-index={`${index_},${index}`} type={"text"} value={val}  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{OnInputany(e.target.value)}} />
}