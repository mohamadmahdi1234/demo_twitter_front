import './Glass.css'
import { useState,useEffect } from 'react'
import ReactWordcloud from 'react-wordcloud';
import { Resizable } from "re-resizable";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import Modal from "react-bootstrap/Modal";
import {Card,Button} from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from 'react-responsive'

const Recent=()=> {
    const wor = useSelector((state)=>state.slice_for_torob.repeated);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 621px)' })
 
  const resizeStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    
  };
  const options = {
    colors: ["#010b29","#02164f","#18244a","#082785","#3154bd","#4f79f7","#717b99","#1f77b4"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [20, 150],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000
  };

  return (
    
    <>
    <div>
        {
            
            <div className='glass4' style={{height:"fit-content",backdropFilter:"blur(10px)",marginTop:"5em"}}>
            {
              wor!==null&&wor.length>0?
              <div style={{marginTop:"40px",width:"100%",display:"flex",justifyContent:"center",flexDirection:"row",backdropFilter:"blur(10px)"}}>
            
             
              
              <div style={{ width: "80%", height: "600px" ,borderColor:"black",borderBlockStyle:"groove",marginLeft:"0%",marginBottom:"5%",marginTop:"2.5%",borderLeftStyle:"groove",borderRightStyle:"groove",backgroundColor:"rgb(148, 148, 227)",borderBlockColor:"blue",borderColor:"blue"}}>
                <ReactWordcloud options={options} words={wor} />
              </div>
            
              </div>
              :
              null
            }
          
      
          </div>
        }
    
   

   
    
    </div>
    
    
 
  </>
  
  )
}

export default Recent
