import './Glass.css'
import { useState,useEffect } from 'react'
import ReactWordcloud from 'react-wordcloud';
import { Resizable } from "re-resizable";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import Modal from "react-bootstrap/Modal";
import {Card,Button} from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { Line,Pie } from "react-chartjs-2";
import { useMediaQuery } from 'react-responsive'

import Chart from 'chart.js/auto';

const PieHistogram=()=> {
    const data = useSelector((state)=>state.slice_for_torob.pieData);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 800px)' })
  return (
    
    <>
    
    
     {
        data?
        isTabletOrMobile?
        <div className='glass' style={{justifyContent:"center",alignContent:"center"}}>
        <Pie data={data} 
        width={"240px"}
        height={"240px"}
       
  options={{ maintainAspectRatio: false }}/>
        </div>
        :
        <div className='glass' style={{justifyContent:"center",alignContent:"center"}}>
        <Pie data={data} 
        width={"600px"}
        height={"600px"}
       
  options={{ maintainAspectRatio: false }}/>
        </div>
        :
        <p>nothing to show pls go home</p>
     }
    
    
 
     </>
  
  )
}

export default PieHistogram
