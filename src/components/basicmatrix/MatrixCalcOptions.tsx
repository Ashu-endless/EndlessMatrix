/* eslint-disable react/jsx-pascal-case */
import { useState } from "react";
import { FC,} from "react";
import { Matricesjson } from "../../App";
import { Option_Tippy } from "../defaults/DefaultTippy";
import { InputndBtn } from "./style";

export const MultiplyOptions :FC<{json:Matricesjson,insertNewDependentMatrix:Function;matrixName:string}> = ({json,insertNewDependentMatrix,matrixName})=>{
    
    

    const [scalar, setscalar] = useState<number | undefined>(undefined)

    return <div className="tippy_div">
        { Object.keys(json).map((name)=> <Option_Tippy key={name} onSelect={()=>{insertNewDependentMatrix(`${matrixName} * ${name_parenthesis(name)}`,[matrixName,"*",name])}}  value={name} > {name} </Option_Tippy> ) }
        <span className="or_btn" >OR</span>
        <p>scalar value</p>
        <InputndBtn>
        <input  onInput={(e:React.ChangeEvent<HTMLInputElement>)=>{setscalar(parseInt(e.target.value))}} type="number" name="" id="" />
        <span className="or_btn" onClick={()=>{ scalar && insertNewDependentMatrix(`${matrixName} * ${scalar}`,[matrixName,"*",scalar])}} > Go</span>
        </InputndBtn>
    </div>
}

export const PowerOptions :FC<{json:Matricesjson,insertNewDependentMatrix:Function;matrixName:string}> = ({json,insertNewDependentMatrix,matrixName})=>{
    
    

    const [scalar, setscalar] = useState<number | undefined>(undefined)

    return <div className="tippy_div">
        <p>scalar value</p>
        <InputndBtn>
        <input  onInput={(e:React.ChangeEvent<HTMLInputElement>)=>{setscalar(parseInt(e.target.value))}} type="number" name="" id="" />
        <span className="or_btn" onClick={()=>{ scalar && insertNewDependentMatrix(`${matrixName} ** ${scalar}`,[matrixName,"**",scalar])}} > Go</span>
        </InputndBtn>
    </div>
}



export const AddOptions :FC<{json:Matricesjson,insertNewDependentMatrix:Function;matrixName:string}> = ({json,insertNewDependentMatrix,matrixName})=>{
    
    
    return <div className="tippy_div">
        { Object.keys(json).map((name)=> <Option_Tippy key={name} onSelect={()=>{insertNewDependentMatrix(`${matrixName} + ${name_parenthesis(name)}`,[matrixName,"+",name])}}  value={name} > {name} </Option_Tippy> ) }

    </div>
}
export const SubtractionOptions :FC<{json:Matricesjson,insertNewDependentMatrix:Function;matrixName:string}> = ({json,insertNewDependentMatrix,matrixName})=>{
    
    
    return <div className="tippy_div">
        { Object.keys(json).map((name)=> <Option_Tippy key={name} onSelect={()=>{insertNewDependentMatrix(`${matrixName} - ${name_parenthesis(name)}`,[matrixName,"-",name])}}  value={name} > {name} </Option_Tippy> ) }

    </div>
}

function name_parenthesis(name:string){
    console.log(name)
    if(name.includes("+") || name.includes("-") ||name.includes("*") || name.includes("**")  ){
        console.log("include")
        return `(${name})`
      }else{
          
          return name
      }

}