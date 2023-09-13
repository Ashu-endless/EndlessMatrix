import { FC, useEffect, useState } from "react";
import { MatrixConnectorJson } from "../../App";
import { BasicMatrix } from "../basicmatrix/BasicMatrix";
import Xarrow,{useXarrow, Xwrapper} from "react-xarrows";
// import Draggable from 'react-draggable';

export const MatrixPage:FC<{json:{[key:string] : MatrixConnectorJson},setjson:Function,setMatrixRefs?:Function,UpdateMatrixRefs:Function,insertNewMatrix:Function,updateMatrixValues:Function,insertNewDependentMatrix:Function,connection_:string[][],zoom:string}> = ({json,setjson,setMatrixRefs,UpdateMatrixRefs,insertNewMatrix,updateMatrixValues,insertNewDependentMatrix,connection_,zoom})=>{

    // const updateXarrow = useXarrow();


    const [connection, setconnection] = useState(connection_)

    useEffect(() => {
      setconnection(connection_)
      console.log(connection_)
    }, [connection_])
    
    

    
 
    return <div  style={{position:"absolute",zoom:zoom,width:"100%"}} >
        <Xwrapper>

        {/* <button onClick={(
        )=>{
            let temp = {...json};
            temp["B"].pos = {x:600,y:200};
            setjson(temp)

        }} > clc </button> */}

        { Object.keys(json).map((name)=> 
        // <Draggable  key={name} onDrag={updateXarrow} onStop={updateXarrow} >
            <BasicMatrix zoom={zoom}  insertNewDependentMatrix={insertNewDependentMatrix} json={json}  updateMatrixValues={updateMatrixValues} insertNewMatrix={insertNewMatrix} UpdateMatrixRefs={UpdateMatrixRefs}  key={name} matrixJson={json[name]} />    
        // </Draggable> 
            )
            }
            
           
    {/* <BasicMatrix key={"onw"} matrix_={[[5,3],[9,5]]} />         */}
    {/* <BasicMatrix key={"ons"} matrix_={[[5,3],[9,5]]} />         */}
    {connection.map((connect)=>     <Xarrow 
                start={connect[0]} //can be react ref
                end={connect[1]} //or an id
                lineColor={connect[2]}
                headColor={connect[2]}
                tailColor={connect[2]}
                dashness={{strokeLen:5,nonStrokeLen:5}}
                key={JSON.stringify(connect)}
            /> )}

        </Xwrapper>

    </div>
}


// const Code = {
//     "A" : {
//         matrix : [[0,0],[0,0]],
//         independent:true,
//         inside : {
//             "transpose of A":{

//             }
//         }

//     },
//     "B" : {
//         matrix : [[0,0],[0,0]],
//         independent:true,
//     },
//     "product of A & B" :{
//         matrix  : [],
//         independent : false
//     }
// }