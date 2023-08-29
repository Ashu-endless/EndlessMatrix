import React, { useEffect, useState } from 'react';
import './App.css';
import { MatrixPage } from './components/page/Page';
import { matrix, MatrixSol } from './MatrixSol';

export interface MatrixConnectorJson  {
      matrix : number[][] ;
      independent : boolean;
      nested? : MatrixConnectorJson
      pos : {x:number,y:number},
      name : string
      code ? : string[]

}

function App() {


  // const [json, setjson] = useState<{[key:string] : MatrixConnectorJson}>({"A":{independent:true,matrix:[[3,1],[4,9]],pos:{x:0,y:30},name:"A" },"B":{independent:true,matrix:[[1,0],[5,0]],pos:{x:500,y:120},name:"B"},"C":{independent:false,matrix:MatrixSol(),pos:{x:900,y:120},name:"C"}})
  const [json, setjson] = useState<{[key:string] : MatrixConnectorJson}>({"A":{independent:true,matrix:[[0,0],[0,0]],pos:{x:20,y:20},name:"A" }})
  const [MatrixRefs, setMatrixRefs] = useState<{[key:string]:any}>({})

  // useEffect(() => {
  //   console.log(json)
  //   let temp
  //   for(let key of Object.keys(json)){
  //     if (json[key].independent){
  //       json[k]
  //     }
  //   }
  // }, [json])
  

  function insertNewMatrix(name:string,code?:any){
    let pos = {x:10,y:10}
    for( let matrixdiv of Object.keys(MatrixRefs) ){
        pos.x = pos.x + MatrixRefs[matrixdiv].current.offsetWidth + 40 
        // pos.y = pos.y + matrixdiv.current.offsetWidth + 40 
    }

    let temp = {...json};
    temp[name] = {independent:code ? true : false,matrix:[[0,0],[0,0]],pos,name,code}
    if(code){
      temp[name].matrix = MatrixSol(json["A"].matrix).multiplyBy(json["B"].matrix)
      temp[name].independent = false
      
    }
    setjson(temp)
  }

  function updateMatrixValues(name:string,new_matrix:matrix){
      let temp = {...json}
      temp[name].matrix = new_matrix
      for(let key of Object.keys(temp)){
        let code = temp[key].code
        if (!temp[key].independent && code !== undefined ){
        temp[key].matrix = MatrixSol(temp[code[0]].matrix).multiplyBy(temp[code[2]].matrix)
      }}
      setjson(temp)
  }

  function UpdateMatrixRefs(name:string,ref:{}){
    let temp = {...MatrixRefs}

    temp[name] = ref
    setMatrixRefs(temp)
  }

  useEffect(() => {
    console.log(MatrixRefs)
  }, [MatrixRefs])
  

  return (<>
  <nav id='nav' >Endless Matrix  <span id='addNewMatrix' onClick={()=>{insertNewMatrix("B")}} > Add New Matrix  </span>  </nav>
    {/* <span onClick={()=>{insertNewMatrix("B")}} >Add Matrix </span> */}
    <MatrixPage updateMatrixValues={updateMatrixValues} insertNewMatrix={insertNewMatrix} UpdateMatrixRefs={UpdateMatrixRefs} json={json} setjson={setjson}/>
  </>
  );
}

export default App;
