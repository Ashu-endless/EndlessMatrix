import { FC } from "react";
import { MatrixConnectorJson } from "../../App";
import { BasicMatrix } from "../basicmatrix/BasicMatrix";
import Xarrow,{useXarrow, Xwrapper} from "react-xarrows";
import Draggable from 'react-draggable';

export const MatrixPage:FC<{json:{[key:string] : MatrixConnectorJson},}> = ({json})=>{

    // const updateXarrow = useXarrow();

    return <div>
        {/* <Xwrapper> */}

        { Object.keys(json).map((name)=> 
        // <Draggable  key={name} onDrag={updateXarrow} onStop={updateXarrow} >
            <BasicMatrix key={name} matrixJson={json[name]} />    
        // </Draggable> 
            )
            }
            
           
    {/* <BasicMatrix key={"onw"} matrix_={[[5,3],[9,5]]} />         */}
    {/* <BasicMatrix key={"ons"} matrix_={[[5,3],[9,5]]} />         */}
    {/* <Xarrow
                start={"A"} //can be react ref
                end="B" //or an id
            />

<Xarrow
                start={"B"} //can be react ref
                end="C" //or an id
            />
<Xarrow
                start={"C"} //can be react ref
                end="A" //or an id
            /> */}
        {/* </Xwrapper> */}

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