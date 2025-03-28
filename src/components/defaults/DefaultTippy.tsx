import Tippy from "@tippyjs/react";
import { LegacyRef, useEffect, useRef, useState} from "react";
import React from 'react';
import _ from "lodash";
import "tippy.js/dist/tippy.css"

interface Props {
  children:React.ReactNode;
  content:React.ReactNode;
  onactiveMeclass?: string;
  BtnRef: any;
  TriggererRef?: any;
  onMount?:Function;
  placement?:"top" | "bottom" | "right";
  trigger ?: "click" | "mouseover";
  className? : string;
}

const DefaultTippy:React.FC<Props> =({children,className,content,BtnRef,TriggererRef,onactiveMeclass,onMount,placement,trigger="click"}) => {
 
    const [loaded, setloaded] = useState(false)
    const meRef = useRef <HTMLElement | null>(null)

    useEffect(() => {
      setloaded(true)
    }, [])
    

    if(loaded)
    return ( <>
    <Tippy

          content={content}
          animation="perspective"
          placement={"right-end"}
          trigger={trigger}
          interactive={true}
          inertia={true}
          arrow={true}
          className={className}
          duration={[350, 200]}
          
          onCreate={(instance) => (BtnRef.current = instance)}
          onMount={()=>{if (onactiveMeclass && meRef.current ) meRef.current.classList.add(onactiveMeclass);onMount && onMount()}}
          onHide={()=>{if (onactiveMeclass && meRef.current ) meRef.current.classList.remove(onactiveMeclass)}}
          >
            <span ref={meRef}>

          {children}
            </span>
        </Tippy>
    </> );

    return <> </>
}

export default DefaultTippy;

interface Option_Tippy_Props{
  value? : any;
  onSelect? : Function;
  activeOption? : string;
  children : React.ReactNode;
  style? : {};
  ref?:LegacyRef<HTMLParagraphElement> ;
  TippyRef? : any;
  hideafterSelect? : boolean;
  className?:string;
}


export const Option_Tippy =  ({value,onSelect,activeOption,children,style,ref,TippyRef,hideafterSelect=false,className}:Option_Tippy_Props) => {
  return (    <div ref={ref === undefined ? null : ref}
  
      onClick={(e) => {onSelect && onSelect(value,e.target); hideafterSelect && TippyRef.current.hide() }} style={style}
      className={`options ${className} ${_.isEqual(activeOption,value) && value !== undefined ? "options--selected" : ""}`}
    > {children}
  </div>  );
}