import { FC, useEffect, useState } from "react";
import { MatrixConnectorJson } from "../../App";
import { BasicMatrix } from "../basicmatrix/BasicMatrix";
import Xarrow,{useXarrow, Xwrapper} from "react-xarrows";
// import Draggable from 'react-draggable';

export const MatrixPage:FC<{json:{[key:string] : MatrixConnectorJson},setjson:Function,setMatrixRefs?:Function,UpdateMatrixRefs:Function,insertNewMatrix:Function,updateMatrixValues:Function}> = ({json,setjson,setMatrixRefs,UpdateMatrixRefs,insertNewMatrix,updateMatrixValues})=>{

    // const updateXarrow = useXarrow();

    const [connection, setconnection] = useState([])
    

    
 
    return <div style={{position:"absolute"}} >
        <Xwrapper>

        {/* <button onClick={(
        )=>{
            let temp = {...json};
            temp["B"].pos = {x:600,y:200};
            setjson(temp)

        }} > clc </button> */}

        { Object.keys(json).map((name)=> 
        // <Draggable  key={name} onDrag={updateXarrow} onStop={updateXarrow} >
            <BasicMatrix setconnection={setconnection} updateMatrixValues={updateMatrixValues} insertNewMatrix={insertNewMatrix} UpdateMatrixRefs={UpdateMatrixRefs}  key={name} matrixJson={json[name]} />    
        // </Draggable> 
            )
            }
            
           
    {/* <BasicMatrix key={"onw"} matrix_={[[5,3],[9,5]]} />         */}
    {/* <BasicMatrix key={"ons"} matrix_={[[5,3],[9,5]]} />         */}
    {connection.map((connect)=>     <Xarrow 
                start={connect[0]} //can be react ref
                end={connect[1]} //or an id
            /> )}
    {/* <Xarrow 
                start={"A"} //can be react ref
                end="B" //or an id
            /> */}
                {/* <Xarrow 
                start={"B"} //can be react ref
                end="C" //or an id
            /> */}

{/* <Xarrow
                start={"B"} //can be react ref
                end="C" //or an id
            />
<Xarrow
                start={"C"} //can be react ref
                end="A" //or an id
            /> */}
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