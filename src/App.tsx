import React, { FormEventHandler, ReactEventHandler, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './App.css';
import { MatrixPage } from './components/page/Page';
import { matrix, MatrixSol } from './MatrixSol';
import {InfoLg, InfoSquare, PlusCircle, X} from "react-bootstrap-icons"
import ReactGA from 'react-ga4';
import emailjs from '@emailjs/browser'

const colors = ["brown","white","yellow","grey","blue","red","pink","purple"]

export interface MatrixConnectorJson  {
      matrix : number[][] | string ;
      independent : boolean | "local";
      nested? : MatrixConnectorJson
      pos : {x:number,y:number};
      name : string;
      code ? : [matrix1:string,calcSign:string,matrix2 :(string | number),secondMatCode?:("transpose" | "inverse" | "integer")];
      dependency : (string|number)[];
      new:boolean;
}
export type insertNewDependentMatrix = (name:string,code:MatrixConnectorJson["code"])=> void
export type insertNewMatrix = (name_:string,code?:any)=> void

export interface Matricesjson {
  [key:string] : MatrixConnectorJson
}


function App() {

  // const [json, setjson] = useState<{[key:string] : MatrixConnectorJson}>({"A":{independent:true,matrix:[[3,1],[4,9]],pos:{x:0,y:30},name:"A" },"B":{independent:true,matrix:[[1,0],[5,0]],pos:{x:500,y:120},name:"B"},"C":{independent:false,matrix:MatrixSol(),pos:{x:900,y:120},name:"C"}})
  // const [json, setjson] = useState<{[key:string] : MatrixConnectorJson}>({"A":{independent:true,matrix:[[0,0],[0,0]],pos:{x:20,y:20},name:"A",dependency:[],new:true },"B":{independent:true,matrix:[[0,0],[0,0]],pos:{x:20,y:20},name:"B",dependency:[],new:true }})
  const [json, setjson] = useState<{[key:string] : MatrixConnectorJson}>({"A":{independent:true,matrix:[[0,0],[0,0]],pos:{x:20,y:20},name:"A",dependency:[],new:true }})
  const [MatrixRefs, setMatrixRefs] = useState<{[key:string]:any}>({})
  const [connection, setconnection] = useState<string[][]>([])
  const [zoom, setzoom] = useState<string>("85%")
  const [sidebar, setsidebar] = useState(false);
  const [message, setmessage] = useState("")
  const [send_email, setsend_email] = useState("")
  const [mail_status, setmail_status] = useState("Send Suggestion")

  // useEffect(() => {
  //   setconnection(JSON.parse(JSON.stringify(connection)))
  // }, [zoom])
  

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
      // text:`This can be changed later`,
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
            let confirmButton = Swal.getConfirmButton()

            // console.log(input?.value)
              // Swal.showLoading()
                if(input.value === ""){
                  Swal.showValidationMessage(`type matrix new matrix name`)
                  if(confirmButton)
                  confirmButton.style.display = "none"
                }else if (/^\d/.test(input.value)){
                  Swal.hideLoading()
                  Swal.showValidationMessage(`❗ name can't start with integer`)
                  if(confirmButton)
                  confirmButton.style.display = "none"
                }
                else if( (!(Object.keys(json).includes(input.value)) ) ){
                  // setpdi_name(input.value)
                  Swal.hideLoading()
                  Swal.showValidationMessage(`✔️ <b>${input.value }&nbsp;  </b> is available`)
                  if(confirmButton)
                  confirmButton.style.display = "block"
                }else{
                  Swal.hideLoading()
                  Swal.showValidationMessage(`❗ <b>${input.value } &nbsp;   </b>  already exists`)
                  if(confirmButton)
                  confirmButton.style.display = "none"
                }
              
          }  },
      
      
    }).then((response)=>{
      if(response.isConfirmed){
      let pos = {x:10,y:10}
      // for( let matrixdiv of Object.keys(MatrixRefs) ){
      //     pos.x = pos.x + MatrixRefs[matrixdiv].ref.current.offsetWidth + 40 
      //     // pos.y = pos.y + matrixdiv.current.offsetWidth + 40 
      // }
  
      let temp = {...json};
      temp[name] = {independent:code === undefined ? true : false,matrix:[[0,0],[0,0]],pos,name,code,dependency:[],new:true}



      setjson(temp)
    }
  })


  }


  async function insertNewDependentMatrix(name:string,code:MatrixConnectorJson["code"]){
    let pos = {x:10,y:10}
    let temp = {...json};
    let matrix_: matrix | number | string =[[]];

    if(code && typeof(code[2]) !== "number" && code[2].startsWith("(")){
        code[2] = code[2].split("(")[1].split(")")[0]
    }

    if(code){

    if(code[3] === "integer"){
        matrix_ = code[2]
    }else if(code[3] === undefined){
      matrix_ = json[code[2]].matrix
      
    }else if(code[3] === "transpose"){
      matrix_ = MatrixSol(json[code[2]].matrix as matrix).transpose()
    }else if(code[3] === "inverse"){
      matrix_ = MatrixSol(json[code[2]].matrix as matrix).inverse()
    }
    

    
    temp[name] = {independent:false,pos,name,code,matrix:[],dependency:[code[0],code[2],...json[code[0]].dependency,],new:false}
    
    if(typeof(code[2]) !== "number"){
      temp[name].dependency = [...temp[name].dependency,...json[code[2]].dependency]
    }



    let matrix = json[code[0]].matrix as matrix
    // console.log(matrix)
    // let matrix_ = typeof(code[2]) !== "number" ?  json[code[2]].matrix as matrix : code[2] as matrix

    switch (code[1]) {
      case "*":
        temp[name].matrix = MatrixSol(matrix).multiplyBy((matrix_ as matrix))
        break;
      case "**":
        temp[name].matrix = MatrixSol(matrix).power((matrix_ as unknown as number))
        break;
      case "-":
        temp[name].matrix = MatrixSol(matrix).subtract((matrix_ as matrix))
        break;
      case "+":
        temp[name].matrix = MatrixSol(matrix).add((matrix_ as matrix))
      
        break;
      default:
        break;
    }

    // let temp_connection = [...connection]
    let temp_connection:string[][] = []
    let lineColor = colors[connection.length]
    temp_connection.push([code[0],name,lineColor])


    if(typeof(code[2]) !== "number" && code[3] === undefined){

      temp_connection.push([code[2],name,lineColor])
    }

    
    temp_connection = [...temp_connection,...connection]

    setjson(temp)
    setconnection(temp_connection)}
  }


  function updateMatrixValues(name:string,new_matrix:matrix){
      let temp = {...json}
      temp[name].matrix = new_matrix

      for(let key of Object.keys(temp)){

        let code = temp[key].code
        // !!
        if(code){
        let matrix_: matrix | number | string =[[]];

        if(code && typeof(code[2]) !== "number" && code[2].startsWith("(")){
            code[2] = code[2].split("(")[1].split(")")[0]
        }
    
        if(code[3] === "integer"){
            matrix_ = code[2]
        }else if(code[3] === undefined){
          matrix_ = temp[code[2]].matrix
          
        }else if(code[3] === "transpose"){
          matrix_ = MatrixSol(temp[code[2]].matrix as matrix).transpose()
        }else if(code[3] === "inverse"){
          matrix_ = MatrixSol(temp[code[2]].matrix as matrix).inverse()
        }


        // !!



        if (!temp[key].independent && code !== undefined ){

          let matrix = temp[code[0]].matrix as matrix
          console.log(temp[code[0]])

          switch (code[1]) {
            case "*":
              temp[key].matrix = MatrixSol(matrix).multiplyBy((matrix_ as matrix))
              break;
            case "**":
                temp[key].matrix = MatrixSol(matrix).power((matrix_ as number))
                break;
            case "-":
              temp[key].matrix = MatrixSol(matrix).subtract((matrix_ as matrix))
              break;
            case "+":
              temp[key].matrix = MatrixSol(matrix).add((matrix_ as matrix))
              break;
            default:
              break;
          }
      }}}




      setjson(temp)
  }

  function UpdateMatrixRefs(name:string,ref:{},updateArrow:Function){
    let temp = {...MatrixRefs}

    temp[name] = {ref,updateArrow}
    setMatrixRefs(temp)
  }

  function deleteMatrix(name:string){
    let temp_json = {...json}



    let mat_dependent_on_del = [name]

    for (let name_key of Object.keys(temp_json)){
      if(temp_json[name_key].dependency.includes(name)){
        mat_dependent_on_del.push(temp_json[name_key].name)
      }
    }

    for (let name_key of Object.keys(temp_json)){
      if(name_key === name  || temp_json[name_key].dependency.includes(name) ){
        delete temp_json[name_key]
      }
    }



    let temp_connection = []


    console.log("mat_dependent_on_del",mat_dependent_on_del)

    for(let connect of connection){
      let add_this_connect = true
      for(let mat of mat_dependent_on_del){
        if(connect.includes(mat) ||connect.includes(`(${mat})`) || connect.includes(name) ){
          add_this_connect = false;
        }
      }
      if(add_this_connect){
        temp_connection.push(connect)
      }
    }

    console.log(temp_connection)
    setconnection(JSON.parse(JSON.stringify(temp_connection)))
    setjson(temp_json)

    

  }
  
  const sendSugg:FormEventHandler<HTMLFormElement> =(e)=>{
    setmail_status("sending...");
    e.preventDefault();
    emailjs
    // @ts-ignore
      .send('service_ik84ov4', 'template_7g2vr48', {message,from_name:send_email}, {
        publicKey: 'IhAcS8I9v_utG-6lg',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          setmail_status("Suggestion Sent !  Thank You for Your Suggestion | Feedback");
        },
        (error:any) => {
          console.log('FAILED...', error.text);
          setmail_status("Send Suggestion")
        },
      );
  }


  

  useEffect(() => {
    console.log("json changed")
    console.log(json)
  }, [json])

  useEffect(() => {
    console.log("connection changed")
    console.log(connection)
  }, [connection])

  // useEffect(() => {
  //   console.log(MatrixRefs,"App")
    
  // }, [MatrixRefs])





  

  return (<>
  <div id="sidebar" style={{right:!sidebar ? "-20rem" : "0rem"}} >
    <span className='cross'  onClick={()=>setsidebar(false)} > <X/>  </span>

    <form id='sugg-div' onSubmit={sendSugg} >
      {/* @ts-ignore */}
      <textarea placeholder='your suggestion , feedback' required value={message} onInput={(e)=>setmessage(e.target.value)} maxLength={200} name="" id="" cols={30} rows={10}/>
      {/* @ts-ignore */}
      <input placeholder='your email' required value={send_email} type="email" onInput={(e)=>setsend_email(e.target.value)} maxLength={200} name="" id="" />
      <button type='submit' disabled={mail_status !== "Send Suggestion"}  className='sugg-btn' > {mail_status} </button>
    </form>
  </div>
  <div>
    
  <nav id='nav' > 
  <div style={{display:"flex",gap:"1rem",alignItems:"center"}}>

  <h4>Endless  Matrix</h4>  
  <span id='addNewMatrix' onClick={()=>{insertNewMatrix("B")}} > <PlusCircle/> Add New Matrix  </span>
  </div>
    <div>

  <InfoSquare style={{cursor:"pointer"}} onClick={()=>{ReactGA.event({ category: 'User', action: 'Clicked Button', label: 'Feedback Button' });;setsidebar(true)}} />
    </div>


    </nav>

  <div id='zoom_div' > zoom  <input min={25} type="range" name="" id="" value={parseInt(zoom)} onChange={(e)=>{setzoom(`${e.target.value}%`)}} /> {zoom} </div> 
  </div>

    <div id="MatrixPage">

    <MatrixPage deleteMatrix={deleteMatrix}  MatrixRefs={MatrixRefs} zoom={zoom} connection_={connection} insertNewDependentMatrix={insertNewDependentMatrix} updateMatrixValues={updateMatrixValues} insertNewMatrix={insertNewMatrix} UpdateMatrixRefs={UpdateMatrixRefs} json={json} />
    </div>
  <span id='s'></span>
  </>
  );
}

export default App;
