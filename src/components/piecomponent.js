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

import Chart from 'chart.js/auto';

const PieHistogram=()=> {
    const data = useSelector((state)=>state.slice_for_torob.pieData);
  return (
    
    <>
    
    
     {
        data?
        <div className='glass' style={{justifyContent:"center",alignContent:"center"}}>
        <Pie data={data} width={600}
        height={600}
       
  options={{ maintainAspectRatio: false }}/>
        </div>
        :
        <p>nothing to show pls go home</p>
     }
    
    
 
     </>
  
  )
}

export default PieHistogram
