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
import { shape } from '@mui/system';

const Recent=()=> {
    const wor = useSelector((state)=>state.slice_for_torob.repeated);
    const logo = useSelector((state)=>state.slice_for_torob.for_twitter_logo)
    const[st,setst]=useState('')
    
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 621px)' })
    useEffect(() => {
      console.log("hello use effect")
      console.log(st)
      console.log(st+Date.now().toString())
      setst(logo)
    },[wor,logo]);
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
    fontSizes: [20, 100],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 100],
    borderRadius:"50%",
    spiral: "archimedean",
    transitionDuration: 1000,
    shape:"circle",randomness:0,
  };

  return (
    
    <>
    
    
    
    <div>
        {
            
            <div className='glass4' style={{height:"fit-content",backdropFilter:"blur(10px)",marginTop:"5em"}}>
              <h1 style={{color:"white",marginTop:"20px",justifyContent:"center",justifyItems:"center",display:"flex"}}> {"WordCloud"}</h1>
            {
              wor!==null&&wor.length>0?
              <div style={{marginTop:"20px",width:"100%",display:"flex",justifyContent:"center",flexDirection:"row",backdropFilter:"blur(10px)"}}>
              <div style={{ width: "90%", height: "600px" ,borderColor:"black",borderBlockStyle:"groove",marginLeft:"0%",marginBottom:"5%",marginTop:"2.5%",borderLeftStyle:"groove",borderRightStyle:"groove",backgroundColor:"rgb(148, 148, 227)",borderBlockColor:"blue",borderColor:"blue"}}>
                <ReactWordcloud style={{borderRadius:"50%"}} options={options} words={wor} />
              </div>
            
              </div>
              :
              null
            }
            <h1 style={{color:"white",marginLeft:"25%",marginBottom:"50px",width:"50%"}}> WordCloud image in shape of twitter logo</h1>
            {
              
            <img cache={false} src={st} key={st+Date.now().toString()} style={{marginLeft:"25%",marginBottom:"10%",width:"50%"}}></img>
            }
      
          </div>
        }
    
   

   
    
    </div>
    
    
 
  </>
  
  )
}

export default Recent
