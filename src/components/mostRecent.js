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
    backgroundColor: "purple",
    
  };

  return (
    
    <>
    <div>
        {
            isTabletOrMobile?
            <div>
            {
              wor!==null&&wor.length>0?
              <div style={{backgroundColor:"dark",marginTop:"40px",width:"300px"}}>
            <Resizable className='glass2'
              
              style={resizeStyle}
            >
              <h2 style={{color:"white"}}>most repeated words</h2>
              <div style={{ width: "60%", height: "100%" }}>
                <ReactWordcloud words={wor} />
              </div>
            </Resizable>
              </div>
              :
              null
            }
          
      
          </div>
            :
            <div>
            {
              wor!==null&&wor.length>0?
              <div style={{backgroundColor:"dark",marginTop:"40px",width:"600px"}}>
            <Resizable className='glass2'
              
              style={resizeStyle}
            >
              <h2 style={{color:"white"}}>most repeated words</h2>
              <div style={{ width: "60%", height: "100%" }}>
                <ReactWordcloud words={wor} />
              </div>
            </Resizable>
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
