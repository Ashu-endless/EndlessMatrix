import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './App.css';
import { MatrixPage } from './components/page/Page';
import { matrix, MatrixSol } from './MatrixSol';

const colors = ["orange","yellow","grey","blue","red","white"]

export interface MatrixConnectorJson  {
      matrix : number[][] | string ;
      independent : boolean;
      nested? : MatrixConnectorJson
      pos : {x:number,y:number},
      name : string
      code ? : string[],
      

}

export interface Matricesjson {
  [key:string] : MatrixConnectorJson
}

function App() {


  // const [json, setjson] = useState<{[key:string] : MatrixConnectorJson}>({"A":{independent:true,matrix:[[3,1],[4,9]],pos:{x:0,y:30},name:"A" },"B":{independent:true,matrix:[[1,0],[5,0]],pos:{x:500,y:120},name:"B"},"C":{independent:false,matrix:MatrixSol(),pos:{x:900,y:120},name:"C"}})
  const [json, setjson] = useState<{[key:string] : MatrixConnectorJson}>({"A":{independent:true,matrix:[[0,0],[0,0]],pos:{x:20,y:20},name:"A" }})
  const [MatrixRefs, setMatrixRefs] = useState<{[key:string]:any}>({})
  const [connection, setconnection] = useState<string[][]>([])
  const [zoom, setzoom] = useState<string>("100%")

  // useEffect(() => {
  //   console.log(json)
  //   let temp
  //   for(let key of Object.keys(json)){
  //     if (json[key].independent){
  //       json[k]
  //     }
  //   }
  // }, [json])
  

  async function insertNewMatrix(name_:string,code?:any){

    let name:string = ""

    Swal.fire({
      title: `Choose a <span style="color:blue" >name</span> for new Matrix`,
      text:`This can be changed later`,
      confirmButtonText: `Done`,
      showCancelButton: true,
      backdrop: `left top no-repeat rgb(0 0 0 / 62%)`,
      allowOutsideClick: false,
      showLoaderOnConfirm: true,
      cancelButtonText:"Cancel",
      showConfirmButton : false,
      input:"text",
      customClass: {
        validationMessage: 'my-validation-message'
      },
      
      
      inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          }
        },
        didOpen: () => {
          const input = Swal.getInput();
          console.log(input);
          if(input)
          input.oninput = () => {
            name = input.value
            let c = Swal.getConfirmButton()

            // console.log(input?.value)
              // Swal.showLoading()
                if(input.value === ""){
                  Swal.showValidationMessage(`type matrix new matrix name`)
                  if(c)
                  c.style.display = "none"
                }
                else if( (!(Object.keys(json).includes(input.value)) ) ){
                  // setpdi_name(input.value)
                  Swal.hideLoading()
                  Swal.showValidationMessage(`✔️ <b>${input.value }&nbsp;  </b> is available`)
                  if(c)
                  c.style.display = "block"
                }else{
                  Swal.hideLoading()
                  Swal.showValidationMessage(`❗ <b>${input.value } &nbsp;   </b>  already exists`)
                  if(c)
                  c.style.display = "none"
                }
              
          }  },
      
      
    }).then((response)=>{
      if(response.isConfirmed){
      let pos = {x:10,y:10}
      for( let matrixdiv of Object.keys(MatrixRefs) ){
          pos.x = pos.x + MatrixRefs[matrixdiv].current.offsetWidth + 40 
          // pos.y = pos.y + matrixdiv.current.offsetWidth + 40 
      }
  
      let temp = {...json};
      temp[name] = {independent:code === undefined ? true : false,matrix:[[0,0],[0,0]],pos,name,code}



      setjson(temp)
    }
  })


  }


  async function insertNewDependentMatrix(name:string,code:string[]){
    let pos = {x:10,y:10}
    for( let matrixdiv of Object.keys(MatrixRefs) ){
        pos.x = pos.x + MatrixRefs[matrixdiv].current.offsetWidth + 40 
        // pos.y = pos.y + matrixdiv.current.offsetWidth + 40 
    }
    let temp = {...json};
    temp[name] = {independent:false,pos,name,code,matrix:[]}


    let matrix = json[code[0]].matrix as matrix
    let matrix_ = typeof(code[2]) !== "number" ?  json[code[2]].matrix as matrix : code[2] as matrix

    switch (code[1]) {
      case "*":
        temp[name].matrix = MatrixSol(matrix).multiplyBy(matrix_)
        break;
      case "-":
        temp[name].matrix = MatrixSol(matrix).subtract(matrix_)
        break;
      case "+":
        temp[name].matrix = MatrixSol(matrix).add(matrix_)
      
        break;
      default:
        break;
    }

    let temp_connection = [...connection]
    let lineColor = colors[connection.length]
    temp_connection.push([code[0],name,lineColor])

    if(typeof(code[2]) !== "number")
    temp_connection.push([code[2],name,lineColor])
    
    setjson(temp)
    setconnection(temp_connection)
  }


  function updateMatrixValues(name:string,new_matrix:matrix){
      let temp = {...json}
      temp[name].matrix = new_matrix
      for(let key of Object.keys(temp)){
        let code = temp[key].code
        if (!temp[key].independent && code !== undefined ){

          let matrix = json[code[0]].matrix as matrix
          let matrix_ = typeof(code[2]) !== "number" ?  json[code[2]].matrix as matrix : code[2] as matrix

          switch (code[1]) {
            case "*":
              temp[key].matrix = MatrixSol(matrix).multiplyBy(matrix_)
              break;
            case "-":
              temp[key].matrix = MatrixSol(matrix).subtract(matrix_)
              break;
            case "+":
              temp[key].matrix = MatrixSol(matrix).add(matrix_)
              break;
            default:
              break;
          }
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
  

  useEffect(() => {
    console.log("json changed")
  }, [json])
  useEffect(() => {
    console.log("connection changed")
  }, [connection])
  

  return (<>
  <div>

  <nav id='nav' >Endless Matrix 
  <div>

  <span id='addNewMatrix' onClick={()=>{insertNewMatrix("B")}} > Add New Matrix  </span>
  {/* <span id='addNewMatrix'> Solve Expression  </span> */}
  {/* <span id='addNewMatrix'> Definations  </span> */}
  </div>
    </nav>
  <div id='zoom_div' > zoom  <input min={25} type="range" name="" id="" value={parseInt(zoom)} onChange={(e)=>{setzoom(`${e.target.value}%`)}} /> {zoom} </div> 
  </div>

    {/* <span onClick={()=>{insertNewMatrix("B")}} >Add Matrix </span> */}
    <div id="MatrixPage">

    <MatrixPage zoom={zoom} connection_={connection} insertNewDependentMatrix={insertNewDependentMatrix} updateMatrixValues={updateMatrixValues} insertNewMatrix={insertNewMatrix} UpdateMatrixRefs={UpdateMatrixRefs} json={json} setjson={setjson}/>
    </div>
  </>
  );
}

export default App;
