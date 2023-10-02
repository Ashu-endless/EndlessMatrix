import { FC, useEffect, useState } from "react";
import { insertNewDependentMatrix, insertNewMatrix, MatrixConnectorJson } from "../../App";
import { BasicMatrix } from "../basicmatrix/BasicMatrix";
import Xarrow,{Xwrapper} from "react-xarrows";
import { deleteMatrix } from "../Types";
// import Draggable from 'react-draggable';

export const MatrixPage:FC<{json:{[key:string] : MatrixConnectorJson},UpdateMatrixRefs:Function,insertNewMatrix:insertNewMatrix,updateMatrixValues:Function,insertNewDependentMatrix:insertNewDependentMatrix,connection_:string[][],zoom:string,MatrixRefs:{[key:string]:{ref:any,}},deleteMatrix:deleteMatrix}> = ({json,UpdateMatrixRefs,insertNewMatrix,updateMatrixValues,insertNewDependentMatrix,connection_,zoom,MatrixRefs,deleteMatrix})=>{



    const [connection, setconnection] = useState(connection_)



    useEffect(() => {
      setconnection(connection_)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connection_])
    



    
    

    
 
    return <div  style={{position:"absolute",zoom:zoom,width:"100%"}} >
        <Xwrapper>



{connection.map((connect)=>     <Xarrow 
                // start={connect[0]} //can be react ref
                start={(MatrixRefs[connect[0]] ).ref} //can be react ref
                end={MatrixRefs[connect[1]].ref} //or an id
                // end={connect[1]} //or an id
                lineColor={connect[2]}
                headColor={connect[2]}
                tailColor={connect[2]}
                dashness={{strokeLen:15,nonStrokeLen:5}}
                key={JSON.stringify(connect)}
                animateDrawing={true}
                divContainerProps={{name:JSON.stringify(connect)}}
            /> )}

        { Object.keys(json).map((name)=> 
            <BasicMatrix deleteMatrix={deleteMatrix}  MatrixRefs={MatrixRefs} zoom={zoom}  insertNewDependentMatrix={insertNewDependentMatrix} json={json}  updateMatrixValues={updateMatrixValues} insertNewMatrix={insertNewMatrix} UpdateMatrixRefs={UpdateMatrixRefs}  key={name} matrixJson={json[name]} />    
            )
            }
            


        </Xwrapper>

    </div>
}

