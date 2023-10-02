/* eslint-disable react/jsx-pascal-case */
import { useRef, useState } from "react";
import { FC,} from "react";
import {  CaretRight } from "react-bootstrap-icons";
import { insertNewDependentMatrix, Matricesjson } from "../../App";
import DefaultTippy, { Option_Tippy } from "../defaults/DefaultTippy";
import { InputndBtn, TextndIcon } from "./style";

export const MultiplyOptions :FC<{json:Matricesjson,insertNewDependentMatrix:insertNewDependentMatrix;matrixName:string}> = ({json,insertNewDependentMatrix,matrixName})=>{
    
    const TransposeBtnRef = useRef<any>()
    const inverseBtnRef = useRef<any>();

    const [scalar, setscalar] = useState<number | undefined>(undefined)

    return <div className="tippy_div" style={{border:"1px solid grey",maxHeight:"45vh",overflow:"auto"}} >
                <DefaultTippy  onactiveMeclass="active-tippy-option"  placement="bottom" BtnRef={TransposeBtnRef} trigger={"click"}  content={<DependentOptions secondMatCode="transpose" calc="*" matrixName={matrixName} insertNewDependentMatrix={insertNewDependentMatrix}  json={json} />} >
        <Option_Tippy value={""}  activeOption={undefined} style={undefined} ref={undefined} TippyRef={undefined} hideafterSelect={undefined} >
            <TextndIcon>
            Transpose of <CaretRight/>

            </TextndIcon>
        </Option_Tippy>    
        </DefaultTippy>

        <DefaultTippy onactiveMeclass="active-tippy-option"  placement="bottom" BtnRef={inverseBtnRef} trigger={"click"}  content={<DependentOptions secondMatCode="inverse" calc="*" matrixName={matrixName} insertNewDependentMatrix={insertNewDependentMatrix}  json={json} />} >
        <Option_Tippy value={""}  activeOption={undefined} style={undefined} ref={undefined} TippyRef={undefined} hideafterSelect={undefined} >
            <TextndIcon>
            Inverse of <CaretRight/>

            </TextndIcon>
        </Option_Tippy>    
        </DefaultTippy>

        { Object.keys(json).map((name)=> <Option_Tippy key={name} onSelect={()=>{insertNewDependentMatrix(`${matrixName} * ${name_parenthesis(name)}`,[matrixName,"*",name])}}  value={name} > {name} </Option_Tippy> ) }
        <span className="or_btn" >OR</span>
        <p>scalar value</p>
        <InputndBtn>
        <input  onInput={(e:React.ChangeEvent<HTMLInputElement>)=>{setscalar(parseInt(e.target.value))}} type="number" name="" id="" />
        <span className="or_btn" onClick={()=>{ scalar && insertNewDependentMatrix(`${matrixName} * ${scalar}`,[matrixName,"*",scalar,"integer"],)}} > Go</span>
        </InputndBtn>
    </div>
}

export const PowerOptions :FC<{json:Matricesjson,insertNewDependentMatrix:insertNewDependentMatrix;matrixName:string}> = ({json,insertNewDependentMatrix,matrixName})=>{
    
    

    const [scalar, setscalar] = useState<number | undefined>(undefined)

    return <div className="tippy_div" style={{border:"1px solid grey",maxHeight:"45vh",overflow:"auto"}}>
        <p>scalar value</p>
        <InputndBtn>
        <input  onInput={(e:React.ChangeEvent<HTMLInputElement>)=>{setscalar(parseInt(e.target.value))}} type="number" name="" id="" />
        <span className="or_btn" onClick={()=>{ scalar && insertNewDependentMatrix(`${matrixName} ** ${scalar}`,[matrixName,"**",scalar,"integer"],)}} > Go</span>
        </InputndBtn>
    </div>
}



