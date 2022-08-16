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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useMediaQuery } from 'react-responsive'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const Linechart=()=> {
    const data = useSelector((state)=>state.slice_for_torob.data);
    console.log("data is for control")
    console.log(data)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' })
    const isTabletOrMobile1 = useMediaQuery({ query: '(max-width: 1000px)' })
    const isTabletOrMobile2 = useMediaQuery({ query: '(max-width: 800px)' })
    const isTabletOrMobile3 = useMediaQuery({ query: '(max-width: 400px)' })
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' ,
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart',
        },
      },
      height:"1600px",
      
    };
  return (
    
    <>
    
    
     {
        data?
        
       
        <Line data={data} 
        width={isTabletOrMobile1?isTabletOrMobile2?isTabletOrMobile?isTabletOrMobile3?340:400:600:800:1500}
        height={680}
        style={{marginTop:"4em",backgroundColor:"rgba(225, 225, 225, 0.05)",backdropFilter:"blur(10px)",fontColor:"white"}}
        options= {{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color:"white",
                font: {
                    size: 20
                  }
              }
            },
            title: {
              display: true,
              text: 'Line Chart for All Tweets',
              color:"white",
              font: {
                size: 20
              }
            },
          }
          ,
          scales: {
              yAxes:{
                  
                  ticks:{
                      beginAtZero: true,
                      color: 'white',
                      font: {
                        size: 15
                      }
                  }
              },
              xAxes: {
                  width:"100%",
                  ticks:{
                      beginAtZero: true,
                      color: 'white',
                      font: {
                        size: 15
                      }
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

export default Linechart
