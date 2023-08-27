import { FC, useEffect, useState } from "react";
import { Row } from "./Row";
import { ColumnAddBtn, MatrixDiv, MatrixElementsDiv, MatrixRCDiv, MatrixSolDiv, MatrixSolOptions, RowAddBtn,  } from "./style";
import { MatrixSol } from "../../MatrixSol";
import {PlusLg,DashLg,Calculator} from "react-bootstrap-icons"
import { MatrixConnectorJson } from "../../App";

export const BasicMatrix:FC<{matrixJson:MatrixConnectorJson}> = ({matrixJson})=>{


    const [matrix, setmatrix] = useState(matrixJson.matrix)
    const [matrixSol, setmatrixSol] = useState(MatrixSol(matrixJson.matrix))
    const [grid_row_css, setgrid_row_css] = useState(`1fr 1fr`)
    const [grid_column_css, setgrid_column_css] = useState(`1fr 1fr`)
    const [nav_option, setnav_option] = useState("determinant")
    

    useEffect(() => {
      setmatrix(matrixJson.matrix)
      console.log(matrixJson.matrix)
    }, [matrixJson.matrix])

    useEffect(() => {
        console.log(matrix)
      setmatrixSol(MatrixSol(matrix))

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
        setgrid_row_css(grid_row)

    }, [matrix])



    


    




    function updateMatrix(rowIndex:number,columnIndex:number,value:number){
        let temp = [...matrix]
        temp[rowIndex][columnIndex] = value
        setmatrix(temp)
    }

    function addRow(){
        let temp = [...matrix]
        let new_row = []
        while (new_row.length !== matrixSol.columnsCount) {
            new_row.push(0)
        }

        temp.push(new_row)
        setmatrix(temp)
    }
    function deleteRow(){
        let temp = [...matrix]
        // let new_row = []
        // while (new_row.length !== matrixSol.columnsCount) {
        //     new_row.push(0)
        // }

        // temp.push(new_row)
        temp.pop()
        setmatrix(temp)
    }
    
    function addColumn(){
        const temp = JSON.parse(JSON.stringify(matrix));
        console.log(temp)
        // console.log(JSON.parse(JSON.stringify(temp)))
        for(let row of temp){
            row.push(0)
        }

        console.log(temp)

        setmatrix(temp)
    }
    function deleteColumn(){
        const temp =[...matrix]
        console.log(temp)
        // console.log(JSON.parse(JSON.stringify(temp)))
        for(let row of temp){
            row.pop()
        }

        console.log(temp)

        setmatrix(temp)
    }
    


    return <MatrixDiv id={matrixJson.name} style={{left:matrixJson.pos["x"],top:matrixJson.pos["y"],position:matrixJson.independent ? "absolute" : "relative"}} >
    <textarea className="classic" defaultValue={matrixJson.name} />

    <MatrixRCDiv>

        <MatrixElementsDiv style={{gridTemplateColumns:grid_column_css,gridTemplateRows:grid_row_css}} >
        
        {matrix.map((row,index)=>
            <Row updateMatrix={updateMatrix} key={index} index_={index} row_={row} />
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

        {/* <Calculator/> */}
    
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
            {nav_option === "transpose" ? <BasicMatrix key={"two"} matrixJson={{name:`transpose of ${matrixJson.name}`,matrix:matrixSol.transpose(),pos:{x:0,y:0},independent:false}} />  : <></> }
            {nav_option === "inverse" && typeof(matrixSol.inverse()) === "string"  ? <span>{matrixSol.inverse()}</span>  : <></> }
            {nav_option === "inverse" && typeof(matrixSol.inverse()) != "string"  ? <BasicMatrix key={"two"} matrixJson={{name:`inverse of ${matrixJson.name}`,matrix:matrixSol.inverse(),pos:{x:0,y:0},independent:false}} />  : <></> }
            
        </div>
    </MatrixSolDiv>
    </MatrixDiv> 
}