/* eslint-disable react/jsx-pascal-case */
import React,{ FC, LegacyRef,  useEffect, useRef, useState } from "react";
import { Row } from "./Row";
import { CalcBtn, ColumnAddBtn, MatrixDiv, MatrixElementsDiv, MatrixRCDiv, MatrixSolDiv, MatrixSolOptions, NameAndDelIco, RowAddBtn,  } from "./style";
import { fracStr, matrix, MatrixSol } from "../../MatrixSol";
import {PlusLg,DashLg,Calculator,ArrowsMove, Trash, ArrowDown, ArrowUp} from "react-bootstrap-icons"
import { MatrixConnectorJson } from "../../App";
// import Moveable from "react-moveable";
import Draggable from 'react-draggable';
import DefaultTippy,{Option_Tippy} from "../defaults/DefaultTippy";
import { AddOptions, MultiplyOptions, PowerOptions, SubtractionOptions } from "./MatrixCalcOptions";
import {useXarrow} from "react-xarrows";
import Swal from 'sweetalert2';
import { deleteMatrix } from "../Types";

export const BasicMatrix:FC<{json:{[key:string] : MatrixConnectorJson},matrixJson:MatrixConnectorJson,UpdateMatrixRefs?:Function,insertNewMatrix:Function,updateMatrixValues:Function,setconnection?:Function,insertNewDependentMatrix:Function,zoom:string,MatrixRefs:{},deleteMatrix:deleteMatrix}> = ({matrixJson,UpdateMatrixRefs,insertNewMatrix,updateMatrixValues,setconnection,json,insertNewDependentMatrix,zoom,MatrixRefs,deleteMatrix})=>{
    const [matrix, setmatrix] = useState(matrixJson.matrix)
    const [matrixSol, setmatrixSol] = useState(Array.isArray(matrixJson.matrix) ? MatrixSol(matrixJson.matrix) : undefined)
    const [grid_row_css, setgrid_row_css] = useState(`1fr 1fr`)
    const [grid_column_css, setgrid_column_css] = useState(`1fr 1fr`)
    const [nav_option, setnav_option] = useState("determinant")
    const [pos, setpos] = useState(matrixJson.pos)
    const [Isnew, setIsnew] = useState(true)
    const TippyBtnRef = useRef()

    const updateXarrow = useXarrow();
    // const [dragging, setdragging] = useState(false)
    // const [frame, setFrame] = useState({
    //     translate: [0, 0],
    //     rotate: 0,
    //     transformOrigin: "50% 50%",
    //   });

    

    const DragTargetRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
      setmatrix(matrixJson.matrix)
    //   console.log(matrixJson.matrix)
    }, [matrixJson.matrix])


    useEffect(() => {
        setpos(matrixJson.pos)
      }, [matrixJson.pos])

    useEffect(() => {
        // console.log(matrix)
        
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

        CalcOptionOnMount();
        setTimeout(() => {
            setIsnew(false)
        }, 600);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])




    
    


    




    function updateMatrix(rowIndex:number,columnIndex:number,value:number){
        let temp = [...(matrix as matrix)]
        temp[rowIndex][columnIndex] = value
        console.log(temp)
        // setmatrix(temp)
        updateMatrixValues(matrixJson.name,temp,)

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
        if(matrixJson.matrix.length !== 1){
        let temp = [...(matrix as matrix)]
        // let new_row = []
        // while (new_row.length !== matrixSol.columnsCount) {
        //     new_row.push(0)
        // }

        // temp.push(new_row)
        temp.pop()
        // setmatrix(temp)
        updateMatrixValues(matrixJson.name,temp)}
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
        if(matrixJson.matrix[0].length !== 1){
        const temp =[...(matrix as matrix)]
        // console.log(temp)
        // console.log(JSON.parse(JSON.stringify(temp)))
        for(let row of temp){
            row.pop()
        }

        // console.log(temp)

        // setmatrix(temp)
        updateMatrixValues(matrixJson.name,temp)}
    }

    function CalcOptionOnMount(){
        for(let el of document.querySelectorAll(".matrix-div") as unknown as []){
            (el as any).style.zIndex = "1"
        }

        let md = document.querySelector(`#${matrixJson.name.replaceAll("+","add").replaceAll("-","sub").replaceAll("*","mul").replaceAll("**","pow").replaceAll("(","C").replaceAll(")","D").replaceAll(" ","-")}`) 
        if(md){
        (md as any).style.zIndex = "2"

        }

    }


    function DeleteMatrix(){
        Swal.fire({
            title: `Delete Matrix <b style="color:blue" > ${matrixJson.name}</b>`,
            html: `All matrix dependent on  <b style="color:blue" > ${matrixJson.name} </b> will aslo be deleted`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'

          }).then((result) => {
            if (result.isConfirmed) {

                deleteMatrix(matrixJson.name)



              Swal.fire(
                'Deleted!',
                'Matrix Deleted',
                'success'
              )
            }
          })
    }
    
    


    return   <>
    <Draggable
        axis="both"
        defaultPosition={{x: pos.x, y: pos.y}}
        position={undefined}
        handle={".handle"}
        // grid={[25, 25]}
        disabled={matrixJson.independent === "local"}
        scale={parseInt(zoom)/100}
        onStart={()=>{DragTargetRef.current && DragTargetRef.current.classList.add("dragging_matrix")}}
        onDrag={()=>{updateXarrow();DragTargetRef.current && DragTargetRef.current.classList.add("dragging_matrix");}}
        onStop={()=>{DragTargetRef.current && DragTargetRef.current && DragTargetRef.current.classList.remove("dragging_matrix");}}
        
    >


    <MatrixDiv onClick={()=>{CalcOptionOnMount()}}  className={`matrix-div ${Isnew ?  "slide-in-blurred-top new_matrix" : ""}`}  ref={(DragTargetRef as LegacyRef<HTMLDivElement>)} id={matrixJson.name.replaceAll("+","add").replaceAll("-","sub").replaceAll("*","mul").replaceAll("**","pow").replaceAll("(","C").replaceAll(")","D").replaceAll(" ","-")} style={{position:matrixJson.independent !== "local" ? "absolute" : "relative"}} >
    <NameAndDelIco>
        
    <textarea className="classic" defaultValue={matrixJson.name}  disabled={true}/>
    {matrixJson.independent !== "local" ? 
    <span  onClick={DeleteMatrix} style={{fontSize:"x-large",color:"red",cursor:"pointer"}} ><Trash/></span> : <></>}
    </NameAndDelIco>
    {/* display:matrixJson.independent ? "block" : "none" */}

    {/* handle */}
    {matrixJson.independent !== "local" ? 
    <span onTouchStart={()=>{DragTargetRef.current && DragTargetRef.current.classList.add("dragging_matrix")}} onClick={()=>{DragTargetRef.current && DragTargetRef.current.classList.add("dragging_matrix");setpos({x:pos.x + 5,y:pos.y+5})}} onMouseLeave={()=>{DragTargetRef.current && DragTargetRef.current.classList.remove("dragging_matrix")}} onMouseOver={()=>{DragTargetRef.current && DragTargetRef.current.classList.add("dragging_matrix")}} className="handle" style={{position: 'absolute',top: '25%',right: '5px',fontSize: 'xx-large',cursor: 'grab',zIndex:1,color:"lightslategrey"}}> <ArrowsMove/>  </span>
    :<></>}
    
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
            {!matrixJson.independent || matrixJson.independent === "local" ? <></> : 
            <>
            <span> <PlusLg onClick={addRow} /> </span>
            <span> <DashLg onClick={deleteRow}/> </span>
            </>
            }
        </RowAddBtn>


        <ColumnAddBtn> 
            <span>column</span> 
            {!matrixJson.independent || matrixJson.independent === "local" ? <></> : 
            <>
            <span> <PlusLg onClick={addColumn} /> </span>
            <span> <DashLg onClick={deleteColumn}/> </span>   
            </>
            } 
        </ColumnAddBtn>


            {/*  */}
        {matrixJson.independent !== "local" ? 
            <DefaultTippy  BtnRef={TippyBtnRef} content={<MatrixCalcOptions scale={2.5- (parseFloat(zoom)/100)} matrixName={matrixJson.name} insertNewDependentMatrix={insertNewDependentMatrix} json={json} insertNewMatrix={insertNewMatrix} />}   >
<CalcBtn>
        <Calculator   />
        </CalcBtn> 
            </DefaultTippy> : <></>}
    
    </MatrixRCDiv>
    <MatrixSolDiv>
        <MatrixSolOptions>
            <li className={nav_option === "determinant" ? "active" : ""} onClick={()=>{setnav_option("determinant")}} > determinant </li>
            <li className={nav_option === "eigen_value" ? "active" : ""} onClick={()=>{setnav_option("eigen_value")}} > eigen value </li>
            <li className={nav_option === "transpose" ? "active" : ""} onClick={()=>{setnav_option("transpose")}} > transpose </li>
            <li className={nav_option === "inverse" ? "active" : ""} onClick={()=>{setnav_option("inverse")}} > inverse </li>
            <li className={nav_option === "rank" ? "active" : ""} onClick={()=>{setnav_option("rank")}} > rank </li>
            <li className={nav_option === "none" ? "active" : ""} onClick={()=>{setnav_option("none")}} >  {nav_option === "none" ? <ArrowUp/> : <ArrowDown/>} </li>
            {/* <li> cofactor </li>
            <li> minor </li> */}
        </MatrixSolOptions>



        <div style={{position:"relative"}} >
            {nav_option === "determinant" ? <span className="matrix_err_text" >{fracStr((matrixSol.determinant()))}</span> : <></> }
            {nav_option === "eigen_value" ? <span className="matrix_err_text" >{ typeof(matrixSol.eigenValue()) === "string" ? matrixSol.eigenValue() : JSON.stringify(matrixSol.eigenValue().values).split("[")[1].split("]")[0] }</span> : <></> }
            {nav_option === "rank" ? <span className="matrix_err_text" >{matrixSol.rank()}</span> : <></> }
            {nav_option === "transpose" ? <BasicMatrix deleteMatrix={deleteMatrix}  MatrixRefs={MatrixRefs} zoom={zoom} insertNewDependentMatrix={insertNewDependentMatrix} json={json} insertNewMatrix={insertNewMatrix} key={"two"} updateMatrixValues={updateMatrixValues} matrixJson={{new:false,dependency:[], name:`transpose of ${matrixJson.name}`,matrix:matrixSol.transpose(),pos:{x:0,y:0},independent:"local"}} />  : <></> }
            {nav_option === "inverse" && typeof(matrixSol.inverse()) === "string"  ? <span className="matrix_err_text" >{matrixSol.inverse()}</span>  : <></> }
            {nav_option === "inverse" && typeof(matrixSol.inverse()) != "string"  ? <BasicMatrix deleteMatrix={deleteMatrix}  MatrixRefs={MatrixRefs} zoom={zoom} insertNewDependentMatrix={insertNewDependentMatrix} json={json} insertNewMatrix={insertNewMatrix} updateMatrixValues={updateMatrixValues} key={"two"} matrixJson={{new:false,name:`inverse of ${matrixJson.name}`,matrix:matrixSol.inverse(),pos:{x:0,y:0},independent:"local",dependency:[]}} />  : <></> }
            
        </div>
    </MatrixSolDiv>
    </>
    :
    <p className="matrix_err_text" >{matrix}</p> 
}
    </MatrixDiv> 
    </Draggable>
    </>

}




 
const MatrixCalcOptions: FC<{json:{[key:string] : MatrixConnectorJson},insertNewMatrix:Function,insertNewDependentMatrix:Function,matrixName:string,scale:number}> = ({json,insertNewMatrix,insertNewDependentMatrix,matrixName,scale}) => {
    


    const MulBtnRef = useRef()
    
    return ( <div className="tippy_div" style={{transform:`scale(${scale})`,transformOrigin:"left top"}} >
        <p className="title" >Calculation</p>
        {/* {Object.keys()} */}
        <DefaultTippy  placement="bottom" BtnRef={MulBtnRef} content={<MultiplyOptions matrixName={matrixName} insertNewDependentMatrix={insertNewDependentMatrix}  json={json} />} >
        <Option_Tippy value={""}  activeOption={undefined} style={undefined} ref={undefined} TippyRef={undefined} hideafterSelect={undefined} >
            Multiply with
        </Option_Tippy>    
        </DefaultTippy>
        <DefaultTippy  placement="bottom" BtnRef={MulBtnRef} content={<AddOptions matrixName={matrixName} insertNewDependentMatrix={insertNewDependentMatrix}  json={json} />} >
        <Option_Tippy value={""}  activeOption={undefined} style={undefined} ref={undefined} TippyRef={undefined} hideafterSelect={undefined} >
            Add
        </Option_Tippy>    
        </DefaultTippy>
        <DefaultTippy  placement="bottom" BtnRef={MulBtnRef} content={<SubtractionOptions matrixName={matrixName} insertNewDependentMatrix={insertNewDependentMatrix}  json={json} />} >
        <Option_Tippy value={""}  activeOption={undefined} style={undefined} ref={undefined} TippyRef={undefined} hideafterSelect={undefined} >
            Subtract
        </Option_Tippy>    
        </DefaultTippy>
        <DefaultTippy placement="bottom" BtnRef={MulBtnRef} content={<PowerOptions matrixName={matrixName} insertNewDependentMatrix={insertNewDependentMatrix}  json={json} />} >
        <Option_Tippy value={""}  activeOption={undefined} style={undefined} ref={undefined} TippyRef={undefined} hideafterSelect={undefined} >
            Power
        </Option_Tippy>    
        </DefaultTippy>

    </div> );
}
 