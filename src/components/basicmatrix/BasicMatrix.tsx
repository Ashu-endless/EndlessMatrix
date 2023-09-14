/* eslint-disable react/jsx-pascal-case */
import React,{ FC, LegacyRef, ReactElement, ReactHTMLElement, useEffect, useRef, useState } from "react";
import { Row } from "./Row";
import { ColumnAddBtn, MatrixDiv, MatrixElementsDiv, MatrixRCDiv, MatrixSolDiv, MatrixSolOptions, RowAddBtn,  } from "./style";
import { matrix, MatrixSol } from "../../MatrixSol";
import {PlusLg,DashLg,Calculator,ArrowsMove} from "react-bootstrap-icons"
import { MatrixConnectorJson } from "../../App";
// import Moveable from "react-moveable";
import {useXarrow} from "react-xarrows"
import Draggable from 'react-draggable';
import DefaultTippy,{Option_Tippy} from "../defaults/DefaultTippy";
import { AddOptions, MultiplyOptions, SubtractionOptions } from "./MatrixCalcOptions";

export const BasicMatrix:FC<{json:{[key:string] : MatrixConnectorJson},matrixJson:MatrixConnectorJson,UpdateMatrixRefs?:Function,insertNewMatrix:Function,updateMatrixValues:Function,setconnection?:Function,insertNewDependentMatrix:Function,zoom:string}> = ({matrixJson,UpdateMatrixRefs,insertNewMatrix,updateMatrixValues,setconnection,json,insertNewDependentMatrix,zoom})=>{
    const updateXarrow = useXarrow()
    const [matrix, setmatrix] = useState(matrixJson.matrix)
    const [matrixSol, setmatrixSol] = useState(Array.isArray(matrixJson.matrix) ? MatrixSol(matrixJson.matrix) : undefined)
    const [grid_row_css, setgrid_row_css] = useState(`1fr 1fr`)
    const [grid_column_css, setgrid_column_css] = useState(`1fr 1fr`)
    const [nav_option, setnav_option] = useState("determinant")
    const [pos, setpos] = useState(matrixJson.pos)
    const TippyBtnRef = useRef()
    // const [dragging, setdragging] = useState(false)
    // const [frame, setFrame] = useState({
    //     translate: [0, 0],
    //     rotate: 0,
    //     transformOrigin: "50% 50%",
    //   });

    

    const DragTargetRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
      setmatrix(matrixJson.matrix)
      console.log(matrixJson.matrix)
    }, [matrixJson.matrix])


    useEffect(() => {
        setpos(matrixJson.pos)
      }, [matrixJson.pos])

    useEffect(() => {
        console.log(matrix)
        
      setmatrixSol(Array.isArray(matrix) ? MatrixSol(matrix) : undefined)

        if(Array.isArray(matrix)){

        let grid_column = ``
        for (let i = 0; i < MatrixSol(matrix).columnsCount;i++) {
            grid_column = grid_column.concat(" 1fr")
        }
        setgrid_column_css(grid_column)
        let grid_row = ``
        for (let i = 0; i < MatrixSol(matrix).rowCount;i++) {
            grid_row = grid_row.concat(" 1fr")
        }
        // console.log(grid_row)
        setgrid_row_css(grid_row)}
        // updateMatrixValues(matrixJson.name,matrix)
    }, [matrix])


    useEffect(() => {
        UpdateMatrixRefs && UpdateMatrixRefs(matrixJson.name,DragTargetRef)
    }, [])
    
    


    




    function updateMatrix(rowIndex:number,columnIndex:number,value:number){
        let temp = [...(matrix as matrix)]
        temp[rowIndex][columnIndex] = value
        console.log(temp)
        // setmatrix(temp)
        updateMatrixValues(matrixJson.name,temp)

    }

    function addRow(){
        let temp = [...(matrix as matrix)]
        let new_row = []
        if(matrixSol !== undefined){
        while (new_row.length !== (matrixSol).columnsCount) {
            new_row.push(0)
        }}

        temp.push(new_row)
        // setmatrix(temp)
        updateMatrixValues(matrixJson.name,temp)
    }
    function deleteRow(){
        let temp = [...(matrix as matrix)]
        // let new_row = []
        // while (new_row.length !== matrixSol.columnsCount) {
        //     new_row.push(0)
        // }

        // temp.push(new_row)
        temp.pop()
        // setmatrix(temp)
        updateMatrixValues(matrixJson.name,temp)
    }
    
    function addColumn(){
        const temp = JSON.parse(JSON.stringify(matrix));
        // console.log(temp)
        // console.log(JSON.parse(JSON.stringify(temp)))
        for(let row of temp){
            row.push(0)
        }

        // console.log(temp)

        // setmatrix(temp)
        updateMatrixValues(matrixJson.name,temp)
    }
    function deleteColumn(){
        const temp =[...(matrix as matrix)]
        // console.log(temp)
        // console.log(JSON.parse(JSON.stringify(temp)))
        for(let row of temp){
            row.pop()
        }

        // console.log(temp)

        // setmatrix(temp)
        updateMatrixValues(matrixJson.name,temp)
    }

    function CalcOptionOnMount(){
        for(let el of document.querySelectorAll(".matrix-div") as unknown as []){
            (el as any).style.zIndex = "1"
        }

        let md = document.querySelector(`#${matrixJson.name}`) 
        if(md){
        (md as any).style.zIndex = "2"

        }

    }

    
    


    return   <>
    <Draggable
        axis="both"
        defaultPosition={{x: 0, y: 0}}
        position={undefined}
        handle={".handle"}
        // grid={[25, 25]}
        scale={parseInt(zoom)/100}
        onStart={()=>{console.log("drag");DragTargetRef.current && DragTargetRef.current.classList.add("dragging_matrix")}}
        onDrag={()=>{updateXarrow();DragTargetRef.current && DragTargetRef.current.classList.add("dragging_matrix")}}
        onStop={()=>{DragTargetRef.current && DragTargetRef.current && DragTargetRef.current.classList.remove("dragging_matrix")}}
        
    >


    <MatrixDiv  className="matrix-div"  ref={(DragTargetRef as LegacyRef<HTMLDivElement>)} id={matrixJson.name} style={{left:pos.x,top:pos.y,position:matrixJson.independent ? "absolute" : "relative"}} >
    <textarea className="classic" defaultValue={matrixJson.name} />
    {/* display:matrixJson.independent ? "block" : "none" */}
    <span onTouchStart={()=>{DragTargetRef.current && DragTargetRef.current.classList.add("dragging_matrix")}} onClick={()=>{DragTargetRef.current && DragTargetRef.current.classList.add("dragging_matrix")}} onMouseLeave={()=>{DragTargetRef.current && DragTargetRef.current.classList.remove("dragging_matrix")}} onMouseOver={()=>{DragTargetRef.current && DragTargetRef.current.classList.add("dragging_matrix")}} className="handle" style={{position: 'absolute',top: '5px',right: '5px',fontSize: 'xx-large',cursor: 'grab',}}> <ArrowsMove/>  </span>
    
    
   {Array.isArray(matrix) && matrixSol !== undefined ? 

    <>
    <MatrixRCDiv>

        <MatrixElementsDiv style={{gridTemplateColumns:grid_column_css,gridTemplateRows:grid_row_css}} >
        
        {matrix.map((row,index)=>
            <Row matrixJson={matrixJson} updateMatrixValues={updateMatrixValues} updateMatrix={updateMatrix} key={index} index_={index} row_={row} />
        )}


        </MatrixElementsDiv>

        <RowAddBtn> 
            <span> row </span> 
            {!matrixJson.independent ? <></> : 
            <>
            <span> <PlusLg onClick={addRow} /> </span>
            <span> <DashLg onClick={deleteRow}/> </span>
            </>
            }
        </RowAddBtn>


        <ColumnAddBtn> 
            <span>column</span> 
            {!matrixJson.independent ? <></> : 
            <>
            <span> <PlusLg onClick={addColumn} /> </span>
            <span> <DashLg onClick={deleteColumn}/> </span>   
            </>
            } 
        </ColumnAddBtn>
        {matrixJson.independent ?  
            <DefaultTippy onMount={CalcOptionOnMount} BtnRef={TippyBtnRef} content={<MatrixCalcOptions matrixName={matrixJson.name} insertNewDependentMatrix={insertNewDependentMatrix} json={json} insertNewMatrix={insertNewMatrix} />}   >
            {/* onClick={()=>{ insertNewMatrix && insertNewMatrix("product of A and C",["A","*","B"]) ; setconnection && setconnection([["A","B"],["B","product of A and C"]]) }}  */}
        <span style={{display: 'grid',justifyContent: 'center',alignItems: 'center',color: '#add8e6',fontSize: 'x-large'}} >

        <Calculator   />
        </span>
            </DefaultTippy> : <></>}
    
    </MatrixRCDiv>
    <MatrixSolDiv>
        <MatrixSolOptions>
            <li className={nav_option === "determinant" ? "active" : ""} onClick={()=>{setnav_option("determinant")}} > determinant </li>
            <li className={nav_option === "transpose" ? "active" : ""} onClick={()=>{setnav_option("transpose")}} > transpose </li>
            <li className={nav_option === "inverse" ? "active" : ""} onClick={()=>{setnav_option("inverse")}} > inverse </li>
            <li className={nav_option === "rank" ? "active" : ""} onClick={()=>{setnav_option("rank")}} > rank </li>
            {/* <li> cofactor </li>
            <li> minor </li> */}
        </MatrixSolOptions>



        <div style={{position:"relative"}} >
            {nav_option === "determinant" ? <span>{matrixSol.determinant()}</span> : <></> }
            {nav_option === "rank" ? <span>{matrixSol.rank()}</span> : <></> }
            {nav_option === "transpose" ? <BasicMatrix zoom={zoom} insertNewDependentMatrix={insertNewDependentMatrix} json={json} insertNewMatrix={insertNewMatrix} key={"two"} updateMatrixValues={updateMatrixValues} matrixJson={{name:`transpose of ${matrixJson.name}`,matrix:matrixSol.transpose(),pos:{x:0,y:0},independent:false}} />  : <></> }
            {nav_option === "inverse" && typeof(matrixSol.inverse()) === "string"  ? <span>{matrixSol.inverse()}</span>  : <></> }
            {nav_option === "inverse" && typeof(matrixSol.inverse()) != "string"  ? <BasicMatrix zoom={zoom} insertNewDependentMatrix={insertNewDependentMatrix} json={json} insertNewMatrix={insertNewMatrix} updateMatrixValues={updateMatrixValues} key={"two"} matrixJson={{name:`inverse of ${matrixJson.name}`,matrix:matrixSol.inverse(),pos:{x:0,y:0},independent:false}} />  : <></> }
            
        </div>
    </MatrixSolDiv>
    </>
    :
    <p>{matrix}</p> 
}
    </MatrixDiv> 
    </Draggable>
    </>

}




 
const MatrixCalcOptions: FC<{json:{[key:string] : MatrixConnectorJson},insertNewMatrix:Function,insertNewDependentMatrix:Function,matrixName:string}> = ({json,insertNewMatrix,insertNewDependentMatrix,matrixName}) => {
    
    const MulBtnRef = useRef()
    
    return ( <div className="tippy_div" >
        <p className="title" >Calculation</p>
        {/* {Object.keys()} */}
        <DefaultTippy BtnRef={MulBtnRef} content={<MultiplyOptions matrixName={matrixName} insertNewDependentMatrix={insertNewDependentMatrix}  json={json} />} >
        <Option_Tippy value={""}  activeOption={undefined} style={undefined} ref={undefined} TippyRef={undefined} hideafterSelect={undefined} >
            Multiply with
        </Option_Tippy>    
        </DefaultTippy>
        <DefaultTippy BtnRef={MulBtnRef} content={<AddOptions matrixName={matrixName} insertNewDependentMatrix={insertNewDependentMatrix}  json={json} />} >
        <Option_Tippy value={""}  activeOption={undefined} style={undefined} ref={undefined} TippyRef={undefined} hideafterSelect={undefined} >
            Add
        </Option_Tippy>    
        </DefaultTippy>
        <DefaultTippy BtnRef={MulBtnRef} content={<SubtractionOptions matrixName={matrixName} insertNewDependentMatrix={insertNewDependentMatrix}  json={json} />} >
        <Option_Tippy value={""}  activeOption={undefined} style={undefined} ref={undefined} TippyRef={undefined} hideafterSelect={undefined} >
            Subtract
        </Option_Tippy>    
        </DefaultTippy>

    </div> );
}
 