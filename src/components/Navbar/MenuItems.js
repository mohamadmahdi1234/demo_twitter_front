import { useState, useEffect, useRef } from "react";
import {useLocation,useNavigate} from 'react-router-dom';

import Dropdown from "./Dropdown";

const MenuItems = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const getProductOfThisCategory = (name)=>{
    if(name==="Home"){
      name=""
    }
    navigate(`/${name}`,{replace:true});
  }
  const handle_click= ()=>{
    setDropdown((prev) => !prev);
    getProductOfThisCategory();
    
  }
  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  return (
    <li
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title}{" "}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
          <div style={{height:"1px",backgroundColor:"black"}}></div>
        </>
      ) : (
        <div>
        <p style={{height:"30px"}} onClick={()=>getProductOfThisCategory(items.title)}>{items.title} </p>
        
        </div>
      )}
    </li>
  );
};

export default MenuItems;