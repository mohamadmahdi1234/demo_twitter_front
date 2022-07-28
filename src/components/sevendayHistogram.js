import './Glass.css'
import { useState,useEffect } from 'react'
import ReactWordcloud from 'react-wordcloud';
import { Resizable } from "re-resizable";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import Modal from "react-bootstrap/Modal";
import {Card,Button} from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const LinechartSeven=()=> {
    const data = useSelector((state)=>state.slice_for_torob.data_seven_day);
  return (
    
    <>
    
    
     {
        data?
        <div className='glass'>
        <Line data={data} width={600}
        height={300} />
        </div>
        :
        <p>nothing to show pls go home</p>
     }
    
    
 
     </>
  
  )
}

export default LinechartSeven
