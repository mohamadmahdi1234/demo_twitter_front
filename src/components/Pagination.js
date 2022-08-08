import React from 'react'
import './pagination.css'
import Table from './Table'
import { Fragment } from 'react';
import './first.scss';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Fab from '@mui/material/Fab';
import SortIcon from '@mui/icons-material/Sort';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useMediaQuery } from 'react-responsive'
import './Glass'
import { saveRepeated,saveJso,handledataforlineChart,handledataforlineChartSevenDay,handlepieChart,handlesortBaseTweetSoudi,handlesortBaseTweetNozuli,handlesortBaseDateSoudi,handlesortBaseDateNozuli,handlesortBasePolaritySoudi,handlesortBasePolarityNozuli} from './redux/reducer'
import { useSelector, useDispatch } from "react-redux";
import { useState,useEffect } from 'react'

    
const Pagination = (props) => {
    const dispatch=useDispatch();
  // init
  const { currentPage, maxPageLimit, minPageLimit} = props;
  const totalPages = props.response.totalPages-1;
  const data = props.response.data;
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' })
  const isTabletOrMobile1 = useMediaQuery({ query: '(max-width: 460px)' })
  
    // build page numbers list based on total number of pages
    const pages = [];
    for(let i=1 ; i<=totalPages; i++){
        pages.push(i);
    }

    const handlePrevClick = ()=>{
        props.onPrevClick();
    }

    const handleNextClick = ()=>{
        props.onNextClick();
    }

    const handlePageClick = (e)=>{
        props.onPageChange(Number(e.target.id));
    }

    const pageNumbers = pages.map(page => {

        if(page <= maxPageLimit  && page > minPageLimit) {
            return(
        <li key={page} id={page} onClick={handlePageClick} 
            className={currentPage===page ? 'active' : null}>
            {page}
        </li>
            );
        }else{
            return null;
        }
    }
   
 );

    
 const [age, setAge] = React.useState('');
 const sortsoudi=()=>{
    if(age===''){
       let  msg='pls first choose column'
        alert(msg)
    }else{
        if(age===10){
            dispatch(handlesortBaseDateSoudi())
        }
        if(age===20){
            dispatch(handlesortBasePolaritySoudi())
        }
        if(age===30){
            dispatch(handlesortBaseTweetSoudi())
        }
    }
 }

 const sortnozuli=()=>{
    if(age===''){
        let  msg='pls first choose column'
         alert(msg)
     }else{
         if(age===10){
             dispatch(handlesortBaseDateNozuli())
         }
         if(age===20){
            dispatch(handlesortBasePolarityNozuli())
         }
         if(age===30){
            dispatch(handlesortBaseTweetNozuli())
         }
     }
 }
 const handleChange = (event) => {
   setAge(event.target.value )
   console.log(age)
 }
    // page ellipses
    let pageIncrementEllipses = null;
    if(pages.length > maxPageLimit){
        pageIncrementEllipses = <li onClick={handleNextClick}>&hellip;</li>
    }
    let pageDecremenEllipses = null;
    if(minPageLimit >=1){
        pageDecremenEllipses = <li onClick={handlePrevClick}>&hellip;</li> 
    }
    

    return (
        <div style={{display:"flex",justifyContent:"center",flexDirection:"column",columnGap:"20px",alignItems:"center",width:"100%"}}>
            <div className='glass3'>
            <BottomNavigation
            style={{padding:"5px",color:"silver",marginTop:"5em",backgroundColor:"rgba(54, 133, 235, 1.5)",width:"70%",marginLeft:"15%",borderRadius:"10px"}}
        
        showLabels
        
        
      >
        <BottomNavigationAction style={{color:"silver",width:"30%"}} label="Sort" icon={<SortIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
      <div style={{alignItems:"center",backdropFilter:"blur(10px)",height:"100px",marginTop:"20px",columnGap:"20px",display:"flex",flexDirection:"row",justifyContent:"center",alignContent:"center",width:"70%",marginLeft:"15%"}}>
     
     
      <FormControl style={{width:`${isTabletOrMobile?'210px':'100px'}`,backgroundColor:'#4285F4',borderRadius:"20%",height:"56px"}}>
        <InputLabel style={{color:'white'}} id="demo-simple-select-label">{isTabletOrMobile1?'col':"column"}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Column"
          onChange={handleChange}
        >
          <MenuItem value={10}>Date</MenuItem>
          <MenuItem value={20}>Polarity</MenuItem>
          <MenuItem value={30}>Tweet</MenuItem>
        </Select>
      </FormControl>
      <Fab style={{height:"56px",width:"200px"}} variant="extended" size="small" color="primary" aria-label="add" onClick={()=>sortsoudi()} >
        Sort base
        <ArrowDropUpIcon/>
        
      </Fab>
      <Fab style={{height:"56px",width:"200px"}} variant="extended" size="small" color="primary" aria-label="add" onClick={()=>sortnozuli()}>
        Sort base
        <ArrowDropDownIcon/>
        
      </Fab>

      </div>
            <Fragment>
      
                <Table 
                tableData={data}
                headingColumns={['#', 'Profile', 'Username', 'Tweet', 'Date', 'Polarity','sentiment']}
                title="Tweet Demo 2022"
                />
      
            </Fragment>
            <ul className="pageNumbers"> 
               <li>
                   <button onClick={handlePrevClick} disabled={currentPage === pages[0]}>Prev</button>
               </li>
               {pageDecremenEllipses}
                {pageNumbers}
               {pageIncrementEllipses}
                <li>
                   <button style={{backgroundColor:"darkblue",color:"white"}} onClick={handleNextClick} disabled={currentPage === pages[pages.length-1]}>Next</button>
               </li>
            </ul>
            </div>
            </div>
            
        
    )
}

export default Pagination
