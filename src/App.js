import logo from './logo.svg';
import ReactWordcloud from 'react-wordcloud';
import { Resizable } from "re-resizable";
import Glass from './components/Glass'
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import ScrollToTop from "react-scroll-to-top";
import './components/first.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactLoading from 'react-loading';

import {useLocation,useNavigate} from 'react-router-dom';
import Slider from '@mui/material/Slider';
import './App.css';
import Pagination from './components/Pagination'
import { Routes, Route, Link } from "react-router-dom";
import MostRecent from './components/mostRecent'
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useSelector, useDispatch } from "react-redux";
import { changeupdate} from './components/redux/reducer'
import { Container,NavDropdown } from 'react-bootstrap';
import { menuItems } from "./components/menuitems";
import MenuItems from "./components/Navbar/MenuItems";
import LineChart from "./components/controlChart"
import SevenDayHistogram from './components/sevendayHistogram'
import { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import PieHistogram from './components/piecomponent';
import VerticalChart from './components/DailyHour'
import { saveRepeated,saveJso,handledataforlineChart,handledataforlineChartSevenDay,handledataforverticalChart,handlepieChart,handleDataForTable} from './components/redux/reducer'
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import { useState } from 'react';

function App() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' })
  const [show,setSow]=useState(false)
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const[query,setQuery]=useState('')
  const [jso,setJso] = useState(null)
  const[load,setLoad]=useState(false)

  const pageNumberLimit = 5;
  const [passengersData, setData] = useState([]);
  const driversData =useSelector((state)=>state.slice_for_torob.forTable)
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(10);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const handle = ()=>{

      dispatch(changeupdate())
      navigate('/',{replace:true})
  }
  useEffect(() => {
    if(driversData!==null){
    const qw = driversData.data.slice((currentPage-1)*maxPageLimit,(driversData.data.length>(currentPage-1)*maxPageLimit+maxPageLimit?(currentPage-1)*maxPageLimit+maxPageLimit:driversData.data.length))
    const t={
      data:qw,
      totalPages:driversData.totalPages
    }
    setData(t)
  }
  },[currentPage,driversData]);
  const fetchData = (number)=>{
    setLoad(true)
    fetch(`https://demo-server-twitter.herokuapp.com/prediction?num=${number}&query=${query}`,{
          method:"GET",
          
          headers:{
              
              "Content-type" : "application/json;charset=UTF-8"
          }
      }).then(response=>response.json()).then(json=>{

        if(json.detail===undefined){
        console.log(json)
        const msg = "complete fetch"
        alert(msg)
        let sd = []
        Object.entries(json.count).forEach(([key, value]) => {
          sd.push({
            'text':key,
            'value':value
          })
        });
        console.log("this is ")
        console.log( Object. keys(json.data.Time). length)
        console.log("get the data from server is : ")
        console.log(json)
        dispatch(saveRepeated(sd));
        setJso(json);
        dispatch(saveJso(json));
        dispatch(handleDataForTable())
        dispatch(handledataforlineChart())
        dispatch(handledataforlineChartSevenDay())
        dispatch(handlepieChart())
        dispatch(handledataforverticalChart())
        reset()
        setLoad(false)
      }else{
        alert(`Error: ${json.detail}`)
        setLoad(false)
      }
    }
      )
      .catch((error) =>doubleHandle(error))

  }
   
  const reset = () => {
    setQuery('')
  }
  const doubleHandle=(error)=>{
    setLoad(false)
    alert(`Error: ${error.message}`)
  }

  const onPageChange= (pageNumber)=>{
    setCurrentPage(pageNumber);
  }

  const onPrevClick = ()=>{
      if((currentPage-1) % pageNumberLimit === 0){
          setMaxPageLimit(maxPageLimit - pageNumberLimit);
          setMinPageLimit(minPageLimit - pageNumberLimit);
      }
      setCurrentPage(prev=> prev-1);
   }
  
  const onNextClick = ()=>{
       if(currentPage+1 > maxPageLimit){
           setMaxPageLimit(maxPageLimit + pageNumberLimit);
           setMinPageLimit(minPageLimit + pageNumberLimit);
       }
       setCurrentPage(prev=>prev+1);
    }

  const paginationAttributes = {
    currentPage,
    maxPageLimit,
    minPageLimit,
    response: passengersData,
  };
  
  return (
    <div style={{width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",alignContent:"center",justifyItems:"center"}}>
      {
        isTabletOrMobile?
        <ScrollToTop style={{backgroundColor:"purple",width:"40px",height:"40px",float:"left",borderRadius:"50%"}} smooth color="#6f00ff" />
        :
        <ScrollToTop style={{backgroundColor:"purple",width:"100px",float:"left"}} smooth color="#6f00ff" />
      }
      
      {
        show?
        <SideNav style={{backgroundColor:"purple",position:"fixed",backgroundImage: `url("https://mdbootstrap.com/img/Photos/Others/sidenav4.jpg")`,backgroundSize:"cover",backgroundRepeat:"no-repeat"}} expanded={show}> 
        <SideNav.Toggle
          onClick={() => {
           setSow(!show)
          }}
        />
        <SideNav.Nav >
          
        <div className="glass__form__group" style={{width:"80%",marginLeft:"20px"}}>
          <input
           
           id="query"
           className="glass__form__input"
           placeholder="#query"
           required
           autoFocus
           title="number must less than 200"
           value={query}
           type="string"
           onChange={(e) => setQuery(e.target.value)}
           
            
          />
        </div>
        <Slider style={{width:"80%",marginLeft:"20px",marginTop:"30px",marginBottom:"30px"}}
          aria-label="Always visible"
          defaultValue={80}
          step={1}
          valueLabelDisplay="on"
          onChangeCommitted={(event, newValue) =>fetchData(newValue)}
          />
          <ul className="menus">
        {menuItems.map((menu, index) => {
          const depthLevel = 0;
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
        })}
      </ul>
          

        </SideNav.Nav>
      </SideNav>
        :
        
        
        <SideNav  style={{backgroundColor:"purple",bottom:"100%",position:"fixed"}} expanded={show}> 
        <div className='childbigger' style={{margin:"0",padding:"0",overflow:"hidden",backgroundColor:"rgb(11, 11, 86,0.8)",width:"100vw",height:"60px",display:"flex",alignContent:"center"}}>
                <div className='twtimage'>

                </div>
        <SideNav.Toggle style={{heigth:"60px",position:"absolute"}}
          onClick={() => {
           setSow(!show)
          }}
          
        />
        </div>
      </SideNav>
      
      
      }
      

<Routes>
          <Route path="/" element={!load?<Pagination {...paginationAttributes} 
                          onPrevClick={onPrevClick} 
                          onNextClick={onNextClick}
                          onPageChange={onPageChange}/>:<ReactLoading type="bars" color="blue" height={'200px'} width={'200px'} />} />
          <Route path="/Word_Cloud" element={<MostRecent/>} />
          <Route path="/Control_chart" element={<LineChart/>} />
          <Route path="/Control_chart_Daily" element={<SevenDayHistogram/>} />
          <Route path="/Pie_histogram" element={<PieHistogram/>} />
          <Route path="/VericalChart" element={<VerticalChart/>} />
          
        </Routes>
   
      
        </div>
  );
}

export default App;