export const AddOptions :FC<{json:Matricesjson,insertNewDependentMatrix:insertNewDependentMatrix;matrixName:string}> = ({json,insertNewDependentMatrix,matrixName})=>{
    
    const TransposeBtnRef = useRef<any>()
    const inverseBtnRef = useRef<any>()

    return <div className="tippy_div" style={{border:"1px solid grey",maxHeight:"45vh",overflow:"auto"}}>

                        <DefaultTippy onactiveMeclass="active-tippy-option"  placement="bottom" BtnRef={TransposeBtnRef} trigger={"click"}  content={<DependentOptions secondMatCode="transpose" calc="+" matrixName={matrixName} insertNewDependentMatrix={insertNewDependentMatrix}  json={json} />} >
        <Option_Tippy value={""}  activeOption={undefined} style={undefined} ref={undefined} TippyRef={undefined} hideafterSelect={undefined} >
            <TextndIcon>
            Transpose of <CaretRight/>

            </TextndIcon>
        </Option_Tippy>    
        </DefaultTippy>

        <DefaultTippy onactiveMeclass="active-tippy-option"  placement="bottom" BtnRef={inverseBtnRef} trigger={"click"}  content={<DependentOptions secondMatCode="inverse" calc="+" matrixName={matrixName} insertNewDependentMatrix={insertNewDependentMatrix}  json={json} />} >
        <Option_Tippy value={""}  activeOption={undefined} style={undefined} ref={undefined} TippyRef={undefined} hideafterSelect={undefined} >
            <TextndIcon>
            Inverse of <CaretRight/>

            </TextndIcon>
        </Option_Tippy>    
        </DefaultTippy>

        { Object.keys(json).map((name)=> <Option_Tippy key={name} onSelect={()=>{insertNewDependentMatrix(`${matrixName} + ${name_parenthesis(name)}`,[matrixName,"+",name])}}  value={name} > {name} </Option_Tippy> ) }

    </div>
}
export const SubtractionOptions :FC<{json:Matricesjson,insertNewDependentMatrix:insertNewDependentMatrix;matrixName:string}> = ({json,insertNewDependentMatrix,matrixName})=>{
    
    const TransposeBtnRef = useRef<any>();
    const inverseBtnRef = useRef<any>()
    
    return <div className="tippy_div" style={{border:"1px solid grey",maxHeight:"45vh",overflow:"auto"}}>
                        <DefaultTippy onactiveMeclass="active-tippy-option"  placement="bottom" BtnRef={TransposeBtnRef} trigger={"click"}  content={<DependentOptions secondMatCode="transpose" calc="-" matrixName={matrixName} insertNewDependentMatrix={insertNewDependentMatrix}  json={json} />} >
        <Option_Tippy value={""}  activeOption={undefined} style={undefined} ref={undefined} TippyRef={undefined} hideafterSelect={undefined} >
            <TextndIcon>
            Transpose of <CaretRight/>

            </TextndIcon>
        </Option_Tippy>    
        </DefaultTippy>

        <DefaultTippy onactiveMeclass="active-tippy-option"  placement="bottom" BtnRef={inverseBtnRef} trigger={"click"}  content={<DependentOptions secondMatCode="inverse" calc="-" matrixName={matrixName} insertNewDependentMatrix={insertNewDependentMatrix}  json={json} />} >
        <Option_Tippy value={""}  activeOption={undefined} style={undefined} ref={undefined} TippyRef={undefined} hideafterSelect={undefined} >
            <TextndIcon>
            Inverse of <CaretRight/>

            </TextndIcon>
        </Option_Tippy>    
        </DefaultTippy>

        { Object.keys(json).map((name)=> <Option_Tippy key={name} onSelect={()=>{insertNewDependentMatrix(`${matrixName} - ${name_parenthesis(name)}`,[matrixName,"-",name])}}  value={name} > {name} </Option_Tippy> ) }

    </div>
}




export const DependentOptions :FC<{secondMatCode:"transpose" | "inverse" | "integer",json:Matricesjson,insertNewDependentMatrix:insertNewDependentMatrix;matrixName:string,calc:"+" | "-" |"*"}> = ({json,insertNewDependentMatrix,matrixName,secondMatCode,calc})=>{
    
    
    return <div className="tippy_div" style={{border:"1px solid grey",maxHeight:"45vh",overflow:"auto"}}>
        { Object.keys(json).map((name)=> <Option_Tippy hideafterSelect={undefined} key={name} onSelect={()=>{insertNewDependentMatrix(`${matrixName} ${calc} ${secondMatCode} of (${name_parenthesis(name)})`,[matrixName,calc,name,secondMatCode],)}}  value={name} > {name} </Option_Tippy> ) }

    </div>
}




function name_parenthesis(name:string){
    if(name.includes("+") || name.includes("-") ||name.includes("*") || name.includes("**")  ){
        // console.log("include")
        return `(${name})`
      }else{
          
          return name
      }

}