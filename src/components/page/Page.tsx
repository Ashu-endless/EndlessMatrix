import { FC, useEffect, useState } from "react";
import { insertNewDependentMatrix, insertNewMatrix, MatrixConnectorJson } from "../../App";
import { BasicMatrix, CleanMatrixId } from "../basicmatrix/BasicMatrix";
import { deleteMatrix } from "../Types";
// @ts-ignore
import Arrow, { DIRECTION,HEAD } from 'react-arrows';
// import Draggable from 'react-draggable';

export const MatrixPage:FC<{json:{[key:string] : MatrixConnectorJson},UpdateMatrixRefs:Function,insertNewMatrix:insertNewMatrix,updateMatrixValues:Function,insertNewDependentMatrix:insertNewDependentMatrix,connection_:string[][],zoom:string,MatrixRefs:{[key:string]:{ref:any,}},deleteMatrix:deleteMatrix}> = ({json,UpdateMatrixRefs,insertNewMatrix,updateMatrixValues,insertNewDependentMatrix,connection_,zoom,MatrixRefs,deleteMatrix})=>{



    const [connection, setconnection] = useState(connection_)



    useEffect(() => {
        console.log(connection_)
      setconnection(connection_)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connection_])
    



    
    

    
 
    return <div  style={{position:"absolute",width:"100%",height:"100%",zoom:zoom,}} >
        {/* <Xwrapper> */}



{connection.map((connect,ind)=>   (       
           
           document.getElementById(CleanMatrixId(connect[0])) && document.getElementById(CleanMatrixId(connect[1])) ?
<Arrow
key={JSON.stringify(connect)}
  className={`arrow-${connection[ind][2]} arrow`}

  from={{
    direction: DIRECTION.BOTTOM,
    node: () => document.getElementById(CleanMatrixId(connect[0])) == null ? document.getElementById("s") : document.getElementById(CleanMatrixId(connect[0])),
    translation: [-0.1,0.2],
  }}
  to={{
    direction: DIRECTION.LEFT,
    node:() => document.getElementById(CleanMatrixId(connect[1])) == null ? document.getElementById("s") : document.getElementById(CleanMatrixId(connect[1])),
    translation: [0, 0],
  }}
//   head={HEAD.VEE}
//   onChange={(e:MouseEvent)=>e.target.classlist()}
/>:<></>)
            
            )}

            

        { Object.keys(json).map((name,ind)=> 
 
            <BasicMatrix setconnection={setconnection} deleteMatrix={deleteMatrix}  MatrixRefs={MatrixRefs} zoom={zoom}  insertNewDependentMatrix={insertNewDependentMatrix} json={json}  updateMatrixValues={updateMatrixValues} insertNewMatrix={insertNewMatrix} UpdateMatrixRefs={UpdateMatrixRefs}  key={name} matrixJson={json[name]} />    

            )
            }

{/* <Arrow
  className='arrow'
  from={{
    direction: DIRECTION.TOP,
    node: () => document.getElementById('A'),
    translation: [-0.5, -1],
  }}
  to={{
    direction: DIRECTION.LEFT,
    node:() => document.getElementById('B'),
    translation: [-0.5, -1],
  }}
/> */}
            



    </div>
}

