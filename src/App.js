import logo from './logo.svg';
import ReactWordcloud from 'react-wordcloud';
import { Resizable } from "re-resizable";
import Glass from './components/Glass'
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useLocation,useNavigate} from 'react-router-dom';
import './App.css';
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
import PieHistogram from './components/piecomponent';
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import { useState } from 'react';

function App() {
  const [show,setSow]=useState(false)
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const handle = ()=>{

      dispatch(changeupdate())
      navigate('/',{replace:true})
  }
  
   
  
  return (
    <div style={{width:"fit-content"}}>
      {
        show?
        <SideNav style={{backgroundColor:"purple",backgroundImage: `url("https://mdbootstrap.com/img/Photos/Others/sidenav4.jpg")`,backgroundSize:"cover",backgroundRepeat:"no-repeat"}} expanded={show}> 
        <SideNav.Toggle
          onClick={() => {
           setSow(!show)
          }}
        />
        <SideNav.Nav >
          
          
          <ul className="menus">
        {menuItems.map((menu, index) => {
          const depthLevel = 0;
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
        })}
      </ul>
          

        </SideNav.Nav>
      </SideNav>
        :
        
        
        <SideNav  style={{backgroundColor:"purple",bottom:"100%"}} expanded={show}> 
        <SideNav.Toggle style={{heigth:"60px"}}
          onClick={() => {
           setSow(!show)
          }}
        />
        
      </SideNav>
      
      }

<Routes>
          <Route path="/" element={<Glass/>} exact />
          <Route path="/most_Repeat" element={<MostRecent/>} />
          <Route path="/control_chart" element={<LineChart/>} />
          <Route path="/control_chart_sevenDay" element={<SevenDayHistogram/>} />
          <Route path="/pie_histogram" element={<PieHistogram/>} />
          
        </Routes>
   
      
        </div>
  );
}

export default App;
