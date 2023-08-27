import React, { useState } from 'react';
import './App.css';
import { MatrixPage } from './components/page/Page';

export interface MatrixConnectorJson  {
      matrix : number[][] ;
      independent : boolean;
      nested? : MatrixConnectorJson
      pos : {x:number,y:number},
      name : string

}

function App() {


  // const [json, setjson] = useState<{[key:string] : MatrixConnectorJson}>({"A":{independent:true,matrix:[[0,0],[0,0]],pos:{x:0,y:30},name:"A" },"B":{independent:true,matrix:[[0,0],[0,0]],pos:{x:500,y:120},name:"B"},"C":{independent:true,matrix:[[0,0],[0,0]],pos:{x:900,y:120},name:"C"}})
  const [json, setjson] = useState<{[key:string] : MatrixConnectorJson}>({"A":{independent:true,matrix:[[0,0],[0,0]],pos:{x:0,y:30},name:"A" }})


  function insertNewMatrix(name:string){
    let temp = {...json};
    temp[name] = {independent:true,matrix:[[0,0],[0,0]],pos:{x:500,y:120},name:"B" }

    setjson(temp)
  }

  return (<>
    {/* <span onClick={()=>{insertNewMatrix("B")}} >Add Matrix </span> */}
    <MatrixPage json={json}/>
  </>
  );
}

export default App;
