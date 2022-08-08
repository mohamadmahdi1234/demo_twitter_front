import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { useState,useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { saveRepeated,saveJso,handledataforlineChart,handledataforlineChartSevenDay,handlepieChart,pageChange} from './redux/reducer'
const Table = ({ tableData, headingColumns, title, breakOn = 'medium' }) => {
  let tableClass = 'table-container__table';
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 500px)' })
  if(breakOn === 'small') {
    tableClass += ' table-container__table--break-sm';
  }else if(breakOn === 'medium') {
    tableClass += ' table-container__table--break-md';
  }else if(breakOn === 'large') {
    tableClass += ' table-container__table--break-lg';
  }
  const data = tableData? tableData.map((row, index) => {
    let rowData = [];
    let i = 0;

    for(const key in row) {
      rowData.push({
        key: headingColumns[i],
        val: row[key]
      });
      i++;
    }

    return <tr style={{width:"100%",height:"fit-content"}} key={index}>
      {rowData.map((data, index) =>{
        
        return <td style={{wordBreak:"break-word",minWidth:"60px",color:"silver",minHeight:"40px"}} key={index} data-heading={data.key}>{data.val}</td>})
        }
    </tr>
  }):
  null;

  return(
    <div className="table-container">
      <div className="table-container__title"  >
        <h2>{title}</h2>
      </div>
      <table className={tableClass} >
        <thead>
          <tr>
            {headingColumns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  headingColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  breakOn: PropTypes.oneOf(['small', 'medium', 'large']) 
}

export default Table;