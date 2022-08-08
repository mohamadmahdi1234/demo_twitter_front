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
import { useMediaQuery } from 'react-responsive'

const LinechartSeven=()=> {
    const data = useSelector((state)=>state.slice_for_torob.data_seven_day);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' })
    const isTabletOrMobile1 = useMediaQuery({ query: '(max-width: 1000px)' })
    const isTabletOrMobile2 = useMediaQuery({ query: '(max-width: 800px)' })
    const isTabletOrMobile3 = useMediaQuery({ query: '(max-width: 400px)' })
  return (
    
    <>
    
    
     {
        data?
        
        <Line data={data} 
        width={isTabletOrMobile1?isTabletOrMobile2?isTabletOrMobile?isTabletOrMobile3?340:400:600:800:1000}
        height={600}
        style={{marginTop:"5em",backgroundColor:"rgba(225, 225, 225, 0.05)",backdropFilter:"blur(10px)",fontColor:"white"}}
        options= {{
          maintainAspectRatio: false,
          scales: {
              yAxes:{
                  
                  ticks:{
                      beginAtZero: true,
                      color: 'white',
                      fontSize: 12,
                  }
              },
              xAxes: {
                  width:"100%",
                  ticks:{
                      beginAtZero: true,
                      color: 'white',
                      fontSize: 12,
                  }
              },
          }
      }}
         />
        :
        <p>nothing to show pls go home</p>
     }
    
    
 
     </>
  
  )
}

export default LinechartSeven
